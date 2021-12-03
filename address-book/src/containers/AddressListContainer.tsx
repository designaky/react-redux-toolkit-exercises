import React from "react";
import AddressList from "../components/AddressList/AddressList";
import { Address } from "../models/address";

import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { selectAddressList, removeAddress } from "../store/modules/reducers/addressListSlice";
import { addNotification, NotificationType } from "../store/modules/reducers/notificationSlice";



const AddressListContainer = () => {
    const addressList = useAppSelector(selectAddressList)
    const dispatch = useAppDispatch();

    const deleteAddress = (address: Address): void => {
        dispatch(removeAddress(address))
        dispatch(addNotification({ message: "Address removed", notificationType: NotificationType.error }));
    }

    return (
        <AddressList
            {...{ addressList, onClick: deleteAddress }}
        />

    );
}


export default AddressListContainer;