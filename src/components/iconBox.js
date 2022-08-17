import React from "react";
import { Typography} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"
const styles=()=>({

    image:{
        height:80,
        width:80,
    },
    imageContainer:{
        display:'flex',
        width:'100%',
        justifyContent:'center'
    },
    content:{
        marginBottom:25
    },
})
const IconBox = ({classes,name,image, content})=>{
    return(
        <div className="icon-box" >
            <div className={classes.content}>
                <div className={classes.imageContainer}> 
                    <img className={classes.image} src={image} alt=""/>
                </div>
                <Typography className="text" variant="subtitle1" >{name}</Typography>
                <p className="content">{content}</p>
            </div>
        </div>
    )
}
export default withStyles(styles)(IconBox);