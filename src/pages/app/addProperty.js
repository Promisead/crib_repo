import React from "react";
import "./add-crib.scss"
import {Snackbar, Slide } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Backend from "./layout"
import AppHeader from "../../components/appHeader";
import Activity from '../../components/activity'
import {states} from "../../icons/options"
import {withRouter, Link} from "react-router-dom"
import { connect } from "react-redux";
import { addProperty } from "../../apis/server";
import { setPropertyTypes } from "../../state/actions";
import CancelIcon from '@material-ui/icons/CancelOutlined';
import Placeholder from "../../components/placeholder";
import Seo from "../../components/seo";


const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
let images =[]
let other_images =[]
class AddProperty extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            state:'',
            city:'',
            title:'',
            description:'',
            house:'',
            address:'',
            price:'',
            bedroom:1,
            discount:0,
            bathroom:0,
            parking:false,
            wifi:false,
            smoking:false,
            cable:false,
            jaccuzi:false,
            kitchen:false,
            inside:'',
            around:'',
            guest:1,
            featured_image:null,
            type:'',
            other_images:[],
            success:false,
            message:'',
            transition:undefined,
            open:false,
            isLoading:false,
            status:false,
            rooms:[{room:'', price:'',bed:1,bathroom:0,bookedDates:[]}]
        }
        this.form = null
    }

    componentDidMount(){
        const dom = document.querySelector('#properties');
        if(dom !== null)
        dom.setAttribute('class', 'is-active')
        

            this.setState({type:this.props.propertyTypes[0].name})

    }

    uploadImage = (e)=>{
        let image = e.target.files[0];
        if(image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg'){
             if(image.size > 2100000){
                this.setState({message:'image must not be more than 2MB',open:true})
                return
            }
            this.setState({featured_image:image})
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (e)=>{
                document.getElementById('img').setAttribute('src', reader.result);
            }
        }
        else{
            this.setState({message:'File must be of type PNG, JPEG or JPG',open:true})
            return
        }


    }
    uploadImages = (e)=>{
        let reader = new FileReader();
        let imaged = e.target.files[0]
        if(imaged.type === 'image/png' || imaged.type === 'image/jpeg' || imaged.type === 'image/jpg'){
            if(imaged.size > 2100000){
                this.setState({message:'image must not be more than 2MB',open:true})
                return
            }
            let pic = document.createElement('img');
            let del = document.createElement('div');
            let newEl = document.createElement('div');
            newEl.setAttribute('class', 'viewing')

            reader.readAsDataURL(imaged);
            reader.onload = (e)=>{
                imaged.src=reader.result
                other_images.push(imaged);
                this.setState({other_images:other_images})
                images.push(reader.result)
                pic.setAttribute('src', reader.result);
                newEl.appendChild(pic);
                newEl.appendChild(del);
                document.getElementsByClassName('images')[0].appendChild(newEl);
                document.getElementsByClassName('images')[0].lastChild.lastChild.onclick = (e)=>{
                    this.deleteImage(e);
                }
            }
        }
        else{
            this.setState({message:'File must be of type PNG, JPEG or JPG',open:true})
            return 
        }


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
    deleteImage(e){
        let img = e.target.previousElementSibling.currentSrc;
        let index = images.findIndex((e)=> e === img);
        let index2 = this.state.other_images.findIndex((e)=> e.src === img);
        if(index >= 0)
        {
            images.splice(index, 1);
            e.target.parentElement.remove();
        }
        if(index2 >= 0)
        {
            this.state.other_images.splice(index2, 1);
            this.setState({other_images:this.state.other_images})
        }
    }


    changeHandler =(e)=>{
        const name = e.target.name;
        this.setState({[name]:e.target.value})
    }
    changeType =(e)=>{
        const name = e.target.name;
        if(e.target.checked)
        this.setState({[name]:true})
        else
        this.setState({[name]:false})
    }
    maxStringLength = (event,leng = 80)=>{
        const value = event.target.value;
        if(value.length > leng){
            event.target.value = value.substr(0, leng);
        }
        const str = leng - value.length ;
        event.target.nextElementSibling.innerHTML = str < 0 ? 0 + " Characters Left" :str + " Characters Left";
      }
    getLocation = async(address)=>{

    }


    onAdd=()=>{
        let add = this.state.rooms;
        add.push({room:'', price:'',bed:1, bathroom:0, bookedDates:[]});
        
        this.setState({rooms:add})
    }
    remove=(id)=>{
       this.state.rooms.splice(id,1)
        // console.log(rooms)
        // console.log(this.state.rooms)
        // // console.log(this.state.rooms[id])
        this.setState({rooms:this.state.rooms})
    }
    onAddRoom = (e, i)=>{
        const rooms = [...this.state.rooms]
        rooms[i].room = e.target.value;
        this.setState({rooms:rooms}) 
    }
    onAddBed = (e, i)=>{
        const rooms = [...this.state.rooms]
        rooms[i].bed = Number(e.target.value);
        this.setState({rooms:rooms}) 
    }
    onAddBathRoom = (e, i)=>{
        const rooms = [...this.state.rooms]
        rooms[i].bathroom = Number(e.target.value);
        this.setState({rooms:rooms}) 
    }
    onAddPrice = (e, i)=>{
        
        const rooms = [...this.state.rooms]
        let pric = Number(e.target.value)
        rooms[i].price = pric;

        this.setState({rooms:rooms}) 
    }
    onInput(e){
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }
    onInputAmount(e){
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g,'$1')
    }
    onSubmit=(event)=>{
        event.preventDefault();
        if(!this.state.title)
           {
            this.setState({message:'Crib title is required'})
            return
           }
        else if(!this.state.description){
            this.setState({message:'Crib description is required'})
            return
        }
        else if(!this.state.state){
            this.setState({message:'Crib state is required'})
            return
        }
        else if(!this.state.city){
            this.setState({message:'Crib city is required'})
            return
        }
        else if(!this.state.guest){
            this.setState({message:'Guest is required'})
            return
        }
        else if(!this.state.address){
            this.setState({message:'Crib\'s address  is required'})
            return
        }
        else if(!this.state.rooms[0].room){
            this.setState({message:'Crib room name is required'})
            return
        }
        else if(!this.state.rooms[0].price){
            this.setState({message:'Crib price is required'})
            return
        }
        else if(!this.state.inside || !this.state.around){
            this.setState({message:'Crib\'s accessibility fields  are required'})
            return
        }
        else if(!this.state.featured_image){
            this.setState({message:'Crib featured image is required'})
            return
        }



        else if(other_images.length<2){
            this.setState({message:'At least two side images are required'})
            return
        }
           this.setState({isLoading:true, message:''})
    let amount = 0
    let bathroom = 0
    let bed = 0
    this.state.rooms.forEach(room=>{
        amount += room.price
        bathroom += room.bathroom
        bed += room.bed
    })
    const formData = new FormData();
    formData.append('hostId', this.props.user.id)
    formData.append('name', this.state.title)
    formData.append('description', this.state.description)
    formData.append('featuredImage', this.state.featured_image)
    other_images.forEach(image => {
        formData.append("images", image);
    });
    
    formData.append('amount', amount)
    formData.append('bedroom', bed)
    formData.append('discount', this.state.discount)
    formData.append('smoke', this.state.smoking)
    formData.append('wifi', this.state.wifi)
    formData.append('parking', this.state.parking)
    formData.append('cable', this.state.cable)
    formData.append('bathroom', bathroom)
    formData.append('kitchen', this.state.kitchen)
    formData.append('inside', this.state.inside)
    formData.append('around', this.state.around)
    formData.append('address', this.state.address)
    formData.append('guest', this.state.guest)
    formData.append('type',   this.state.type)
    formData.append('house', this.state.house)
    formData.append('city', this.state.city)
    formData.append('state', this.state.state)
    formData.append('rooms', JSON.stringify(this.state.rooms))
    formData.append('hostData', JSON.stringify({firstname:this.props.user.firstname,lastname:this.props.user.lastname, image:this.props.user.image,phone:this.props.user.phone,email:this.props.user.email}))

addProperty(formData)
.then((res)=>{
    
    this.setState({
        title:'',
        description:'',
        house:'',
        address:'',
        price:'',
        bedroom:1,
        discount:0,
        bathroom:0,
        parking:false,
        wifi:false,
        smoking:false,
        cable:false,
        jaccuzi:0,
        kitchen:false,
        inside:'',
        around:'',
        guest:1,
        featured_image:null,
        type:'house',
        other_images:[],
        city:'',
        state:'',
        success:true,
        rooms:[{room:'', price:'', bed:1,bathroom:0,bookedDates:[]}],
        message:'Submitted successfully',
        isLoading:false
    })
    other_images=[]
    const elements = document.querySelectorAll('.viewing')
    for(let i =0 ; i< elements.length ; i++){
        
        elements[i].remove()

    }
    this.form.reset()
})
.catch(e=>{console.log(e)})

    }
    render(){
        return (
            <>
                <Seo title="Add Crib" />
                <AppHeader/>
                <Backend>
                
                    <Activity loading={this.state.isLoading}/>
                    <div className="property-add-page">
                        <div className="dashboard-mt">
                            <div className="inbox-title">
                                <h4>Add New Crib</h4>
                            </div>
                        </div>

                    </div>

                    {/* <!-- form --> */}
                    <div className="property-form mt40">
                        {
                            !this.props.user.phone&&
                            <div className="profile-info">
                                Profile Information must be updated before you post a property.
                                <Link to={{pathname:'/app/edit-profile'}}>Click here</Link> to update profile.
                            </div>
                        }
                        <form ref={(ref)=>this.form=ref}  onSubmit={event=>{this.onSubmit(event)}} method="post" encType="multipart/form-data">
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


                            <div className="property-group">
                                <div className="featured-image">
                                    <label>
                                        {
                                            this.state.featured_image === null?
                                            <Placeholder/>
                                            :
                                            <img id="img" src={this.state.featured_image} alt="" />  
                                        }
                                            

                                            <input type="file" onChange={this.uploadImage} name="featured" id="image" />
                                    </label>
                                    <label htmlFor="image">Upload featured image</label>
                                </div>
                                
                                <div className="other-images">
                                    <label>
                                        <input type="file" name="images" onChange={this.uploadImages} id="images" />
                                        Upload Viewing image
                                        <div className="add-image">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" fill-opacity="0.87"/>
                                            </svg>
                                        </div>
                                    </label>
                                    {
                                        this.state.other_images.length<2&&
                                        <p className="err-msg">Viewing images must be at least 2</p>
                                    }

                                    <div className="images"></div>
                                </div>
                            </div>
                            <div className="property-groups">
                                <label htmlFor="title">Name</label>
                                <input type="text" onChange={this.changeHandler} maxLength={25} value={this.state.title} onKeyUp={event=>{this.maxStringLength(event,25)}} name="title" id="title" placeholder="E.g: One Bedroom Flat" />
                                <p>25 Characters</p>
                            </div>
                            <div className="property-groups">
                                <label htmlFor="desc">Description</label>
                                <textarea name="description" value={this.state.description} maxLength={500}  onKeyUp={event=>{this.maxStringLength(event,500)}} onBlur={event=>{this.maxStringLength(event,240)}} onChange={this.changeHandler} id="desc" cols="30" rows="10" />
                                <p>500 Characters</p>
                            </div>


                            <div className="property-group">
                                <h3>Property Informaion</h3>
                                <div className="property-group-inner">
                                    <div className="col">
                                        <label htmlFor="state">State</label>
                                        <div className="input">
                                            <select name="state" onBlur={this.changeHandler}  id="state">
                                                <option value="">Select State</option>
                                                {
                                                    states.map((state, i)=>{
                                                        return (
                                                        <option key={i} value={state}>{state}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="city">City</label>
                                        <div className="input">
                                            <input value={this.state.city} placeholder="Eg Benin" name="city" onChange={this.changeHandler}  id="city"/>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="guest">Guest</label>
                                        <div className="input">
                                            <input type="text" onInput={this.onInput.bind()} value={this.state.guest}  onChange={this.changeHandler}  name="guest" id="guest" placeholder="E.g 1" />
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="cat">Address</label>
                                        <div className="input">
                                            <input type="text" onChange={(e)=>{this.changeHandler(e);this.getLocation(e.target.value)}} value={this.state.address}   id="cat" name="address" placeholder="45, Benin/Agbor Road" />
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="property-group-inner">
                                    {/* <div className="col">
                                        <label htmlFor="type">Locality</label>
                                        <div className="input">
                                            <select name="locality" onBlur={this.changeHandler}  id="type">
                                                <option value="">Select Locality</option>
                                                <option value="Egba">Egba</option>
                                                <option value="Ogida">Ogida</option>
                                            </select>
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div> */}

                                    <div className="col">
                                    </div>
                                </div>
                            </div>

                            <div className="property-group-room">
                                <label style={{display:'flex', alignItems:'center'}}>
                                    <h3>Add room</h3>
                                    <button className="add-room" onClick={this.onAdd}>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" fill-opacity="0.87"/>
                                            </svg>
                                    </button>
                                </label>
                                
                                {
                                    this.state.rooms.length>0&&
                                    this.state.rooms.map((room,i)=>(
                                        <div key={i} className="property-group-inner">
                                        <div className="col">
                                            <label htmlFor="room">Room</label>
                                            <div className="input">
                                                <input defaultValue={room.room} onChange={(e)=>{this.onAddRoom(e, i)}} placeholder="Eg Room 1" name={`room${i}`}   />
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="roomPrice">Room Price</label>
                                            <div className="input">
                                                <input type="text" onInput={this.onInputAmount.bind()} defaultValue={room.price} onChange={(e)=>{this.onAddPrice(e, i)}} placeholder="Eg 2000" name={`roomPrice${i}`}   />
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="numberofbeds">Beds</label>
                                            <div className="input">
                                                <input type="text" onInput={this.onInput.bind()} onChange={(e)=>{this.onAddBed(e, i)}} placeholder="Eg 1" defaultValue={room.bed} name={`numberofbeds${i}`}   />
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="bathroom">Bathroom</label>
                                            <div className="input">
                                                <input type="text" onInput={this.onInput.bind()} defaultValue={room.bathroom} onChange={(e)=>{this.onAddBathRoom(e, i)}} placeholder="Eg 0" name={`bathroom${i}`}   />
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                        </div>

                                            <div className="col">
                                            {
                                            i>0&&
                                                <span aria-hidden={true} onClick={()=>this.remove(i)} className='prop-remove'>
                                                    <CancelIcon htmlColor="#C50000"/>
                                                </span>
                                            }
                                            </div>
                                      
                                    </div>
                                    ))
                                }
                            </div>


                            <div className="property-group">
                                <h3>Amenities</h3>

                                <div className="property-group-inner2">
                                    <div className="col">
                                        <label className="checkbox">
                                                <input  type="checkbox" onChange={this.changeType}  name="wifi" id="pool" />
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="pool">Wifi</label>
                                    </div>
                                    <div className="col">
                                        <label className="checkbox">
                                                <input type="checkbox" onChange={this.changeType}  name="parking" id="smoking" />
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="smoking">parking</label>
                                    </div>
                                    <div className="col">
                                        <label className="checkbox">
                                                <input type="checkbox" onChange={this.changeType}  name="smoking" id="jaccuzi" />
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="jaccuzi">Smoke Alarm</label>
                                    </div>
                                    <div className="col">
                                        <label className="checkbox">
                                            <input type="checkbox" onChange={this.changeType}  name="cable" id="water" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="water">Cable Tv</label>
                                    </div>
                                    <div className="col">
                                        <label className="checkbox">
                                            <input type="checkbox" onChange={this.changeType}  name="kitchen" id="kitchen" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="kitchen">Kitchen</label>
                                    </div>
                                </div>
                            </div>
                            <div className="property-groups">
                                    <h3>Accessibility</h3>
                                    <label htmlFor="inside">Getting Inside</label>
                                    <textarea name="inside" value={this.state.inside}  onKeyUp={event=>{this.maxStringLength(event,300)}} onBlur={event=>{this.maxStringLength(event,240)}} onChange={this.changeHandler} id="inside" cols="30" rows="5" />
                                    <p>300 Characters</p>
                                    <label htmlFor="outside">Moving around the space</label>
                                    <textarea name="around" value={this.state.around}  onKeyUp={event=>{this.maxStringLength(event,300)}} onBlur={event=>{this.maxStringLength(event,240)}} onChange={this.changeHandler} id="outside" cols="30" rows="5" />
                                    <p>300 Characters</p>
                                </div>
                                <div className="property-groups">
                                    <h3>Type</h3>
                                    <ul className="prop-type">
                                        {
                                            this.props.propertyTypes.map((amenity,i)=>(
                                            <li key={i}>
                                                <label className="radio">
                                                    {
                                                        <input type="radio" onChange={this.changeHandler} defaultChecked={i===0?true:false}  defaultValue={amenity.name}  name="type" id={amenity._id} />
                                                    }
                                                    <span className="radio-mark"></span>
                                                </label>
                                                <label style={{textTransform:'capitalize'}} htmlFor={amenity._id}>{amenity.name}</label>
                                            </li>
                                            ))
                                        }

                                      
                                    </ul>
                                </div>
                                <div className="property-group">
                                    {
                                        this.props.user.phone?
                                        <button className="add-crib-btn" onClick={this.handleClick(TransitionUp)}>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" fill-opacity="0.87"/>
                                            </svg>
                                            Add Crib
                                        </button>
                                        :
                                        <button type="button" className="add-crib-btn" style={{backgroundColor:"rgb(186, 186, 186)", cursor:'default'}}>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" fill-opacity="0.87"/>
                                            </svg>
                                            Add Crib
                                        </button>
                                       
                                    }
                                </div>
                        </form>
                    </div>
                </Backend>
            </>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user,
    states:state.states,
    propertyTypes:state.propertyTypes
})
const mapDispatchToProps=dispatch=>({
    setPropertyTypes:(payload) => dispatch(setPropertyTypes(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AddProperty));