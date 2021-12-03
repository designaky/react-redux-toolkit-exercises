import React from "react";
import { fireEvent, render } from "@testing-library/react";
import AddressForm from "./AddressForm";
import { countries } from "../../helpers/countries"

describe('AddressForm component', () => {
  const formData = {
    line_1: "",
    line_2: "",
    line_3: "",
    postcode: "",
    town: "",
    country: ""
  }
  const data = countries
  const handleChange = jest.fn()
  const handleSubmit = jest.fn()

  const props = {
    formData, data, handleChange, handleSubmit
  }


  test("Renders without errors", () => {
    render(<AddressForm {...props} />);
  })

  test("Should allow entering of values", async () => {
    const { findByTestId } = render(<AddressForm {...props} />);
    const line_1 = await findByTestId("line_1");
    fireEvent.change(line_1, { target: { value: "test" } });
    expect(props.handleChange).toHaveBeenCalled();
  });

  test("Should have all the country options", async () => {
    const { findAllByTestId } = render(<AddressForm {...props} />);
    const option = await findAllByTestId("country-option");
    expect(option.length).toEqual(249);
  });

  test("Should call the submit handler on click of the add address button", () => {
    const { getByText } = render(<AddressForm {...props} />);
    const addAddressBtn = getByText(/Add address/i);
    fireEvent.click(addAddressBtn);
    expect(props.handleSubmit).toHaveBeenCalled();
  });

});
