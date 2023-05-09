import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import TaskListing from "./pages/TaskListing";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import ItemDashboard from "./pages/ItemDashboard";
import AddItem from "./pages/AddItem";
import UpdateItem from "./pages/UpdateItem";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task" element={<TaskListing />} />
            <Route path="/task/add" element={<AddTask />} />
            <Route path="/task/edit/:code" element={<UpdateTask />} />
            <Route path="/ItemDashboard" element={<ItemDashboard />} />
            <Route path="/AddItem" element={<AddItem />} />
            <Route path="/UpdateItem/:code" element={<UpdateItem />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
