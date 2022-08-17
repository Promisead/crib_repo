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
const WithdrawPopUp = ({open, handleClose,children,title,className})=>{
  
    return(
        <Dialog
        id="popup"
        className={className}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>handleClose()}
        aria-labelledby="withdrawal-details"
        aria-describedby="withdrawal"
        >
        <DialogTitle id="detail-title">{title}</DialogTitle>
        <DialogContent>
            <div>{children}</div>
        </DialogContent>
    </Dialog>
    )
}
export default WithdrawPopUp