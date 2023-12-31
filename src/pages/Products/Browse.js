import './Products.css'
import logo from '../../images/logo.png'


const categories = ({ text }) => {
    return (
        <div className="CategoriesCheckbox">
            <input id={text} className="CheckBoxInput" type="checkbox" />
            <label for={text} className="CheckBoxLabel">
                <span className="CheckBoxSpan"></span>
                <div className="CheckBoxText">{text}</div>
            </label>
        </div>
    )
}

const condition = ({ text }) => {
    return (
        <div className="CategoriesCheckbox">
            <input id={text} className="CheckBoxInput" type="checkbox" />
            <label for={text} className="CheckBoxLabel">
                <span className="CheckBoxSpan"></span>
                <div className="CheckBoxText">{text}</div>
            </label>
        </div>
    )
}

const productCard = () => {
    return (
        <div class="card">
            <div class="image-container">
                <svg viewBox="0 0 1921 1081" xmlns="http://www.w3.org/2000/svg" class="svg">
                    <defs>
                        <radialGradient gradientUnits="objectBoundingBox" gradientTransform="translate(0.219) scale(0.563 1)" r="1.204" cy="0.5" cx="0.5" id="radial-gradient">
                            <stop stop-color="#fff" offset="0"></stop>
                            <stop stop-color="#bcbcbc" offset="1"></stop>
                        </radialGradient>
                    </defs>
                    <g transform="translate(-121.5 -92.5)" id="hoodie">
                        <rect fill="url(#radial-gradient)" stroke-width="1" stroke-miterlimit="10" stroke="#fff" transform="translate(122 93)" height="1080" width="1920" data-name="Rectangle 83" id="Rectangle_83"></rect>
                        {/* <g transform="translate(679.338 886.938)" data-name="Group 67" id="Group_67">
                            <path fill="#dbdbdb" transform="translate(-679.026 -701.302)" d="M689.907,702.85s-7.253,22.231-9.689,34.844a8.084,8.084,0,0,0,2.15,7.3c5.49,5.5,19.551,16.583,46.956,20.927a15.4,15.4,0,0,0,14.4-5.733l14.95-18.791Z" data-name="Path 27" id="Path_27"></path>
                            <path transform="translate(-679.338 -701.77)" d="M731.958,767.6a14.468,14.468,0,0,1-2.48-.2c-27.247-4.329-41.466-15.15-47.529-21.228a9.162,9.162,0,0,1-2.437-8.227c2.422-12.527,9.646-34.744,9.718-34.973l.387-1.2,1.089.616,69.846,39.13-15.709,19.737A16.4,16.4,0,0,1,731.958,767.6Zm-41.136-62.765c-1.534,4.787-7.2,22.79-9.274,33.526a7.031,7.031,0,0,0,1.878,6.364c5.877,5.891,19.723,16.412,46.382,20.64a14.4,14.4,0,0,0,13.445-5.361l14.19-17.845Z" data-name="Path 28" id="Path_28"></path>
                        </g>
                        <g transform="translate(1403.771 886.981)" data-name="Group 68" id="Group_68">
                            <path fill="#dbdbdb" transform="translate(-1184.283 -701.345)" d="M1254.631,702.85s7.253,22.231,9.689,34.844a8.084,8.084,0,0,1-2.15,7.3c-5.49,5.5-19.551,16.583-46.956,20.927a15.4,15.4,0,0,1-14.4-5.733l-14.95-18.791Z" data-name="Path 29" id="Path_29"></path>
                            <path transform="translate(-1184.76 -701.8)" d="M1213.369,767.59a16.533,16.533,0,0,1-12.9-6.307l-15.709-19.737L1255.7,701.8l.387,1.2c.072.215,7.31,22.432,9.718,34.973a9.161,9.161,0,0,1-2.437,8.227c-6.049,6.063-20.282,16.9-47.529,21.228A20.362,20.362,0,0,1,1213.369,767.59Zm-25.485-25.427,14.19,17.845a14.42,14.42,0,0,0,13.445,5.361c26.674-4.243,40.506-14.749,46.4-20.64a7.093,7.093,0,0,0,1.878-6.364c-2.078-10.75-7.74-28.738-9.273-33.525Z" data-name="Path 30" id="Path_30"></path>
                        </g>
                        <g transform="translate(868.454 973.453)" data-name="Group 69" id="Group_69">
                            <path fill="#dbdbdb" transform="translate(-810.972 -761.818)" d="M1024.839,822.233c-118.149.186-175.51-12.7-199.06-20.324a20,20,0,0,1-13.789-19.049V762.85h425.668v19.78a19.992,19.992,0,0,1-14,19.12C1199.7,809.232,1141.655,822.061,1024.839,822.233Z" data-name="Path 31" id="Path_31"></path>
                            <path transform="translate(-811.28 -762.13)" d="M1022.681,823.577c-116.458,0-173.317-12.742-196.91-20.368a20.954,20.954,0,0,1-14.491-20.038V762.13h427.733v20.812a20.941,20.941,0,0,1-14.72,20.109c-24.295,7.6-82.488,20.353-199.146,20.525h-2.465ZM813.344,764.194v18.977a18.9,18.9,0,0,0,13.072,18.074c23.478,7.6,80.123,20.267,196.279,20.267h2.465c116.386-.172,174.349-12.886,198.53-20.439a18.894,18.894,0,0,0,13.273-18.146V764.18H813.344Z" data-name="Path 32" id="Path_32"></path>
                        </g>
                        <g transform="translate(687.323 338.147)" data-name="Group 70" id="Group_70">
                            <path fill="#144076" transform="translate(-684.595 -318.574)" d="M1276.044,391.057c-80.022-65.732-179.954-70.978-195.391-71.394v-.043s-.4,0-1.061.014c-.659-.014-1.061-.014-1.061-.014v.043c-15.451.416-115.368,5.662-195.391,71.394-86.974,71.437-202.07,442.41-197.369,470.474s25.857,48.475,70.52,45.924c39.961-2.279,108.173-164.761,122.062-198.888a.853.853,0,0,1,1.62.487c-18.16,136.8-25.943,234.162-13.2,245.858,39.99,36.736,385.679,36.736,425.669,0,12.728-11.7,4.959-109.062-13.2-245.858a.853.853,0,0,1,1.62-.487c13.889,34.127,82.1,196.609,122.062,198.888,44.662,2.551,65.818-17.859,70.52-45.924C1478.114,833.467,1363.018,462.494,1276.044,391.057Z" data-name="Path 33" id="Path_33"></path>
                            <path transform="translate(-684.909 -318.89)" d="M1079.906,983.809c-91.217,0-192.61-8.6-213.536-27.821-11.9-10.922-7.74-91.188,12.7-245.385-14.62,35.776-82.287,195.907-122.42,198.2-55,3.053-68.441-27.964-71.594-46.784-2.422-14.419,25.757-115.54,64.356-219.5,28.423-76.511,83.534-211,133.371-251.95,78.13-64.184,173.977-70.907,195.018-71.595v-.043l1.046-.029,1.075.014,2.078-.029v.086c21.041.688,116.873,7.41,195.018,71.595,49.851,40.95,104.962,175.425,133.371,251.95,38.614,103.959,66.778,205.08,64.356,219.5-3.153,18.82-16.641,49.851-71.594,46.784-40.319-2.308-108.388-163.858-122.607-198.673,20.611,154.441,24.8,234.907,12.885,245.858C1272.516,975.195,1171.108,983.809,1079.906,983.809ZM879.384,707.335a2.023,2.023,0,0,1,.5.072,1.888,1.888,0,0,1,1.4,2.107c-20.21,152.219-24.768,234.635-13.531,244.955,39.66,36.421,384.618,36.421,424.278,0,11.237-10.32,6.679-92.736-13.531-244.955a1.888,1.888,0,0,1,1.4-2.107,1.791,1.791,0,0,1,2.179,1.1c13.316,32.708,81.743,195.993,121.159,198.243,39.5,2.265,64.184-13.746,69.444-45.064,2.379-14.176-25.757-114.781-64.256-218.453-28.337-76.325-83.276-210.426-132.754-251.061-78.947-64.844-176.1-70.663-194.774-71.165l-1.577-.029-.473.029c-18.676.5-115.827,6.321-194.76,71.165C834.621,432.81,779.7,566.927,751.345,643.237c-38.5,103.672-66.635,204.277-64.256,218.453,5.246,31.318,29.914,47.343,69.445,45.064C795.95,904.5,864.377,741.219,877.693,708.5A1.816,1.816,0,0,1,879.384,707.335Z" data-name="Path 34" id="Path_34"></path>
                        </g>
                        <g transform="translate(894.605 274.45)" data-name="Group 71" id="Group_71">
                            <path fill="#dbdbdb" transform="translate(-829.219 -274.134)" d="M1202.879,371.815c-3.2-13.559-12.112-18.275-17.931-19.923a4.091,4.091,0,0,1-2.695-5.633c3.354-7.482,7.009-22.489-8.743-35.6-22.016-18.347-90.529-35.475-156.591-35.475-61.174,0-134.575,17.128-156.591,35.475-15.752,13.129-12.1,28.136-8.743,35.6a4.091,4.091,0,0,1-2.695,5.633c-5.819,1.634-14.735,6.364-17.931,19.923-4.888,20.8,14.677,30.587,63.611,41.6s105.206,74.619,122.334,78.288c17.128-3.669,73.4-67.28,122.334-78.288C1188.2,402.4,1207.781,392.612,1202.879,371.815Z" data-name="Path 35" id="Path_35"></path>
                            <path transform="translate(-829.525 -274.45)" d="M1017.24,493.075l-.215-.043c-6.651-1.419-18.547-11.194-33.626-23.578-24.61-20.21-58.322-47.887-88.723-54.724-38.255-8.614-55.713-16.025-62.249-26.474-2.938-4.687-3.626-10.033-2.15-16.369,3.383-14.362,13.129-19.12,18.648-20.683a3.189,3.189,0,0,0,2.021-1.691,3.038,3.038,0,0,0,.014-2.523c-3.569-7.969-7.152-23.349,9.016-36.822,22.432-18.691,97.38-35.719,157.25-35.719,63.081,0,133.615,16.025,157.25,35.719,16.182,13.488,12.6,28.867,9.016,36.822a2.935,2.935,0,0,0,.014,2.523,3.189,3.189,0,0,0,2.021,1.691c5.518,1.548,15.265,6.307,18.647,20.683h0c1.491,6.335.788,11.682-2.15,16.369-6.536,10.449-23.994,17.859-62.249,26.474-30.4,6.837-64.113,34.514-88.723,54.724-15.079,12.384-26.975,22.159-33.626,23.578Zm0-216.561c-59.483,0-133.8,16.8-155.931,35.245-15.136,12.613-11.8,26.961-8.457,34.4a5.045,5.045,0,0,1-.029,4.243,5.243,5.243,0,0,1-3.34,2.809c-6.206,1.749-14.219,6.493-17.2,19.164-1.362,5.762-.745,10.607,1.892,14.792,7.167,11.438,29.541,18.49,60.945,25.556,30.888,6.952,64.8,34.8,89.583,55.14,14.692,12.054,26.316,21.615,32.536,23.105,6.206-1.491,17.845-11.051,32.536-23.105,24.768-20.339,58.695-48.188,89.583-55.14,31.4-7.066,53.793-14.118,60.959-25.556,2.623-4.185,3.239-9.03,1.892-14.792-2.981-12.671-10.994-17.415-17.2-19.164a5.236,5.236,0,0,1-3.339-2.809,5.1,5.1,0,0,1-.029-4.243c3.34-7.425,6.665-21.787-8.457-34.4C1152.833,294.818,1087.43,276.514,1017.24,276.514Z" data-name="Path 36" id="Path_36"></path>
                        </g>
                        <g transform="translate(975.916 293.6)" data-name="Group 72" id="Group_72">
                            <path fill="#144076" transform="translate(-885.945 -287.5)" d="M1096.279,325.555c-14.677-39.144-107.284-37.008-103.945-37.008s-89.253-2.136-103.945,37.008c-13.6,36.277,74.4,60.286,99.286,98.455a5.519,5.519,0,0,0,9.288,0C1021.889,385.855,1109.881,361.832,1096.279,325.555Z" data-name="Path 37" id="Path_37"></path>
                            <path fill="#144076" transform="translate(-886.255 -287.81)" d="M992.658,427.889a6.591,6.591,0,0,1-5.518-3c-10.177-15.609-31.117-28.867-51.356-41.7-28.953-18.332-56.3-35.647-48.031-57.691,14.147-37.739,98.455-37.854,104.862-37.668h.043c6.049-.215,90.715-.158,104.9,37.668,8.27,22.045-19.078,39.359-48.031,57.691-20.239,12.828-41.179,26.086-51.356,41.7A6.59,6.59,0,0,1,992.658,427.889Zm-1.018-138c-9.962,0-88.837,1.347-101.967,36.349-7.668,20.468,18.977,37.352,47.2,55.226,20.439,12.943,41.566,26.316,51.987,42.3a4.5,4.5,0,0,0,7.568,0c10.42-15.982,31.562-29.369,51.987-42.3,28.222-17.874,54.882-34.758,47.2-55.226-13.129-35-91.976-36.349-101.952-36.349h-.014v.014l-1.921-.014Z" data-name="Path 38" id="Path_38"></path>
                        </g> */}


                        <img src={logo} alt="" />

                    </g>
                </svg>

                <div class="price">$49.9</div>
            </div>
            {/* <label class="favorite">
                <input checked="" type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                    <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path>
                </svg>
            </label> */}

            <div class="content">
                <div class="brand">ADIDAS</div>
                <div class="product-name">Classic oversized hoodie</div>
                {/* <div class="color-size-container">
                    <div class="colors">
                        Color
                        <ul class="colors-container">
                            <li class="color"><a href="#"></a> <span class="color-name">Collegiate Gold</span></li>
                            <li class="color active"><a href="#"></a><span class="color-name">Team Navy</span></li>
                            <li class="color"><a href="#"></a><span class="color-name">Pulse Blue</span></li>
                            <li class="color"><a href="#"></a><span class="color-name">Pink Fusion</span></li>
                            +2
                        </ul>
                    </div>
                    <div class="sizes">
                        Size
                        <ul class="size-container">
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="xs" type="radio" />
                                    <span class="name">XS</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input checked="" name="size" value="s" type="radio" />
                                    <span class="name">S</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="m" type="radio" />
                                    <span class="name">M</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="l" type="radio" />
                                    <span class="name">L</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="xl" type="radio" />
                                    <span class="name">XL</span>
                                </label>
                            </li>

                        </ul>
                    </div>
                </div> */}
                <div class="rating">
                    <svg viewBox="0 0 99.498 16.286" xmlns="http://www.w3.org/2000/svg" class="svg four-star-svg">
                        <path fill="#fc0" transform="translate(-0.001 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" id="star-svgrepo-com"></path>
                        <path fill="#fc0" transform="translate(20.607 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" data-name="star-svgrepo-com" id="star-svgrepo-com-2"></path>
                        <path fill="#fc0" transform="translate(41.215 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" data-name="star-svgrepo-com" id="star-svgrepo-com-3"></path>
                        <path fill="#fc0" transform="translate(61.823 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" data-name="star-svgrepo-com" id="star-svgrepo-com-4"></path>
                        <path fill="#e9e9e9" transform="translate(82.431 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" data-name="star-svgrepo-com" id="star-svgrepo-com-5"></path>
                    </svg>
                    {/* (29,062) */}
                </div>
            </div>

            <div class="button-container">
                <button class="buy-button button">Buy Now</button>
                {/* <button class="cart-button button">
                    <svg viewBox="0 0 27.97 25.074" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z" id="cart-shopping-solid"></path>
                    </svg>

                </button> */}
            </div>
        </div>
    )
}

const Browse = () => {
    return (
        <div className="Browse">
            <h2>Browse Products</h2>
            <div className="AllBrowse">
                <div className="LeftSide">
                    <div className="Categories">
                        <p>Categories</p>
                        {categories({ text: "All Categories" })}
                        {categories({ text: "Clothes" })}
                    </div>
                    <div className="Categories">
                        <p>Condition</p>
                        {condition({ text: "All Conditions" })}
                        {condition({ text: "Brand New" })}
                        {condition({ text: "New" })}
                    </div>
                </div>
                <div className="RightSide">
                    {productCard()}
                </div>
            </div>
        </div>
    );
}

export default Browse;