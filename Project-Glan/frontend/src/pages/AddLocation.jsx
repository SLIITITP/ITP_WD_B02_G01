import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CreateLocation } from "../redux/actions/LocationAction";

const AddLocation = () => {
  const [itemID , setitemID] = useState('');
  const [itemName, setitemName] = useState('');
  const [area, setarea] = useState('');
  const [Qty, setQty] = useState();
  const [Category, setCategory] = useState('');
  const [Description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const locationobj = { itemID, itemName, area, Qty, Category, Description };
    dispatch(CreateLocation(locationobj));
    navigate('/location');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Add Location</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Item Id :</label>
                  <input className="form-control" value={itemID} onChange={e => setitemID(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Enter new Item Name :</label>
                  <input className="form-control" value={itemName} onChange={e => setitemName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Enter new Item Area :</label>
                  <input className="form-control" value={area} onChange={e => setarea(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Enter new item quantity :</label>
                  <input className="form-control" value={Qty} onChange={e => setQty(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Enter new item Category :</label>
                  <input className="form-control" value={Category} onChange={e => setCategory(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Enter new Description :</label>
                  <input className="form-control" value={Description} onChange={e => setDescription(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to={'/task'} className="btn btn-danger">Back</Link>

          </div>
        </div>
      </form>
    </div>
  );
}

export default AddLocation;
