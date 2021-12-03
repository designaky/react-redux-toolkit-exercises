import React, { useState } from "react";
import AddressForm, { AddressFormData } from "../components/AddressForm/AddressForm";
import { countries } from "../helpers/countries";
import addressService from "../services/addressService";
import { useAppDispatch } from '../store/hooks/hooks';
import { addAddress } from "../store/modules/reducers/addressListSlice"
import { addNotification, NotificationType } from "../store/modules/reducers/notificationSlice"



const initialData = {
    line_1: "", line_2: "", line_3: "", postcode: "", town: "", country: "",
}
const AddressFormContainer = () => {
    const [formData, setFormData] = useState<AddressFormData>(initialData)
    const dispatch = useAppDispatch();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value, name } = event.target;
        setFormData((oldValues) => ({ ...oldValues, [name]: value }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const { line_1, line_2, line_3, postcode, town, country } = formData
        const address = addressService.formatAddress(line_1, line_2, line_3, postcode, country, town)
        dispatch(addAddress(address));
        dispatch(addNotification({ message: "Address Added", notificationType: NotificationType.success }));
        setFormData(initialData);
    }

    return (
        <AddressForm {...{ formData, handleChange, handleSubmit, data: countries }} />
    );
}


export default AddressFormContainer