import { createContext, useState } from "react";
import { AppConstants } from "../util/constants";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{

    const backendUrl = AppConstants.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState();

    const getUserData = async()=>{
        try{
            const response = await axios.post(backendUrl+"/profile", {
  withCredentials: true
})
            if(response.status  === 200){
                console.log(response)
                setUserData(response.data)
            }else{
                toast.error("Unable to retrieve profile");
            }
        }catch(error){
            toast.error(error.message);
        }
    }


    const contextValue = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData
    }
    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}