import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CustomerUpdate, FetchCustomerObj } from '../redux/actions/Customer';

function UpdateCustomer() {
    const [_id, set_id] = useState(0);
    const [cusId, setcusId] = useState();
    const [cusName, setcusNam] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [dob, setdob] = useState("");
    const [conInfo, setconInfo] = useState("");
    const [user, setuser] = useState("");
    const [password, setpassword] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();
  
    const customerobj = useSelector((state) => state.customer.customerobj);
  
    useEffect(() => {
      dispatch(FetchCustomerObj(code));
    }, []);
  
    useEffect(() => {
      if (customerobj) {
        set_id(customerobj._id);
        setcusId(customerobj.cusId);
        setcusNam(customerobj.cusName);
        setemail(customerobj.email);
        setaddress(customerobj.address);
        setdob(customerobj.dob);
        setconInfo(customerobj.conInfo);
        setuser(customerobj.user);
        setpassword(customerobj.password);
      }
    }, [customerobj]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const customerobj = { _id, cusId, cusName, email, address, dob, conInfo, user, password };
      dispatch(CustomerUpdate(_id, customerobj));
      navigate("/viewCustomer");
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header" style={{ textAlign: "left" }}>
              <h2>Update Customer Details</h2>
            </div>
            <div className="card-body" style={{ textAlign: "left" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Obj Id :</label>
                    <input
                      className="form-control"
                      value={_id || ""}
                      disabled="disabled"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Customer Id :</label>
                    <input
                      className="form-control"
                      value={cusId || ""}
                      disabled="disabled"
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
                      value={cusName || ""}
                      onChange={(e) => setcusNam(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Customer Email :</label>
                    <input
                      className="form-control"
                      value={email || ""}
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
                      value={address || ""}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Date of Birth :</label>
                    <input
                      className="form-control"
                      value={dob || ""}
                      onChange={(e) => setdob(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Mobile Number :</label>
                    <input
                      className="form-control"
                      value={conInfo || ""}
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
                      value={user || ""}
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
                      value={password || ""}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer" style={{ textAlign: "left" }}>
              <button type="submit" className="btn btn-primary">
                Update
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

export default UpdateCustomer