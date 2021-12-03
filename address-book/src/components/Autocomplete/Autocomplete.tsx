import React from "react";
import { ApiAutoCompleteAddress } from "../../models/address";
import "./Autocomplete.css"

export interface SearchI {
    autoCompleteList: ApiAutoCompleteAddress[],
    search: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    saveFullAddress: (id: string) => Promise<void>,
}

const Autocomplete = ({ autoCompleteList, search, onChange, saveFullAddress }: SearchI) => {
    return (
        <div className="autocomplete">
            <input data-testid="autocomplete__input" className="autocomplete__input" type="text" value={search} onChange={onChange} placeholder="search" />
            <ul className="autocomplete__list-container">
                {autoCompleteList.map(({ address, id }) => <li className="autocomplete__list-item" data-testid={id} key={id} onClick={() => saveFullAddress(id)}>{address}</li>)}
            </ul>
        </div>
    );
}


export default Autocomplete;