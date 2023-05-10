import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import { FetchTaskList, RemoveTask } from "../redux/actions/TaskAction";
import { useEffect , useState , useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TaskListing = (props) => {
    const componentPDF = useRef();

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
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Task list",
    OnAFterPrint: () => alert("Data saved in PDF"),
  })

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
        <div className="card-body">
        <div ref={componentPDF} style = {{width: "100%"}}>
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
