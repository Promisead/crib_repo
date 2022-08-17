import React from "react"
import "./splash.css"
import {CircularProgress} from "@material-ui/core"

const Splash =()=>{
    return(
        <div style={{backgroundColor:'#fff'}} className='loading'>
            <CircularProgress/>
        </div>
    )
}
export default Splash;