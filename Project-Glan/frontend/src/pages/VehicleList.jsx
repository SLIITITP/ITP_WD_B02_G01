import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FetchVehicleList, RemoveVehicle } from "../redux/actions/VehicleAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";


const VehicleList = (props) => {
 
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
            <div className="card-header">
              <Link to={"/vehicle/add"} className="btn btn-success">
                Create New Vehicle [+]
              </Link>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>Obj Id</td>
                    <td>Vehicle Type</td>
                    <td>Vehicle NumPlate </td>
                    <td>Vehicle Insurance</td>
                    <td>Vehicle Capacity</td>
                    <td>Vehicle Status</td>
                    <td>Action</td>
                  </tr>
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
                        <td>{item.vStatus }</td>
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

export default connect(mapStateToProps,mapDispatchToProps)  (VehicleList)