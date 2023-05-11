import { connect } from "react-redux";
import {
  FetchLocationList,
  RemoveLocation,
} from "../redux/actions/LocationAction";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header_bar_loc from "../components/Header_bar/Header_bar_loc";
import "../pages/Content.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const LocationListing = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  let Rawcount = 0;
  let Finicount = 0;
  let Fillcount = 0;
  let Categorycount = 0;

  useEffect(() => {
    props.loadlocation();
  }, []);

  const handleDelete = (code) => {
    if (window.confirm("Remove item ?")) {
      props.removelocation(code);
      props.loadlocation();
      toast.success("item removed successfully");
    }
  };

  return props.location.loading ? (
    <div>
      <h2>Loading data...</h2>
    </div>
  ) : props.location.errmessage ? (
    <div>
      <h2>{props.location.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div>
        {" "}
        <Header_bar_loc fun1="Dashboard" fun2="Location" fun7="Report" />
      </div>
      <div className="search">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <BiSearchAlt />
          </InputGroup.Text>
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
        <t class="sub_header_topic">View Locations</t>
        <Link to="/location/add" className="page_link">
          Create
        </Link>
      </div>

      <div className="Content">
        {props.location.locationlists &&
          props.location.locationlists.map((item) => (
            <script>
              {item.Category === "Raw Material"
                ? (Rawcount = Rawcount + 1)
                : null}
              {item.Category === "Finished"
                ? (Finicount = Finicount + 1)
                : null}
              {item.Category === "Filling" ? (Fillcount = Fillcount + 1) : null}
              {item ? (Categorycount = Categorycount + 1) : null}
            </script>
          ))}

        <h3>
          <span>Raw Material Count : {Rawcount.toFixed(0)}</span>
        </h3>

        <h3>
          <span> Finished products Count : {Finicount.toFixed(0)}</span>
        </h3>

        <h3>
          <span>Filling products Count : {Fillcount.toFixed(0)}</span>
        </h3>

        <iframe
          style={
            ({ background: "#FFFFFF" },
            { borderradius: "2px" },
            { boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })
          }
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645c0003-b7c3-4f7e-85a3-de2caa1ca507&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>

        <br></br>
        <br></br>
        <br></br>

        <iframe
          style={
            ({ background: "#FFFFFF" },
            { borderradius: "2px" },
            { boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })
          }
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645c031e-5fd5-4742-8d09-80011a637763&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
        <br></br>
        <br></br>
        <br></br>

        <div className="card-body">
          <Table striped hover className="table">
            <thead className="theader">
              <tr>
                <td>Item ID</td>
                <td>Item Name</td>
                <td>Item Area</td>
                <td>Item Quantity</td>
                <td>Item Category</td>
                <td>Item Description</td>
              </tr>
            </thead>
            <tbody className="tbody">
              {props.location.locationlists &&
                props.location.locationlists
                  .filter(
                    (item) =>
                      item.itemName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.Category.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      )
                  )
                  .map((item) => (
                    <tr key={item._id}>
                      <td>{item.itemID}</td>
                      <td>{item.itemName}</td>
                      <td>{item.area}</td>
                      <td>{item.Qty}</td>
                      <td>{item.Category}</td>
                      <td>{item.Description}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    location: state.location,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadlocation: () => dispatch(FetchLocationList()),
    removelocation: (code) => dispatch(RemoveLocation(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationListing);
