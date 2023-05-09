import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CreateVehicle } from "../redux/actions/VehicleAction";


const AddVehicle = () => {
 
    const [vType, setVtype] = useState("");
    const [numPlate, setNumplate] = useState("");
    const [insurance, setInsurance] = useState("");
    const [capacity, setCapacity] = useState("");
    const [vStatus, setVstatus] = useState("");
    
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const vehicleobj = { vType, numPlate, insurance, capacity, vStatus };
      dispatch(CreateVehicle(vehicleobj));
      navigate("/vehicle");
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header" style={{ textAlign: "left" }}>
              <h2>Add user</h2>
            </div>
            <div className="card-body" style={{ textAlign: "left" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Vehicle Type:</label>
                    <input
                      className="form-control"
                      value={vType}
                      onChange={(e) => setVtype(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Vehicle NumPlate :</label>
                    <input
                      className="form-control"
                      value={numPlate}
                      onChange={(e) => setNumplate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Vehicle Insurance :</label>
                    <input
                      className="form-control"
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Vehicle Capacity:</label>
                    <input
                      className="form-control"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Vehicle Status :</label>
                    <input
                      className="form-control"
                      value={vStatus}
                      onChange={(e) => setVstatus(e.target.value)}
                    />
                  </div>
                </div>
              </div>
             
            </div>
            <div className="card-footer" style={{ textAlign: "left" }}>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link to={"/vehicle"} className="btn btn-danger">
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    );

}

export default AddVehicle