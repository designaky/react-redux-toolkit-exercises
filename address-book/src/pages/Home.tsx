import React, { useState } from "react";
import AutocompleteContainer from "../containers/AutocompleteContainer";
import AddressFormContainer from "../containers/AddressFormContainer";
import AddressListContainer from "../containers/AddressListContainer";
import NotificationContainer from "../containers/NotificationContainer";


const Home = () => {
    const [search, setSearch] = useState(true)
    return (
        <div className="home">
            <h1>Address Book</h1>
            <NotificationContainer />
            {search ? <AutocompleteContainer /> : <AddressFormContainer />}
            <button className="home-button base-button" onClick={() => { setSearch(!search) }}>{search ? "Add manually" : "Search it"}</button>
            <AddressListContainer />
        </div>
    );
}


export default Home;