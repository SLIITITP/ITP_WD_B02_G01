import { useEffect, useState } from "react";
import { FetchCustomerList, RemoveCustomer } from "../redux/actions/Customer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import Header_bar from "../components/Header_bar/Header_bar";
import "../pages/Content.css"
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



function CustomerListing(props) {

    let Customercount = 0;



    const [searchTerm, setSearchTerm] = useState("");

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
            <div>  <Header_bar
                fun1="Dashboard"
                fun2="Customer"
                fun3="Customer Privilege"
                fun4="Customer Feedback"
                fun5="Purchase History"
                fun6="Notifications"
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
                <t class="sub_header_topic">View Customers</t>
                <Link to="/customer/add" className="page_link">Create</Link>
            </div>
            <div className="Content">



            {props.customer.customerlist &&
                props.customer.customerlist
                    .map((item) => (
                        <script>
                            {item.cusId ? (Customercount = Customercount + 1) : null}

                        </script>

                    ))}

            <h3>
                <span>Customer Count : {Customercount.toFixed(0)}</span>
            </h3>





            <iframe style={({ background: "#FFFFFF" }, { borderradius: "2px" }, { boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })}
                width="640" height="480" src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645cab76-3392-4704-8753-33e78c48732a&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>







            
                <Table striped hover className="table">
                    <thead className="theader">
                        <tr>
                            <th>Object ID</th>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Date of Birthday</th>
                            <th>Contact Number</th>
                            <th>User Name</th>
                            
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {props.customer.customerlist &&
                            props.customer.customerlist
                                .filter((item) =>
                                    item.cusName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    item.cusId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    item.dob.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((item) => (
                                    <tr key={item._id}>
                                        <td className="nowrap">{item._id}</td>
                                        <td>{item.cusId}</td>
                                        <td>{item.cusName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.conInfo}</td>
                                        <td>{item.user}</td>
                                        
                                    </tr>
                                ))}
                    </tbody>
                </Table>
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
