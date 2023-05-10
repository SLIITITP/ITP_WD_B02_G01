import {useReactToPrint} from "react-to-print"
import { connect } from "react-redux";
import { FetchLocationList , RemoveLocation } from "../redux/actions/LocationAction"
import { useState, useEffect , useRef } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const LocationListing = (props) => {
    const componentPDF = useRef();

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
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Warehouse Item list",
    OnAFterPrint: () => alert("Data saved in PDF"),
  })

  return (

    props.location.loading ? <div><h2>Loading data...</h2></div> :
      props.location.errmessage ? <div><h2>{props.location.errmessage}</h2></div> :

        <div>
          <div className="card">
            <div className="card-header">
              <Link to={'/location/add'} className="btn btn-success">Create New Task [+]</Link>
            </div>
            <div className="card-body">
            <div ref={componentPDF} style = {{width: "100%"}}>
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
            <button className="btn btn-success" onClick={generatePDF}>PDF Download</button>


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
