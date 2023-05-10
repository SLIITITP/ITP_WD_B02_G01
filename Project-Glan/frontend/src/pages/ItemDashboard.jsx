import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchItemList, RemoveItem } from "../redux/actions/ItemActions";

const ItemListing = (props) => {
  let lowquant = 0;
  let totalquant = 0;
  let totalexpens = 0;

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
        {props.Item.itemlists &&
          props.Item.itemlists.map((iitem) => (
            <script>
              {iitem.quantity == 0 ? (lowquant = lowquant + 1) : null}
              {iitem.quantity
                ? (totalquant = totalquant + iitem.quantity)
                : null}
              {iitem.quantity && iitem.unitprice
                ? (totalexpens = totalexpens + iitem.quantity * iitem.unitprice)
                : null}
            </script>
          ))}
        <h3>
          <span>Outof Stock Count : {lowquant.toFixed(0)}</span>
        </h3>
        <h3>
          <span>Total Quantity Count : {totalquant.toFixed(0)}</span>
        </h3>
        <h3>
          <span>Total Stock Value : {totalexpens.toFixed(0)}</span>
        </h3>

        <iframe
          style={
            ({ background: "#FFFFFF" },
            { borderradius: "2px" },
            { boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })
          }
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645ba979-9cc7-41f7-86ab-3ce8be56e10a&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>

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
