import React from "react";
import { fireEvent, render, act, screen } from "@testing-library/react";
import AutocompleteContainer from "./AutocompleteContainer";
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { NotificationType } from "../store/modules/reducers/notificationSlice";
import addressService from "../services/addressService";
import { addressList } from "../helpers/mocks";


describe('AutocompleteContainer component', () => {
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

    beforeEach(() => {
        store = mockStore(initialState)
        jest
            .spyOn(addressService, "getAddressByAutoComplete")
            .mockImplementation(() => Promise.resolve([{
                address: "Lon Lwyd Cottage, Lon Lwyd, Pentraeth, Gwynedd",
                id: "ZjY0OTQxZWY1ZjBkNzM2IDI1MDYzNTgxIDYzZWM0MDVhMGQ2MDBmZg==",
                url: "/get/ZjY0OTQxZWY1ZjBkNzM2IDI1MDYzNTgxIDYzZWM0MDVhMGQ2MDBmZg=="
            }]));
        jest
            .spyOn(addressService, "getAddressById")
            .mockImplementation(() => Promise.resolve(addressList[0]));
    })
    test("Renders without errors", async () => {
        render(<Provider store={store}><AutocompleteContainer /></Provider>);
    })

    describe("Component behaviour", () => {

        test("Should set with correct address without errors", async () => {
            const { findByTestId } = render(<Provider store={store}><AutocompleteContainer /></Provider>);
            const searchInput = await findByTestId("autocomplete__input");
            await act(async () => { fireEvent.change(searchInput, { target: { value: "test" } }) });
            expect(searchInput.getAttribute("value")).toBe("test")
            expect(screen.getByRole("listitem").textContent).toBe("Lon Lwyd Cottage, Lon Lwyd, Pentraeth, Gwynedd")
        })
        test("Should dispatch error message if the fetch fails", async () => {
            jest
                .spyOn(addressService, "getAddressByAutoComplete")
                .mockImplementation(() => Promise.reject({ message: "some error" }));
            const { findByTestId } = render(<Provider store={store}><AutocompleteContainer /></Provider>);
            const searchInput = await findByTestId("autocomplete__input");
            await act(async () => { fireEvent.change(searchInput, { target: { value: "test" } }) });

            const actions = store.getActions();
            expect(actions[0].type).toEqual("notification/addNotification");
            expect(actions[0].payload).toEqual({ message: "some error", notificationType: NotificationType.error });
        })
    })
    test("Should dispatch addaddress and addnotification", async () => {
        const { findByTestId } = render(<Provider store={store}><AutocompleteContainer /></Provider>);
        const searchInput = await findByTestId("autocomplete__input");
        await act(async () => { fireEvent.change(searchInput, { target: { value: "test" } }) });
        expect(searchInput.getAttribute("value")).toBe("test")
        await act(async () => { fireEvent.click(screen.getByRole("listitem")) })
        const actions = store.getActions();
        expect(actions[0].type).toEqual("addressList/addAddress");
        expect(actions[0].payload).toEqual(addressList[0]);
        expect(actions[1].type).toEqual("notification/addNotification");
        expect(actions[1].payload).toEqual({ message: "Address Added", notificationType: NotificationType.success });

    })

    test("Should dispatch and error message if it fales getting the address from api", async () => {
        jest
            .spyOn(addressService, "getAddressById")
            .mockImplementation(() => Promise.reject({ message: "some error" }));
        const { findByTestId } = render(<Provider store={store}><AutocompleteContainer /></Provider>);
        const searchInput = await findByTestId("autocomplete__input");
        await act(async () => { fireEvent.change(searchInput, { target: { value: "test" } }) });
        expect(searchInput.getAttribute("value")).toBe("test")
        await act(async () => { fireEvent.click(screen.getByRole("listitem")) })
        const actions = store.getActions();
        expect(actions[0].type).toEqual("notification/addNotification");
        expect(actions[0].payload).toEqual({ message: "some error", notificationType: NotificationType.error });

    })


});
