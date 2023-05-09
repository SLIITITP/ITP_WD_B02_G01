import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchItemObj, UpdateItem } from "../redux/actions/ItemActions";

const Updateitem = () => {
  const [_id, set_id] = useState(0);
  const [itemcode, setitemcode] = useState("");
  const [itemname, setitemname] = useState("");
  const [unitprice, setunitprice] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [itemimage, setitemimage] = useState("");
  const [itemdescript, setitemdescript] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();

  const itemobj = useSelector((state) => state.Item.itemobj);

  useEffect(() => {
    dispatch(FetchItemObj(code));
  }, []);

  useEffect(() => {
    if (itemobj) {
      set_id(itemobj._id);
      setitemcode(itemobj.itemcode);
      setitemname(itemobj.itemname);
      setunitprice(itemobj.unitprice);
      setquantity(itemobj.quantity);
      setitemimage(itemobj.itemimage);
      setitemdescript(itemobj.itemdescript);
    }
  }, [itemobj]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const itemobj = {
      _id,
      itemcode,
      itemname,
      unitprice,
      quantity,
      itemimage,
      itemdescript,
    };
    dispatch(UpdateItem(_id, itemobj));
    navigate("/ItemDashboard");
  };

  return (
    <div>
      <div className="Content">
        <h1>Additem</h1>
        <section className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <lable className="form-group label">Item Code : </lable>
              <input
                type="text"
                className="form-group text"
                id="itemcode"
                name="itemcode"
                value={itemcode}
                placeholder="Enter item code"
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
                value={quantity}
                placeholder="Enter quantity"
                onChange={(e) => setquantity(e.target.value)}
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

export default Updateitem;
