import { configureStore, combineReducers } from "@reduxjs/toolkit";
import TaskReducer from "./reducers/taskReducers";
import ItemReducer from "./reducers/itemReducers";
import LocationReducer from "./reducers/locationReducers";
import EmployeeReducer from "./reducers/employeeReducer";
import InvoiceReducer from "./reducers/invoiceReducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import VehicleReducer from "./reducers/VehicleReducers";

const rootreducer = combineReducers({
  task: TaskReducer,
  Item: ItemReducer,
  location: LocationReducer,
  emp: EmployeeReducer,
  invoice: InvoiceReducer, vehicle: VehicleReducer
});
const Store = configureStore({
  reducer: rootreducer,
  middleware: [thunk, logger],
});

export default Store;
