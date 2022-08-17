import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles"
import {Select, FormControl,Grid,MenuItem, Typography,Paper} from '@material-ui/core';
import Searchs from "../../components/search"
import Splash from "../../components/splash"
import Explore from "../../components/explore";
import  MapContainer  from "../../components/map";
import {withRouter, Link} from "react-router-dom"
import benin from "../../images/benin.jpeg"
import abuja from "../../images/abuja.jpg"
import lagos from "../../images/lagos.jpg"
import kano from "../../images/kano.jpeg"
import { getDates, getFavs } from "../../helpers/helpers";
import Header from "../../components/head";
import { connect } from "react-redux";
import { search, storeSearchData } from "../../state/actions";
import { searchProperties } from "../../apis/server";
import Footer from "../../components/footer";
import "../../scss/search.scss"
import Pagination from "../../components/pagination";
import Calendar from "../../components/calender";
import Seo from "../../components/seo";
const styles = theme =>({
    container:{
        paddingTop:100
    },
    formControl: {
        minWidth: 120,
        flexDirection:'row',
        alignItems:'flex-start',
      },
    input:{
        paddingTop:0,
        marginLeft:10
    },
    text:{
        color:'#070000'
    },
    title:{
        margin:'40px 0 20px 0',
        fontSize:'28px'
    },
    map:{
        position:'sticky',
        height:400,
        width:'100%',
        borderRadius:0
    }
})
class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            age:'',
            isLoading:true,
            checkIn:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            checkOut:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            guest:1,
            favourites:[],
            page:1,
            totalPages:1,
            location:'',
            days: 1,
            children:0,
            adult:0,
            infant:0,
            pet:false
        }
    }
    componentDidMount(){
        const url =this.props.history.location.search.replace(/%20/g, ' ');
        const params = url.split('&')
        const address = params.filter(address=>address.includes('location')).toString().split('=')[1];
        const checkin = params.filter(checkin=>checkin.includes('check-in')).toString().split('=')[1];
        const checkOut = params.filter(checkOut=>checkOut.includes('check-out')).toString().split('=')[1];
        const guest = parseInt(params.filter(guest=>guest.includes('guest')).toString().split('=')[1]);
        const children = parseInt(params.filter(children=>children.includes('children')).toString().split('=')[1]);
        const infant = parseInt(params.filter(infant=>infant.includes('infant')).toString().split('=')[1]);
        const adult = parseInt(params.filter(adult=>adult.includes('adult')).toString().split('=')[1]);
        const pet = Boolean(params.filter(pet=>pet.includes('pet')).toString().split('=')[1]);
        const page = params.filter(page=>page.includes('page')).toString().split('=')[1];
        const type = params.filter(type=>type.includes('type')).toString().split('=')[1]
        const city = params.filter(city=>city.includes('city')).toString().split('=')[1]
        const favourites = getFavs(this.props.user)
        if(address !== undefined || type !== undefined || city !== undefined){
            let search = city?city:(type?type:address)
            const data = {
                location:search,
                checkIn:checkin,
                checkOut,
                guest,
                infant,
                children,
                adult,
                pet
            }
            
            this.props.storeSearchData(data)
                searchProperties({search:data.location, page:Number(page)})
                .then((res)=>{
                    this.props.search(res.properties)
                    this.setState({
                        isLoading:false,
                        checkOut:checkOut,
                        checkIn:checkin,
                        favourites:favourites,
                        page:Number(page),
                        totalPages:res.totalPages,
                        location:address,
                        infant,
                        children,
                        adult,
                        pet
                    })
                })
                .catch((er)=>{
                    this.setState({
                        isLoading:false,
                        checkOut:checkOut,
                        checkIn:checkin,
                        location:address,
                        infant,
                        children,
                        adult,
                        pet
                    })
                })
        } 
    }
    componentDidUpdate(prevProps, prvState){
        if(prevProps.location !== this.props.location){
            const url =this.props.history.location.search.replace(/%20/g, ' ');
            const params = url.split('&')
            const address = params.filter(address=>address.includes('location')).toString().split('=')[1];
            const checkin = params.filter(checkin=>checkin.includes('check-in')).toString().split('=')[1];
            const checkOut = params.filter(checkOut=>checkOut.includes('check-out')).toString().split('=')[1];
            const guest = parseInt(params.filter(guest=>guest.includes('guest')).toString().split('=')[1]);
            const children = parseInt(params.filter(children=>children.includes('children')).toString().split('=')[1]);
            const infant = parseInt(params.filter(infant=>infant.includes('infant')).toString().split('=')[1]);
            const adult = parseInt(params.filter(adult=>adult.includes('adult')).toString().split('=')[1]);
            const pet = Boolean(params.filter(pet=>pet.includes('pet')).toString().split('=')[1]);
            const page = params.filter(page=>page.includes('page')).toString().split('=')[1];
            const type = params.filter(type=>type.includes('type')).toString().split('=')[1]
            const city = params.filter(city=>city.includes('city')).toString().split('=')[1]
                let search = city?city:(type?type:address)
                const data = {
                    location:search,
                    checkIn:checkin,
                    checkOut,
                    guest,
                    infant,
                    children,
                    adult,
                    pet
                }
                this.props.storeSearchData(data)
                searchProperties({search:data.location, page:Number(page)})
                .then((res)=>{
                    this.props.search(res.properties)
                    this.setState({
                        isLoading:false,
                        checkOut:checkOut,
                        checkIn:checkin,
                        page:Number(page),
                        location:address,
                        infant,
                        children,
                        adult,
                        pet
                    })
                })
                .catch((er)=>{
                    this.setState({
                        isLoading:false,
                        checkOut:checkOut,
                        checkIn:checkin,
                        location:address,
                        infant,
                        children,
                        adult,
                        pet
                    })
                })
        }
    }

    setDays = () => {
        const dates = getDates(this.state.checkIn, this.state.checkOut)
        this.setState({ days: dates.length })
    }
    onSubmit =(e)=>{
        e.preventDefault()
        if(!this.state.location || !this.state.checkOut || !this.state.checkIn)
        return
        this.setState({isLoading:true})
        const data = {
            location: this.state.location,
            checkIn: this.state.checkIn,
            checkOut: this.state.checkOut,
            guest: this.state.guest,
            children:this.state.children,
            adult:this.state.adult,
            infant:this.state.infant,
            pet:this.state.pet,
        }
        this.props.storeSearchData(data)
        searchProperties({search:this.state.location})
        .then(()=>{
            this.setState({isLoading:false})
            this.props.history.push({
                pathname: !this.props.user?'/search':'/app/search',
                search: `?location=${this.state.location}&check-in=${this.state.checkIn}&check-out=${this.state.checkOut}&guest=${this.state.guest}&children=${this.state.children}&adult=${this.state.adult}&infant=${this.state.infant}&pet=${this.state.pet}`
            })
        })
        .catch((er)=>{
            this.setState({isLoading:false})
        })
    }
     handleChange = (event) => {
      this.setState({age:event.target.value});
    };
    onChange = (event) => {
        this.setState({[event.target.name]:event.target.value});
      };

    onNext = (e)=>{
        searchProperties({search:this.state.location, page:e})
        .then((res)=>{
            this.props.search(res.properties)
            this.setState({
                isLoading:false,
                page:e
            })
        })
        .catch(e=>{
            this.setState({
                isLoading:false
            })
        })
    }

    render(){
    const {classes, searches} = this.props
    if(this.state.isLoading)
     return <Splash />
    return(
        <>
            <Seo title="Search" />
            <Header sticky={true} top={0} color="#0066FF"  bgColor="#CCE0FF" quickSearch={true} openQuickSearch={true}/>
            <Grid container justify="center">
                <Grid item xs={11} md={10}>
                    <div id="search-page" className={classes.container}>
                        <Grid container justify="flex-start" style={{position:'relative'}} spacing={3}>
                            <Grid item xs={12} md={6}>
                            <div className="breadcumb">
                                <ul>
                                    <li>
                                        <Link to="/app/home" >
                                            Home
                                            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.992512 13.3418C0.992055 13.1128 1.07343 12.8908 1.22251 12.7144L5.70251 7.45989L1.38251 2.19557C1.29945 2.09529 1.23741 1.97991 1.19998 1.85606C1.16255 1.73221 1.15046 1.60232 1.1644 1.47387C1.17834 1.34542 1.21803 1.22094 1.28121 1.10758C1.34438 0.99422 1.42979 0.894216 1.53251 0.813317C1.6348 0.731886 1.7525 0.671076 1.87884 0.634381C2.00517 0.597686 2.13767 0.58583 2.26869 0.599495C2.39972 0.613159 2.52671 0.652076 2.64234 0.714006C2.75798 0.775937 2.85999 0.859661 2.94251 0.960366L7.77251 6.84229C7.91959 7.0177 8 7.23772 8 7.46479C8 7.69185 7.91959 7.91188 7.77251 8.08729L2.77251 13.9692C2.68856 14.0685 2.58546 14.1505 2.46912 14.2107C2.35277 14.2708 2.22546 14.3079 2.09448 14.3197C1.96351 14.3316 1.83143 14.3179 1.70583 14.2797C1.58023 14.2414 1.46356 14.1792 1.36251 14.0967C1.2478 14.0054 1.15512 13.8904 1.09115 13.7599C1.02717 13.6294 0.993488 13.4866 0.992512 13.3418Z" fill="#005C9F"/>
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        Search results
                                    </li>
                                </ul>
                                <form onSubmit={this.onSubmit}>
                                    <label className="search-inputs">
                                        <button>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 11C0 17.0751 4.92486 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92486 0 0 4.92487 0 11ZM4.76685 10.2454C4.76685 7.30226 7.15323 4.91724 10.0963 4.91724C13.0394 4.91724 15.4244 7.30226 15.4244 10.2454C15.4244 11.136 15.2065 11.9754 14.8202 12.7134C14.8236 12.7126 14.8275 12.7114 14.8309 12.7107L17.2331 15.1143L15.2633 17.0828L12.9443 14.7651C12.9426 14.7613 12.942 14.7569 12.9403 14.7531C12.1173 15.2735 11.142 15.5748 10.0963 15.5748C7.15321 15.5748 4.76685 13.1885 4.76685 10.2454ZM7.13416 10.2454C7.13416 11.8809 8.46074 13.2075 10.0963 13.2075C11.7319 13.2075 13.0571 11.8809 13.0571 10.2454C13.0571 8.60977 11.7319 7.28455 10.0963 7.28455C8.46074 7.28455 7.13416 8.60977 7.13416 10.2454Z" fill="#FCFCFC"/>
                                            </svg>
                                        </button>
                                        <input type="text" name="location" onChange={this.onChange} defaultValue={this.state.location} />
                                    </label>
                                    <div className="search-inputs-dates">
                                        <div>
                                            <Calendar 
                                            label="Check In" 
                                            placeholder="Pick Dates"
                                            value={this.state.checkIn}
                                            onChange={(e) => {
                                                if (Date.parse(e) > Date.parse(this.state.checkOut) ||  this.state.checkOut==='')
                                                    this.setState({ checkIn: e, checkOut: e }, () => { this.setDays() })
                                                else
                                                    this.setState({ checkIn: e }, () => { this.setDays() })
                                            }}
                                            
                                            />
                                        </div>
                                        <div>
                                            <Calendar 
                                            label="Check Out"
                                            placeholder="Pick Dates"
                                            value={this.state.checkOut}
                                            onChange={(e) => { this.setState({ checkOut: e }, () => { this.setDays() }) }}
                                             />
                                        </div>
                                    </div>
                                </form>
                            </div>

                                {
                                    searches.length>0?
                                    <>
                                    <Grid container justify="space-between">
                                    {/* <Grid item>
                                        <p className={classes.text}>1 -30 of 200</p>
                                    </Grid> */}
                                    <Grid item>
                                        <FormControl classes={{root:classes.formControl}}>
                                            <p className={classes.text}>Sort:</p>
                                            <Select
                                            value={this.state.age}
                                            onChange={this.handleChange}
                                            displayEmpty
                                            classes={{root:classes.input}}
                                            >
                                            <MenuItem value={10}>Ascending</MenuItem>
                                            <MenuItem value={20}>Descending</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                {
                                        searches.map((search,index)=>{

                                                return(
                                                    <Searchs rating={search.reviews} favourite={this.state.favourites.includes(search._id)} content={search}   name={`rating${index}`} key={index}/>
                                                )
                                        })
                                    }
                                    <Pagination currentPage={!isNaN(this.state.page)?this.state.page:1}   onNext={(e)=>this.onNext(e)} onPrev={(e)=>console.log(e)} totalPages={this.state.totalPages}/>
                                
                                </>
                                    :
                                    <Grid container justify="space-between">
                                    <Grid style={{marginTop:40}} item>
                                        <p className={classes.text} style={{fontSize:19, color:'#7E7E7E'}}>No crib matches the search</p>
                                    </Grid>
                                </Grid>
                                }
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} className="search-map" classes={{root:classes.map}}>
                                    <MapContainer/>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Typography variant="h4" classes={{root:classes.title}}>Explore Cribs by City</Typography>
                        <Grid style={{position:'relative'}} container>
                        <Explore content={[{name:'Lagos City',image:lagos, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', link:'city=lagos'},{name:'Abuja City',image:abuja, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'city=abuja'},{name:'Kano City', image:kano, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'city=kano'},{name:'Benin City',image:benin, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'city=benin'}]}/>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Footer/>
        </>
    )
}
}
const mapStateToProps=state=>({
    searches:state.searches,
    user:state.user
})
const mapDispatchToProps=dispatch=>({
    search:(payload)=>dispatch(search(payload)),
    storeSearchData:(payload)=>dispatch(storeSearchData(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(Search)));
// class Search extends Component{
//     static contextType = Context
//     constructor(props){
//         super(props)
//         this.state={
//             age:'',
//             isLoading:true,
//             checkIn:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
//             checkOut:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
//             guest:1,
//             favourites:[]
//         }
//     }
//     componentDidMount(){
//         const url =this.props.history.location.search.replace(/%20/g, ' ');
//         const params = url.split('&')
//         const address = params.filter(address=>address.includes('location')).toString().split('=')[1];
//         const checkin = params.filter(checkin=>checkin.includes('check-in')).toString().split('=')[1];
//         const checkOut = params.filter(checkOut=>checkOut.includes('check-out')).toString().split('=')[1];
//                     const guest = parseInt(params.filter(guest=>guest.includes('guest')).toString().split('=')[1]);
            
//         const type = params.filter(type=>type.includes('type'))
//         const city = params.filter(city=>city.includes('city'))
//         const favourites = getFavs()
//         if(address !== undefined){
 
//             const data = {
//                 location:address,
//                 checkIn:checkin,
//                 checkOut,
//                 guest
//             }
//             this.context.setSearch(data)
//             this.context.onLoadSearch(data)
//             .then(()=>{
//                 this.setState({
//                     isLoading:false,
//                     checkOut:checkOut,
//                     checkIn:checkin,
//                     favourites:favourites
//                 })
//             })
//             .catch((er)=>{
//                 this.setState({
//                     isLoading:false,
//                     checkOut:checkOut,
//                     checkIn:checkin
//                 })
//             })
//         }
//         else if(type.length>0){
//             const ty = type[0].split('=')[1]
//             this.context.getPropertiesByType(ty)
//             .then(()=>{
//                 this.setState({
//                     isLoading:false,
//                     favourites:favourites
//                 })
//             })
//         }
//         else if(city.length>0){
//             const cy = city[0].split('=')[1]
//             this.context.getPropertiesByCity(cy)
//             .then(()=>{
//                 this.setState({
//                     isLoading:false,
//                     favourites:favourites
//                 })
//             })
//         }
//     }
//     componentDidUpdate(prevProps){
//         if(prevProps.history.location !== this.props.history.location){
//             const url =this.props.history.location.search.replace(/%20/g, ' ');
//             const params = url.split('&')
//             const address = params.filter(address=>address.includes('location')).toString().split('=')[1];
//             const checkin = params.filter(checkin=>checkin.includes('check-in')).toString().split('=')[1];
//             const checkOut = params.filter(checkOut=>checkOut.includes('check-out')).toString().split('=')[1];
//                         const guest = parseInt(params.filter(guest=>guest.includes('guest')).toString().split('=')[1]);

//                 const data = {
//                     location:address,
//                     checkIn:checkin,
//                     checkOut,
//                     guest
//                 }
//                 // this.context.setSearch(data)
//                 // this.context.onLoadSearch(data)
//                 // .then(()=>{
//                 //     this.setState({
//                 //         isLoading:false,
//                 //         checkOut:checkOut,
//                 //         checkIn:checkin
//                 //     })
//                 // })
//                 // .catch((er)=>{
//                 //     this.setState({
//                 //         isLoading:false,
//                 //         checkOut:checkOut,
//                 //         checkIn:checkin
//                 //     })
//                 // })
//         }
//     }


//      handleChange = (event) => {
//       this.setState({age:event.target.value});
//     };

//     render(){
//     const {classes} = this.props
//     const {state} = this.context

//     return(
//         <>
//             {
//                 this.state.isLoading&&
//                     <Splash />
//             }
//             <Header sticky={true} top={0} color={'#046FA7'} bgColor="#CCE0FF"  quickSearch={true} openQuickSearch={true}/>
//             <Grid container justify="center">
//                 <Grid item xs={11} md={10}>
//                     <div id="search-page" className={classes.container}>
//                         <Grid container justify="flex-start" style={{position:'relative'}} spacing={3}>
//                             <Grid item xs={12} md={6}>

//                                 {
//                                     state.results.length>0?
//                                     <>
//                                     <Grid container justify="space-between">
//                                     <Grid item>
//                                         <p className={classes.text}>1 -30 of 200</p>
//                                     </Grid>
//                                     <Grid item>
//                                         <FormControl classes={{root:classes.formControl}}>
//                                             <p className={classes.text}>Sort:</p>
//                                             <Select
//                                             value={this.state.age}
//                                             onChange={this.handleChange}
//                                             displayEmpty
//                                             classes={{root:classes.input}}
//                                             >
//                                             <MenuItem value={10}>Ascending</MenuItem>
//                                             <MenuItem value={20}>Descending</MenuItem>
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                 </Grid>
//                                     {
//                                         state.results.map((result,index)=>{
//                                             if(this.context.state.searchQuery){
//                                             const checkOut = result.bookedDates.filter(item=>new Date(item.seconds*1000).toDateString() === new Date(this.context.state.searchQuery.checkOut).toDateString())
//                                             const checkIn = result.bookedDates.filter(item=>new Date(item.seconds*1000).toDateString() === new Date(this.context.state.searchQuery.checkIn).toDateString())
//                                             if(checkIn.length<1 && checkOut.length<1)
//                                                 return(
//                                                     <Searchs favourite={this.state.favourites.includes(result.id)} content={result}   name={`rating${index}`} key={index}/>
//                                                 )
//                                             else return ''
//                                              }
//                                              else{
//                                                 return(
//                                                     <Searchs favourite={this.state.favourites.includes(result.id)} content={result}   name={`rating${index}`} key={index}/>
//                                                 ) 
//                                              }
//                                         })
//                                     }
                                
//                                 </>
//                                     :
//                                     <Grid container justify="space-between">
//                                     <Grid style={{marginTop:40}} item>
//                                         <p className={classes.text} style={{fontSize:19, color:'#7E7E7E'}}>No crib matches the search</p>
//                                     </Grid>
//                                 </Grid>
//                                 }
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Paper elevation={0} classes={{root:classes.map}}>
//                                     <MapContainer/>
//                                 </Paper>
//                             </Grid>
//                         </Grid>
//                         <Typography variant="h4" classes={{root:classes.title}}>Explore Cribs by City</Typography>
//                         <Grid style={{position:'relative'}} container>
//                         <Explore content={[{name:'Lagos City',image:lagos, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more', link:'/appcity=lagos'},{name:'Abuja City',image:abuja, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'/appcity=abuja'},{name:'Kano City', image:kano, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'/appcity=kano'},{name:'Benin City',image:benin, description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more',link:'/appcity=benin'}]}/>
//                         </Grid>
//                     </div>
//                 </Grid>
//             </Grid>
//         </>
//     )
// }
// }
// export default withRouter(withStyles(styles)(Search));