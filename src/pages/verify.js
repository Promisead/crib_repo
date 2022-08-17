import React, { useEffect, useState } from "react";
import "./signup.css"
import "./login.css"
import { connect } from "react-redux";
import { verifyEmail } from "../apis/server";
import { chooseDashboard, setUser } from "../state/actions";



const  Verify = ({user,setUser, history, location, chooseDashboard})=>{
    const [message, setMessage] =useState('')
    useEffect(()=>{
        const token = location.pathname.split('/')[2]

        const cleanup = async()=>{
            const userData = await verifyEmail(token)
           if(userData){
               if(userData.code === 401){
                    setMessage(userData.message)
               }
               else{
                setUser(userData)
                chooseDashboard(userData.role)
                history.push('/app/home')
               }
           }

            
        }
       cleanup()
    },[location,history, setUser,chooseDashboard])
        return (
            <>
                <div className="label"></div>
                <div className="header-wrap">
                    <div style={{height:300,display:'grid', alignContent:'center'}}>
                        
                        <p style={{textAlign:'center', color:'#00A8C8', fontSize:20}}>{message === ''?'Verifying email address':message}</p>
 
                    </div>
                </div>
            </>
        );
    }
    const mapStateToProps = state => ({
        user:state.user
    });
    const mapDispatchToProps = dispatch => ({
        setUser: (payload) => dispatch(setUser(payload)),
        chooseDashboard:(payload)=>dispatch(chooseDashboard(payload))
      });
    export default connect(mapStateToProps,mapDispatchToProps)(Verify);