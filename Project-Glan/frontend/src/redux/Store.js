import { configureStore, combineReducers } from "@reduxjs/toolkit";
import TaskReducer from "./reducers/taskReducers";
import ItemReducer from "./reducers/itemReducers";
import InvoiceReducer from "./reducers/invoiceReducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootreducer = combineReducers({ task: TaskReducer, Item: ItemReducer ,invoice: InvoiceReducer});
const Store = configureStore({
  reducer: rootreducer,
  middleware: [thunk, logger],
});

export default Store;
