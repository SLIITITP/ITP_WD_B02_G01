import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchEmpObj, empupdate } from "../redux/actions/employeeAction";

const UpdateEmp = () => {
  const [_id, setID] = useState(0);
  const [empId, setempId] = useState('');
  const [Name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {code}=useParams();

  const empobj = useSelector((state)=>state.emp.empobj);

  useEffect(() => {
    dispatch(FetchEmpObj(code));
  }, []);

  useEffect(()=>{
    if(empobj){
      setID(empobj._id);
      setempId(empobj.empId);
      setName(empobj.Name);
      setNic(empobj.nic);
      setDob(empobj.dob);
      setAddress(empobj.address);
      setContactInfo(empobj.contactInfo);
    }
  }, [empobj])

  const handleSubmit = (e) => {
    e.preventDefault();
    const empobj = { _id, empId, Name, nic, dob, address, contactInfo };
    dispatch(empupdate(_id, empobj));
    navigate('/');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Update Employee Details</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
          <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Code :</label>
                  <input className="form-control" value={_id} disabled="disabled" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Employee Id :</label>
                  <input className="form-control" value={empId} disabled="disabled" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Employee Name :</label>
                  <input className="form-control" value={Name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>NIC :</label>
                  <input className="form-control" value={nic} onChange={e => setNic(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Date of Birth :</label>
                  <input className="form-control" value={dob} onChange={e => setDob(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Employee Address :</label>
                  <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Employee Mobile Number :</label>
                  <input className="form-control" value={contactInfo} onChange={e => setContactInfo(e.target.value)} />
                </div>
              </div>
            </div>

          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to={'/'} className="btn btn-danger">Back</Link>

          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateEmp;
