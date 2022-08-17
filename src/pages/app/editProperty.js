import React from "react";
import {Snackbar, Slide } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Backend from "./layout"
import Activity from '../../components/activity'
import {withRouter} from "react-router-dom"
import {states} from "../../icons/options"
import { connect } from "react-redux";
import { editProperty, getCribById } from "../../apis/server";
import AppHeader from "../../components/appHeader"
import CancelIcon from '@material-ui/icons/CancelOutlined';
import "./add-crib.scss"
import Placeholder from "../../components/placeholder/index"
import Seo from "../../components/seo";

const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }

class EditProperty extends React.Component{
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
            guest:0,
            featured_image:null,
            type:'house',
            other_images:[],
            success:false,
            message:'',
            transition:undefined,
            open:false,
            isLoading:true,
            images:[],
            hostId:'',
            id:'',
            sideLoading:false,
            rooms:[{room:'', price:'',bed:'',bathroom:'',bookedDates:[]}],
            deletedImages:[]
        }
        
    }

    componentDidMount(){
        const dom = document.querySelector('#properties')
        if(dom !== null)
        dom.setAttribute('class', 'is-active')
        const id = this.props.location.pathname.split('edit-crib')[1]
        getCribById(id)
        .then(property=>{
                this.setState({
                    state:property.state,
                    city:property.city,
                    title:property.name,
                    description:property.description,
                    house:property.house,
                    address:property.address,
                    price:property.amount,
                    bedroom:property.bedroom,
                    bathroom:property.bathroom,
                    parking:property.parking,
                    wifi:property.wifi,
                    smoking:property.smoking,
                    cable:property.cable,
                    kitchen:property.kitchen,
                    inside:property.inside,
                    around:property.around,
                    guest:property.guest,
                    featured_image:property.featuredImage,
                    type:property.type,
                    other_images:property.images,
                    isLoading:false,
                    id:id,
                    hostId:property.hostId,
                     rooms:property.rooms
                })
     
        })

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
        let imaged = e.target.files[0]
        if(imaged.type === 'image/png' || imaged.type === 'image/jpeg' || imaged.type === 'image/jpg'){
            if(imaged.size > 2100000){
                this.setState({message:'image must not be more than 2MB',open:true})
                return
            }
            this.getImageUrl(imaged)
        }
        else{
            this.setState({message:'File must be of type PNG, JPEG or JPG',open:true})
            return 
        }
        
    }
    getImageUrl = (image)=>{
        let reader = new FileReader();
        reader.readAsDataURL(image)
        reader.onload = (e)=>{
        image.src=reader.result
        this.state.other_images.push(image);
        this.setState({other_images:this.state.other_images})
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
    deleteImage=(i, image)=>{
        this.state.other_images.splice(i,1)
        
        if(typeof image === 'string')
            this.state.deletedImages.push(image)
        this.setState({other_images:this.state.other_images, deletedImages:this.state.deletedImages})
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

      onAdd=()=>{
         
        let add = this.state.rooms;
        add.push({room:'', price:'', bookedDates:[]});
        this.setState({rooms:add})
    }
    remove=(id)=>{
        this.state.rooms.splice(id,1)
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
        const id = this.props.location.pathname.split('edit-crib')[1].replace('/','')
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



        else if(this.state.other_images.length<2){
            this.setState({message:'At least two side images are required'})
            return
        }
    this.setState({message:'', success:false, isLoading:true})
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
    this.state.other_images.forEach(image => {
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
    formData.append('deletedImages', JSON.stringify(this.state.deletedImages))
    formData.append('hostData', JSON.stringify({firstname:this.props.user.firstname,lastname:this.props.user.lastname, image:this.props.user.image,phone:this.props.user.phone,email:this.props.user.email}))
editProperty(formData,id)
.then(()=>{

    // const images = this.state.other_images.filter(image=>{
    //     if(typeof image === 'string')
    //         return image
    //     return image.src
    // })
    this.setState({
       
        success:true,
        message:'Submitted successfully',
        isLoading:false,
        deletedImages:[],
    })
     })
     .catch(err=>{
         console.log(err)
         this.setState({message:'Failed to submit', isLoading:false})
     })

    }

    render(){
        return (
            <>
                <Seo title={`Edit Crib`} />
               <AppHeader/>
                <Backend>
                
                    <Activity loading={this.state.isLoading}/>
                    <div className="property-add-page">
                        <div className="dashboard-mt">
                            <div className="inbox-title">
                                <h4>Edit Crib</h4>
                            </div>
                        </div>

                    </div>

                    {/* <!-- form --> */}
                    <div className="property-form mt40">
                        <form onSubmit={event=>{this.onSubmit(event)}} method="post" encType="multipart/form-data">
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
                                            <img id="img" src={process.env.REACT_APP_BACKEND_URL+"/"+ this.state.featured_image} alt="" />  
                                        }
                                            {/* <img id="img" src={this.state.featured_image === null? image: process.env.REACT_APP_BACKEND_URL+"/"+ this.state.featured_image} alt="" />   */}
                                                <input type="file" onChange={this.uploadImage} name="featured" id="image" />
                                        </label>
                                        <label htmlFor="image">Upload featured Image</label>
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
                                        <div className="images">
                                            {
                                                this.state.other_images.map((image,i)=>{
                                                    if(image)
                                                    return(
                                                    <div key={i} className="viewing">
                                                        {
                                                            typeof image === 'object'?
                                                            <img src={image.src} alt={`side${i}`} />
                                                            :
                                                            <img src={process.env.REACT_APP_BACKEND_URL+"/"+image} alt={`side${i}`} />

                                                        }
                                                        <div onClick={()=>this.deleteImage(i,image)} aria-hidden="true" ></div>
                                                    </div>
                                                )
                                                return ''
                                            }) 
                                            }
                                        </div>
                                    </div>
                                </div>
                            <div className="property-groups">
                                <label htmlFor="title">Name</label>
                                <input type="text" maxLength={25} onChange={this.changeHandler} defaultValue={this.state.title} onKeyUp={event=>{this.maxStringLength(event,25)}} name="title" id="title" placeholder="E.g: One Bedroom Flat" />
                                <p>25 Characters</p>
                            </div>
                            <div className="property-groups">
                                <label htmlFor="desc">Description</label>
                                <textarea name="description" maxLength={500} defaultValue={this.state.description}  onKeyUp={event=>{this.maxStringLength(event,500)}} onBlur={event=>{this.maxStringLength(event,240)}} onChange={this.changeHandler} id="desc" cols="30" rows="10" />
                                <p>500 Characters</p>
                            </div>

                            <div className="property-group">
                                <h3>Property Informaion</h3>
                                <div className="property-group-inner">
                                    <div className="col">
                                        <label htmlFor="state">State</label>
                                        <div className="input">
                                            <select value={this.state.state}  name="state" onChange={this.changeHandler}  id="state">
                                                <option value="">Select State</option>
                                                {
                                                    states.map((state, i)=>{
                                                        return (
                                                        <option key={i}  value={state}>{state}</option>
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

                            </div>

                            <div className="property-group-room">
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <h3>Add room</h3>
                                    <button type="button" className="add-room" style={{marginLeft:10}} onClick={this.onAdd}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" fill-opacity="0.87"/>
                                        </svg>
                                    </button>
                                </div>
                                
                                {
                                    this.state.rooms.length>0&&
                                    this.state.rooms.map((room,i)=>{
                                        return(
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
                                                <input type="text" onInput={this.onInput.bind()}  defaultValue={room.bed} onChange={(e)=>{this.onAddBed(e, i)}} placeholder="Eg 1"  name={`numberofbeds${i}`}   />
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
                                    )})
                                }
                            </div>


                            <div className="property-group">
                                <h3>Amenities</h3>

                                <div className="property-group-inner2">
                                    <div className="col">
                                        <label className="checkbox">
                                                <input  type="checkbox" checked={this.state.wifi}  onChange={this.changeType}  name="wifi" id="pool" />
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="pool">Wifi</label>
                                    </div>
                                    <div className="col">
                                        <label className="checkbox">
                                                <input type="checkbox" checked={this.state.parking}  onChange={this.changeType}  name="parking" id="smoking" />
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="smoking">parking</label>
                                    </div>
                                    <div className="col">
                                        <label className="checkbox">
                                                <input type="checkbox" checked={this.state.smoking}  onChange={this.changeType}  name="smoking" id="jaccuzi" />
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="jaccuzi">Smoke Alarm</label>
                                    </div>
                                    <div className="col">
                                        <label className="checkbox">
                                            <input type="checkbox" checked={this.state.cable}  onChange={this.changeType}  name="cable" id="water" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="water">Cable Tv</label>
                                    </div>
                                    <div className="col">
                                        <label className="checkbox">
                                            <input type="checkbox" checked={this.state.kitchen}  onChange={this.changeType}  name="kitchen" id="kitchen" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="kitchen">Kitchen</label>
                                    </div>
                                </div>
                            </div>
                            <div className="property-groups">
                                    <h3>Accessibility</h3>
                                    <label htmlFor="inside">Getting Inside</label>
                                    <textarea name="inside" value={this.state.inside} maxLength={300}  onKeyUp={event=>{this.maxStringLength(event,300)}} onBlur={event=>{this.maxStringLength(event,240)}} onChange={this.changeHandler} id="inside" cols="30" rows="5" />
                                    <p>300 Characters</p>
                                    <label htmlFor="outside">Moving around the space</label>
                                    <textarea name="around" value={this.state.around} maxLength={300}  onKeyUp={event=>{this.maxStringLength(event,300)}} onBlur={event=>{this.maxStringLength(event,240)}} onChange={this.changeHandler} id="outside" cols="30" rows="5" />
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
                                                        <input type="radio" onChange={this.changeHandler} checked={amenity.name===this.state.type?true:false}  defaultValue={amenity.name}  name="type" id={amenity._id} />
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
                                    <button className="add-crib-btn" onClick={this.handleClick(TransitionUp)}>
                                        Update Crib
                                    </button>
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
export default connect(mapStateToProps)(withRouter(EditProperty));