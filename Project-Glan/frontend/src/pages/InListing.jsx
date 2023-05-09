import { useEffect } from 'react';
import { FetchInvoiceList, Removeinvoice } from '../redux/actions/InvoiceAction'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
//import "../components/Header_bar/Header_bar.css"

function InListing(props) {
    useEffect(() => {
        props.loadinvoice();
    }, [])
    const handledelete = (code) => {
        if (window.confirm("Do you want to remove?")) {
            props.removeInvoice(code);
            props.loadinvoice();
        }
    }
    return(
        
        props.invoice.loading ? <div><h2>Loading....</h2></div> :
            props.invoice.errmessage ? <div><h2>{props.invoice.errmessage}</h2></div> :
              <div>
                    <Link to={'/invoice/add'}>Add Invoice</Link>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Invoice Code</th>
                                <th>Invoice Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Item Discount</th>
                                <th>Total</th>
                                <th>Sub Total</th>
                                <th>Invoice Discount</th>
                                <th>Net Total</th>
                                <th>Create Date</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.invoice.invoicelist && props.invoice.invoicelist.map(item =>
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.inCode}</td>
                                        <td>{item.iName}</td>
                                        <td>{item.Qty}</td>
                                        <td>{item.unitP}</td>
                                        <td>{item.itDis}</td>
                                        <td>{item.Tot}</td>
                                        <td>{item.subTot}</td>
                                        <td>{item.inDis}</td>
                                        <td>{item.netTot}</td>
                                        <td>{item.crDate}</td>

                                        <td>
                                            <Link to={'/invoice/edit/' + item._id}>Edit</Link>
                                            <button onClick={() => { handledelete(item._id) }}>Delete</button>

                                        </td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                
    )
}
const mapStateToProps = (state) => {
    return {
        invoice: state.invoice
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadinvoice: () => dispatch(FetchInvoiceList()),
        removeInvoice: (code) => dispatch(Removeinvoice(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InListing);