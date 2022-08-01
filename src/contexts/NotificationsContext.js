import { useState, createContext, useContext, useCallback } from "react";

export const NotificationContext = createContext();

const types = {
    success: 'success',
    error: 'danger',
    warning:'warning',
    info: 'info',
}
const initialState = {show: false, message: '', type: types.error};


export const NotificationProvider = ({
    children 
}) => {

    const [alert, setAlert] = useState(initialState);
    const [toast, setToast] = useState(initialState);
    


    const addAlert = useCallback((message, type = types.error) => {
        setAlert({show:true, message, type});

        setTimeout(() => {
            setAlert({show: false, message: '', type: types.error});
        }, 4000)

    }, []);
    const hideAlert = useCallback(() => {
        setAlert({show:false, message:'', type: types.error});

    }, []);

    const addToast = useCallback((message, type = types.error) => {
        setToast({show:true, message, type});

        setTimeout(() => {
            setAlert({show: false, message: '', type: types.error});
        }, 4000)

    }, []);
    const hideToast = useCallback(() => {
        setToast({show:false, message:'', type: types.error});

    }, []);
    

    return (
        <NotificationContext.Provider value={{alert,toast, addAlert, hideAlert, addToast,hideToast}}>
            {children}
        </NotificationContext.Provider>
    )
};

export const useNotificationContext = () => {
    const state = useContext(NotificationContext);

    return state;

}