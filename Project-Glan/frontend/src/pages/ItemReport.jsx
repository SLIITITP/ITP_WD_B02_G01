import React, { useEffect, useRef } from "react";

// npm install react-to-print (please install)
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FetchItemList } from "../redux/actions/ItemActions";

const ItemListing = (props) => {
  const conponentPDF = useRef();
  useEffect(() => {
    props.loaditem();
  }, []);

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "itemlists",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return props.Item.loading ? (
    <div>
      <h2>Loading data...</h2>
    </div>
  ) : props.Item.errmessage ? (
    <div>
      <h2>{props.Item.errmessage}</h2>
    </div>
  ) : (
    <React.Fragment>
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
          <div ref={conponentPDF} style={{ width: "100%" }}>
            <table class="table table-dark table-borderless">
              <tr>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
              </tr>
              <tbody>
                {props.Item.itemlists &&
                  props.Item.itemlists.map((iitem) => (
                    <tr key={iitem._id}>
                      <td>{iitem.itemcode}</td>
                      <td>{iitem.itemname}</td>
                      <td>{iitem.unitprice}</td>
                      <td>{iitem.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-success" onClick={generatePDF}>
            PDF
          </button>
        </div>
      </div>
    </React.Fragment>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListing);
