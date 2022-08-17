import React from "react";
import "./../../signup.css"
import "./../../login.css"
import {Link, withRouter} from "react-router-dom"
import FacebookIcon from '@material-ui/icons/Facebook';
// import TwitterIcon from '@material-ui/icons/Twitter';
import {withStyles,Snackbar, Slide,CircularProgress } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { registerHost } from "../../../apis/server";
import { setUser } from "../../../state/actions";
import Head from "../../../components/head";
import { connect } from "react-redux";
import Footer from "../../../components/footer";
import Seo from "../../../components/seo";
//import firebase from "../components/firebase"


const styles = ()=>({
    label:{
        textTransform:'capitalize',
        padding:0,
        lineHeight:0
    },
    check:{
        borderColor:'#DCDCDC'
    }
})
const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstname:'',
            password:'',
            email:'',
            lastname:'',
            cpassword:'',
            remember:false,
            err:'',
            token:'',
            type:false,
            role:0,
            renting:false,
            hosting:false,
            isConfirmed:false
        }
    }


    setRenting=(e)=>{
        if(e.target.checked)
        this.setState({role:0, renting:true, hosting:false})
        else
        this.setState({renting:false})
    }
    setHosting=(e)=>{
        if(e.target.checked)
        this.setState({role:1, hosting:true, renting:false})
        else
        this.setState({role:0, hosting:false})
    }
    changeHandler = (e)=>{
        const name = e.target.name;
        this.setState({[name]:e.target.value})
        }
        handleClick = (Transition) => () => {
            this.setState({transition:Transition, open:true})
            };
        handleCloseSnackBar = (event,reason) => {
            if (reason === 'clickaway') {
                return;
              }
            this.setState({open:false})
            };
    onConfirmPassword = ()=>{
        if(this.state.password === this.state.cpassword){
            this.setState({isConfirmed:true})
        }
        else{
            this.setState({isConfirmed:false})
        }
    }
    onSubmit =(event)=>{
        event.preventDefault()
        if(this.state.firstname === '')
        this.setState({err:'Firstname is required'})
        else if(this.state.lastname === '')
        this.setState({err:'Lastname is required'})
        else if(this.state.email === '')
            this.setState({err:'Email is required'})
        else if(this.state.password === '')
            this.setState({err:"Password is required"})
        else{
            if(this.state.remember === 'on')
                this.setState({remember:true})
            this.setState({err:'',loading:true})
            const body = {
                email: this.state.email,
                password:this.state.password,
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                // type:false,
                // loading:false,
                // transition:undefined,
                // open:false,
                // role:this.state.role
            }
            registerHost(body)
            .then((user)=>{
                this.setState({loading:false})
                if(user.code === 200){
                    this.props.setUser(user)
                    this.props.history.push('/verification')
                }
                else{
                    this.setState({err:'This account already exists'})
                }
            })
            .catch((err=>{
                this.setState({loading:false,
                    err:err.message
                })
            }))
            // if(handleLogin(body))
            // {
            //     this.setState({username:'',password:''})
            //     event.target.reset();
            // }
            
        }

    }

    moveLabel = (e)=>{
        e.target.previousElementSibling.style.top = '20%'
        e.target.previousElementSibling.style.fontSize = '12px'
    }

    moveLabelBk = (e)=>{
        if(e.target.value === '')
        {
            e.target.previousElementSibling.style.top = '50%'
            e.target.previousElementSibling.style.fontSize = '16px'
        }
    }

    toggleLogin = ()=>{
        this.setState({type: !this.state.type})
    }
    googleSignup=()=>{
        // this.context.signUpWithGoogle()
    }
    fbSignup=()=>{
        // this.context.signUpWithFacebook()
    }
    render(){
        return (
            <>
            <Seo title="Sign up" />
                <Head top={30} color="#0066FF" />
                <div className="label"></div>
                <div className="header-wrap">
                    <div className="signin">
                        <p>Create an Account</p>
                        <span className="subtitle">Let's get you all set up so you can begin finding your next best spot</span>

                        <div className="form">
                        {
                                this.state.err&&
                                <Snackbar
                                open={this.state.open}
                                onClose={this.handleCloseSnackBar}
                                TransitionComponent={this.state.transition}
                                anchorOrigin={{vertical:'top',horizontal:'right'}}
                                autoHideDuration={5000}
                                key={this.state.transition ? this.state.transition.name : ''}
                                >
                                    <Alert variant="filled" severity="error">{this.state.err}</Alert>
                                </Snackbar>
                            }
                            <form onSubmit={event=>{
                                this.onSubmit(event)
                            }} method="post">
                            <ul style={{width:'100%'}}>
                                <li style={{marginRight:10}} >
                                    <label htmlFor="firstname">First Name</label>
                                    <div style={{marginBottom:10}} className="form-groups">
                                        <div className="input">
                                            <input type="text" name="firstname" onChange={this.changeHandler} placeholder="Your firstname" id="firstname" />
                                        </div>
                                        <span className="icon-checkmark"></span>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="lastname">Last Name</label>
                                    <div className="form-groups" style={{marginBottom:10}}>
                                        <div className="input">
                                            <input type="text" name="lastname" onChange={this.changeHandler} placeholder="Your lastname" id="lastname" />
                                        </div>
                                        <span className="icon-checkmark"></span>
                                    </div>
                                </li>
                            </ul>
                                <label htmlFor="username">Email</label>
                                <div className="form-groups">
                                    <div className="input">
                                        <input type="text" name="email" onChange={this.changeHandler} placeholder="name@email.com" id="username" />
                                    </div>
                                    <span className="icon-checkmark"></span>
                                </div>
                                <label htmlFor="password">Password</label>
                                <div className="form-groups">
                                   
                                    <div className="input">
                                        <input name="password" type="password" placeholder="Enter a strong password" onChange={this.changeHandler}  id="password" />
                                    </div>
                                    <span className="icon-checkmark"></span>
                                </div>
                                {
                                    this.state.password.length<7 && this.state.password !==''?
                                    <p style={{color:'red', textAlign:'left'}}>Password must be at least 7 digits.</p>
                                    :''
                                }
                                <label htmlFor="cpassword">Confirm Password</label>
                                <div className="form-groups">
                                   
                                    <div className="input">
                                        <input name="cpassword" type="password" placeholder="Enter confirm password" onChange={(e)=>{this.setState({cpassword:e.target.value},()=>{this.onConfirmPassword()})}}  id="cpassword" />
                                    </div>
                                    <span className="icon-checkmark"></span>
                                </div>
                                {
                                   this.state.cpassword !== ''?
                                    this.state.isConfirmed?
                                    <p style={{color:'green', textAlign:'left'}}>Password matched</p>
                                    :
                                    <p style={{color:'red', textAlign:'left'}}>Password is does not match</p>
                                    :''
                                }
                                <div className="form-check">
                                    <FormControlLabel
                                            control={<Checkbox id="rememberme" onChange={(e)=>{this.setState({remember: !this.state.remember})}} checked={this.state.renting} classes={{root:this.props.classes.check}} name="role"/>}
                                            label="Remember Me"
                                        />
                                </div>
                                <button onClick={this.handleClick(TransitionUp)} className="btn-signup">
                                    {
                                           this.state.loading?
                                           <> <CircularProgress/>  Signing up...</>
                                            :
                                            'Sign Up'
                                    }
                                   
                                </button>
                                <div className="social-signup">
                                    <button type="button" onClick={this.fbSignup} className="col">
                                        <FacebookIcon htmlColor="#1480ec"/>
                                    </button>
                                    <button type="button" onClick={this.googleSignup} className="col">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="34.682" height="34.682" viewBox="0 0 34.682 34.682"><defs><style></style></defs><path className="a" d="M7.686,149.861l-1.207,4.507-4.412.093a17.371,17.371,0,0,1-.128-16.193h0l3.928.72,1.721,3.9a10.349,10.349,0,0,0,.1,6.968Z" transform="translate(0 -128.902)"/><path className="b" d="M278.285,208.176a17.334,17.334,0,0,1-6.182,16.762h0l-4.948-.252-.7-4.371a10.335,10.335,0,0,0,4.447-5.277h-9.273v-6.86h16.657Z" transform="translate(-243.906 -194.075)"/><path className="c" d="M56.638,319.313h0a17.346,17.346,0,0,1-26.13-5.305l5.62-4.6a10.313,10.313,0,0,0,14.862,5.28Z" transform="translate(-28.442 -288.45)"/><path className="d" d="M55.094,3.992l-5.618,4.6a10.312,10.312,0,0,0-15.2,5.4L28.625,9.366h0a17.344,17.344,0,0,1,26.47-5.374Z" transform="translate(-26.685)"/></svg>
                                        </div>
                                    </button>
                                    {/* <a href="https://www.twitter.com" className="col">
                                        <TwitterIcon/>
                                    </a> */}
                                </div>
                                <p>Don't have an account? <Link to="/host-login">Sign in here as Host</Link></p>
                            </form>
                        </div>
                    </div>
                    <div className="signin-left">
                        <svg xmlns="http://www.w3.org/2000/svg" width="875.21" height="1202.327" viewBox="0 0 875.21 1202.327">
                        <g id="Group_260" data-name="Group 260" transform="translate(-1160.517 -277.271)">
                            <g id="Group_259" data-name="Group 259">
                            <path id="Path_160" data-name="Path 160" d="M367.287,320.458C637.229,15.132,791.728,270.5,791.728,508.272S614.493,938.8,395.864,938.8,0,746.048,0,508.272,97.345,625.783,367.287,320.458Z" transform="translate(1244 96.696)" fill="#00a8c8" opacity="0.42"/>
                            <path id="Path_161" data-name="Path 161" d="M288.631,281.649c212.133-220.618,333.545-36.1,333.545,135.708S482.9,728.446,311.088,728.446,0,589.167,0,417.358,76.5,502.267,288.631,281.649Z" transform="translate(2083.656 992.028) rotate(115)" fill="#00a8c8" opacity="0.42"/>
                            </g>
                        </g>
                        </svg>

                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}
const mapDispatchToProps=dispatch=>({
    setUser: (payload) => dispatch(setUser(payload))
})
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SignUp)));