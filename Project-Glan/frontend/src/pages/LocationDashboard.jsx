import { connect } from "react-redux";
import { FetchLocationList, RemoveLocation } from "../redux/actions/LocationAction"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const LocationListing = (props) => {

    let Rawcount = 0;
    let Finicount = 0;
    let Fillcount = 0;
    let Categorycount = 0;

    useEffect(() => {
        props.loadlocation();
    }, []);

    const handleDelete = (code) => {
        if (window.confirm("Remove item ?")) {
            props.removelocation(code);
            props.loadlocation();
            toast.success("item removed successfully");
        }
    };

    return props.location.loading ? (

        <div>
            <h2>Loading data...</h2>
        </div>
    ) : props.location.errmessage ? (
        <div
        ><h2>{props.location.errmessage}</h2>
        </div>
    ) : (

        <div>
            <div className="card">
                <div className="card-header">
                    <Link to={'/location/add'} className="btn btn-success">Create New Task [+]</Link>
                </div>


                {props.location.locationlists &&
                    props.location.locationlists.map((item) => (
                        <script>
                            {item.Category === "raw material" ? (Rawcount = Rawcount + 1) : null}
                            {item.Category === "finished" ? (Finicount = Finicount + 1) : null}
                            {item.Category === "filling" ? (Fillcount = Fillcount + 1) : null}
                            {item ? (Categorycount = Categorycount + 1) : null}
                        </script>
                    ))}


                <h3>
                    <span>raw material Count : {Rawcount.toFixed(0)}</span>
                </h3>

                <h3>
                    <span>	finished products Count : {Finicount.toFixed(0)}</span>
                </h3>

                <h3>
                    <span>filling products Count : {Fillcount.toFixed(0)}</span>
                </h3>



                <iframe style={({ background: "#FFFFFF" }, { borderradius: "2px" }, { boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })}
                    width="640" height="480" src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645c0003-b7c3-4f7e-85a3-de2caa1ca507&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>

                <br></br>
                <br></br>
                <br></br>

                <iframe style={({ background: "#FFFFFF" }, { borderradius: "2px" }, { boxshadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" })}
                    width="640" height="480" src="https://charts.mongodb.com/charts-glaninternational-rccip/embed/charts?id=645c031e-5fd5-4742-8d09-80011a637763&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                <br></br>
                <br></br>
                <br></br>


                <div className="card-body">
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Item ID</td>
                                <td>Item Name</td>
                                <td>Item Area</td>
                                <td>Item Quantity</td>
                                <td>Item Category</td>
                                <td>Item Description</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {props.location.locationlists &&
                                props.location.locationlists.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.itemID}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.area}</td>
                                        <td>{item.Qty}</td>
                                        <td>{item.Category}</td>
                                        <td>{item.Description}</td>
                                        <td>
                                            <Link to={'/location/edit/' + item._id}
                                                className="btn btn-primary"
                                            >Edit
                                            </Link> |
                                            <button
                                                onClick={() => {
                                                    handleDelete(item._id);
                                                }} className="btn btn-danger"
                                            >Remove</button>
                                        </td>

                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>


            </div>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadlocation: () => dispatch(FetchLocationList()),
        removelocation: (code) => dispatch(RemoveLocation(code))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationListing);
