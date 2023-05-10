import {useReactToPrint} from "react-to-print"
import { connect } from "react-redux";
import { FetchEmpList, RemoveEmp } from "../redux/actions/employeeAction"
import { useEffect , useState , useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const EmployeeTable = (props) => {
    const componentPDF = useRef();

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
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Employee Item list",
    OnAFterPrint: () => alert("Data saved in PDF"),
  })

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
            <div ref={componentPDF} style = {{width: "100%"}}>
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
