import { connect } from "react-redux";
import { FetchEmpList, RemoveEmp } from "../redux/actions/employeeAction"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header_bar_emp from "../components/Header_bar/Header_bar_emp";
import "../pages/Content.css"
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



const EmployeeTable = (props) => {

    let Employeecount = 0;

    const [searchTerm, setSearchTerm] = useState("");

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
                    <div>  <Header_bar_emp
                        fun1="Dashboard"
                        fun2="Employee"
                        fun7="Report" />
                    </div>
                    <div className="search">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><BiSearchAlt /></InputGroup.Text>
                            <Form.Control
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </div>

                    <div class="page_sub_header">
                        <t class="sub_header_topic">View Employees</t>
                        <Link to="/emp/add" className="page_link">Create</Link>
                    </div>
                    <div className="Content">


                    {props.emp.empList && props.emp.empList
                        .map((item) => (
                            <script>
                                {item._id? (Employeecount = Employeecount + 1) : null}

                            </script>



                        ))}

                    <h3>
                        <span>Employee Count : {Employeecount.toFixed(0)}</span>
                    </h3>



                    <iframe style={({background: "#FFFFFF"},{borderradius: "2px"},{boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"})} 
                    width="640" height="480" src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645cba57-4455-4993-87df-be9c451c01ed&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>




                    
                        <Table striped hover className="table">
                            <thead className="theader">
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
                            <tbody className="tbody">
                                {props.emp.empList && props.emp.empList
                                    .filter((item) =>
                                        item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.address.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map(item =>
                                        <tr key={item._id}>
                                            <td className="nowrap">{item._id}</td>
                                            <td>{item.empId}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.nic}</td>
                                            <td>{item.dob}</td>
                                            <td>{item.address}</td>
                                            <td>{item.contactInfo}</td>
                                            
                                              
                                        </tr>
                                    )}
                            </tbody>
                        </Table>
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
