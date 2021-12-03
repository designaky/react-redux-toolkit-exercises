import React from "react";
import "./AddressForm.css"

export interface AddressFormData {
    [line_1: string]: string,
    line_2: string,
    line_3: string,
    postcode: string,
    town: string,
    country: string
}

export interface AddressFormI {
    formData: AddressFormData,
    data: string[],
    handleChange: React.ChangeEventHandler<HTMLInputElement>,
    handleSubmit: React.FormEventHandler<HTMLFormElement>
}

const AddressForm = ({ formData, data, handleChange, handleSubmit }: AddressFormI) => {
    return (
        <div>
            <form className="add-address-form" onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="line_1">Address Line 1: </label>
                    <input data-testid="line_1" type="text" name="line_1" id="line_1" value={formData.line_1} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="line_2">Address Line 2: </label>
                    <input data-testid="line_2" type="text" name="line_2" id="line_2" value={formData.line_2} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="line_3">Address Line 3: </label>
                    <input data-testid="line_3" type="text" name="line_3" id="line_3" value={formData.line_3} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="postcode">Postcode: </label>
                    <input data-testid="postcode" type="text" name="postcode" id="postcode" value={formData.postcode} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="town">Town: </label>
                    <input data-testid="town" type="text" name="town" id="town" value={formData.town} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="country">Country: </label>
                    <input data-testid="country" type="text" name="country" id="country" list="country-list" value={formData.country} onChange={handleChange} required />
                    <datalist id="country-list">
                        {data.map((country, index) => <option data-testid='country-option' key={index} value={country} />)}
                    </datalist>
                </div>
                <button>Add address</button>
            </form>
        </div>

    );
}


export default AddressForm