import { useReactToPrint } from "react-to-print";
import { useEffect , useState , useRef } from "react";
import { FetchCustomerList, RemoveCustomer } from "../redux/actions/Customer"
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import { connect } from "react-redux"

function CustomerListing(props) {
    const componentPDF = useRef();

    useEffect(() => {
        props.loadcustomer();
      }, []);
    
      const handleDelete = (code) => {
        if (window.confirm(`Remove customer ${code} ?`)) {
          props.removecustomer(code);
          props.loadcustomer();
          toast.success("Customer removed successfully");
        }
      };
      const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Warehouse Item list",
        OnAFterPrint: () => alert("Data saved in PDF"),
      })

    
      return props.customer.loading ? (
        <div>
          <h2>Loading data...</h2>
        </div>
      ) : props.customer.errmessage ? (
        <div>
          <h2>{props.customer.errmessage}</h2>
        </div>
      ) : (
        <div>
          <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
              <h2>Create Customer</h2>
            </div>
            <div className="card-header">
              <Link to={"/customer/add"} className="btn btn-success">
                Create New Customer [+]
              </Link>
            </div>
            <div className="card-body">
            <div ref={componentPDF} style = {{width: "100%"}}>
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>Obj Id</td>
                    <td>Customer Id</td>
                    <td>Customer Name</td>
                    <td>Email</td>
                    <td>Address</td>
                    <td>Date of Birthday</td>
                    <td>Contact Number</td>
                    <td>User Name</td>
                    <td>Password</td>
                  </tr>
                </thead>
                <tbody>
                  {props.customer.customerlist &&
                    props.customer.customerlist.map((item) => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.cusId}</td>
                        <td>{item.cusName}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.dob}</td>
                        <td>{item.conInfo}</td>
                        <td>{item.user}</td>
                        <td>{item.password}</td>
                        
                      </tr>
                    ))}
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
      customer: state.customer,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      loadcustomer: () => dispatch(FetchCustomerList()),
      removecustomer: (code) => dispatch(RemoveCustomer(code)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(CustomerListing);
