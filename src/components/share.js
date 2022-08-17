import React from 'react'
import {
    Dialog,
    DialogContent,
    Slide,
} from '@material-ui/core';
import { Facebook, Twitter,Google } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Share = ({url,triger, close,text})=>{
        
    return(
        <Dialog
        id="share-btn"
        open={triger}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>close()}
        aria-labelledby="detail-title"
        aria-describedby="details"
        >
        <DialogContent>
              <Facebook url={url} />
                <Twitter url={url} shareText={text} />
            <Google url={url} text=''  />
        </DialogContent>
    </Dialog>
    )
}
export default Share