import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";


describe('Search component', () => {
    test("Renders without errors", () => {
        render(<BrowserRouter><NavBar /></BrowserRouter>);
    });
});
