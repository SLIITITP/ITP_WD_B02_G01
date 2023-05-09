import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CreateCustomer } from "../redux/actions/Customer";

function AddCustomer() {
    const [cusId, setcusId] = useState("");
    const [cusName, setcusName] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [dob, setdob] = useState("");
    const [conInfo, setconInfo] = useState("");
    const [user, setuser] = useState("");
    const [password, setpassword] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const customerobj = { cusId, cusName, email,address, dob, conInfo,user,password };
      dispatch(CreateCustomer(customerobj));
      navigate("/viewCustomer");
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header" style={{ textAlign: "left" }}>
              <h2>Create Customer</h2>
            </div>
            <div className="card-body" style={{ textAlign: "left" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Customer Id :</label>
                    <input
                      className="form-control"
                      value={cusId}
                      onChange={(e) => setcusId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Customer Name :</label>
                    <input
                      className="form-control"
                      value={cusName}
                      onChange={(e) => setcusName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Customer Email:</label>
                    <input
                      className="form-control"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Customer Address :</label>
                    <input
                      className="form-control"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Date of birth :</label>
                    <input
                      className="form-control"
                      value={dob}
                      onChange={(e) => setdob(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Mobile Number:</label>
                    <input
                      className="form-control"
                      value={conInfo}
                      onChange={(e) => setconInfo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>User Name :</label>
                    <input
                      className="form-control"
                      value={user}
                      onChange={(e) => setuser(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>User Password :</label>
                    <input
                      className="form-control"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer" style={{ textAlign: "left" }}>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link to={"/viewCustomer"} className="btn btn-danger">
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
}

export default AddCustomer