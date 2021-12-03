import React from "react";
import { fireEvent, render } from "@testing-library/react";
import AddressFormContainer from "./AddressFormContainer";
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { NotificationType } from "../store/modules/reducers/notificationSlice";
import addressService from "../services/addressService";


describe('AddressFormContainer component', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    const initialState = {
        addressList: { value: [] },
        notification: {
            status: "",
            show: false,
            message: "",
        }
    }
    const mockStore = configureMockStore()
    const mockAddress = {
        country: "Chile",
        formatted_address: [
            "Address Line",
            "",
            "",
        ],
        line_1: "Address Line",
        line_2: "",
        line_3: "",
        postcode: "Postcode",
        town_or_city: "Town",
        uid: "6e56af98-1463-46f6-a710-c02fc5fc240d",
    }

    beforeEach(() => {
        store = mockStore(initialState)
        jest
            .spyOn(addressService, "formatAddress")
            .mockImplementation(() => mockAddress);
    })
    test("Renders without errors", async () => {
        render(<Provider store={store}><AddressFormContainer /></Provider>);
    })

    describe("Component behaviour", () => {

        test("Should save the address without errors", async () => {
            const { findByTestId, getByText } = render(<Provider store={store}><AddressFormContainer /></Provider>);
            const line_1 = await findByTestId("line_1");
            fireEvent.change(line_1, { target: { value: mockAddress.line_1 } });
            const postcode = await findByTestId("postcode");
            fireEvent.change(postcode, { target: { value: mockAddress.postcode } });
            const town = await findByTestId("town");
            fireEvent.change(town, { target: { value: mockAddress.town_or_city } });
            const country = await findByTestId("country");
            fireEvent.change(country, { target: { value: mockAddress.country } });
            const addAddressBtn = getByText(/Add address/i);
            fireEvent.click(addAddressBtn);
            const actions = store.getActions();
            expect(actions[0].type).toEqual("addressList/addAddress");
            expect(actions[0].payload).toEqual(mockAddress);
            expect(actions[1].type).toEqual("notification/addNotification");
            expect(actions[1].payload).toEqual({ message: "Address Added", notificationType: NotificationType.success });
        })
    })


});








