import React, { useState } from "react";
import Autocomplete from "../components/Autocomplete/Autocomplete";
import { ApiAutoCompleteAddress } from "../models/address";
import addressService from "../services/addressService"
import { useAppDispatch } from '../store/hooks/hooks';
import { addAddress } from "../store/modules/reducers/addressListSlice"
import { addNotification, NotificationType } from "../store/modules/reducers/notificationSlice";


const AutocompleteContainer = () => {
    const [autoCompleteList, setAutoCompleteList] = useState<ApiAutoCompleteAddress[]>([])
    const [search, setSearch] = useState<string>("")
    const dispatch = useAppDispatch();

    const fillAutocomplete = async (value: string): Promise<void> => {
        try {
            setSearch(value)
            const data = await addressService.getAddressByAutoComplete(value)
            setAutoCompleteList(data)
        } catch (error) {
            const { message } = error as Error
            dispatch(addNotification({ message, notificationType: NotificationType.error }));
        }
    }

    const saveFullAddress = async (id: string): Promise<void> => {
        try {
            const address = await addressService.getAddressById(id)
            dispatch(addAddress(address))
            dispatch(addNotification({ message: "Address Added", notificationType: NotificationType.success }));
        } catch (error) {
            const { message } = error as Error
            dispatch(addNotification({ message, notificationType: NotificationType.error }));
        }
        setAutoCompleteList([])
        setSearch("")
    }


    return (
        <>
            <Autocomplete {...{ autoCompleteList, saveFullAddress, search, onChange: (e) => fillAutocomplete(e.target.value) }} />
        </>

    );
}


export default AutocompleteContainer;