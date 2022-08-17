import React from "react";
import "./../inbox.css"
import "./../properties.css"
// import "./../add-property.css"
import "./../setting.css"
import "./../host/setting.scss"
import {Snackbar, Slide,Grid } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffOutlined';
import { IconButton } from "@material-ui/core";
import AppHeader from "../../../components/head";
import Footer from "../../../components/footer";
import { changePassword } from "../../../apis/server";
import Activity from "../../../components/activity";
import Seo from "../../../components/seo";
const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
class Setting extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            toggle:false,
            old:'',
            password:'',
            confirm_pass:'',
            old_secure:true,
            password_secure:true,
            confirm_secure:true,
            message:'',
            transition:undefined,
            open:false,
            success:false,
            loading:false
        }
    }
    changeHandler =(n)=>{
        this.setState({[n.target.name]:n.target.value})
    }
    onSubmit = (e)=>{
        e.preventDefault()
        this.setState({loading:true})
        if(!this.state.old){
            this.setState({message:'Old password is required',success:false,loading:false}) 
            
            return
        }
        else if(!this.state.password)
        {
            this.setState({message:'New password is required',success:false,loading:false}) 
            return
        }
        else if(!this.state.confirm_pass)
        {
            this.setState({message:'Confirm password is required',success:false,loading:false}) 
            return
        }
        else if(this.state.password !== this.state.confirm_pass)
        {
            this.setState({message:'New password does not match',success:false,loading:false}) 
            return
        }
        const data = {
            oldPassword:this.state.old,
            password:this.state.password
        }
        changePassword(data)
        .then((res)=>{
            if(res.code === 200)
            this.setState({message:'Password Successfully Changed',success:true,loading:false})
            else
            this.setState({message:'Existing password does not match.',success:false,loading:false})
        })
        .catch(e=>{
            this.setState({message:'Oops something went wrong',success:false,loading:false})
        })
       
    }
    handleClick = (Transition) => () => {
        this.setState({transition:Transition, open:true})
        };
    handleCloseSnackBar = (event,reason) => {
        if (reason === 'clickaway') {
            return;
          }
        this.setState({open:false})
        }
    render(){
            const settings=(
                <>
                    <div className="settins-c renting">
                        <div className="password-form">
                             <h4>Change Password</h4>
                             {
                                this.state.message&&
                                <Snackbar
                                open={this.state.open}
                                onClose={this.handleCloseSnackBar}
                                TransitionComponent={this.state.transition}
                                anchorOrigin={{vertical:'top',horizontal:'right'}}
                                autoHideDuration={5000}
                                key={this.state.transition ? this.state.transition.name : ''}
                                >
                                    <Alert variant="filled" severity={this.state.success?"success":"error"}>{this.state.message}</Alert>
                                </Snackbar>
                            }
                            <Activity loading={this.state.loading} />
                            <form onSubmit={e=>{this.onSubmit(e)}}>
                                <div className="password-group">
                                    <label htmlFor="old">Old Password</label>
                                    <div>
                                        <input type={this.state.old_secure?"password":"text"} id="old" name="old" onChange={this.changeHandler} />
                                        <IconButton onClick={()=>this.setState({old_secure:!this.state.old_secure})} >
                                            {
                                                !this.state.old_secure?
                                                <VisibilityOffIcon/>
                                                :
                                                <VisibilityIcon />
                                            }
                                            
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="password-group">
                                    <label htmlFor="new">New Password</label>
                                    <div>
                                        <input type={this.state.password_secure?"password":"text"} id="new" name="password" onChange={this.changeHandler} />
                                        <IconButton onClick={()=>this.setState({password_secure:!this.state.password_secure})}>
                                            {
                                                !this.state.password_secure?
                                                <VisibilityOffIcon/>
                                                :
                                                <VisibilityIcon />
                                            }
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="password-group">
                                    <label htmlFor="confirm">Re-Type Password</label>
                                    <div>
                                    <input type={this.state.confirm_secure?"password":"text"} id="confirm" name="confirm_pass" onChange={this.changeHandler} />
                                    <IconButton onClick={()=>this.setState({confirm_secure:!this.state.confirm_secure})}>
                                        {
                                                !this.state.confirm_secure?
                                                <VisibilityOffIcon/>
                                                :
                                                <VisibilityIcon />
                                            }
                                    </IconButton>
                                    </div>
                                </div>
                                <div className="password-group">
                                    <button onClick={this.handleClick(TransitionUp)} className="btn">Save</button>
                                </div>
                            </form>
                        </div>
                        <div className="deactivate">
                            <h4>Deactivate Your Account</h4>
                            <p>
                                Deleting your account means your account will no longer be accessible, you will no longer receive cribs message. Aldo your Username wont be anywhere on cribs. Your profile will soon be deleted.
                                <button>Deactivate Account</button>
                            </p>
                        </div>
                    </div>
                </>
            )
        return (
            <>
                     <Seo title="Setting" />
                    <AppHeader sticky={true} top={0} color="#0066FF"  bgColor="#CCE0FF"  quickSearch={true} openQuickSearch={true}/>
                    <Grid container justify="center">
                        <Grid item md={11}>
                            <Grid container>
                                {settings}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Footer/>
            </>
        )
    }
}
export default Setting;