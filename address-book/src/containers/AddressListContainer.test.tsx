import React from "react";
import { fireEvent, render } from "@testing-library/react";
import AddressListContainer from "./AddressListContainer";
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { addressList } from "../helpers/mocks";
import { NotificationType } from "../store/modules/reducers/notificationSlice";


describe('AddressListContainer component', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    const initialState = {
        addressList: { value: addressList },
        notification: {
            status: "",
            show: false,
            message: "",
        }
    }
    const mockStore = configureMockStore()

    beforeEach(() => {
        store = mockStore(initialState)
    })
    test("Renders without errors", async () => {
        render(<Provider store={store}><AddressListContainer /></Provider>);
    })

    describe("Component behaviour", () => {

        test("Should dispatch removeAddress with correct address without errors", async () => {
            const { findByTestId } = render(<Provider store={store}><AddressListContainer /></Provider>);
            const address = await findByTestId(`button__${addressList[0].uid}`);
            fireEvent.click(address);
            const actions = store.getActions();
            expect(actions[0].type).toEqual("addressList/removeAddress");
            expect(actions[0].payload).toEqual(addressList[0]);
            expect(actions[1].type).toEqual("notification/addNotification");
            expect(actions[1].payload).toEqual({ message: "Address removed", notificationType: NotificationType.error });
        })
    })


});