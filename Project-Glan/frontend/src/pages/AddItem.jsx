import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AddItem } from "../redux/actions/ItemActions";

const Additem = () => {
  const [itemcode, setitemcode] = useState("");
  const [itemname, setitemname] = useState("");
  const [unitprice, setunitprice] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [itemimage, setitemimage] = useState("");
  const [itemdescript, setitemdescript] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const itemobj = {
      itemcode,
      itemname,
      unitprice,
      quantity,
      itemimage,
      itemdescript,
    };
    dispatch(AddItem(itemobj));
    navigate("/ItemDashboard");
  };

  return (
    <div>
      <div className="Content">
        <h1>Additem</h1>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <lable className="form-group label">Item Code : </lable>
              <input
                type="text"
                className="form-group text"
                id="itemcode"
                name="itemcode"
                value={itemcode}
                placeholder="Enter item code"
                required
                onChange={(e) => setitemcode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <lable className="form-group label">Item Name : </lable>
              <input
                type="text"
                className="form-group text"
                id="itemname"
                name="itemname"
                value={itemname}
                placeholder="Enter item name"
                required
                onChange={(e) => setitemname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <lable className="form-group label">Unit Price : </lable>
              <input
                type="text"
                className="form-group text"
                id="unitprice"
                name="unitprice"
                required
                value={unitprice}
                placeholder="Enter unit price"
                onChange={(e) => setunitprice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <lable className="form-group label">quantity : </lable>
              <input
                type="text"
                className="form-group text"
                id="quantity"
                name="quantity"
                required
                value={quantity}
                placeholder="Enter quantity"
                onChange={(e) => setquantity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <lable className="form-group label">item image : </lable>
              <input
                type="file"
                className="form-group image"
                id="itemimage"
                name="itemimage"
                value={itemimage}
                onChange={(e) => setitemimage(e.target.value)}
              />
            </div>
            <div className="form-group">
              <lable className="form-group label">item description : </lable>
              <input
                type="textarea"
                className="form-group textareas"
                id="itemdescript"
                name="itemdescript"
                value={itemdescript}
                onChange={(e) => setitemdescript(e.target.value)}
              />
            </div>
            <button type="submit" className="submit">
              Submit
            </button>
            <Link
              to={"/ItemDashboard"}
              style={{ textDecoration: "none" }}
              className="clear"
            >
              Back
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Additem;
