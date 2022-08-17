import React from 'react'
import './splash.css'
import {CircularProgress} from "@material-ui/core"

const Activity = ({loading})=>{
    return(
        <>
            {
                loading&&
                <div className="loading">
                    <CircularProgress />
                </div>
            }
        </>
    )
}
export default Activity;