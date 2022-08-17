import React from "react"
import {Grid, Avatar, Typography, Divider} from "@material-ui/core"
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const Review = ({data, number, reviews})=>{
    return(
        <>
        <Grid container spacing={4} alignItems="center">
            <Grid item xs={8}>
                <Rating
                name='kls'
                disabled
                defaultValue={data.stars}
                emptyIcon={<StarBorderIcon fontSize="small" />}
                style={{fontSize:15, color:'#000000', margin:'15px 0'}}
                />
                <span>{' '+data.stars+'/5'}</span>
                <Typography style={{fontWeight:'bold', fontSize:14}}>
                    {data.name}
                </Typography>
                <Typography style={{fontSize:14}}>
                    {data.review}
                </Typography>
                <Typography style={{fontSize:12}} variant="subtitle2" component="small">
                    {new Date(data.createdAt).toDateString()}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Grid container justify="flex-end">
                    {
                        data.image?
                        <Avatar style={{height:60,width:60}} src={process.env.REACT_APP_BACKEND_URL+'/'+data.image} alt= {data.name}/>
                        :
                        <Avatar style={{height:60,width:60}} src={data.image} alt= {data.name}/>
                    }
                </Grid>
            </Grid>
        </Grid>
        {
            reviews.length-1 !== number && <Divider style={{backgroundColor:'#AAAAAA', marginTop:10}}/>
        }
        </>
    )
}
export default Review;