import {createContext, useState} from "react";
import {AppConstants} from "../util/constants.js";
import axios from "axios";
import {toast} from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backendURL = AppConstants.BACKEND_URL
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const response = await axios.get(`${backendURL}/profile`);
            if (response.status === 200) {
                setUserData(response.data);
            } else {
                toast.error("Unable to get user data");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Fetch failed");
        }
    };


    const contextValue = {
        backendURL,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,

    }
    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}