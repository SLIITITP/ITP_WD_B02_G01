import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchTaskObj, TaskUpdate } from "../redux/actions/TaskAction";

const UpdateTask = () => {
  const [_id, set_id] = useState(0);
  const [tId, setId] = useState();
  const [iName, setIname] = useState("");
  const [iQty, setIqty] = useState("");
  const [prodSupe, setProdSupe] = useState("");
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();

  const taskobj = useSelector((state) => state.task.taskobj);

  useEffect(() => {
    dispatch(FetchTaskObj(code));
  }, []);

  useEffect(() => {
    if (taskobj) {
      set_id(taskobj._id);
      setId(taskobj.tId);
      setIname(taskobj.iName);
      setIqty(taskobj.iQty);
      setProdSupe(taskobj.prodSupe);
      setSDate(taskobj.sDate);
      setEDate(taskobj.eDate);
    }
  }, [taskobj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskobj = { _id, tId, iName, iQty, prodSupe, sDate, eDate };
    dispatch(TaskUpdate(_id, taskobj));
    navigate("/task");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Update Task</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Obj Id :</label>
                  <input
                    className="form-control"
                    value={_id || ""}
                    disabled="disabled"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Task Id :</label>
                  <input
                    className="form-control"
                    value={tId || ""}
                    disabled="disabled"
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
                    value={iName || ""}
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
                    value={iQty || ""}
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
                    value={prodSupe || ""}
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
                    value={sDate || ""}
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
                    value={eDate || ""}
                    onChange={(e) => setEDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button type="submit" className="btn btn-primary">
              Update
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

export default UpdateTask;
