import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchItemList, RemoveItem } from "../redux/actions/ItemActions";

const ItemListing = (props) => {
  useEffect(() => {
    props.loaditem();
  }, []);
  const handleDelete = (code) => {
    if (window.confirm("Remove item ?")) {
      props.removeitem(code);
      props.loaditem();
      toast.success("Item remove successfully");
    }
  };

  return props.Item.loading ? (
    <div>
      <h2>Loading data...</h2>
    </div>
  ) : props.Item.errmessage ? (
    <div>
      <h2>{props.Item.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div className="Content">
        <h1>Item Dashboard</h1>
        <Link
          to={"/AddItem"}
          style={{ textDecoration: "none" }}
          className="clear"
        >
          ADD ITEM
        </Link>
        <br></br>
        <br></br>
        <br></br>
        <table class="table table-dark table-borderless">
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
          <tbody>
            {props.Item.itemlists &&
              props.Item.itemlists.map((iitem) => (
                <tr key={iitem._id}>
                  <td>{iitem.itemcode}</td>
                  <td>{iitem.itemname}</td>
                  <td>{iitem.unitprice}</td>
                  <td>{iitem.quantity}</td>
                  <td>
                    <Link
                      to={"/UpdateItem/" + iitem._id}
                      style={{ textDecoration: "none" }}
                      className="update "
                    >
                      Edit
                    </Link>
                    <button
                      className="delete "
                      onClick={() => {
                        handleDelete(iitem._id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    Item: state.Item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loaditem: () => dispatch(FetchItemList()),
    removeitem: (code) => dispatch(RemoveItem(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListing);
