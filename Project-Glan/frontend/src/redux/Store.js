import { configureStore, combineReducers } from "@reduxjs/toolkit";
import TaskReducer from "./reducers/taskReducers";
import ItemReducer from "./reducers/itemReducers";
import LocationReducer from "./reducers/locationReducers"
import EmployeeReducer from "./reducers/employeeReducer"

import thunk from "redux-thunk";
import logger from "redux-logger";

const rootreducer = combineReducers({ task: TaskReducer, item: ItemReducer , location: LocationReducer , emp: EmployeeReducer});
const Store = configureStore({
  reducer: rootreducer,
  middleware: [thunk, logger],
});

export default Store;
