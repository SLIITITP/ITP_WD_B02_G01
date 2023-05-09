import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddInvoice } from "../redux/actions/InvoiceAction";
//import Header_bar from "../components/Header_bar/Header_bar.css";
//import "../pages/Content.css"

function AddInv() {
    const [inCode, iCodechange] = useState('');
    const [iName, iNamechange] = useState('');
    const [Qty, Qtychange] = useState('');
    const [unitP, unitPchange] = useState('');
    const [itDis, itDischange] = useState('');
    const [Tot, Totchange] = useState('');
    const [subTot, subTotchange] = useState('');
    const [inDis, inDischange] = useState('');
    const [netTot, netTotchange] = useState('');
    const [crDate, CrDatechange] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handlesubmit = (e) => {
        e.preventDefault();
        const invoiceobj = { inCode, iName, Qty, unitP, itDis, Tot, subTot, inDis, netTot, crDate }
        dispatch(FunctionAddInvoice(invoiceobj));
        navigate('/invoice');

    }

    return (
        <div>
            
            <div>
                <h1>Add Invoice</h1>
            </div>
            <form onSubmit={handlesubmit} >
                <div>
                    <lable>
                        Invoice Code:
                        <input type="text" name="iCode" value={inCode} onChange={e => iCodechange(e.target.value)}></input>
                    </lable>

                    <lable>
                        Invoice Name:
                        <input type="text" name="iName" value={iName} onChange={e => iNamechange(e.target.value)}></input>
                    </lable>

                    <lable>
                        Quantity:
                        <input type="text" name="Qty" value={Qty} onChange={e => Qtychange(e.target.value)}></input>
                    </lable>

                    <lable>
                        Unit Price:
                        <input type="text" name="unitP" value={unitP} onChange={e => unitPchange(e.target.value)}></input>
                    </lable>

                    <lable>
                        Item Discount:
                        <input type="text" name="itDis" value={itDis} onChange={e => itDischange(e.target.value)}></input>
                    </lable>

                    <lable>
                        Total:
                        <input type="text" name="Tot" value={Tot} onChange={e => Totchange(e.target.value)}></input>
                    </lable>

                    <lable>
                        Sub Total:
                        <input type="text" name="subTot" value={subTot} onChange={e => subTotchange(e.target.value)} ></input>
                    </lable>

                    <lable>
                        Invoice Discount:
                        <input type="text" name="inDis" value={inDis} onChange={e => inDischange(e.target.value)}></input>
                    </lable>

                    <lable>
                        Net Total:
                        <input type="text" name="netTot" value={netTot} onChange={e => netTotchange(e.target.value)}></input>
                    </lable>

                    <lable>
                        Create Date:
                        <input type="text" name="CrDate" value={crDate} onChange={e => CrDatechange(e.target.value)}></input>
                    </lable>
                </div>
                <div>
                    <button type="submit">Submit</button>
                    <Link to={'/invoice'}>Back</Link>
                </div>
            </form>

        </div>

    )
}

export default AddInv