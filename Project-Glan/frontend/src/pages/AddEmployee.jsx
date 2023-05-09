import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CreateEmp } from "../redux/actions/employeeAction";

const AddEmployee = () => {
    const [empId, setempId] = useState('');
    const [Name, setName] = useState('');
    const [nic, setNic] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const empobj = { empId, Name, nic, dob, address, contactInfo };
        dispatch(CreateEmp(empobj));
        navigate('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: "left" }}>
                        <h2>Add New Employee</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: "left" }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Employee Id :</label>
                                    <input className="form-control" value={empId} onChange={e => setempId(e.target.value)} />
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

export default AddEmployee