import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CreateTask } from "../redux/actions/TaskAction";

const AddTask = () => {
  const [tId, setId] = useState("");
  const [iName, setIname] = useState("");
  const [iQty, setIqty] = useState("");
  const [prodSupe, setProdSupe] = useState("");
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [tState, setTState] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskobj = { tId, iName, iQty, prodSupe, sDate, eDate ,tState};
    dispatch(CreateTask(taskobj));
    navigate("/task");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Add user</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Task Id :</label>
                  <input
                    className="form-control"
                    value={tId}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Output Item Name :</label>
                  <input
                    className="form-control"
                    value={iName}
                    onChange={(e) => setIname(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Output Item Quantity :</label>
                  <input
                    className="form-control"
                    value={iQty}
                    onChange={(e) => setIqty(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Production Supervisor :</label>
                  <input
                    className="form-control"
                    value={prodSupe}
                    onChange={(e) => setProdSupe(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Start Date :</label>
                  <input
                    className="form-control"
                    value={sDate}
                    onChange={(e) => setSDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>End Date :</label>
                  <input
                    className="form-control"
                    value={eDate}
                    onChange={(e) => setEDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Task Status :</label>
                  <input
                    className="form-control"
                    value={tState}
                    onChange={(e) => setTState(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to={"/task"} className="btn btn-danger">
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
