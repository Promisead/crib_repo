import React from "react";
import "./../inbox.css"
import "./../properties.css"
// import "./../add-property.css"
import "./../profile.css"
import "./edit-profile.scss"
import Backend from "./../layout"
import {  Button,Snackbar, Slide } from "@material-ui/core";
import Activity from "../../../components/activity"
import {Alert} from "@material-ui/lab"
import {withRouter} from "react-router-dom"
import { connect } from "react-redux";
import AppHeader from "../../../components/appHeader"
import { getCountryCode, updateHost } from "../../../apis/server";
import { setEnv, setUser } from "../../../state/actions";
import DropDown, { DropDownItem } from "../../../components/dropDown";
import Seo from "../../../components/seo";

const EditProfileDom = ({state, handleCloseSnackBar, user,env, changeHandler ,onChangeDate,onSubmit,handleClick})=>{
    //const [years, setYears]=React.useState([])
    // React.useEffect(()=>{
        const years = []
        const thisYear = new Date().getFullYear() 
        for(let year = thisYear; year >= thisYear - 60; year --)
            years.push(year)
        //setYears(years)
    //}, [])
    return(
        <>
            <Activity loading={state.loading} />

            <div className="profiles">

                <div className="profile-edit">
                    <div className="profile-details">
                        <form onSubmit={event=>{onSubmit(event)}}>
                            {
                            state.message&&
                            <Snackbar
                            open={state.open}
                            onClose={handleCloseSnackBar}
                            TransitionComponent={state.transition}
                            anchorOrigin={{vertical:'top',horizontal:'right'}}
                            autoHideDuration={5000}
                            key={state.transition ? state.transition.name : ''}
                            >
                                <Alert variant="filled" severity={state.success?"success":"error"}>{state.message}</Alert>
                            </Snackbar>
                        }
                            <table>
                                <tbody>
                                    <tr>
                                    <td>Address: <span style={{color:'red'}}>*</span></td>
                                        <td>
                                            <label>
                                                <input onChange={(e)=>changeHandler(e)} name="address" defaultValue={user.address?user.address:''} />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone: <span style={{color:'red'}}>*</span></td>
                                        <td>
                                        <label>
                                            <img alt="flag" src={`https://www.countryflags.io/${env.country_code.toLowerCase()}/shiny/32.png`}/>
                                            <div className="calling_code">
                                                {env.country_calling_code}
                                            </div>
                                            <input onInput={(e)=>e.target.value = e.target.value.replace(/[^0-9.-]/g, '')} type="text" maxLength={10} onChange={(e)=>changeHandler(e)} name="phone" defaultValue={user.phone?user.phone.split('-')[1]:''} />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Facebook:</td>
                                        <td>
                                            <label>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="facebook" defaultValue={user.facebook?user.facebook:''} />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>LinkedIn:</td>
                                        <td>
                                            <label>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="linkedin" defaultValue={user.linkedin?user.linkedin:''} />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date of Birth: <span style={{color:'red'}}>*</span></td>
                                        <td>
                                            <label>
                                                <DropDown value={user.dob?parseInt(user.dob.split('-')[0]):''} onChange={(e)=>changeHandler(e)} name="dobd">
                                                    <DropDownItem value="">DD</DropDownItem>
                                                    {
                                                        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map(i=>(
                                                            <DropDownItem  key={i} value={i}>{i<10?'0'+i:i}</DropDownItem>
                                                        ))
                                                    }
                                                </DropDown>
                                                <DropDown value={user.dob?parseInt(user.dob.split('-')[1]):''} onChange={(e)=>changeHandler(e)} name="dobm">
                                                    <DropDownItem>MM</DropDownItem>
                                                    {
                                                        [1,2,3,4,5,6,7,8,9,10,11,12].map(i=>(
                                                            <DropDownItem key={i} value={i}>{i<10?'0'+i:i}</DropDownItem>
                                                        ))
                                                    }
                                                </DropDown>
                                                <DropDown value={user.dob?parseInt(user.dob.split('-')[2]):''} onChange={(e)=>changeHandler(e)} name="doby">
                                                    <DropDownItem>YYYY</DropDownItem>
                                                    {
                                                        years.map((year,i)=>(
                                                            <DropDownItem key={i} value={year}>{year}</DropDownItem>
                                                        ))
                                                    }
                                                </DropDown>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Gender: <span style={{color:'red'}}>*</span></td>
                                        <td>
                                            <label>
                                            <DropDown onChange={(e)=>changeHandler(e)} name="gender" value={user.gender?user.gender:''}>
                                                    <DropDownItem value="">Choose</DropDownItem>
                                                    <DropDownItem value="Male">Male</DropDownItem>
                                                    <DropDownItem value="Female">Female</DropDownItem>
                                            </DropDown>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Bio: <span style={{color:'red'}}>*</span></td>
                                        <td>
                                           <label>
                                           <textarea onChange={(e)=>changeHandler(e)} defaultValue={user.bio?user.bio:''} name="bio"  />
                                           </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="edit-btn">
                                <Button onClick={handleClick(TransitionUp)} variant="contained" type="submit">Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            address:'',
            linkedin:null,
            gender:'',
            facebook:null,
            dob:'',
            bio:'',
            loading:false,
            message:'',
            success:false,
            transition:undefined,
            open:false,
        }
    }

    componentDidMount(){
        const dom = document.querySelector('#profiles')
        if(dom !== null)
        dom.setAttribute('class', 'is-active')
        this.setState({
            phone:this.props.user.phone === null?'':this.props.user.phone.split('-')[1],
            address:this.props.user.address,
            bio:this.props.user.bio,
            linkedin:this.props.user.linkedin === null?null:this.props.user.linkedin,
            facebook:this.props.user.facebook === null?null:this.props.user.facebook,
            dob:this.props.user.dob,
            gender:this.props.user.gender,
            dobd:this.props.user.dob === null?'':this.props.user.dob.split('-')[0],
            dobm:this.props.user.dob === null?'':this.props.user.dob.split('-')[1],
            doby:this.props.user.dob === null?'':this.props.user.dob.split('-')[2]
        })
        this.onLoadEnv()
    }
    onLoadEnv=()=>{
        getCountryCode()
        .then(data=>{
            this.props.setEnv(data)
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

    changeHandler = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    onChangeDate = e =>{
        console.log(e)
        //this.setState({[e.target.name]:e.target.value})
    }

    onSubmit = n =>{
        n.preventDefault();
        const dob = this.state.dobd+'-'+this.state.dobm+'-'+this.state.doby
        this.setState({message:'', success:false, dob})
        if(this.state.address === '' || this.state.address === null){
            this.setState({message:'Address is required'})
            return
        }
       else if(this.state.phone === '' || this.state.phone === null){
            this.setState({message:'Phone Number is required'})
            return
        }
       else if( this.state.dobd === '' || dob === null || this.state.dobm === '' || this.state.doby === ''){
            this.setState({ message:'Date of birth is required'})
            return
        }
       else if( this.state.gender === '' || this.state.gender === null){
            this.setState({ message:'Gender is required' })
            return
        }
        else if( this.state.bio === '' || this.state.bio === null){
            this.setState({ message:'Bio is required'})
            return
        }
        this.setState({loading:true})
        const phone = this.props.env ? this.props.env.country_calling_code : '' 
        const data = {
            phone: phone+ '-' +this.state.phone,
            address:this.state.address,
            bio:this.state.bio,
            linkedin:this.state.linkedin,
            facebook:this.state.facebook,
            dob:dob,
            gender:this.state.gender
        }
        updateHost(data, this.props.user.id)
        .then((user)=>{
            this.setState({loading:false,success:true, message:'Profile has been updated'})
            this.props.setUser(user)
            this.props.history.push('/app/profile')
        })
        .catch((e)=>{
            this.setState({loading:false,success:false, message:'Oops! failed to complete the operation. Please try again.'}) 
        })
        // axios.post(`${api}/profile`,data,{headers:headers})
        // .then(res=>{
        //     document.querySelector('.hide').style.display ="block"
        //     //this.setState({user:res.data.user})
        // })
    }

    render(){
        return (
            <>
             <Seo title="Edit Profile" />
               <AppHeader/>
                <Backend>
                    
                    <EditProfileDom onChangeDate={this.onChangeDate} state={this.state} onSubmit={this.onSubmit} user={this.props.user} env={this.props.env} handleClick={this.handleClick} changeHandler={this.changeHandler} handleCloseSnackBar={this.handleCloseSnackBar} />
                </Backend>
            </>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user,
    env:state.env
})
const mapDispatchToProps=dispatch=>({
    setUser:(payload)=>dispatch(setUser(payload)),
    setEnv:(payload)=>dispatch(setEnv(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));