import React from "react";
import {NavLink,withRouter} from "react-router-dom";
import "./sidebar.css";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
// import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
// import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {connect} from "react-redux";
import { chooseDashboard, setUser } from "../../state/actions";
import { changeRole, signOut } from "../../apis/server";
import Switch from "../../components/switch";
import Activity from "../../components/activity";
const Sidebar = ({dashboard,user,chooseDashboard,history, setUser})=>{
    const [open, setOpen]=React.useState(false)
    const [loading, setLoading]=React.useState(false)
    const handClick = React.useCallback((e)=>{
        const dashboardDom = document.getElementsByClassName('dashboard');
        const appbarheader = document.getElementsByClassName('appbarheader');
        const mobileBtn = document.getElementById('mobile-menu');
        if(dashboardDom.length>0 && mobileBtn){
            if(mobileBtn.contains(e.target)){

                if(!open)
                {
                    dashboardDom[0].classList.replace('close', 'open')
                    appbarheader[0].classList.replace('close', 'open')
                }
                else
                {
                    dashboardDom[0].classList.replace('open', 'close')
                    appbarheader[0].classList.replace('open', 'close')
                }
                setOpen(!open)
            }
            
            else if(dashboardDom[0].contains(e.target))
            {
                dashboardDom[0].classList.replace('open', 'close')
                appbarheader[0].classList.replace('open', 'close')
                setOpen(false)
            }
        }
       
    },[open])
    
    const onLogout =()=>{
        setLoading(true)
        signOut()
        .then(()=>{
            setLoading(false)
            setUser(null)
            window.sessionStorage.removeItem('@dash')
            history.push('/')
           
        })
        .catch(e=>{
            setLoading(false)
        })
    }
    const  changeDashboard=()=>{
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
    React.useEffect(()=>{
        document.addEventListener('click', handClick)
        return ()=>{
            document.removeEventListener('click', handClick)
        }
    },[open,handClick])
    return(
        <>
            <Activity loading={loading} />
            <div className="sidebar">
                <div className="sidebar-menu">
                    <div className="app-logo-dashboard">
                        <p className="dashboard-mobile-menu" style={{fontWeight:'bold', whiteSpace:'nowrap'}}>{process.env.REACT_APP_NAME?process.env.REACT_APP_NAME.toUpperCase():'React App'}</p>
                    </div>
                    <ul className="s-menu">
                    {/* {
                                        user&&
                                        <Grid component="label" className="switches" container alignItems="center" spacing={1}>
                                        <Grid item >Switch to Renting</Grid>
                                        <Grid item>
                                            <Switch checked={dashboard} onChange={()=>{changeDashboard()}} name="checkedC" />
                                        </Grid>
                                        </Grid>
                                    } */}
                        <NavLink onClick={Sidebar.active} activeClassName="is-active" to="/app/dashboard"><li><DashboardOutlinedIcon/> Dashboard</li></NavLink>

                        <NavLink onClick={Sidebar.active} activeClassName="is-active"  id="properties" to="/app/cribs"><li><HomeOutlinedIcon/> Cribs </li></NavLink>

                        
                            {/* <NavLink onClick={Sidebar.active}  activeClassName="is-active"  id="inboxes" to="/app/inbox">
                            <li>
                                <EmailOutlinedIcon/>
                                Inbox
                                <span className="i-num">2</span>
                                
                             </li>
                            </NavLink> */}

                        
                        {/* <NavLink  onClick={Sidebar.active}  activeClassName="is-active" to="/app/calendar"><li><EventOutlinedIcon/>Calendar</li></NavLink> */}
                            {
                                dashboard&&
                                <>
                                    <NavLink  onClick={Sidebar.active}  activeClassName="is-active"  to="/app/withdraws"><li><AccountBalanceWalletOutlinedIcon/>Payments</li></NavLink>
                                    {/* <NavLink  onClick={Sidebar.active}  activeClassName="is-active"  to="/app/reviews"><li><AccountTreeOutlinedIcon/>Reviews</li></NavLink> */}
                                </>
                            }
                        <NavLink onClick={Sidebar.active}  activeClassName="is-active" id="profiles"  to="/app/profile"><li><PersonOutlineOutlinedIcon/>Profile</li></NavLink>
                        <NavLink onClick={Sidebar.active}  activeClassName="is-active"   to="/app/settings"><li><SettingsOutlinedIcon/>Settings</li></NavLink>
                        <li className="app-logout">
                            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.72922 10.0123H16.3652C16.9675 10.0123 17.4559 9.52401 17.4559 8.92168C17.4559 8.31934 16.9675 7.83102 16.3652 7.83102H3.72922L5.13936 6.42094C5.5653 5.99508 5.5653 5.30447 5.13936 4.87854C4.71357 4.4526 4.02297 4.4526 3.59696 4.87854L0.325201 8.15029C0.299898 8.17552 0.276049 8.20191 0.253363 8.22954C0.247837 8.23631 0.243111 8.24358 0.23773 8.25049C0.22108 8.27164 0.20472 8.29288 0.189742 8.31527C0.185379 8.32181 0.181816 8.32872 0.177526 8.33534C0.162548 8.35875 0.14786 8.38238 0.134627 8.40703C0.132082 8.4119 0.129974 8.41706 0.127429 8.42194C0.113686 8.44862 0.100453 8.47567 0.0888921 8.50359C0.0874379 8.50701 0.0864199 8.51064 0.0850384 8.51413C0.0731866 8.54351 0.0622073 8.57325 0.0529004 8.60386C0.0516643 8.60771 0.0510099 8.61171 0.0499193 8.61564C0.0411213 8.64567 0.0330504 8.67599 0.02687 8.70704C0.0250523 8.71627 0.0242525 8.72579 0.0225801 8.7351C0.0180721 8.76084 0.013564 8.78658 0.0110192 8.81283C0.00731093 8.84882 0.00549316 8.88518 0.00549316 8.92168C0.00549316 8.95818 0.00731093 8.99453 0.0110192 9.0306C0.013564 9.05721 0.0182175 9.08317 0.0226528 9.10912C0.0242525 9.11814 0.0250523 9.12737 0.02687 9.13632C0.0331232 9.16766 0.0411213 9.19827 0.049992 9.22859C0.0510826 9.23215 0.051737 9.23593 0.0528277 9.23949C0.0622073 9.27025 0.0731866 9.30028 0.0851839 9.32995C0.0864927 9.33315 0.0874379 9.33656 0.0888194 9.33976C0.100453 9.3679 0.113759 9.39509 0.127647 9.42192C0.130046 9.42665 0.132082 9.43159 0.134554 9.43632C0.147933 9.46112 0.162693 9.48496 0.17789 9.5086C0.181962 9.51499 0.185452 9.52176 0.189669 9.52801C0.20472 9.55048 0.221225 9.57185 0.237803 9.59308C0.243111 9.59992 0.247837 9.60712 0.253291 9.61381C0.276049 9.64136 0.299898 9.66783 0.325128 9.69306L3.59688 12.9648C3.80985 13.1779 4.08899 13.2843 4.36812 13.2843C4.64726 13.2843 4.92639 13.1779 5.13929 12.9648C5.56523 12.5389 5.56523 11.8483 5.13929 11.4224L3.72922 10.0123Z" fill="#A60E0E"/>
                            <path d="M15.0783 0C12.1013 0 9.33142 1.4769 7.6689 3.95058C7.33298 4.45046 7.46589 5.12813 7.96578 5.46412C8.46573 5.80004 9.14332 5.66727 9.47939 5.16724C10.7359 3.29749 12.8289 2.18124 15.0783 2.18124C18.7949 2.18131 21.8187 5.20498 21.8187 8.92165C21.8187 12.6383 18.7949 15.662 15.0783 15.662C12.8356 15.662 10.7459 14.5508 9.48848 12.6895C9.15118 12.1904 8.47337 12.0592 7.97414 12.3963C7.47505 12.7336 7.34374 13.4115 7.68097 13.9106C9.34466 16.3732 12.11 17.8433 15.0783 17.8433C19.9977 17.8433 24 13.8411 24 8.92165C24 4.0022 19.9977 0 15.0783 0Z" fill="#A60E0E"/>
                            </svg>
                            <button onClick={onLogout}>Logout</button>
                        </li>
                        <li>
                            <label >Switch to Renting
                                <Switch value={dashboard} onChange={()=>{changeDashboard()}}  />
                            </label>
                        </li>
       
                    </ul>
                    <div className="dashboard-illust">

                    </div>  
                </div>
            </div>
        </>
    )
}

  

  const mapStateToProps=state=>({
      dashboard:state.dashboard,
      user:state.user
  })
  const mapDispatchToProps=dispatch=>({
      chooseDashboard:(payload)=>dispatch(chooseDashboard(payload)),
      setUser:(payload)=>dispatch(setUser(payload))
  })
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Sidebar));