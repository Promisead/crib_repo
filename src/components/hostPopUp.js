import React from 'react'
import {
    Dialog,
    DialogContent,
    Slide,
    Avatar,
    Typography,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import { Rating } from '@material-ui/lab';
import { StarBorder } from '@material-ui/icons';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const HostPopUp = ({triger, close,host})=>{
        
    return(
        <Dialog
        id="host-pop-up"
        open={triger}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>close()}
        aria-labelledby="host-title"
        aria-describedby="host"
        >
        <DialogContent >
            <div style={{display:'grid', justifyContent:'center', alignSelf:'center', marginTop:70}}>

                    <Avatar style={{width:100, height:100, margin:'0 auto'}} src={process.env.REACT_APP_BACKEND_URL+'/'+host.image} alt={host.firstname}/>
                    <Typography style={{display:'flex',alignItems:'center',marginTop:15}}>{host.firstname +' '+ host.lastname}</Typography>
                    <Typography style={{display:'flex',alignItems:'center',marginTop:15}}><MailOutlineIcon/> {host.email}</Typography>
                    <Typography style={{display:'flex',alignItems:'center',marginTop:15}}><PhoneIcon/> {host.phone}</Typography>
                    <Rating
                        disabled
                        name='kls'
                        defaultValue={5}
                        emptyIcon={<StarBorder htmlColor="#fff" fontSize="small" />}
                        style={{ fontSize: 15, color: '#000000', margin: '15px 0' }}
                    />

            </div>
        </DialogContent>
    </Dialog>
    )
}
export default HostPopUp