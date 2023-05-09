import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FetchInvoiceObj } from '../redux/actions/InvoiceAction';
import { FunctionUpdateInvoice } from '../redux/actions/InvoiceAction';

function UpdateInv() {
  const [_id, idchange] = useState(0);
  const [inCode, InCodechange] = useState('');
  const [iName, InNamechange] = useState('');
  const [Qty, Qtychange] = useState('');
  const [unitP, UnPricechange] = useState('');
  const [itDis, ItDischange] = useState('');
  const [Tot, Totchange] = useState('');
  const [subTot, SubTotchange] = useState('');
  const [inDis, InDischange] = useState('');
  const [netTot, NetTotchange] = useState('');
  const [crDate, CrDatechange] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();

  const invoiceobj = useSelector((state) => state.invoice.invoiceobj)

  const handlesubmit = (e) => {
    e.preventDefault();
  const invoiceobj = { _id, inCode, iName, unitP,itDis, Tot, subTot, inDis,netTot,crDate  }
    dispatch(FunctionUpdateInvoice(invoiceobj, _id));
    navigate('/invoice');

  }
  useEffect(() => {
    dispatch(FetchInvoiceObj(code))
  }, [])

  useEffect(() => {
    if (invoiceobj) {
      idchange(invoiceobj._id);
      InCodechange(invoiceobj.inCode);
      InNamechange(invoiceobj.iName);
      Qtychange(invoiceobj.Qty);
      UnPricechange(invoiceobj.unitP);
      ItDischange(invoiceobj.itDis);
      Totchange(invoiceobj.Tot);
      SubTotchange(invoiceobj.Tot);
      InDischange(invoiceobj.subTot);
      NetTotchange(invoiceobj.inDis);
      CrDatechange(invoiceobj.inDis);
    }
  }, [invoiceobj])

  return (
    <div>
      <div>
        <h1>Update Invoice</h1>
      </div>
      <form onSubmit={handlesubmit} >
        <div>

          <lable>
            Id:
            <input type="text" name="id" value={_id || ''} disabled="disabled" ></input>
          </lable><br />

          <lable>
            Invoice Code:
            <input type="text" name="InCode" value={inCode || ''} onChange={e => InCodechange(e.target.value)}></input>
          </lable><br />

          <lable>
            Invoice Name:
            <input type="text" name="InName" value={iName || ''} onChange={e => InNamechange(e.target.value)}></input>
          </lable><br />

          <lable>
            Quantity:
            <input type="text" name="Qty" value={Qty || ''} onChange={e => Qtychange(e.target.value)}></input>
          </lable><br />
          <lable>
            Unit Price:
            <input type="text" name="UnPrice" value={ unitP|| ''} onChange={e => UnPricechange(e.target.value)}></input>
          </lable><br />

          <lable>
            Item Discount:
            <input type="text" name="ItDis" value={itDis || ''} onChange={e => ItDischange(e.target.value)}></input>
          </lable><br />

          <lable>
            Total:
            <input type="text" name="Tot" value={Tot || ''} onChange={e => Totchange(e.target.value)}></input>
          </lable><br />

          <lable>
            Sub Total:
            <input type="text" name="SubTot" value={subTot || ''} onChange={e => SubTotchange(e.target.value)} ></input>
          </lable><br />

          <lable>
            Invoice Discount:
            <input type="text" name="InDis" value={inDis || ''} onChange={e => InDischange(e.target.value)}></input>
          </lable><br />

          <lable>
            Net Total:
            <input type="text" name="NetTot" value={netTot || ''} onChange={e => NetTotchange(e.target.value)}></input>
          </lable><br />

          <lable>
            Create Date:
            <input type="text" name="CrDate" value={crDate || ''} onChange={e => CrDatechange(e.target.value)}></input>
          </lable><br />
        </div>
        <div>
          <button type="submit">Submit</button>
          <Link to={'/invoice'}>Back</Link>
        </div>
      </form>

    </div>

  )
}

export default UpdateInv