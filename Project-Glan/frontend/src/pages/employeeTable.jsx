import { connect } from "react-redux";
import { FetchEmpList, RemoveEmp } from "../redux/actions/employeeAction"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const EmployeeTable = (props) => {

  useEffect(() => {
    props.loadEmp();
  }, [])

  const handleDelete = (code) => {
    if (window.confirm("Remove Employee ?")) {
      props.removeEmp(code);
      props.loadEmp();
      toast.success("Employee removed successfully");
    }
  }

  return (

    props.emp.loading ? <div><h2>Loading data...</h2></div> :
      props.emp.errmessage ? <div><h2>{props.emp.errmessage}</h2></div> :

        <div>
          <div>
            <h2>EMPLOYEE LIST</h2>
          </div>
          <div className="card">
            <div className="card-header">
              <Link to={'/emp/add'} className="btn btn-success">Create New Employee [+]</Link>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>code</td>
                    <td>Emp Id</td>
                    <td>Employee Name</td>
                    <td>NIC</td>
                    <td>DOB</td>
                    <td>Address</td>
                    <td>Mobile No</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {props.emp.empList && props.emp.empList.map(item =>
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.empId}</td>
                      <td>{item.Name}</td>
                      <td>{item.nic}</td>
                      <td>{item.dob}</td>
                      <td>{item.address}</td>
                      <td>{item.contactInfo}</td>
                      <td>
                        <Link to={'/emp/edit/' + item._id} className="btn btn-primary">Edit</Link>|
                        <button type="button" onClick={()=>handleDelete(item._id)} className="btn btn-danger">Remove</button>
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
    emp: state.emp
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEmp: () => dispatch(FetchEmpList()),
    removeEmp: (code) => dispatch(RemoveEmp(code))
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);
