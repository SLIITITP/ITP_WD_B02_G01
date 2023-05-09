import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchLocationObj, LocationUpdate } from "../redux/actions/LocationAction";


const UpdateLocation = () => {
    const [_id, set_id] = useState(0);
    const [itemID, setitemID] = useState(0);
    const [itemName, setitemName] = useState('');
    const [area, setarea] = useState('');
    const [Qty, setQty] = useState('');
    const [Category, setCategory] = useState('');
    const [Description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { code } = useParams();

    const locationobj = useSelector((state) => state.location.locationobj);

    useEffect(() => {
        dispatch(FetchLocationObj(code))
    }, []);

    useEffect(() => {
        if (locationobj) {
            set_id(locationobj._id)
            setitemID(locationobj.itemID);
            setitemName(locationobj.itemName);
            setarea(locationobj.area);
            setQty(locationobj.Qty);
            setCategory(locationobj.Category);
            setDescription(locationobj.Description);
        }
    }, [locationobj]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const locationobj = {_id, itemID, itemName, area, Qty, Category, Description };
        dispatch(LocationUpdate(_id, locationobj));
        navigate('/location');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-header" style={{ textAlign: "left" }}>
                        <h2>Update Location</h2>
                    </div>
                    <div className="card-body" style={{ textAlign: "left" }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>object Id :</label>
                                    <input className="form-control" value={_id || ''} disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Location Id :</label>
                                    <input className="form-control" value={itemID || ''} disabled="disabled" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Output Item Name :</label>
                                    <input className="form-control" value={itemName || ''} onChange={e => setitemName(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Output Item Area :</label>
                                    <input className="form-control" value={area || ''} onChange={e => setarea(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Output item quantity :</label>
                                    <input className="form-control" value={Qty || ''} onChange={e => setQty(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Output item Category :</label>
                                    <input className="form-control" value={Category || ''} onChange={e => setCategory(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>item Description :</label>
                                    <input className="form-control" value={Description || ''} onChange={e => setDescription(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: "left" }}>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to={'/location'} className="btn btn-danger">Back</Link>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdateLocation;