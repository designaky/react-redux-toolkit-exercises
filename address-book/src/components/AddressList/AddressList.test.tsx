import React from "react";
import { fireEvent, render } from "@testing-library/react";
import AddressList, { AddressListI } from "./AddressList";
import { addressList } from "../../helpers/mocks"

describe('AddressList component', () => {
    let props: AddressListI;
    let onClick;

    beforeEach(() => {
        onClick = jest.fn()
        props = {
            addressList, onClick
        }
    })

    test("Renders without errors", () => {
        render(<AddressList {...props} />);
    })

    test("Should display the right text", () => {
        const { getByTestId } = render(<AddressList {...props} />);
        addressList.forEach(address => {
            const addressCard = getByTestId(address.uid);
            expect(addressCard.textContent).toEqual(`Address Line: ${address.formatted_address.join(" ")}Postcode: ${address.postcode}Town: ${address.town_or_city}Country: ${address.country}Delete Address`);

        })
    });

    test("Should call the click handler", () => {
        const { getByTestId } = render(<AddressList {...props} />);
        const address = addressList[0]
        let button = getByTestId(`button__${address.uid}`);
        fireEvent.click(button);
        expect(props.onClick).toHaveBeenCalledTimes(1);
    });

});
