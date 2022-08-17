import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import {withStyles} from "@material-ui/core/styles"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PropTypes from "prop-types"
import "./trending.scss"

const styles = ()=>({
    para:{
        fontSize:15,
    },
    para1:{
        fontSize:12,
        marginBottom:7
    },
    image:{
        borderRadius:16,
        height:'65%',
        width:'100%',
        position:'relative'
    },
    overlay:{

    }
})
const Trending = ({classes, color,name, details,favourite, rating})=>{
    const [stars, setStars] = React.useState(0)
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
        <div className="card" >
        <Card className="trending-card" elevation={0}>
            <CardActionArea classes={{root:classes.image}}>
            <div className="overlay" style={{backgroundColor:color}}></div>
                <div className="img">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${details.featuredImage}`}
                            
                            alt={details.name}
                    />
                </div>
                <div style={{zIndex:34, position:'absolute',height:'94%', width:'98%', top:'3%', left:'1%'}}>
                    {

                            favourite?
                            <FavoriteIcon  style={{fontSize:32}} htmlColor="#C8BB00"/>
                            :
                            <FavoriteBorderIcon  style={{fontSize:32}} htmlColor="#fff"/>
                    }
                    <div style={{position:'absolute', bottom:0}}>
                        <Rating
                        name={name}
                        value={stars}
                        precision={0.5}
                        disabled
                        style={{fontSize:20, color:'#fff'}}
                        emptyIcon={<StarBorderIcon htmlColor="#fff" style={{fontSize:20}} />}
                        />
                    </div>
                </div>

                <CardContent>
                    <Typography className={classes.para} style={{fontWeight:'bold'}} variant="h5">{details.title}</Typography>
                    <Typography color="textPrimary" className={classes.para} variant="subtitle1" component="p">{details.name}</Typography>
                    <Typography className={classes.para1} variant="subtitle2" component="p">{details.guest} Sleeps - {details.bedroom} BR - {details.bathroom} BA</Typography>
                    <Typography className={classes.para} style={{fontWeight:'bold',display:'inline', marginRight:10}} variant="h6">‎₦{details.amount}</Typography>
                    <span>
                        avg/night
                    </span>
                </CardContent>
            </CardActionArea>
        </Card>
        </div>
    )
}
export default withStyles(styles)(Trending)

Trending.propTypes={
    rating:PropTypes.array
}
Trending.defaultProps ={
    rating:[]
}