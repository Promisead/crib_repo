import React from "react";
import {Link} from 'react-router-dom';
import Typography from "@material-ui/core/Typography"
import "./city.scss"
import { connect } from "react-redux";

const City = (props)=>{
    return(
        <Link className='ccardLink' style={{height:props.height?props.height:200}} to={{pathname:props.user?'/app/search':'/search', search:`${props.link}`}}>
            <div className="ccard">
                <img className="cimage" alt={`explore ${props.name}`}  src={props.image}/>
                <div style={{backgroundColor:props.color}} className="coverlay"> </div>
                    <div style={{position:'absolute',bottom:10,display:'flex',justifyContent:'center', width:'100%'}}>
                        <div style={{width:'90%', margin:'0 auto 20px'}}>
                            <Typography style={{textAlign:'center', color:'#fff', fontSize:'30px',fontWeight:'bold'}} variant="h5">{props.name}</Typography>
                            <Typography style={{ color:'#fff', fontSize:'12px',fontWeight:'bold',zIndex:8}} variant="subtitle1" component="p">{props.description}</Typography>
                        </div>
                    </div>
               
            </div>
        </Link>
    )
}
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps)(City)