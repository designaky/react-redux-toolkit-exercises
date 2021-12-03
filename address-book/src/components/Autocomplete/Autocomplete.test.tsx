import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Autocomplete, { SearchI } from "./Autocomplete";
import { ApiAutoCompleteAddress } from "../../models/address";

describe('Autocomplete component', () => {
    let props: SearchI;
    let autoCompleteList: ApiAutoCompleteAddress[], search, onChange, saveFullAddress

    beforeEach(() => {
        saveFullAddress = jest.fn()
        onChange = jest.fn()
        search = ""
        autoCompleteList = []
        props = {
            autoCompleteList, search, onChange, saveFullAddress
        }
    })

    test("Renders without errors", () => {
        render(<Autocomplete {...props} />);
    })

    test("Should allow entering of values in the search input", async () => {
        const { findByTestId } = render(<Autocomplete {...props} />);
        const autoCompleteInput = await findByTestId("autocomplete__input");
        fireEvent.change(autoCompleteInput, { target: { value: "test" } });
        expect(props.onChange).toHaveBeenCalled();
    });

    test("Should call the click handler", async () => {
        props.autoCompleteList = [{
            address: "string",
            url: "string",
            id: "string",
        }]
        const { findByTestId } = render(<Autocomplete {...props} />);
        const autoCompleteInput = await findByTestId(props.autoCompleteList[0].id);
        fireEvent.click(autoCompleteInput);
        expect(props.saveFullAddress).toHaveBeenCalled();
    });



});
