import React, { Component } from "react";
import '../scss/index.scss';
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Container from '@material-ui/core/Container';
import { Link, withRouter } from "react-router-dom"
import Stays from "../components/stays";
import Trending from "../components/trending"
import IconBox from "../components/iconBox";
import trust from "../images/trust.svg"
import jigsaw from "../images/jigsaw.svg"
import focus from "../images/focus.svg"
import Slide from "../components/slider";
import Explore from "../components/explore";
import cribs from "../images/cribs.svg"
import CancelIcon from "../images/cancelicon.svg"
import Splash from "../components/splash";
import { getFavs, getDates, verified } from "../helpers/helpers";
import  LocationCard from "../components/Cards/LocationCard";
import { connect } from "react-redux";
import { setTrendingAndBestCribs, storeSearchData} from "../state/actions"
import {HomeSkeleton as Skeleton} from "../components/skeleton/index"
import Head from "../components/head";
import { getTrendingAndBestCribs, searchProperties } from "../apis/server";
import Calendar from "../components/calender";
import Guest from "../components/guest";
import Seo from "../components/seo";

import Footer from "../components/footer";

const styles = theme => ({

    title: {
        margin: '40px 0 20px 0',
        fontSize: '28px'
    },
    stays: {
        display: 'grid',

        gridTemplateColumns: 'repeat(4, 24%)',
        gridColumnGap: '1.333%'
    },
    link: {
        color: '#707070',
        textDecoration: 'none',
        marginLeft: 8
    }
})


const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 129px;
    height: 49px;
    background: #005C9F;
    border-radius: 63.5px;
    margin-left: 10px;
    border: 0;
    color: #FCFCFC;
    outline: none;
    cursor:pointer;
`
const SearchButtonText = styled.p`
    font-family: Poppins;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #FCFCFC;
    margin-left: 9px;
`
const Guests = styled.div`
    width: 173px;
    height: 70px;
    background: #FCFCFC;
    border-radius: 42.5px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`


class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            checkIn: '',
            checkOut: '',
            guest: 0,
            adult:0,
            children:0,
            infant:0,
            loading: false,
            pets:false,
            favourites: [],
            days: 1,
            quickSeach:[],
            quickLoading:false
        }
        this.location = React.createRef()
    }
    componentDidMount() {
        getTrendingAndBestCribs()
        .then(cribs=>{
            this.props.setTrendingAndBestCribs(cribs)
        })
        const favourites = getFavs()
        this.setState({
            favourites: favourites,
        })

    }
    setDays = () => {
        const dates = getDates(this.state.checkIn, this.state.checkOut)
        this.setState({ days: dates.length })
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onKeyPres=()=>{
        this.setState({quickLoading:true})
        const data ={
            search:this.state.location,
            limit:4
        }
        searchProperties(data)
        .then(res=>{
            this.setState({quickLoading:false, quickSeach:res})
        }) 
        .catch(e=>{
            this.setState({quickLoading:false})
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.location || !this.state.checkOut || !this.state.checkIn)
            return
        this.setState({ loading: true })
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
        .then((res) => {
            this.props.history.push({
                pathname: '/search',
                search: `?location=${this.state.location}&check-in=${this.state.checkIn}&check-out=${this.state.checkOut}&guest=${this.state.guest}&children=${this.state.children}&adult=${this.state.adult}&infant=${this.state.infant}&pet=${this.state.pet}`
            })
            this.setState({ loading: false })
        })
        .catch(e => {
            this.setState({ loading: false })
        })
    }
    render() {
        
        const { classes, trendingCribs, bestCribs } = this.props
        
        return (
            <>
                <Seo title="Home" />

                <Grid className="home" container justify="center">
                    {
                        this.state.loading &&
                        <Splash />
                    }

                    <div className="showcase">
                        <Head color="#0066FF"  quickSearch={true}/>

                        <div className="showcase__bottom">
                            <img src={cribs} alt="cribs ng for everyone" />

                            <div className="form__wrapper">
                                <LocationCard results={this.state.quickSeach} inputRef={this.location} />
                                <form onSubmit={(e)=>{this.onSubmit(e)}}>
                                    <div className="location">
                                        <input onKeyUp={this.onKeyPres} ref={this.location} value={this.state.location} className='location__input' type="text" name="location" onChange={this.changeHandler} id="" placeholder="Where do you want to lodge?" />
                                        {
                                            this.state.location.length>0&&
                                            <img
                                            onClick={()=>this.setState({location:''}, ()=>{this.location.current.focus()})}
                                            src={CancelIcon}
                                            alt=""
                                            style={{
                                                marginLeft: '5px',
                                                cursor:'pointer'
                                            }} />
                                        }
                                        <label className='location__text' htmlFor="">Location</label>
                                    </div>

                                    <div className="checkin">
                                        <Calendar
                                            top="145%"
                                            right="-27.5vw"
                                            label="Check In"
                                            format="dd/MM/yyyy"
                                            value={this.state.checkIn}
                                            placeholder="Pick Dates"
                                            onChange={(e) => {
                                                if (Date.parse(e) > Date.parse(this.state.checkOut) ||  this.state.checkOut==='')
                                                    this.setState({ checkIn: e, checkOut: e }, () => { this.setDays() })
                                                else
                                                    this.setState({ checkIn: e }, () => { this.setDays() })
                                            }}
                                        />
                                    </div>

                                    <div className="checkin">
                                        <Calendar
                                            top="145%"
                                            right="-15vw"
                                            label="Check Out"
                                            format="dd/MM/yyyy"
                                            placeholder="Pick Dates"
                                            value={this.state.checkOut}
                                            onChange={(e) => { this.setState({ checkOut: e }) }}
                                        />
                                    </div>

                                    <Guests>
                                        <div>
                                        <Guest
                                            caret="-150%"
                                            top="212%"
                                            right="-15vw"
                                            label="Guests"
                                            placeholder="Select guests"
                                            onChange={(e)=>{this.setState({guest:e.adult+e.children, adult:e.adult,children:e.children, infant:e.infant})}}
                                            onCheck={(e)=>this.setState({pets:e})}
                                            checked={this.state.pets}
                                            adult={this.state.adult}
                                            value={this.state.guest}
                                            childrens={this.state.children}
                                            infant={this.state.infant}
                                        />
                                        </div>
                                    </Guests>
                                    <SearchButton  type="submit" >
                                        <svg style={{height:22, width:22}} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 11C0 17.0751 4.92486 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92486 0 0 4.92487 0 11ZM4.76685 10.2454C4.76685 7.30226 7.15323 4.91724 10.0963 4.91724C13.0394 4.91724 15.4244 7.30226 15.4244 10.2454C15.4244 11.136 15.2065 11.9754 14.8202 12.7134C14.8236 12.7126 14.8275 12.7114 14.8309 12.7107L17.2331 15.1143L15.2633 17.0828L12.9443 14.7651C12.9426 14.7613 12.942 14.7569 12.9403 14.7531C12.1173 15.2735 11.142 15.5748 10.0963 15.5748C7.15321 15.5748 4.76685 13.1885 4.76685 10.2454ZM7.13416 10.2454C7.13416 11.8809 8.46074 13.2075 10.0963 13.2075C11.7319 13.2075 13.0571 11.8809 13.0571 10.2454C13.0571 8.60977 11.7319 7.28455 10.0963 7.28455C8.46074 7.28455 7.13416 8.60977 7.13416 10.2454Z" fill="#FCFCFC"/>
                                        </svg>
                                        <SearchButtonText>Search</SearchButtonText>
                                    </SearchButton>
                                </form>
                            </div>
                        </div>

                    </div>

                    <Grid container justify="center" >
                        <Grid item xs={11} md={10} >
                           
                                {
                                    this.props.topTypes.length>=2&&
                                    <>
                                    <Typography classes={{ root: classes.title }} className="head-title" variant="h3">Where would you like to stay?</Typography>
                                    <Grid container spacing={2}>
                                    <Slide
                                        showArrows={false}
                                    >
                                            {
                                                this.props.topTypes.map((type, index)=>(
                                                    <Grid key={index} item xs={12} sm={6} md={3} lg={3} >
                                                        <Stays title={type.name} link={`type=${type.name}`} image={process.env.REACT_APP_BACKEND_URL+'/'+type.image} available={verified(type.total)} color={index === 1?'#DF6C08':(index===2?'':(index===3?'#DF0808':'#000000'))} />
                                                    </Grid>
                                                ))
                                            }
                                        </Slide>
                                    </Grid>
                                    </>
                                }

                            <Typography classes={{root:classes.title}} className="head-title" variant="h3">Trending Cribs</Typography>
                            <div style={{marginBottom:10}}>
                                <Grid  container spacing={2}>
                                <Slide
                                    infinite={true}
                                    showArrows={false}
                                >
                                        
                                        {
                                        trendingCribs.length>0?
                                            trendingCribs.map((property,index)=>{
                                                return (
                                                    <Grid key={index} item xs={12} sm={6} md={3} lg={3} >
                                                    <Link to={this.props.user?`/app/crib/${property._id}`:`/crib/${property._id}`} key={index}>
                                                        <Trending rating={property.reviews}  favourite={this.state.favourites.includes(property._id)} name={`rating${index}`} details={property} color={index === 0?"#00C1C8":index===1?"#08191A":index===2?"#EE2B72":"#C8BB00"}  />   
                                                    </Link>
                                                    </Grid>
                                                )
                                            })
                                            :
                                            [1,2,3.4,5].map((value,i)=>(
                                                <Grid  key={i}  item xs={12} sm={6} md={3} lg={3} >
                                                        <Skeleton />
                                                </Grid>
                                            ))
                                        }
                                    </Slide>
                                   
                                </Grid>
                            </div>
                            {/* {
                                trendingCribs.length>0&&
                                <Link className={classes.link} to={{pathname:'/app/more-cribs', search:'trending'}}>See more</Link>
                            } */}

                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={11} md={10}>
                                <Typography variant="h4" className="head-title" classes={{root:classes.title}}>Best Cribs Recommended For you</Typography>

                            </Grid>
                        </Grid>
                        <Grid container justify="center" className="best-cribs-section">
                            <Grid item xs={11} md={10}>
                                <div>
                                    <Grid style={{position:'relative'}}  container spacing={2}>
                                        <Slide
                                            infinite={true}
                                        >
                                            
                                            {
                                                
                                            bestCribs.length>0?
                                               bestCribs.map((property,index)=>{
                                                    return (
                                                        <Grid key={index} item xs={12} sm={6} md={3} lg={3} >
                                                        <Link to={this.props.user?`/app/crib/${property._id}`:`/crib/${property._id}`} key={index}>
                                                            <Trending rating={property.reviews}  favourite={this.state.favourites.includes(property._id)} name={`rating${index}`} details={property} color={index === 0?"#00C1C8":index===1?"#08191A":index===2?"#EE2B72":"#C8BB00"}  />   
                                                        </Link>
                                                        </Grid>
                                                    )
                                                })
                                                :
                                                [1,2,3.4,5].map((value,i)=>(
                                                    <Grid  key={i}  item xs={12} sm={6} md={3} lg={3} >
                                                            <Skeleton />
                                                    </Grid>
                                                ))
                                            }
                                        </Slide>
                                    </Grid>
                                </div>
                                {/* {
                                    bestCribs.length>0&&
                                    <Link className={classes.link} to={{pathname:'/app/more-cribs', search:'recommended'}}>See more</Link>
                                } */}
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={10}>
                            <Typography variant="h4" className="reason-title" classes={{ root: classes.title }} style={{ marginTop: 90 }} align="center">Reasons to Explore With Us</Typography>
                            <Container >
                                <Grid container justify="center" >
                                    <Grid item xs={12}>
                                        <Grid className="reasons" container justify="center" spacing={6}>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <IconBox 
                                                content="Crib Ng is the most reliable way to guarantee accommodation for your trip. You have the option of
                                                booking your reservation up to one year in advance or booking your reservation within 24 hours of your
                                                trip. And you can rest assured you are getting real-time availability information at your fingertips." 
                                                image={trust} 
                                                name="Reliable" />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <IconBox 
                                                image={focus} 
                                                name="Fast"
                                                content="The Crib Ng platform is user-friendly, making booking fast and easy. We respond to our guests&#39;
                                                complaints and concerns quickly and, in most cases, have all issues resolved the same day." 
                                                 />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <IconBox 
                                                image={jigsaw} 
                                                name="Convenient"
                                                content="Crib Ng is the most convenient way to travel. Whether you are looking for an entire house with the
                                                compound to rent for your ceremony and feel at home or just an apartment to lay your head on a quick
                                                trip, Crib Ng is your go-to partner. And you have the convenience of booking your reservation from your
                                                desktop computer or on your mobile phone." 
                                                 />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>

                            <Typography variant="h4" classes={{ root: classes.title }}>Explore Cribs by City</Typography>
                            <Grid style={{ position: 'relative' }} container>
                                <Explore 
                                    height={274}
                                 />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Footer/>
            </>
        )
    }
}
const mapStateToProps = state => ({
    properties:state.properties,
    user:state.user,
    topTypes:state.topTypes,
    trendingCribs:state.trendingCribs,
    bestCribs:state.bestCribs,
});
const mapDispatchToProps = dispatch => ({
    setTrendingAndBestCribs: (payload) => dispatch(setTrendingAndBestCribs(payload)),
    storeSearchData:(payload)=>dispatch(storeSearchData(payload))
  });
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Index)));
