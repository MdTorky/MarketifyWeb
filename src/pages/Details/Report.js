import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@iconify-icon/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from "../../components/Loader/Loader";
import { useItemsContext } from '../../hooks/useItemsContext'
import { useAuthContext } from '../../hooks/useAuthContext';
const Report = ({ api, languageText }) => {
    const { reports = [], dispatch } = useItemsContext()
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate();
    const { user } = useAuthContext()

    const [reportMessage, setReportMessage] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError(languageText.YouMustBeLoggedIn)
        }
        else {

            setSubmitting(true)

            const item = {
                userId: user.userId,
                reportMessage,
            }

            const response = await fetch(`${api}/api/reports`, {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                dispatch({
                    type: 'CREATE_FORM',
                    collection: "reports",
                    payload: json
                });
                toast.success(languageText.ReportAddedSuccessfully, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    style: {
                        // fontFamily: language === 'ar' ?
                        //     'Noto Kufi Arabic, sans-serif' :
                        //     'Poppins, sans-serif',
                    },
                });
                setSubmitting(false);
                navigate("/")


            }
        }

    }

    return (
        <div className="Sell">
            {submitting ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Submitting}</p>
                </div>
            ) : (
                <div className="SellFormContainer">
                    <h2>{languageText.ReportForm}</h2>
                    <form className='Form' onSubmit={handleSubmit} >
                        <div className="InputField ">
                            <div className="InputLabelField">
                                <textarea
                                    type="text"
                                    className={`input ${(reportMessage) ? 'valid' : ''}`}
                                    onChange={(e) => { setReportMessage(e.target.value) }}
                                    required
                                    id="reportMessage"
                                    name="reportMessage"
                                />
                                {!reportMessage && <label for="reportMessage" className={`LabelInput ${(reportMessage) ? 'valid' : ''}`}><Icon icon="material-symbols:bug-report" />{languageText.ExplainTheIssue}</label>}
                            </div>
                        </div>
                        <button className='SubmitButton'>{languageText.Submit}</button>

                    </form>
                    {error && <div className="ErrorMessage"><Icon icon="ooui:error" />{error}</div>}
                </div>
            )}
        </div>
    )
}

export default Report
