import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CreateTask } from "../redux/actions/TaskAction";
import "../pages/Content.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header_bar_manu from "../components/Header_bar/Header_bar_manu";

const AddTask = () => {
  const [tId, setId] = useState("");
  const [iName, setIname] = useState("");
  const [iQty, setIqty] = useState("");
  const [prodSupe, setProdSupe] = useState("");
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskobj = { tId, iName, iQty, prodSupe, sDate, eDate };
    dispatch(CreateTask(taskobj));
    navigate("/task");
  };

  return (
    <div>
      <div>  <Header_bar_manu 
              fun1="Dashboard"
              fun2="Task"
              fun7="Report"/>
        </div>
        <div className="search">
        </div>
        <div class="page_sub_header">
        <t class="sub_header_topic">Create Task</t>
        </div>
        <div className="ContentForm ">
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <div>
                  <label class="form">Task Id :</label>
                  <input
                    className="form-control"
                    value={tId}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
                <div>
                  <label class="form">Output Item Name :</label>
                  <input
                    className="form-control"
                    value={iName}
                    onChange={(e) => setIname(e.target.value)}
                  />
                </div>
          
                <div >
                  <label class="form">Output Item Quantity :</label>
                  <input
                    className="form-control"
                    value={iQty}
                    onChange={(e) => setIqty(e.target.value)}
                  />
                </div>
             
                <div >
                  <label class="form">Production Supervisor :</label>
                  <input
                    className="form-control"
                    value={prodSupe}
                    onChange={(e) => setProdSupe(e.target.value)}
                  />
                </div>
         
                <div>
                  <label class="form">Start Date :</label>
                  <input
                    className="form-control"
                    value={sDate}
                    onChange={(e) => setSDate(e.target.value)}
                  />
                </div>
             
                <div>
                  <label class="form">End Date :</label>
                  <input
                    className="form-control"
                    value={eDate}
                    onChange={(e) => setEDate(e.target.value)}
                  />
                </div>
              </div>
           <div>
              <button type="submit" className="submit">Submit</button>
              <Link to={"/task"} className="clear">Back</Link>
            </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddTask;
