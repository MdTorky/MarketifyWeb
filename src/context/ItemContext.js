import { createContext, useReducer } from 'react'


export const ItemsContext = createContext()

// export const itemsReducer = (state, action) => {

//     switch (action.type) {
//         case 'SET_ITEM':
//             return {
//                 ...state,
//                 [action.collection]: action.payload
//             };
//         case 'CREATE_ITEM':
//             return {
//                 ...state,
//                 [action.collection]: [action.payload, ...state[action.collection]]
//             };
//         case 'DELETE_ITEM':
//             return {
//                 ...state,
//                 [action.collection]: state[action.collection].filter(item => item._id !== action.payload._id)
//             };
//         case 'GET_ITEM':
//             return {
//                 ...state,
//                 [action.collection]: state[action.collection].map(item => (item._id === action.payload.id ? action.payload : item))
//             };
//         case 'UPDATE_ITEM':
//             return {
//                 ...state,
//                 [action.collection]: state[action.collection].map(item =>
//                     item._id === action.payload.id ? { ...item, ...action.payload.changes } : item
//                 ),
//             };
//         default:
//             return state;
//     }
// }

export const itemsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEM':
            return {
                ...state,
                [action.collection]: action.payload
            };
        case 'CREATE_ITEM':
            return {
                ...state,
                [action.collection]: [action.payload, ...state[action.collection] || []] // Initialize as empty array if undefined
            };
        case 'DELETE_ITEM':
            return {
                ...state,
                [action.collection]: state[action.collection] ? state[action.collection].filter(item => item._id !== action.payload._id) : []
            };
        case 'GET_ITEM':
            return {
                ...state,
                [action.collection]: state[action.collection] ? state[action.collection].map(item => (item._id === action.payload.id ? action.payload : item)) : []
            };
        case 'UPDATE_ITEM':
            return {
                ...state,
                [action.collection]: state[action.collection] ? state[action.collection].map(item =>
                    item._id === action.payload.id ? { ...item, ...action.payload.changes } : item
                ) : []
            };
        default:
            return state;
    }
};

export const ItemsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(itemsReducer, {
        products: [],
        users: [],
        message: [],
        notifications: [],
    })


    return (
        <ItemsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ItemsContext.Provider>
    )
}