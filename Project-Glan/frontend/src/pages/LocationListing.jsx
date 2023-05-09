import { connect } from "react-redux";
import { FetchLocationList , RemoveLocation } from "../redux/actions/LocationAction"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const LocationListing = (props) => {

  useEffect(() => {
    props.loadlocation();
  },[])

  const handleDelete = (code) => {
    if (window.confirm("Remove item ?")) {
      props.removelocation(code);
      props.loadlocation();
      toast.success("item removed successfully");
    }
  }

  return (

    props.location.loading ? <div><h2>Loading data...</h2></div> :
      props.location.errmessage ? <div><h2>{props.location.errmessage}</h2></div> :

        <div>
          <div className="card">
            <div className="card-header">
              <Link to={'/location/add'} className="btn btn-success">Create New Task [+]</Link>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>Item ID</td>
                    <td>Item Name</td>
                    <td>Item Area</td>
                    <td>Item Quantity</td>
                    <td>Item Category</td>
                    <td>Item Description</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {props.location.locationlists && props.location.locationlists.map(item =>
                    <tr key={item._id}>
                      <td>{item.itemID}</td>
                      <td>{item.itemName}</td>
                      <td>{item.area}</td>
                      <td>{item.Qty}</td>
                      <td>{item.Category}</td>
                      <td>{item.Description}</td>
                      <td>
                        <Link to={'/location/edit/' + item._id} className="btn btn-primary">Edit</Link> |
                        <button onClick={() => { handleDelete(item._id); }} className="btn btn-danger">Remove</button>
                      </td>

                    </tr>
                  )}
                </tbody>
              </table>
            </div>


          </div>

        </div>
  );
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadlocation: () => dispatch(FetchLocationList()),
    removelocation: (code) => dispatch(RemoveLocation(code))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationListing);
