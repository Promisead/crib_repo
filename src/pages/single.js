import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles"
import {
    Grid,
    Button,
    Typography,
    Paper,
    Tabs,
    Tab,
    Divider,
    Avatar,
    Box,
    LinearProgress,
    NativeSelect,
} from '@material-ui/core';
import DetailSlide from "../components/detailSlide";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import OpenInBrowserSharpIcon from '@material-ui/icons/OpenInBrowserSharp';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import BusinessIcon from '@material-ui/icons/Business';
import KingBedIcon from '@material-ui/icons/KingBedOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import BathtubIcon from '@material-ui/icons/BathtubOutlined';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import TvIcon from '@material-ui/icons/Tv';
import WifiIcon from '@material-ui/icons/Wifi';
import Rating from '@material-ui/lab/Rating';
import Calendar from "@material-ui/icons/Today"
import SmokeFreeIcon from '@material-ui/icons/SmokeFree';
import  DatePicker  from "../components/calender/index";
import MapContainer from "../components/map";
import Review from "../components/review"
import { withRouter, Link } from "react-router-dom"
import './../scss/single.scss'
import Splash from "../components/splash";
import PopUP from "../components/popup";
import { getDates, getFav } from "../helpers/helpers";
import CancelIcon from '@material-ui/icons/CancelOutlined';
import Share from "../components/share";
import HostPopUp from "../components/hostPopUp";
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { connect } from "react-redux";
import { setCrib } from "../state/actions";
import { getCribById } from "../apis/server";
import Header from "../components/head";
import Guest from "../components/guest";
import Booking from "../components/booking";
import Footer from "../components/footer";
import Seo from "../components/seo";
const styles = theme => ({
    container: {
        paddingTop: 140,

    },
    formControl: {
        minWidth: 120,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    input: {
        paddingTop: 0,
        marginLeft: 10
    },
    text: {
        color: '#070000'
    },
    title: {
        margin: '40px 0 20px 0',
        fontSize: '28px'
    },
    background: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
    },
    overlay: {
        backgroundColor: '#C8BB00',
        opacity: 0.35,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    overlay1: {
        backgroundColor: '#000000',
        opacity: 0.41,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 3
    },
    root: {
        flexGrow: 1,
        borderRadius: 0,
        marginTop: 30
    },
    payment: {
        minHeight: 500,
        borderRadius: 0,
        backgroundColor: '#F8F8F8'
    },
    checkIn: {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '1px solid #DCDCDC',
        padding: '0px 16px'
    },
    guest: {
        marginTop: 17,
        marginBottom: 17
    },
    position: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 25
    },
    textTitle: {
        marginLeft: 10,
    },
    subTitle: {
        color: '#000000',
        fontWeight: 'bold',
        margin: '23px 0'
    },
    progressBarTitle: {
        color: '#0066FF',
        marginTop: 20,
        fontSize: 13,
        marginBottom: 2
    }
})
const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 8,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 0 : 700],
    },
    bar: {
        borderRadius: 8,
        backgroundColor: '#0066FF',
    },
}))(LinearProgress);

class Single extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            price: 0,
            change: false,
            clear: true,
            selected: [],
            values: '1000',
            rooms: null,
            room: [],
            property: null,
            checkIn: null,
            checkOut: null,
            days: 1,
            open: false,
            triger: false,
            hostTriger: false,
            guest: 1,
            favourite: false,
            loading: true,
            labels: {
                1: ['Mediocre','Not bad at all'],
                2: ['Okey','Good for you'],
                3: ['Good','Popular choice'],
                4: ['Excellent','Exquisite!!'],
                5: ['Excellent','Best for you and family'],
            },
            pet:false,
            adult:1,
            children:0,
            infant:0
        }
        this.propert = null
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    shareOpen = () => {
        this.setState({ triger: true });
    };
    hostOpen = () => {
        this.setState({ hostTriger: true });
    };
    shareClose = () => {
        this.setState({ triger: false });
    };
    hostClose = () => {
        this.setState({ hostTriger: false });
    };
    setDays = () => {
        const dates = getDates(this.state.checkIn, this.state.checkOut)
        this.setState({ days: dates.length })
    }
    onFavourite = () => {
        let favourites = []
        let item = this.props.user?this.props.user.id:'fi'
        let favourite = JSON.parse(window.localStorage.getItem(`@${item}`))
        if (favourite !== null) {
            favourites = [this.state.property._id.replace('/', ''), ...favourite]
        }
        else
            favourites.push(this.state.property._id.replace('/', ''))
        try {
            window.localStorage.setItem(`@${item}`, JSON.stringify(favourites))
            this.setState({ favourite: true })
        }
        catch (e) { }
    }
    onDeleteFavourite = () => {
        try {
            let item = this.props.user?this.props.user.id:'fi'
            let favourites = JSON.parse(window.localStorage.getItem(`@${item}`))
            if (favourites !== null) {
                const newFavourites = favourites.filter(data => data !== this.state.property._id)
                window.localStorage.setItem(`@${item}`, JSON.stringify([...newFavourites]))
            }
            this.setState({ favourite: false })
        }
        catch (e) { }


    }
    componentDidMount() {
        const id = this.props.location.pathname.split('crib')[1].replace('/', '')
        getCribById(id)
            .then(crib => {
                this.props.setCrib(crib)
                const checkIn = new Date(this.props.searchData.checkIn)
                const checkOut = new Date(this.props.searchData.checkOut)
                const dates = getDates(checkIn, checkOut);
                this.setState({ loading: false, days: dates.length, price: crib.amount, property: crib })
            })
        const favourite = getFav(id, this.props.user)
        this.setState({
            favourite: favourite,
            property: this.props.crib,
            guest: this.props.searchData.guest?this.props.searchData.guest:1,
            adult: this.props.searchData.adult?this.props.searchData.adult:1,
            children: this.props.searchData.children?this.props.searchData.children:0,
            infant: this.props.searchData.infant?this.props.searchData.infant:0,
            pet: this.props.searchData.pet?this.props.searchData.pet:false,
            checkIn: this.props.searchData.checkIn?new Date(this.props.searchData.checkIn):new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            checkOut: this.props.searchData.checkOut?new Date(this.props.searchData.checkOut):new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        })
    }
    componentWillUnmount() {
        this.propert = null
    }

    onReserved = (para) => {
        window.sessionStorage.setItem('?' + para.id, JSON.stringify(para))
        this.props.history.push({
            pathname: '/app/payment',
            search: para.id,
            state: para
        })
    }
    onDelete = (id) => {
        let rooms = null
        let amount = 0
        const books = []
        let value = null
        this.state.room.splice(id, 1)
        this.state.room.forEach(room => {
            amount += Number(room.price)
            books.push(...room.bookedDates)
        })
        rooms = {
            price: amount,
            bookedDates: books
        }
        this.state.selected.splice(this.state.selected.indexOf(this.state.property.rooms[id].room), 1)

        if (id >= 1) {
            value = id - 1
        }
        else
            value = id + 1
        if (this.state.room.length < 1) {
            value = '1000'
            this.state.property.rooms.forEach(room => {
                amount += Number(room.price)
                books.push(...room.bookedDates)
            })
            rooms = {
                price: amount,
                bookedDates: books
            }
        }
        this.setState({ room: this.state.room, rooms: rooms, price: amount, values: value })
    }

    onChangeRoom = (item) => {
        let amount = 0
        let books = []
        let rooms = null
        let room = []
        let value = null
        let selected = ''
        if (item.target.value === '1000') {
            this.state.property.rooms.forEach(room => {
                amount += Number(room.price)
                books.push(...room.bookedDates)
            })
            value = item.target.value
            room.push(...this.props.crib.rooms)

        }
        else {
            this.state.room.forEach(room => {
                amount += Number(room.price)
                books.push(...room.bookedDates)
            })
            amount += this.state.property.rooms[item.target.value].price
            books.push(...this.state.property.rooms[item.target.value].bookedDates)
            room.push(this.state.property.rooms[item.target.value])
            value = item.target.value
            selected = this.state.property.rooms[item.target.value].room

        }
        rooms = {
            price: amount,
            bookedDates: books
        }
        this.setState({ change: true, room: [...this.state.room, ...room], rooms: rooms, price: amount, values: value, selected: [...this.state.selected, selected] })

    }
    render() {
        console.log(this.state.pet)
        const { classes } = this.props
        this.propert = this.state.property
        const property = this.propert
        const property_length = property?(property.reviews.length?property.reviews.length:1):1
        let stars = 0;
        if (property)
            property.amount = this.state.price
        const summary = {
            checkIn: this.state.checkIn,
            checkOut: this.state.checkOut,
            nights: this.state.days,
            guest: this.state.guest,
            adult: this.state.adult,
            children: this.state.children,
            infant: this.state.infant,
            pet: this.state.pet,
            amount: property ? Number(property.amount) : 0,
            id: property ? property._id : '',
            name: property ? property.name : '',
            rooms: this.state.room.length < 1 ? property ? property.rooms : [] : this.state.room,
            state: property ? property.state : '',
            city: property ? property.city : '',
            image: property ? property.featuredImage : '',
            firstname: property ? property.host.firstname : '',
            lastname: property ? property.host.lastname : '',
            phone: property ? property.host.phone : '',
            hostEmail: property ? property.host.email : '',
            photoURL: null,
            address: property ? property.address : '',
            hostId: property ? property.hostId : '',
        }
        let checkOut = []
        let checkIn = []
        let dates = []
        
        if (property) {
            let books = []
            property.rooms.forEach((room) => {
                room.bookedDates.forEach(dates=>{
                    books.push(...dates.dates)
                })
            })

            checkOut = books.filter(item => new Date(item).toDateString() === new Date(this.state.checkOut).toDateString())
            checkIn = books.filter(item => new Date(item).toDateString() === new Date(this.state.checkIn).toDateString())
            books.forEach(date => dates.push(new Date(date)))
            dates.sort((a, b) => new Date(b) - new Date(a))


            //get stars
            
            if(property.reviews)
            property.reviews.forEach(rev=>stars +=rev.stars)
        }
        if (this.state.rooms && this.state.change) {

            checkOut = this.state.rooms.bookedDates.filter(item => new Date(item).toDateString() === new Date(this.state.checkOut).toDateString())
            checkIn = this.state.rooms.bookedDates.filter(item => new Date(item).toDateString() === new Date(this.state.checkIn).toDateString())

            this.state.rooms.bookedDates.forEach(date => dates.push(new Date(date)))
            dates.sort((a, b) => new Date(b) - new Date(a))
        }
        if (this.state.loading)
            return <Splash />
        return (
            <>
                <Seo title={property.name} description={`${property.name} ${property.description}`} />
                <Header sticky={true} top={0} color="#0066FF"  bgColor="#CCE0FF"  quickSearch={true} openQuickSearch={true}/>
                <Grid container justify="center" className="page">
                    <Grid item xs={12} md={10} >
                        {
                            property &&
                            <div id="singlepage" className={classes.container}>
                                <Grid container justify="flex-start"  spacing={3}>
                                    <Grid item xs={12} md={8} sm={12}>
                                            <div className="breadcum">
                                                <ul>
                                                    <li>
                                                        <Link to="/" >
                                                            Home
                                                            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.992512 13.3418C0.992055 13.1128 1.07343 12.8908 1.22251 12.7144L5.70251 7.45989L1.38251 2.19557C1.29945 2.09529 1.23741 1.97991 1.19998 1.85606C1.16255 1.73221 1.15046 1.60232 1.1644 1.47387C1.17834 1.34542 1.21803 1.22094 1.28121 1.10758C1.34438 0.99422 1.42979 0.894216 1.53251 0.813317C1.6348 0.731886 1.7525 0.671076 1.87884 0.634381C2.00517 0.597686 2.13767 0.58583 2.26869 0.599495C2.39972 0.613159 2.52671 0.652076 2.64234 0.714006C2.75798 0.775937 2.85999 0.859661 2.94251 0.960366L7.77251 6.84229C7.91959 7.0177 8 7.23772 8 7.46479C8 7.69185 7.91959 7.91188 7.77251 8.08729L2.77251 13.9692C2.68856 14.0685 2.58546 14.1505 2.46912 14.2107C2.35277 14.2708 2.22546 14.3079 2.09448 14.3197C1.96351 14.3316 1.83143 14.3179 1.70583 14.2797C1.58023 14.2414 1.46356 14.1792 1.36251 14.0967C1.2478 14.0054 1.15512 13.8904 1.09115 13.7599C1.02717 13.6294 0.993488 13.4866 0.992512 13.3418Z" fill="#005C9F"/>
                                                            </svg>
                                                        </Link>
                                                    </li>
                                                    {
                                                        this.props.location.state !== undefined&&
                                                        <li>
                                                            <Link to={this.props.location.state}>
                                                                Search results
                                                                <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M0.992512 13.3418C0.992055 13.1128 1.07343 12.8908 1.22251 12.7144L5.70251 7.45989L1.38251 2.19557C1.29945 2.09529 1.23741 1.97991 1.19998 1.85606C1.16255 1.73221 1.15046 1.60232 1.1644 1.47387C1.17834 1.34542 1.21803 1.22094 1.28121 1.10758C1.34438 0.99422 1.42979 0.894216 1.53251 0.813317C1.6348 0.731886 1.7525 0.671076 1.87884 0.634381C2.00517 0.597686 2.13767 0.58583 2.26869 0.599495C2.39972 0.613159 2.52671 0.652076 2.64234 0.714006C2.75798 0.775937 2.85999 0.859661 2.94251 0.960366L7.77251 6.84229C7.91959 7.0177 8 7.23772 8 7.46479C8 7.69185 7.91959 7.91188 7.77251 8.08729L2.77251 13.9692C2.68856 14.0685 2.58546 14.1505 2.46912 14.2107C2.35277 14.2708 2.22546 14.3079 2.09448 14.3197C1.96351 14.3316 1.83143 14.3179 1.70583 14.2797C1.58023 14.2414 1.46356 14.1792 1.36251 14.0967C1.2478 14.0054 1.15512 13.8904 1.09115 13.7599C1.02717 13.6294 0.993488 13.4866 0.992512 13.3418Z" fill="#005C9F"/>
                                                                </svg>
                                                            </Link>

                                                        </li>
                                                    }
                                                    <li>{property.name}</li>
                                                </ul>
                                            </div>
                                        <Grid container>
                                            <Grid className="slide-sided" item md={4}>
                                                <div className={classes.background} id="slideTop" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${property.featuredImage})` }}>
                                                    <div className={classes.overlay}></div>
                                                </div>
                                                <div className={classes.background} id="slideBottom" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${property.images[0]})` }}></div>
                                            </Grid>
                                            <Grid item md={8} xs={12}>
                                                <div className={classes.background} id="slide-cover">
                                                    <div className="overlay"></div>
                                                    <DetailSlide content={[property.featuredImage, ...property.images]} />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Paper elevation={0} className={classes.root}>
                                            <Tabs
                                                value={this.state.value}
                                                onChange={this.handleChange}

                                                centered
                                            >
                                                <a href="#overview">
                                                    <Tab label="Overview" />
                                                </a>
                                                <a href="#amenities">
                                                    <Tab label="Amenities" />
                                                </a>
                                                <a href="#reviews">
                                                    <Tab label="Reviews" />
                                                </a>
                                                <a href="#location">
                                                    <Tab label="Location" />
                                                </a>
                                            </Tabs>
                                            <Box className="sets1" p={3}>
                                                <Typography style={{ marginBottom: 30 }} variant="h4" id="overview">{property.name}</Typography>
                                                <Grid>

                                                    <div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }} >
                                                            <div className={classes.position} >
                                                                <BusinessIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} style={{textTransform:'capitalize'}} variant="subtitle1" component="p">{property.type}</Typography>
                                                            </div>
                                                            <div className={classes.position}>
                                                                <KingBedIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.bedroom} Bedrooms</Typography>
                                                            </div>
                                                        </div>

                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                            <div className={classes.position}>
                                                                <PeopleOutlineIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.guest} Guests</Typography>
                                                            </div>
                                                            <div className={classes.position}>
                                                                <BathtubIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">{property.bathroom} Bathroms</Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Box>
                                            <Box p={3}  className="sets1">
                                                <Divider className="sets1lines" />
                                                <Typography variant="subtitle1" component="p" style={{ margin: '15px 0', fontSize: 15, wordWrap: 'break-word' }}>
                                                    {
                                                        property.description
                                                    }
                                                </Typography>
                                              </Box>
                                              <Box p={3} className="sets1">      
                                                <Typography className={classes.subTitle} id="amenities">
                                                    Amenities
                                    </Typography>
                                                <Grid>
                                                    <div >
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                            <div className={classes.position} style={{ textDecoration: property.kitchen ? 'none' : 'line-through' }} >
                                                                <KitchenIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Kitchen</Typography>
                                                            </div>
                                                            <div className={classes.position} style={{ textDecoration: property.parking ? 'none' : 'line-through' }}>
                                                                <LocalParkingIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Free parking on premises</Typography>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                            <div className={classes.position} style={{ textDecoration: property.wifi ? 'none' : 'line-through' }}>
                                                                <WifiIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">WiFi</Typography>
                                                            </div>
                                                            <div className={classes.position} style={{ textDecoration: property.cable ? 'none' : 'line-through' }}>
                                                                <TvIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Cable TV</Typography>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }} >
                                                            <div className={classes.position} style={{ textDecoration: property.smoke ? 'none' : 'line-through' }}>
                                                                <SmokeFreeIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Smoke Alarm</Typography>
                                                            </div>
                                                            <div className={classes.position} style={{ textDecoration: property.smoke ? 'none' : 'line-through' }}>
                                                                <SmokeFreeIcon htmlColor="#0066FF" fontSize="large" />
                                                                <Typography className={classes.textTitle} variant="subtitle1" component="p">Carbon Monoxide alarm</Typography>
                                                            </div>
                                                        </div>
                                                    </div>

                                               
                                                </Grid>
                                                <Divider />
                                                <Typography className={classes.subTitle}>Bedrooms</Typography>
                                                <Grid id='bedrooms'>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                        {
                                                            property.rooms.map((room, i) => (
                                                                <div key={i}>
                                                                    <div className={classes.position} style={{ marginBottom: 5 }}>
                                                                        <KingBedIcon htmlColor="#0066FF" fontSize="large" />
                                                                        <Typography style={{textTransform:'capitalize'}} className={classes.textTitle} variant="subtitle1" component="p">{room.room}</Typography>
                                                                    </div>
                                                                    <Typography style={{ marginLeft: 32 }} variant="caption" component="p">{room.bed ? (room.bed === 1 ? '1 Bed' : room.bed + ' Beds') : 'No Bed'}</Typography>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </Grid>
                                                
                                                <Typography className={classes.subTitle}>Bathroom</Typography>
                                                <Grid id="bathroom">
                                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', columnGap: '1rem' }}>
                                                        {
                                                            property.rooms.map((room, i) => (
                                                                <div key={i} >
                                                                    <div key={i} className={classes.position} style={{ marginBottom: 5 }}>
                                                                        <BathtubIcon htmlColor="#0066FF" fontSize="large" />
                                                                        <Typography className={classes.textTitle} style={{textTransform:'capitalize'}} variant="subtitle1" component="p">{room.room}</Typography>
                                                                    </div>
                                                                    {

                                                                    room.bathroom > 0 ?
                                                                    <Typography style={{ marginLeft: 32 }} variant="caption" component="p">{ room.bathroom === 1 ? '1 Bath' : room.bathroom + ' Baths' }</Typography>
                                                                    : 
                                                                    <Typography style={{ marginLeft: 32 }} variant="caption" component="p">{'No Bath'}</Typography>
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </Grid>
                                                <Divider style={{ marginTop: 20 }} className="sets1lines" />
                                                </Box>
                                                <Box className="sets1" p={3}>

                                                <Typography className={classes.subTitle}>Accessibility</Typography>
                                                <Grid id="accessibility">
                                                    <div>
                                                        <div>
                                                            <Typography className={classes.textTitle} style={{ marginLeft: 0,paddingBottom: '1rem'  }} variant="subtitle1" component="p">GETTING INSIDE</Typography>
                                                            <Typography variant="caption" component="p">{property.inside}</Typography>
                                                        </div>
                                                        <div>
                                                            <Typography className={classes.textTitle} style={{ marginLeft: 0 ,paddingBottom: '1rem' }} variant="subtitle1" component="p">MOVING AROUND THE SPACE</Typography>
                                                            <Typography variant="caption" component="p">{property.around}</Typography>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                </Box>
                                                <Box p={3} className="sets1">
                                                <Grid container id="availability">
                                                    <Grid item>
                                                        <Typography className={classes.subTitle}>Availability</Typography>
                                                        <Typography style={{marginBottom:40}}>Enter your trip dates for accurate pricing and availability</Typography>
                                                        <Booking bookings={dates}/>
                                                    </Grid>
                                                </Grid>
                                                </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper  className='payment'>
                                            <Grid container justify="center">
                                                <Grid item xs={11}>
                                                    <Grid style={{ marginTop: 10 }} container>
                                                        <Grid item xs={9}>
                                                            <div>
                                                                <Typography style={{ color: '#0066FF', fontWeight: 'bold', display: 'inline-flex' }} variant="h5">‎₦{property.amount}</Typography> avg/night
                                                    </div>
                                                            <Typography variant="subtitle2" style={{ fontSize: 12, marginTop: 15 }} component="p">
                                                                {property.guest} Guests | {property.bedroom} Bedrooms | {property.bedroom} beds | {property.bathroom} Baths
                                                    </Typography>
                                                            <Typography style={{ fontSize: 12 }} variant="subtitle2" component="p">
                                                            {(stars / property_length)>=1?this.state.labels[Math.ceil(stars / property_length)][0]:''} {stars > 0?(stars/property_length).toFixed(2)+'/5 ':'No rating yet'} {(stars / property_length) >= 1?this.state.labels[Math.ceil(stars / property_length)][1]:''}
                                                    </Typography>
                                                            <Rating
                                                                disabled
                                                                name='kls'
                                                                defaultValue={stars / property_length}
                                                                emptyIcon={<StarBorderIcon htmlColor="#fff" fontSize="small" />}
                                                                style={{ fontSize: 15, color: '#000000', margin: '15px 0' }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Grid container spacing={1} alignItems="center">
                                                                <Grid item xs={6}>
                                                                    {
                                                                        !this.state.favourite ?
                                                                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={this.onFavourite}>
                                                                                <FavoriteBorderIcon style={{ fontSize: 32 }} htmlColor="#000000" />
                                                                            </button>
                                                                            :
                                                                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={this.onDeleteFavourite}>
                                                                                <FavoriteIcon style={{ fontSize: 32 }} htmlColor="#EB4F1E" />
                                                                            </button>
                                                                    }

                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography>Save</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={1} alignItems="center">
                                                                <Grid item xs={6}>
                                                                    <button style={{ background: 'transparent', border: 'none' }} onClick={this.shareOpen}>
                                                                        <OpenInBrowserSharpIcon style={{ fontSize: 32 }} htmlColor="#000000" />
                                                                    </button>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography >Share</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {
                                                        (checkIn.length < 1 && checkOut.length < 1) ?
                                                            <Typography style={{ display: 'flex', marginBottom: 6, color: '#4caf50' }} variant="subtitle2" component="p" >Dates Are Available to be Reserved &nbsp;<CheckCircleOutlinedIcon fontSize="small" htmlColor="#0066FF" /></Typography>
                                                            :
                                                            <Typography style={{ display: 'flex', marginBottom: 6, color: '#f44336' }} variant="subtitle2" component="p" >Dates Are Already Reserved, Try Other Dates &nbsp;<CancelIcon fontSize="small" htmlColor="#f44336" /></Typography>
                                                    }
                                                    <form autoComplete="off">
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>
                                                                <div  className="checkinss">
                                                                    <label htmlFor="check-in">
                                                                        <Calendar htmlColor="#0066FF" fontSize="small" />
                                                                    </label>
                                                                    <DatePicker
                                                                        right="-12.5vw"
                                                                        top="140%"
                                                                        className="single"
                                                                        id="check-in"
                                                                        label="Check-In"
                                                                        format="dd/MM/yyyy"
                                                                        value={this.state.checkIn}
                                                                        onChange={(e) => {
                                                                            if (Date.parse(e) > Date.parse(this.state.checkOut))
                                                                                this.setState({ checkIn: e, checkOut: e }, () => { this.setDays() })
                                                                            else
                                                                                this.setState({ checkIn: e }, () => { this.setDays() })
                                                                        }
                                                                        }
                                                                    />
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <div className="checkinss" >
                                                                    <label htmlFor="check-out">
                                                                        <Calendar htmlColor="#0066FF" fontSize="small" />
                                                                    </label>
                                                                    <DatePicker
                                                                        right="0"
                                                                        className="single"
                                                                        top="140%"
                                                                        id="check-out"
                                                                        label="Check-Out"
                                                                        format="dd/MM/yyyy"
                                                                        value={this.state.checkOut}
                                                                        onChange={(e) => { this.setState({ checkOut: e }, () => { this.setDays() }) }}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                        <div className={classes.guest}>
                                                            <div className="checkinss">
                                                                <label htmlFor="check-out">
                                                                    <Calendar htmlColor="#0066FF"  fontSize="small" />
                                                                </label>
                                                                <Guest
                                                                    label="Guests"
                                                                    placeholder="Select guests"
                                                                    onChange={(e)=>{this.setState({guest:e.adult+e.children, adult:e.adult,children:e.children, infant:e.infant})}}
                                                                    onCheck={(e)=>this.setState({pet:e})}
                                                                    checked={this.state.pet}
                                                                    value={this.state.guest}
                                                                    adult={this.state.adult}
                                                                    childrens={this.state.children}
                                                                    infant={this.state.infant}
                                                                />
                                                                {/* <TextField defaultValue={property.guest} onChange={(e) => this.setState({ guest: e.target.value })} className="single" id="guest" label="Guests" variant="outlined" /> */}
                                                            </div>
                                                        </div>
                                                        {
                                                            property.rooms !== undefined &&
                                                            property.rooms.length > 1 &&
                                                            <div className={classes.guest}>
                                                                <div className="checkinss">
                                                                    <label htmlFor="check-out">
                                                                        <KingBedIcon htmlColor="#0066FF" fontSize="small" />
                                                                    </label>
                                                                    <NativeSelect disabled={this.state.room.length===property.rooms.length?true:false} multiple={true} style={{ width: '90%', marginLeft: '10%' }} onChange={this.onChangeRoom} value={this.state.values}>
                                                                        {
                                                                        this.state.room.length<property.rooms.length?
                                                                        <option value={1000}>All</option>
                                                                        :
                                                                        <option value={1000}>Selected all rooms</option>
                                                                        } 
                                                                        {

                                                                            property.rooms.map((room, i) => {
                                                                                if (!this.state.selected.includes(room.room)) {
                                                                                    return (
                                                                                        <option value={i}>{room.room}</option>
                                                                                    )
                                                                                }
                                                                                else
                                                                                    return null
                                                                            })

                                                                        }

                                                                    </NativeSelect>
                                                                </div>
                                                                {
                                                                    this.state.room.length > 0 &&
                                                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
                                                                        {
                                                                            this.state.room.map((room, i) => {
                                                                                return <button onClick={() => this.onDelete(i)} className="cancelBtn" type="button" style={{ border: 'none', margin: 5 }} key={i}>{room.room}</button>
                                                                            })
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={8} className="desktop-total">
                                                                <Typography variant="h5">Total</Typography>
                                                                <Typography variant="caption" component="p">Includes taxes and fees</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="h5" className="desktop-amount" style={{ color: '#FF9C07', textAlign: 'right', fontWeight: 'bold' }}>₦{property.amount * this.state.days}</Typography>
                                                                {
                                                                    (checkIn.length < 1 && checkOut.length < 1) &&
                                                                    <Typography variant="caption" style={{ cursor: 'pointer' }} component="p" onClick={this.handleClickOpen}>view details</Typography>
                                                                }
                                                                <PopUP onReserved={this.onReserved} summary={summary} open={this.state.open} handleClose={this.handleClose} />
                                                                <Share text={property.name + '-' + property.description} url={`${process.env.REACT_APP_BACKEND_URL}/crib/` + property._id.replace('/', '')} triger={this.state.triger} close={this.shareClose} />
                                                                <HostPopUp host={property.host} triger={this.state.hostTriger} close={this.hostClose} />
                                                            </Grid>
                                                        </Grid>
                                                        <div className="book-btn">
                                                            <div className="mobile-amount">
                                                                <Typography variant="h5" style={{ color: '#FF9C07', textAlign: 'right', fontWeight: 'bold' }}>₦{property.amount * this.state.days} ({this.state.days+(this.state.days ===1?' day':' days')})</Typography>
                                                            </div>
                                                        {
                                                            (checkIn.length < 1 && checkOut.length < 1) ?
                                                                <Button  onClick={this.handleClickOpen} style={{ textTransform: 'capitalize', backgroundColor: '#0066FF', width: '100%', borderRadius: 44, color: '#fff', padding: '10px 0', fontSize: 18, marginTop: 15 }} variant="contained" disableElevation>
                                                                    Reserve Now
                                                                </Button>
                                                                :
                                                                <Button style={{ textTransform: 'capitalize', backgroundColor: '#DEDEDE', width: '100%', borderRadius: 44, color: '#707070', padding: '10px 0', fontSize: 18, marginTop: 15 }} variant="disabled" disableElevation>
                                                                    Unavailable
                                                    </Button>
                                                        }
                                                        </div>
                                                        <Divider style={{ marginTop: 15, height: 3, backgroundColor: '#DCDCDC' }} />
                                                        <Typography variant="h6" style={{ textAlign: 'center', color: '#000000', paddingTop: '1rem' }} >Speak to the Host</Typography>
                                                        <div className="desktop-host">
                                                            <Grid container style={{ marginTop: 10, marginBottom: 5 }}>
                                                                <Grid item xs={3}>
                                                                    <Avatar alt={property.host.firstname} style={{ width: 50, height: 50 }} src={process.env.REACT_APP_BACKEND_URL+'/'+property.host.image} />
                                                                </Grid>
                                                                <Grid item xs={9}>
                                                                    
                                                                        <Typography variant="subtitle1" component="p">{property.host.firstname + ' ' + property.host.lastname}</Typography>
                                                                        <button type="button" style={{ background: 'transparent', border: 'none' }} onClick={this.hostOpen}>
                                                                            <Typography style={{ paddingBottom: '1rem' }} variant="caption" component="p">Contact host</Typography>
                                                                        </button>
                                                                


                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                        <div className="mobile-host">
                                                            <button onClick={this.hostOpen} type="button">
                                                                {property.host.firstname + ' ' + property.host.lastname+' '}
                                                                <ArrowForwardIcon/>
                                                            </button>
                                                            <Rating
                                                            disabled
                                                            name='kls'
                                                            defaultValue={3}
                                                            color='#FDB62F'
                                                            iconField='#FDB62F'
                                                            emptyIcon={<StarBorderIcon htmlColor="#fff" fontSize="small" />}
                                                            style={{ fontSize: 15, margin: '15px 0' }}
                                                            
                                                            />
                                                        </div>
                                                    </form>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid container id="location" justify="flex-end">
                                        <Grid item xs={12} md={10}>
                                            <Paper elevation={0} style={{ borderRadius: 0, backgroundColor: "#ECECEC", position: 'relative', minHeight: 1000 }}>
                                                <div className="single-map">
                                                    <MapContainer />
                                                </div>
                                                <Grid container spacing={3} justify="center">

                                                    <Grid item md={5} xs={12}>
                                                        {
                                                            property_length > 0 &&
                                                            
                                                            <>
                                                                <div style={{ marginTop: 570, marginBottom: 26 }}>
                                                                    <Typography className={classes.progressBarTitle}>{(stars / property_length)>=1?this.state.labels[Math.ceil(stars / property_length)][0]:''}</Typography>
                                                                    <BorderLinearProgress variant="determinate" value={((stars/property_length) / 5) * 100} />
                                                                    {/* <Typography className={classes.progressBarTitle}>Good</Typography>
                                                    <BorderLinearProgress variant="determinate" value={50}/>
                                                    <Typography className={classes.progressBarTitle}>Okay</Typography>
                                                    <BorderLinearProgress variant="determinate" value={15}/>
                                                    <Typography className={classes.progressBarTitle}>Mediocre</Typography>
                                                    <BorderLinearProgress variant="determinate" value={7}/> */}
                                                                </div>
                                                                <Grid container >
                                                                    <Grid item md={5}>
                                                                        <Typography variant="h5" style={{ fontWeight: 'bold' }}>{(stars / property_length).toFixed(1)}</Typography>
                                                                        <Typography style={{ fontSize: 12, fontWeight: 500, marginBottom: 17 }} variant="subtitle1" component="p">Overall Rating</Typography>
                                                                        {/* <Typography variant="h5" style={{fontWeight:'bold'}}>4.3</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Amenities</Typography> */}
                                                                    </Grid>
                                                                    {/* <Grid item md={7}>
                                                        <Typography variant="h5" style={{fontWeight:'bold'}}>4.1</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Customer Service</Typography>
                                                        <Typography variant="h5" style={{fontWeight:'bold'}}>3.6</Typography>
                                                        <Typography style={{fontSize:12,fontWeight:500, marginBottom:17}} variant="subtitle1" component="p">Property Condition</Typography>
                                                    </Grid> */}
                                                                </Grid>
                                                            </>
                                                        }
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <Grid container style={{ marginTop: 80 }}>
                                                            <Grid item md={10}>
                                                                {
                                                                    property_length > 0 ?
                                                                        property.reviews.map((item, i) => {
                                                                            return <Review number={i} reviews={property.reviews} data={item} key={i} />
                                                                        })
                                                                        :
                                                                        <Typography>No review for this crib yet!</Typography>
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        }
                    </Grid>
                </Grid>
                <Footer/>
            </>

        )
    }
}
const mapStateToProps = state => ({
    crib: state.crib,
    user: state.user,
    searchData:state.searchData,
})
const mapDispatchToProps = dispatch => ({
    setCrib: (payload) => dispatch(setCrib(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Single)));