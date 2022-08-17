import React, {Component, useState} from "react"
import { PaystackConsumer } from 'react-paystack';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { Button, MenuItem, Select, TextField } from '@material-ui/core';

import { Button, TextField } from '@material-ui/core';
// import {Elements,CardNumberElement,CardCvcElement} from '@stripe/react-stripe-js';

import {withRouter} from "react-router-dom"
import Splash from "./splash";
import { reserveCrib } from "../apis/server";
import { connect } from "react-redux";
import { getDates } from "../helpers/helpers";
// import emailjs from 'emailjs-com';

//const stripePromise = loadStripe('pk_test_51Hg8hoK2fIb9aYwzRl3MOcLEWpgHCGKnqkXzl8emOzsoNn5ii8oMMuKRAyjV1tanLgvOBuRvFFDu0MK9frmDdDuZ00uaY2DWuF');

const PayStack = withRouter(({changeHandler,state,data,history,user,location})=>{
    const [loading, setLoading] = useState(false)
    const config = {
        reference: (new Date()).getTime(),
        email: user.email,
        amount:Math.ceil((data.total+data.refund)*100),
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    };
    const handleSubmit =()=> {
        setLoading(true)
        const dates = getDates(data.checkIn, data.checkOut)
        const id = data.id.replace('/','')
            const reserve = {
                reference:config.reference,
                renter:{
                    email:user.email,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    image:user.image
                },
                refund:data.refund,
                amount:data.amount,
                total:data.total,
                renter_id:user?user.id:null,
                propertyName:data.name,
                rooms:data.rooms,
                state:data.state,
                city:data.city,
                image:data.image,
                nights:data.nights,
                adult: data.adult,
                guest: data.guest,
                children: data.children,
                infant: data.infant,
                pet: data.pet,
                systemFee:data.systemFee,
                ownerFee:data.ownerFee,
                tax:data.tax,
                address:data.address,
                checkIn:data.checkIn,
                checkOut:data.checkOut,
                host_id:data.hostId,
                dates:dates,
                host:{
                    firstname:data.firstname,
                    lastname:data.lastname,
                    email:data.hostEmail,
                    phone:data.phone.replace('-', ''),
                    image:data.photoURL
                }
            }
            reserveCrib(reserve, id)
            .then(()=>{

                    window.sessionStorage.removeItem('@py')
                    window.sessionStorage.removeItem(location.search)
                    setLoading(false)
                    history.push('/app/home')
                })
            
        
            // sendMail(templateId, {to_name:state.name,message: 'Your transaction ID on Crib NG is '+config.reference, from_name: 'Crib NG', reply_to: state.email})
      }
    const componentProps = {
        ...config,
        text: 'Paystack',
        onSuccess: () => {
            handleSubmit()
        },
        onClose: () => null
    }
    return <form>
        {
            loading&&<Splash/>
        }
        <div className="card-name">
            <p>Full Name</p>
            <TextField value={state.name} placeholder="Richard Belfast" name="name" fullWidth onChange={(e)=>changeHandler(e)} />
        </div>
        <div className="card-name">
            <p>Email Address</p>
            <TextField
                fullWidth
                value={state.email}
                onChange={(e)=>changeHandler(e)}
                placeholder="example@email.com"
                name="email"
            />
        </div>
        <div className="card-name">
            <p>Phone Number</p>
            <TextField value={state.phone} placeholder="+2347062345434" name="phone" onChange={(e)=>changeHandler(e)} fullWidth />
        </div>

        <PaystackConsumer {...componentProps} >
                {({initializePayment}) => <Button onClick={() => {initializePayment();}}>Pay</Button>}
        </PaystackConsumer>


    </form>
})
// const Card = ({state, changeMonth,changeYear})=>{
// return    <form>
//     <Elements stripe={stripePromise}>

//         <div className="card-name">
//             <p>Name on Card</p>
//             <TextField placeholder="Richard Belfast" fullWidth />
//         </div>
//         <div className="card-name">
//             <p>Card Number</p>
//             {/* <TextField
//                 type="password"
//                 fullWidth
//                 inputProps={{
//                     maxLength: cardNumberLimit,
//                 }}
//             /> */}
//             <CardNumberElement options={{classes:{base:'cardinput', invalid:'card-error', complete:'card-success'}, style:{
//                         base:{
//                             color:'#fff', 
//                             fontSize:'16px',
//                             '::placeholder': {
//                                 color: '#707070',
//                             },
//                         }
//                     }
//                 }}
//             />
//         </div>

//         <div className="expire">
//             <div className="date-expire">
//                 <div className="picker">
//                     <div>
//                         <p>Expiration Date</p>
//                         <div>
//                             <Select
//                                 labelId="card-month-label"
//                                 id="card-month"
//                                 value={state.cardMonth}
//                                 IconComponent={ExpandMoreIcon}
                                
//                                 onChange={(e) => {
//                                   changeMonth(e)  
//                                 }}
//                             >
//                                 <MenuItem value={0}>MM</MenuItem>
//                                 <MenuItem value={1}>Jan</MenuItem>
//                                 <MenuItem value={2}>Feb</MenuItem>
//                                 <MenuItem value={3}>Mar</MenuItem>
//                                 <MenuItem value={4}>Apr</MenuItem>
//                                 <MenuItem value={5}>May</MenuItem>
//                                 <MenuItem value={6}>Jun</MenuItem>
//                                 <MenuItem value={7}>Jul</MenuItem>
//                                 <MenuItem value={8}>Aug</MenuItem>
//                                 <MenuItem value={9}>Sep</MenuItem>
//                                 <MenuItem value={10}>Oct</MenuItem>
//                                 <MenuItem value={11}>Nov</MenuItem>
//                                 <MenuItem value={12}>Dec</MenuItem>
//                             </Select>
//                             <Select
//                                 labelId="card-year-label"
//                                 id="card-year"
//                                 IconComponent={ExpandMoreIcon}
//                                 value={state.year}
//                                 onChange={(e) => {
//                                     changeYear(e)
//                                 }}
//                             >
//                                 <MenuItem value={0}>YYYY</MenuItem>
//                                 {
//                                 state.years.length>0&&
//                                  state.years.map((year,i)=>(
//                                     <MenuItem value={i+1}>{year}</MenuItem>
//                                  ))   
//                                 }
//                             </Select>
//                         </div>

//                     </div>
//                     <div>
//                         <p>CVV</p>
//                         {/* <TextField
//                             type="password"
//                             inputProps={{
//                                 maxLength: cvvNumberLimit,
//                             }}
//                         /> */}
//                         <CardCvcElement
                            
//                             options={{
//                                 classes:{
//                                     base:'cvcinput', invalid:'card-error'
//                                 },
//                                 style:{
//                                     base:{
//                                         fontSize:'15px',
//                                         color:'#fff'
//                                     }
//                                 },
                                
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </Elements>

//         <Button>Pay</Button>

//     </form>
// }
class PaymentCard extends Component{
    constructor(props){
        super(props)
        this.state ={
            years:[],
            year:0,
            cardYear:'',
            cardMonth:0,
            method:'paystack',
            email:'',
            phone:'',
            name:"",
        }

    }

    componentDidMount(){
        if(this.props.user){
            this.setState({
                name:this.props.user.firstname+ ' '+this.props.user.lastname,
                phone:this.props.user.phone,
                email:this.props.user.email,
            })
        }
        let today = new Date();
        today = today.getFullYear();
        const years = []
        for(let year = today; year >= today-10; year--){
            years.push(year)
        }
        this.setState({years})

    }

    changeMonth=(e)=>{
        this.setState({cardMonth:e.target.value});
    }
    changeHandler =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    changeYear=(e)=>{
        this.setState({year:e.target.value, cardYear:e.target.value>0?this.state.years[e.target.value-1]:''});
    }
    render(){
    return(
        <>
        <div className="card-details">
        <div className="payment-type">
            <button onClick={()=>this.setState({method:'paystack'})} className={this.state.method === 'paystack'?'active':''}>Pay with Paystack</button>

            {/* <button className={this.state.method === 'paystack'?'active':''} onClick={() => { this.setState({method:'paystack'})}}>Paystack</button>

            <button className={this.state.method === 'paypal'?'active':''} onClick={()=>{this.setState({method:'paypal'})}}>Paypal</button> */}
        </div>
        {/* <div className="user-card-details"> */}
        {
            // this.state.method === 'card'?
            // <Card state={this.state} changeMonth={this.changeMonth} changeYear={this.changeYear}/>
            // :
            <PayStack changeHandler={this.changeHandler} data={this.props.data} user={this.props.user} state={this.state}/>

        }

        {/* </div> */}
    </div>
    </>
    )
}
}
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps)(PaymentCard)