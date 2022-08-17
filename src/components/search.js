import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import {withStyles} from "@material-ui/core/styles"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Link, withRouter} from "react-router-dom"
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from "react-redux";
import "./search.scss"

const styles = ()=>({
    para:{
        fontSize:15,
        color:'#000000'
    },
    para1:{
        fontSize:12,
        marginBottom:7,
        color:'#000'
    },
    root:{
        borderRadius:16,
        minHeight:220,
        position:'relative',
        display:'flex',
        backgroundColor:'#FCFBFB',
    },
    media:{
        width:'45%',
        height:'100%',
        position: 'absolute',
        left: 0
    }
})
const Search = ({classes, content, rating,name, favourite, user, location})=>{
    const [stars, setStars] = React.useState(0)
    const [labels,] = useState({
        1: ['Mediocre','Not bad at all'],
        2: ['Okey','Good for you'],
        3: ['Good','Popular choice'],
        4: ['Excellent','Exquisite!!'],
        5: ['Excellent','Best for you and family'],
    })
    React.useEffect(()=>{
        let star = 0
        if(rating.length>0){
            rating.forEach(rate=>star += rate.stars)
            setStars(star/rating.length)
        }
        return ()=>{
            setStars(0)
        }
    },[rating])
    return(
    <Link className="s-nav-link" to={{pathname:user?`/app/crib/${content._id}`:`/crib/${content._id}`, state:location.pathname+location.search}}>
        <Card className="fav-search" elevation={3} style={{margin:'15px 0'}} classes={{root:classes.root}}>
            <CardActionArea classes={{root:classes.root}}>
                <div className={classes.media}>
                    <CardMedia image={`${process.env.REACT_APP_BACKEND_URL}/`+content.featuredImage}
                            component="img"
                            alt={content.name}
                            height="100%"
                    />
                <div className="ds-favourite">
                    {
                        favourite?
                        <FavoriteIcon  style={{fontSize:32}} htmlColor="#EB4F1E"/>
                        :
                        <FavoriteBorderIcon  style={{fontSize:32}} htmlColor="#fff"/>
                    }
                </div>
                    <div className="overlays">
                    </div>
                </div>

                <div className="ms-favourite">
                    {
                        favourite?
                        <FavoriteIcon  style={{fontSize:32}} htmlColor="#0066FF"/>
                        :
                        <FavoriteBorderIcon  style={{fontSize:32}} htmlColor="#0066FF"/>
                    }
                </div>   
                <div>
                    <CardContent style={{position:'absolute',left:'45%', top:0}}>
                        <Typography className={classes.para} style={{fontWeight:'bold', textTransform:'capitalize'}} variant="h5">{content.name}</Typography>
                        <Typography  className={classes.para} variant="subtitle1" style={{textTransform:'capitalize'}} component="p">{content.city}, {content.state}, Ng</Typography>
                        <Typography className={classes.para1} style={{marginBottom:30}}  variant="subtitle2" component="p">{content.guest} Guests | {content.bedroom} Bedrooms | {content.bedroom} beds | {content.bathroom} Baths</Typography>
                        <Typography className={classes.para1} variant="subtitle2" component="p">

                        {stars >=1?labels[Math.ceil(stars)][0]:''} {stars > 0?stars.toFixed(2)+'/5 ':'No rating yet'} {stars  >= 1?labels[Math.ceil(stars)][1]:''}
                        </Typography>
                        <Typography>
                            <Rating
                                name={name}
                                value={stars}
                                precision={0.5}
                                disabled
                                style={{fontSize:20, color:'#000000'}}
                                ///getLabelText={(value)=>{console.log(value, props.name)}}
                                emptyIcon={<StarBorderIcon htmlColor="#000000" style={{fontSize:20}} />}
                                />
                        </Typography>
                        
                        <Typography className={classes.para} style={{fontWeight:'bold',display:'inline', marginRight:10}} variant="h6">‎₦{content.amount}</Typography>
                        <span style={{color:'#000000'}}>
                            avg/night
                        </span>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    </Link>
    )
}
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps)(withRouter(withStyles(styles)(Search)))