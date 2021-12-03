import React from 'react';
import { render, } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import configureStore from 'redux-mock-store'


describe('App component', () => {
  const initialState = {
    addressList: { value: [] },
    notification: {
      status: "",
      show: false,
      message: "",
    }
  }
  const mockStore = configureStore()
  let store;

  test("Renders without errors", () => {
    store = mockStore(initialState)
    render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>);
  })

});

