import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FetchVehicleList, RemoveVehicle } from "../redux/actions/VehicleAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";


const VehicleList = (props) => {


    let Avehiclecount = 0;
    let Rvehiclecount = 0;
    let Vehiclecount = 0;



    useEffect(() => {
        props.loadvehicle();
    }, []);

    const handleDelete = (code) => {
        if (window.confirm(`Remove task ${code} ?`)) {
            props.removevehicle(code);
            props.loadvehicle();
            toast.success("Vehicle removed successfully");
        }
    };

    return props.vehicle.loading ? (
        <div>
            <h2>Loading data...</h2>
        </div>
    ) : props.vehicle.errmessage ? (
        <div>
            <h2>{props.vehicle.errmessage}</h2>
        </div>
    ) : (
        <div>
            <div className="card">
                <h1>Vehicle</h1>
                <div className="card-header">
                    <Link to={"/vehicle/add"} className="btn btn-success">
                        Create New Vehicle [+]
                    </Link>
                </div>


                {props.vehicle.vehiclelist &&
                    props.vehicle.vehiclelist.map((item) => (
                        <script>
                            {item.vStatus === "Available" ? (Avehiclecount = Avehiclecount + 1) : null}\
                            {item.vStatus === "Repair" ? (Rvehiclecount = Rvehiclecount + 1) : null}
                            {item? (Vehiclecount = Vehiclecount + 1) : null}
                        </script>



                    ))}
                <h3>
                    <span>Available Vehicle Count : {Avehiclecount.toFixed(0)}</span>
                </h3>

                <h3>
                    <span>Repair Vehicle Count : {Rvehiclecount.toFixed(0)}</span>
                </h3>

                <h3>
                    <span>Total Vehicle Count : {Vehiclecount.toFixed(0)}</span>
                </h3>

                <iframe style={({ background: "#FFFFFF" }, { borderradius: "2px" }, { boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })}
                    width="640" height="480" src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645bc348-d3ec-4b31-8b0b-6b93edec8cd0&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>

                <br></br>
                <br></br>
                <br></br>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">

                            <tr>
                                <th>Obj Id</th>
                                <th>Vehicle Type</th>
                                <th>Vehicle NumPlate </th>
                                <th>Vehicle Insurance</th>
                                <th>Vehicle Capacity</th>
                                <th>Vehicle Status</th>
                                <th>Action</th>

                            </tr>
                            <br></br>
                        </thead>
                        <tbody>
                            {props.vehicle.vehiclelist &&
                                props.vehicle.vehiclelist.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.vType}</td>
                                        <td>{item.numPlate}</td>
                                        <td>{item.insurance}</td>
                                        <td>{item.capacity}</td>
                                        <td>{item.vStatus}</td>
                                        <td>
                                            <Link
                                                to={"/vehicle/edit/" + item._id}
                                                className="btn btn-primary"
                                            >
                                                Edit
                                            </Link>{" "}
                                            |
                                            <button
                                                onClick={() => {
                                                    handleDelete(item._id);
                                                }}
                                                className="btn btn-danger"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        vehicle: state.vehicle,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadvehicle: () => dispatch(FetchVehicleList()),
        removevehicle: (code) => dispatch(RemoveVehicle(code)),
    };


}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList)