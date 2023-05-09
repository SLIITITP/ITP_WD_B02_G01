import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import TaskListing from "./pages/TaskListing";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import ItemDashboard from "./pages/ItemDashboard";
import AddItem from "./pages/AddItem";
import UpdateItem from "./pages/UpdateItem";
import CustomerListing from "./pages/CustomerListing";
import AddCustomer from "./pages/AddCustomer";
import UpdateCustomer from "./pages/UpdateCustomer";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task" element={<TaskListing />} />
            <Route path="/task/add" element={<AddTask />} />
            <Route path="/task/edit/:code" element={<UpdateTask />} />
            <Route path="/ItemDashboard" element={<ItemDashboard />} />
            <Route path="/AddItem" element={<AddItem />} />
            <Route path="/UpdateItem/:code" element={<UpdateItem />} />
            <Route path="/customer/add" element={<AddCustomer />} />
            <Route path ="/viewCustomer" element={<CustomerListing/>}/>
            <Route path="/customer/edit/:code" element={<UpdateCustomer />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
