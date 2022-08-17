import React from "react";
import "./signup.css"
import "./login.css"
import "./forget.scss"
import { withRouter} from "react-router-dom"
import {  withStyles,Snackbar, Slide,CircularProgress } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Head from "../components/head";
import { newPassword } from "../apis/server";
import Footer from "../components/footer";
import { connect } from "react-redux";
import { setUser } from "../state/actions";
import Seo from "../components/seo";

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
class ChangePassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            password:'',
            cpassword:'',
            err:'',
            token:'',
            type:false,
            loading:false,
            transition:undefined,
            open:false
        }
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
    
    onSubmit =(event)=>{
        event.preventDefault()
        if(this.state.password === '')
            this.setState({err:'Password is required'})
        else if(this.state.password !== this.state.cpassword)
            this.setState({err:'Password do not match'})
        else{
            const token = this.props.match.params.token
            if(!token)
            {
                this.setState({err:'Token does not match'})
                return
            }
            this.setState({err:'',loading:true})
            const body = {
                password: this.state.password,
                token:token
            }
            newPassword(body)
            .then((user)=>{
                if(user.code ===200){
                    this.props.setUser(user)
                    this.setState({loading:false})
                }
                else{
                    this.setState({loading:false, err:user.message})
                }

            })
            .catch((err)=>{
                this.setState({
                    loading:false, 
                    err:err.code==='auth/network-request-failed'?'Please check your network connection and try again.':
                    err.code
                })
            })
            
        }

    }
   

    render(){
        return (
            <>
                <Seo title="New Password" />
                <Head top={30} color="#0066FF" />
                <div className="header-wrap forget-password">
                    <div className="signin">
                        <p>Enter New Password</p>
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
                        {/* <p className="error">{this.state.err}</p> */}
                            <form onSubmit={event=>{
                                this.onSubmit(event)
                            }} method="post">
                                <label htmlFor="password">New Password</label>
                                <div className="form-groups">
                                    <div className="input">
                                        <input type="password" name="password" onChange={this.changeHandler}  id="password" />
                                    </div>
                                </div>
                                <label htmlFor="cpassword">Re-Type Password</label>
                                <div className="form-groups">
                                    <div className="input">
                                        <input type="password" name="cpassword" onChange={this.changeHandler}  id="cpassword" />
                                    </div>
                                </div>
                                <div className="form-submit">
                                    <button onClick={this.handleClick(TransitionUp)} className="btn-signup">
                                    {
                                        this.state.loading?
                                       <> <CircularProgress/>  Loading...</>
                                        :
                                        'Change Password'
                                        
                                    }
                                    
                                </button>
                                </div>
                                
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
const mapStateToProps=states=>({
    user:states.user
})
const mapDispatchToProps=dispatch=>({
    setUser:(payload)=>dispatch(setUser(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(ChangePassword)));