import React, { useEffect } from "react";
import { useAppDispatch } from '../store/hooks/hooks';
import { useAppSelector } from '../store/hooks/hooks';
import {
    removeNotification,
    notificationMessage,
    showNotification,
    notificationStatus
} from "../store/modules/reducers/notificationSlice"
import "../styles/App.css"


const SearchContainer = () => {
    const message = useAppSelector(notificationMessage)
    const displayNotification = useAppSelector(showNotification)
    const status = useAppSelector(notificationStatus)
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (displayNotification) {
            setTimeout(() => {
                dispatch(removeNotification())
            }, 2000);
        }
    }, [dispatch, displayNotification])


    return (
        <div >
            {displayNotification ? <div>
                <p className={`notification notification__${status}`} onClick={() => { dispatch(removeNotification()) }}>{message}</p>
            </div> : ""}
        </div>
    );
}


export default SearchContainer;