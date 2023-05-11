import { connect } from "react-redux";
import { FetchTaskList, RemoveTask } from "../redux/actions/TaskAction";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header_bar_menu from "../components/Header_bar/Header_bar_manu";
import "../pages/Content.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const TaskListing = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  let Taskcount = 0;
  let ATaskcount = 0;
  let DTaskcount = 0;

  useEffect(() => {
    props.loadtask();
  }, []);

  const handleDelete = (code) => {
    if (window.confirm(`Remove task ${code} ?`)) {
      props.removetask(code);
      props.loadtask();
      toast.success("Task removed successfully");
    }
  };

  return props.task.loading ? (
    <div>
      <h2>Loading data...</h2>
    </div>
  ) : props.task.errmessage ? (
    <div>
      <h2>{props.task.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div>
        {" "}
        <Header_bar_menu fun1="Dashboard" fun2="Task" fun7="Report" />
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
        <t class="sub_header_topic">View Tasks</t>
        <Link to="/task/add" className="page_link">
          Create
        </Link>
      </div>

      {props.task.tasklist &&
        props.task.tasklist.map((item) => (
          <script>
            {item.tState === "Active" ? (ATaskcount = ATaskcount + 1) : null}\
            {item.tState === "Deactive" ? (DTaskcount = DTaskcount + 1) : null}
            {item ? (Taskcount = Taskcount + 1) : null}
          </script>
        ))}
      <div className="Content">
        <h3>
          <span>Active Task Count : {ATaskcount.toFixed(0)}</span>
        </h3>

        <h3>
          <span>DeActive Task Count : {DTaskcount.toFixed(0)}</span>
        </h3>

        <h3>
          <span>Total Task Count : {Taskcount.toFixed(0)}</span>
        </h3>

        <iframe
          style={
            ({ background: "#FFFFFF" },
            { borderradius: "2px" },
            { boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })
          }
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645bdf4c-b515-4368-8b67-ba9511d6c2ad&maxDataAge=3600&theme=light&autoRefresh=true"
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
          src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645be2c0-6fa3-4798-85f3-fbce151794a6&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>

        <div className="card-body">
          <Table striped hover className="table">
            <thead className="theaderManuf">
              <tr>
                <td>Obj Id</td>
                <td>Task Id</td>
                <td>Output Item Name</td>
                <td>Output Item Quantity</td>
                <td>Production Supervisor</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody className="tbodyManuf">
              {props.task.tasklist &&
                props.task.tasklist
                  .filter(
                    (item) =>
                      item.tId
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.iName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.sDate
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.prodSupe
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <tr key={item._id}>
                      <td className="nowrap">{item._id}</td>
                      <td>{item.tId}</td>
                      <td>{item.iName}</td>
                      <td>{item.iQty}</td>
                      <td>{item.prodSupe}</td>
                      <td>{item.sDate}</td>
                      <td>{item.eDate}</td>
                      <td>{item.tState}</td>
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
    task: state.task,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadtask: () => dispatch(FetchTaskList()),
    removetask: (code) => dispatch(RemoveTask(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListing);
