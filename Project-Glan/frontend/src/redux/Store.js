import { configureStore, combineReducers } from "@reduxjs/toolkit";
import TaskReducer from "./reducers/taskReducers";
import ItemReducer from "./reducers/itemReducers";
import CustomerReducer from "./reducers/customerReducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootreducer = combineReducers({ task: TaskReducer, item: ItemReducer, customer: CustomerReducer });
const Store = configureStore({
    reducer: rootreducer,
    middleware: [thunk, logger],
});

export default Store;