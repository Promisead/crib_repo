import React from 'react'
import {
    Dialog,
    DialogContent,
    Slide,
    DialogTitle,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const PopUP = ({open, handleClose, summary,onReserved})=>{
        const date = new Date()
        const getMonth = (date) => {

            const d = new Date(date);
            return d.toLocaleString('default', { month: 'short' }) + ' '+ d.getDate();
        };
        const accumulate = Number(summary.amount)*summary.nights;
        const systemFee = 0.10*accumulate
        const tax = 0.004*accumulate
        const ownerFee = 500;
        const total = accumulate +systemFee+tax+ownerFee;
        const refund = 0.15*accumulate
        
    return(
        <Dialog
        id="popup"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>handleClose()}
        aria-labelledby="detail-title"
        aria-describedby="details"
        >
        <DialogTitle id="detail-title">{"Summary"}</DialogTitle>
        <DialogContent>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <p>Check In</p>
                            <p>{getMonth(summary.checkIn)}</p>
                        </td>
                        <td>
                            <p>Check Out</p>
                            <p>{getMonth(summary.checkOut)}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <p>Guests</p>
                            <p>{`${summary.guest} ${Number(summary.guest) === 1?'Guest':'Guests'}(${summary.adult} ${Number(summary.adult) === 1?'Adult':'Adults'}, ${summary.children} ${Number(summary.children) === 1?'Child':'Children'}, ${summary.infant} ${Number(summary.infant) === 1?'Infant':'Infants'} and with ${summary.pet?'pet':'no pet'})`} </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {summary.amount} x {`${summary.nights} ${summary.nights ===1?'night':'nights'}`}
                        </td>
                        <td>
                            {accumulate}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Owner Fees
                        </td>
                        <td>
                            {ownerFee}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Service Fees
                        </td>
                        <td>
                            {systemFee}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tax
                        </td>
                        <td>
                            {tax}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Total
                        </td>
                        <td>
                            {total}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Refundable Damage Deposit
                        </td>
                        <td>
                            {refund}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Total Deposit
                        </td>
                        <td>
                            {total+refund}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>You are to pay <span>₦{total+refund}</span></p>
            <p className="cancel-policy">*Cancellation Policy</p>
            <p>100% refund for cancellation requested by {date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()} at 11:59am(property local time). 50% refund for cancellations requested by {date.getDate()+3+'/'+(date.getMonth()+1)+'/'+date.getFullYear()} at 11:59 (properties local time).</p>
            <div className="summary-btn">
                <button onClick={()=>handleClose()}>Go Back</button>

                    <button onClick={()=>{onReserved({...summary, accumulate:accumulate,total:total,ownerFee:ownerFee,systemFee:systemFee,refund:refund,tax:tax})}}>Make Payment</button>
            </div>
        </DialogContent>
    </Dialog>
    )
}
export default PopUP