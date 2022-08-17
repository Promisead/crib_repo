import React from "react";
import {Link} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography"
import "./stays.scss"
import { connect } from "react-redux";


const Stays = (props)=>{
    return(
        <Link className="card-link" to={{pathname:props.user?'/app/search':'/search', search:props.link}}>
            <div>
            <div className="scard" style={{height:props.height?props.height:320}} > 
                <CardMedia className="image" image={props.image}/>
                <div  style={{position:'absolute',bottom:10,display:'flex',justifyContent:'center', width:'100%', zIndex:4}}>
                        <div>
                            <Typography style={{textAlign:'center', color:'#fff', fontSize:'31px', fontWeight:'bold', textTransform:'capitalize'}} variant="h5">{props.title}</Typography>
                            <Typography style={{textAlign:'center', color:'#fff', fontSize:'18px', fontWeight:'bold'}} variant="subtitle1" component="p">{props.available} Availbale</Typography>
                        </div>
                    </div>
                <div style={{backgroundColor:props.color}} className="overlay"></div>
            </div>
            </div>
        </Link>
    )
}
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps)(Stays);