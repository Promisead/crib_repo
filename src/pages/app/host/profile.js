import React from "react";
import {Link} from "react-router-dom"
import "./../inbox.css"
import "./../properties.css"
// import "./../add-property.css"
import "./../profile.css"

import Backend from "./../layout"
import { Grid, Typography,withStyles, IconButton, Avatar } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {connect} from "react-redux";
import AppHeader from "../../../components/appHeader"
import { setUser } from "../../../state/actions";
import { uploadProfileImage } from "../../../apis/server";
import Activity from "../../../components/activity";
import Seo from "../../../components/seo";


const ProfileDetails = ({user,uploadImage})=>{
    return(
        <div  className="profiles">
        {/* <div className="inbox-head dashboard-mt">
            <div className="inbox-title">
                <h4>Profile</h4>
            </div>
        </div> */}

        <div className="profile">
            <div className="profile-img">
                {
                    user.image?
                    <img id="img" src={process.env.REACT_APP_BACKEND_URL+'/'+user.image} alt={user.firstname} />
                    :
                    <Avatar/>
                }
                    <input type="file" onChange={(e)=>{uploadImage(e)}} name="" id="ig" />
                    <label style={{background:'#1053FF'}} htmlFor="ig">
                        {/* <IconButton> */}
                            <EditOutlinedIcon fontSize="small" htmlColor="#fff"/>
                        {/* </IconButton> */}
                    </label>
            </div>
            <div className="profile-details">
                <h4 className="title">{user.firstname + ' '+ user.lastname}</h4>
                <p className="review"> Reviews</p>
                <Grid container className="profiles-reviews" alignItems="center">
                    <Typography style={{color:'#1053FF', fontSize:20, fontWeight:'bold', marginRight:10}}>{user.reviews === 0? 0:(user.stars/user.reviews).toFixed(1)}</Typography>
                    <StyledRating
                        name="rate"
                        disabled
                        defaultValue={user.reviews === 0? 0:(user.stars/user.reviews)}
                    />
                </Grid>
                <Typography variant="subtitle2" style={{marginTop:12, color:'#1053FF'}} component="p">{user.reviews === 0?'No reviews yet':(user.stars/user.reviews)>=3.5?'Top Host':(user.stars/user.reviews<3.5&&'NewBie Host')}</Typography>

                <Link to="/app/edit-profile">
                    <div style={{background:'#1053FF'}} className="btn">
                        <IconButton>
                            <EditOutlinedIcon fontSize="small" htmlColor="#fff"/>
                        </IconButton>
                    </div>
                </Link>
            </div>
        </div>


        <div className="profile">
            <div>
                <Typography variant="h5" className="underline-title">Bio</Typography>
                <p>
                    {
                        user.bio?
                        user.bio
                        :'Write something about yourself'
                    }
                </p>
            </div>
            <div className="profile-details">
                <Typography variant="h5" className="underline-title">About</Typography>
                <Typography variant="subtitle1" component="p" style={{color:'#DCDCDC', fontSize:14, marginTop:-5}}>Contact Information</Typography>
                <table>
                    <tbody>
                        <tr>
                            <td>Phone:</td>
                            <td>{user.phone?user.phone.replace('-',''):'' }</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{user.address }</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{user.email }</td>
                        </tr>
                        <tr>
                            <td>Facebook:</td>
                            <td>{user.facebook }</td>
                        </tr>
                        <tr>
                            <td>LinkedIn:</td>
                            <td>{user.linkedin }</td>
                        </tr>
                    </tbody>
                </table>
                <Typography variant="subtitle1" component="p" style={{color:'#DCDCDC', fontSize:14}}>Basic Information</Typography>
                <table>
                    <tbody>
                        <tr>
                            <td>Date of Birth:</td>
                            <td>{user.dob }</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>{user.gender }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

const StyledRating = withStyles({
    iconFilled: {
      color: '#FFE600',
    },
    iconHover: {
      color: '#FFE600',
    },
  })(Rating);
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            location:'',
            address:'',
            experience:'',
            gender:'',
            name:'',
            code:'',
            avater:null,
            profile:null,
            user:null,
            isLoading:false
        }
    }


    uploadImage = (e)=>{
        let image = e.target.files[0];
        const formData = new FormData()
        formData.append('image', image)
        this.setState({isLoading:true})
        uploadProfileImage(this.props.user.id,formData)
        .then((user)=>{
            this.props.setUser(user)
            this.setState({isLoading:false})
        })
    }


    render(){
        return (
            <>
                     <Seo title="Profile" />
                    <AppHeader/>
                    <Backend>
                        <Activity loading={this.state.isLoading} />
                       
                        <ProfileDetails user={this.props.user} uploadImage={this.uploadImage}/>
                    </Backend>
            </>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user
})
const mapDispatchToProps=dispatch=>({
    setUser:(payload)=>dispatch(setUser(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(Profile);

