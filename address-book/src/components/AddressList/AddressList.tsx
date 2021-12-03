import React from "react";
import { Address } from "../../models/address";
import "./AddressList.css"


export interface AddressListI { addressList: Address[], onClick: (address: Address) => void }
const AddressList = ({ addressList, onClick }: AddressListI) => {

    return (
        <div className="address-list">
            <ul className="address-list__wrapper">
                {addressList.map((address) => {
                    return (
                        <li className="address-list__element" data-testid={address.uid} key={address.uid} >
                            <p><span>Address Line: </span>{address.formatted_address.join(" ")}</p>
                            <p><span>Postcode: </span>{address.postcode}</p>
                            <p><span>Town: </span>{address.town_or_city}</p>
                            <p><span>Country: </span>{address.country}</p>
                            <button data-testid={`button__${address.uid}`} onClick={() => onClick(address)} >Delete Address</button>
                        </li>
                    )
                })}
            </ul>
        </div>

    );
}


export default AddressList;