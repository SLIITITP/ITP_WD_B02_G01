import { connect } from "react-redux";
import { FetchTaskList, RemoveTask } from "../redux/actions/TaskAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TaskListing = (props) => {

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
            <div className="card">
                <div className="card-header">
                    <Link to={"/task/add"} className="btn btn-success">
                        Create New Task [+]
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


                <h3>
                    <span>Active Task Count : {ATaskcount.toFixed(0)}</span>
                </h3>

                <h3>
                    <span>DeActive Task Count : {DTaskcount.toFixed(0)}</span>
                </h3>

                <h3>
                    <span>Total Task Count : {Taskcount.toFixed(0)}</span>
                </h3>

                <iframe style={({background: "#FFFFFF"},{borderradius: "2px"},{boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"})} 
                width="640" height="480" src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645bdf4c-b515-4368-8b67-ba9511d6c2ad&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
               
                <br></br>
                <br></br>
                <br></br>


                <iframe style={({background: "#FFFFFF"},{borderradius: "2px"},{boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"})} 
                width="640" height="480" src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645be2c0-6fa3-4798-85f3-fbce151794a6&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>




                <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Obj Id</td>
                <td>Task Id</td>
                <td>Output Item Name</td>
                <td>Output Item Quantity</td>
                <td>Production Supervisor</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {props.task.tasklist &&
                props.task.tasklist.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.tId}</td>
                    <td>{item.iName}</td>
                    <td>{item.iQty}</td>
                    <td>{item.prodSupe}</td>
                    <td>{item.sDate}</td>
                    <td>{item.eDate}</td>
                    <td>{item.tState}</td>
                    <td>
                      <Link
                        to={"/task/edit/" + item._id}
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
