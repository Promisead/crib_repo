import React, {useState} from "react";
import {Paper, withStyles,Grid,Typography} from "@material-ui/core";
import {Facebook, Instagram, Twitter} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Subscribe from "./subscribe";
import AppLogo from "./appLogo";
import play from "../images/playstore.svg";
import apple from "../images/apple.svg";
import SocialIcon from "./socialicon";
import './../scss/footer.scss';
import { subscriber } from "../apis/server";

const styles = (theme)=>({
    container:{
        minHeight:380,
        backgroundColor:'#F6F6F6',
        marginTop:130
    },


    paragraph:{
        fontSize:14,
        color:'#000000'
    },
    social:{
        display:'flex',
        listStyle:'none',
        justifyContent:'space-between',
        margin:'20px 0 30px 0'
    }
})
const Footer = ({classes})=>{
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState({
        text:'',
        success:false
    })
    const [loading, setLoading] = useState(false)
    const handleChange=value=>{
        setEmail(value)
    }
    const onSubmit =e=>{
        e.preventDefault()
        if(!email){
            setMessage({text:'Email is required', success:false})
            return
        }
        else if(!email.includes('@') || email.lastIndexOf('.') < email.indexOf('@'))
       {
        setMessage({text:'Incorret email format', success:false})
        return
       }
        const data = {
            email:email
        }
        setLoading(true)
        subscriber(data)
        .then(subsciber=>{
            if(subsciber.code ===200)
            {
                setMessage({text:subsciber.message, success:true})
                setEmail('')
            }
            else
            setMessage({text:subsciber.message, success:false})
            setLoading(false)
        })
        .catch(e=>{
            console.log(e)
            setMessage({text:'Something went wrong', success:false})
            setLoading(false)
        })
    }
    return(
        <Paper className="footer" classes={{root:classes.container}} square>
            <Grid container className="inner">
                <Grid item xs={false} md={1}/>
                <Grid item xs={12} md={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={7} className="first-box">
                             <Typography className="subtitle" variant="h4">Beach destinations</Typography>
                            <Typography className="paragraphy"   variant="body1" component="p">
                                Coming Soon
                            </Typography>
                            <Typography className="subtitle" variant="h4">
                                Resorts
                            </Typography>
                            <Typography className="paragraphy" variant="body1" component="p">
                            Coming Soon
                            </Typography>
                            <Grid container>
                                <Grid item md={10} xs={12}>
                                    <Grid container style={{marginTop:40}} className="logo-container" alignItems="center">
                                        <Grid item md={4} xs={4}>
                                            <Typography  noWrap className="logo" variant="h2">CRIB NG</Typography>
                                        </Grid>
                                        <Grid item md={4}  xs={4}  >
                                            <Typography  className="title" variant="h2">Links</Typography>
                                            <ul className="list" >
                                                <li className="listItem"><Link className="link" to="/">List Property</Link></li>
                                                <li className="listItem"><Link className="link" to="/">Privacy Policy</Link></li>
                                                <li className="listItem"><Link className="link" to="/">Community</Link></li>
                                            </ul>
                                        </Grid>
                                        <Grid item md={4}  xs={4}>
                                            <Typography  className="title" variant="h2">Company</Typography>
                                            <ul className="list">
                                                <li className="listItem"><Link className="link" to="/">About</Link></li>
                                                <li className="listItem"><Link className="link" to="/">Carreer</Link></li>
                                                <li className="listItem"><Link className="link" to="/">Media center</Link></li>
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="second" item xs={12} md={5} style={{width:'100%'}}>
                            <div >
                                <Typography className="subtitle newsletter" variant="body1" component="p">
                                    To get updates on discounts. Sign up to our Newsletter.
                                </Typography>
                                <div className="subscribers-main-contaniner">
                                {
                                    message.text&&
                                    <small className={message.success?'fsuccess':'ffailed'}>{message.text}</small>
                                }
                                <Subscribe loading={loading} onChangeValue={handleChange} value={email} onSubmit={onSubmit}/>
                                </div>
                                <Grid container justify="center">
                                    <Grid item xs={6} md={8}>
                                    <ul className={classes.social}>
                                        <SocialIcon backgroundColor="#0066FF" href="https://wwww.facebook.com"><Facebook  htmlColor="#fff"/></SocialIcon>
                                        <SocialIcon backgroundColor="#0066FF" href="https://wwww.facebook.com"><Twitter  htmlColor="#fff"/></SocialIcon>
                                        <SocialIcon backgroundColor="#0066FF" href="https://wwww.facebook.com"><Instagram htmlColor="#fff"/></SocialIcon>
                                    </ul>
                                    </Grid>
                                </Grid>
                                <Typography className="subtitle newsletter" variant="body1" component="p">Download Cribs for Mobile</Typography>
                                <Grid container justify="center">
                                    <Grid item xs={12} sm={6} md={10} >
                                        <Grid container spacing={1}>
                                           <Grid item xs={6}>
                                                <AppLogo name="App" image={apple} href="#" target="_blank" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <AppLogo name="Play" image={play} href="#" target="_blank" />
                                            </Grid>
                                        </Grid> 
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                    </Grid>
                    <p className="paragraphy copy" >CribNg &copy; {new Date().getFullYear()}, All rights Reserved.</p>
                </Grid>
                <Grid item xs={false} md={1}/>
            </Grid>
        </Paper>
    )
}
export default withStyles(styles)(Footer);
