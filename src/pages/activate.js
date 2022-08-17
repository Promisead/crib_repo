import React, {  useState,useEffect } from "react";
import "./signup.css"
import "./login.css"
import { Button} from "@material-ui/core";
import { connect } from "react-redux";
import { setUser } from "../state/actions";
import { resendEmail } from "../apis/server";
import Seo from "../components/seo";



const  Activate = ({user,setUser})=>{
    const [message, setMessage]=useState('')
    const [loading, setLoading]=useState(false)
    const [status, setStatus]=useState(true)
    const [timer, setTimer] = useState(null)

    const onResend = ()=>{
        setLoading(true)
        const data = {
            email:user.email
        }
        resendEmail(data)
        .then((res)=>{
            setLoading(false)
            setStatus(true)
            setUser(res)
            setMessage('Verification link has been sent successfully!')
        })
        .catch(e=>{
            setLoading(false)
            setStatus(false)
            setMessage('Failed to send link, please try again.')
        })

        const time = setTimeout(()=>{
            setMessage('')
        }, 3000)
        setTimer(time)
    }

    useEffect(()=>{
       return ()=>{
           setTimer(null)
           //setUser(null)
       } 
    }, [setTimer, timer])
        return (
            <>
                <Seo title="Activate" />
                <div className="label"></div>
                <div className="header-wrap">
                    <div style={{height:300,display:'grid', alignContent:'center'}}>
                        {
                            message !== ''&&
                            <p style={{textAlign:'center', color:status?'green':'red', fontSize:17}}>{message}</p>
                        }
                        
                        <p style={{textAlign:'center', color:'#00A8C8', fontSize:20}}>Verification link has been sent to {user.email}</p>
                        <p  style={{textAlign:'center', marginTop:15, marginBottom:15}}>Check your inbox or spam folder for the email, if you do not receive the email, click on the button below.</p>
                        {
                            loading?
                            <Button variant="outlined" style={{width:200, margin:'0 auto', borderColor:'#707070ad',color:'#707070ad', textTransform:'capitalize'}}>Please wait...</Button>
                            :
                            <Button variant="outlined" style={{width:200, margin:'0 auto', borderColor:'rgb(0, 0, 238)',color:'rgb(0, 0, 238)', textTransform:'capitalize'}} onClick={()=>onResend()}>Resend Verification</Button>
                        }
                    </div>
                </div>
            </>
        );
    }
    const mapStateToProps = state => ({
        user:state.user
    });
    const mapDispatchToProps = dispatch => ({
        setUser: (payload) => dispatch(setUser(payload))
      });
    export default connect(mapStateToProps,mapDispatchToProps)(Activate);