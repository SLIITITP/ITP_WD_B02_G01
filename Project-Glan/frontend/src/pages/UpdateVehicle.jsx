import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FetchVehicleObj,VehicleUpdate  } from "../redux/actions/VehicleAction";


const UpdateVehicle = () => {
    const [_id, set_id] = useState(0);
    const [vType, setVtype] = useState("");
    const [numPlate, setNumplate] = useState("");
    const [insurance, setInsurance] = useState("");
    const [capacity, setCapacity] = useState("");
    const [vStatus, setVstatus] = useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();
    const vehicleobj = useSelector((state) => state.vehicle.vehicleobj);
    useEffect(() => {
        dispatch(FetchVehicleObj(code));
    }, []);

    useEffect(() => {

        if (vehicleobj) {

            set_id(vehicleobj._id);

            setVtype(vehicleobj.vType);

            setNumplate(vehicleobj.numPlate);

            setInsurance(vehicleobj.insurance);

            setCapacity(vehicleobj.capacity);

            setVstatus(vehicleobj.vStatus);



        }

    }, [vehicleobj]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const vehicleobj = { _id,vType, numPlate, insurance, capacity, vStatus };
        dispatch(VehicleUpdate(_id,vehicleobj));
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
                                    <label>Vehicle Type:</label>
                                    <input
                                        className="form-control"
                                        value={vType || ""}
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
                                        value={numPlate || ""}
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
                                        value={insurance || ""}
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
                                        value={capacity || ""}
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
                                        value={vStatus || ""}
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

export default UpdateVehicle