import React, { createRef, Component} from "react"
import { Link, NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types"
import NavButton from "./Button/NavButton";
import "../scss/header.scss"
import Form from "./headerSearch";
import { connect } from "react-redux";
import { chooseDashboard, setUser } from "../state/actions";
import { changeRole, makeHost, signOut } from "../apis/server";
import Modal from "./modal/index";
import Dmodal from "./modal/dmodal";
import Switch from "./switch";
import Activity from "./activity";
import {Avatar, IconButton} from "@material-ui/core"

class Head extends Component{

        state={
            colors:this.props.top === 45?'#fff':this.props.color,
            headerColor:'#046FA7',
            width:0,
            open:false,
            menu:false,
            openModal:false,
            isLoading:false
        }
        refs = createRef()
        //form = createRef()
        btn = createRef()

     becomeHost = ()=>{
         const history = this.props.history
         this.setState({isLoading:true})
        makeHost(this.props.user.id)
        .then((res)=>{
            this.props.chooseDashboard(!this.props.dashboard)
            this.props.setUser(res.user)
            this.setState({isLoading:false})
            if(history.location.pathname.includes('crib') || history.location.pathname.includes('search') || !history.location.pathname.includes('payment') || history.location.pathname.includes('history'))
            history.push('/app/dashboard')
            else
            history.push(history.location.pathname+history.location.search)
        })
        .catch((e)=>{
            console.log(e)
            this.setState({isLoading:false})
        })
    }
    changeDashboard=()=>{
        const {chooseDashboard, user, dashboard,history}=this.props
        chooseDashboard(!dashboard)
        changeRole(user.id, {role:!dashboard})
        .then((res)=>{
        })
        .catch((e)=>{
            console.log(e)
        })
            if(dashboard)
            {
                if(history.location.pathname.includes('calendar') || history.location.pathname.includes('inbox') || history.location.pathname.includes('dashboard') || history.location.pathname.includes('withdraw') || history.location.pathname.includes('reviews') || history.location.pathname.includes('cribs') || history.location.pathname.includes('add-crib') || history.location.pathname.includes('edit-crib'))
                history.push('/app/home')
                else
                history.push(history.location.pathname+history.location.search)
            }
            else
            {
                if(history.location.pathname.includes('crib') || history.location.pathname.includes('search') || !history.location.pathname.includes('payment') || history.location.pathname.includes('history'))
                history.push('/app/dashboard')
                else
                history.push(history.location.pathname+history.location.search)
            }
         }
    onOpen = ()=>{
        this.setState({width:47, open:true, headerColor:'#fff'})
    }
    onOpenModal =()=>{
        this.setState({openModal:!this.state.openModal})
    }
    onCloseModal =(e)=>{
        this.setState({openModal:e})
    }

handleClick=(e)=>{
    // console.log(this.form.current.contains(e.target), e.target, this.form.current)
    //     if(!isDescendant(this.form.current, e.target) && this.state.width>0){
    //         // if(!this.props.openQuickSearch)
    //         // this.setState({width:15, open:false, headerColor:'#046FA7'})
           
    //    }
      
}
onCloseSearch=()=>{
    if(!this.props.openQuickSearch)
    this.setState({width:15, open:false, headerColor:'#046FA7'})
}
handleScroll = () => {
    const position = window.pageYOffset;

    if(position >=this.props.top){
        if(position > this.props.top)
        this.refs.classList.replace('close', 'open')
        else
        this.refs.classList.replace('open', 'close')
        this.setState({colors:this.props.color})
        if(this.state.width <15 && this.props.quickSearch){
            // setWidth(15)
            // setOpen(false)
            this.setState({width:15, open:false, headerColor:'#046FA7'})
            //setHeaderColor('#046FA7')
        }
      
    }
    else{
        // this.refs.style.backgroundColor='transparent'
        this.refs.classList.replace('open', 'close')
        this.setState({width:0, colors:this.props.top===45?'#fff':this.props.color})
    }
}
    openMenu=()=>{
        this.setState({menu:true})
    }
    closeMenu=()=>{
        this.setState({menu:false})
    }

//logout user
onLogout = ()=>{
    this.setState({isLoading:true})
    signOut()
    .then((res)=>{
      this.props.setUser(null)
      this.setState({isLoading:false})
      window.sessionStorage.removeItem('@dash')
      this.props.history.push('/')
    })
  }


    componentDidMount(){
                if(this.props.quickSearch && this.props.openQuickSearch){
                    this.onOpen()
        }
        window.addEventListener('click',this.handleClick)
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('click', this.handleClick);
    }
 

    render(){
        const {user, bgColor} =this.props
        const {headerColor, colors,open,width}=this.state
    return(
        <>
            <Activity loading={this.state.isLoading}/>
        <div className="showcase__container">
        <div ref={(ref)=>this.refs=ref} className={`showcase_head close ${bgColor?'bg':''}`} style={{position:'fixed', top:0}}>
            <div  className="showcase__header">
            <div className="showcase__logo">
                <Link style={{color: colors}} to="/">Crib NG</Link>
            </div>
            <div>
              <Form onClose={this.onCloseSearch} width={width} color={headerColor} open={open} onClick={this.onOpen}/>
            </div>
            <nav className="showcase__nav">
                    {
                        user?
                            !user.emailVerify?
                        <NavButton
                            color={colors}
                            border
                            borderColor={colors}
                            borderRadius={27}
                            height='44'
                            width='180'
                            borderWidth={2}
                            marginRight='3rem'
                            href="/host-login"
                        >
                            Host Accomodation
                        </NavButton>
                            :''
                        :
                        <NavButton
                        color={colors}
                        border
                        borderColor={colors}
                        borderRadius={27}
                        height='44'
                        width='180'
                        borderWidth={2}
                        marginRight='3rem'
                        href="/host-login"
                        >
                            Host Accomodation
                        </NavButton>
                    }
                    {
                        user?
                            user.emailVerify?
                                <div className="avatar-pro">
                                        <IconButton  onClick={this.onOpenModal}>
                                            {
                                                user.image?
                                                <Avatar className="avatar-img"  src={process.env.REACT_APP_BACKEND_URL+'/'+user.image}/>
                                                :
                                                <Avatar className="avatar-img" />
                                            }
                                           
                                        </IconButton>
                                    <Dmodal
                                        open={this.state.openModal}
                                        onClose={this.onCloseModal}
                                    >

                                    <ul>
                                        <li>
                                            <NavLink to="/app/home">Dashboard</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/history">History</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/favourites">Favourites</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/myprofile">Profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/setting">Settings</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/support">Help and Support</NavLink>
                                        </li>
                                        <li>
                                            {
                                            user.type ==='host'?
                                            <div className="choice-switch">
                                                {/* <span style={{color:!this.props.dashboard?'#0066FF':'#C4C4C4'}}>Renting</span> */}
                                                <Switch color={'#0066FF'} trackBorder={'1px solid #0066FF'} onChange={this.changeDashboard} trackColor={'#EEECF1'} value={this.props.dashboard}/>
                                                <span>Switch to Hosting</span>

                                            </div>
                                            :
                                            <button className="become-host" onClick={this.becomeHost}>Become a host</button>
                                            }
                                        </li>
                                        <li>
                                            <button onClick={this.onLogout} type="button">Logout</button>
                                        </li>
                                    </ul>
                                    </Dmodal>
                                </div>
                                :
                                <NavButton
                                color='#fff'
                                backgroundColor='#046FA7'
                                border
                                borderRadius={27}
                                height='44'
                                width='106'
                                href="/login"
                                    
                                >
                                    Sign in
                                </NavButton>
                                :
                                <NavButton
                                color='#fff'
                                backgroundColor='#046FA7'
                                border
                                borderRadius={27}
                                height='44'
                                width='106'
                                href="/login"
                                
                                >
                                    Sign in
                                </NavButton>
                    
                    }
                </nav>
            <button   onTouchStart={this.openMenu} onClick={this.openMenu} id="hamburger" className="hamburger">
                <span className="hamburger"   style={{backgroundColor:this.props.top>30 && !this.state.width ?'#fff':colors}} ></span>
                <span className="hamburger" style={{backgroundColor:this.props.top>30 && !this.state.width ?'#fff':colors}}  ></span>
                <span className="hamburger" style={{backgroundColor:this.props.top>30 && !this.state.width ?'#fff':colors}}  ></span>
            </button>
        </div>


        
    </div>

    <Modal onOpen={this.state.menu}  closeMenu={this.closeMenu} >
                <nav className="showcase__nav">
                    {
                        user?
                            !user.emailVerify?
                        <NavButton
                            color={colors}
                            border
                            borderColor={colors}
                            borderRadius={27}
                            height='44'
                            width='180'
                            borderWidth={2}
                            marginRight='3rem'
                            href="/host-login"
                        >
                            Host Accomodation
                        </NavButton>
                            :''
                        :
                        <NavButton
                        color={this.props.color}
                        border
                        borderColor={this.props.color}
                        borderRadius={27}
                        height='44'
                        width='180'
                        borderWidth={2}
                        marginRight='3rem'
                        href="/host-login"
                        >
                            Host Accomodation
                        </NavButton>
                    }
                    {
                        user?
                            user.emailVerify?
                                <div >
                                    <ul>
                                        <li>
                                            <Link to="/app/home">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to="/app/history">History</Link>
                                        </li>
                                        <li>
                                            <Link to="/app/favourites">Favourites</Link>
                                        </li>
                                        <li>
                                            <Link to="/app/myprofile">Profile</Link>
                                        </li>
                                        <li>
                                            <Link to="/app/setting">Settings</Link>
                                        </li>
                                        <li>
                                            <Link to="/app/support">Help and Support</Link>
                                        </li>
                                        <li>
                                            {
                                            user.type ==='host'?
                                            <div className="choice-switch">
                                                {/* <span style={{color:!this.props.dashboard?'#0066FF':'#C4C4C4'}}>Renting</span> */}
                                                <Switch color={'#0066FF'} trackBorder={'1px solid #0066FF'} onChange={this.changeDashboard} trackColor={'#EEECF1'} value={this.props.dashboard}/>
                                                <span>Switch to Hosting</span>

                                            </div>
                                            :
                                            <button className="become-host" onClick={this.becomeHost}>Become a host</button>
                                            }
                                        </li>
                                        <li>
                                            <button onClick={this.onLogout} type="button">Logout</button>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <NavButton
                                color='#fff'
                                backgroundColor='#046FA7'
                                border
                                borderRadius={27}
                                height='44'
                                width='106'
                                href="/login"
                                    
                                >
                                    Sign in
                                </NavButton>
                                :
                                <NavButton
                                color='#fff'
                                backgroundColor='#046FA7'
                                border
                                borderRadius={27}
                                height='44'
                                width='106'
                                href="/login"
                                
                                >
                                    Sign in
                                </NavButton>
                    
                    }
                </nav>
            </Modal>

    </div>
    </>
    )
}
}
const mapStateToProps=state=>({
    user:state.user,
    dashboard:state.dashboard
})
const mapDispatchToProps=dispatch=>({
    chooseDashboard:(payload)=>dispatch(chooseDashboard(payload)),
    setUser: (payload) => dispatch(setUser(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Head));

Head.propTypes = {
    top:PropTypes.number,
    searchWidth:PropTypes.bool
  };
Head.defaultProps={
    top:45,
    searchWidth:true
}