import React from "react"
import Avatar from '@material-ui/core/Avatar';
// import LogoutModal from "./logout";
// import { Grid,IconButton} from '@material-ui/core';
import { Grid} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
//import {MiniSearch} from "../components/searchForm"
import { connect } from "react-redux";
import { chooseDashboard, setUser } from "../state/actions";
import "./appHeader.scss"
import PropTypes from "prop-types"
const styles = theme=>({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    menu:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        listStyle:'none'
    },
    menuItems:{
        marginLeft:'15px'
    },
    menuList:{
        fontSize:12
    },
    brand:{
        textDecoration:'none'
    },
    searchItem:{
        color:'#979797'
    },
    app:{
        backgroundColor:'#fff',
    },
    active:{
        color:'#00A8C8',
        fontWeight:'bold'
    },
    inactive:{
        color:'#707070'
    },
})
const AppHeader = ({user, search, onSearch})=>{
    // const [logout, setLogout] = useState(false);
    // const prevOpen = useRef(logout);
    
    // const logoutRef = useRef(null);
    // const toggleLogout = () => {
    //     setLogout((prevOpen) => !prevOpen);
    //   };
    const onChange=(e)=>{
        if(onSearch)
            onSearch(e.target.value)
    }
    // React.useEffect(() => {
    //     if (prevOpen.current === true && logout === false) {
    //       logoutRef.current.focus();
    //     }
    
    //     prevOpen.current = logout;
    //   }, [logout]);
    return(
        <div className="appbarheader close">
            <Grid container justify="center" alignItems="center">
                <Grid item xs={11} lg={10} >
                    <Grid container alignItems="center">
                        <Grid  item xs={7} lg={8} className="app-menu-container">
                            <button style={{background:'transparent', border:'none'}} id="mobile-menu" className="mobile-menu-app" >
                                <MenuIcon htmlColor="rgba(0, 0, 0, 0.24)"/>
                            </button>
                            {
                                search&&
                                <label className="dsearch-input">
                                    <div>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#C4C4C4"/>
                                        </svg>
                                        <input onChange={onChange} placeholder="Search"/>
                                    </div>
                                </label>
                            }
                        </Grid>
                        <Grid item  xs={5} lg={4}> 
                            <Grid container alignItems="center" justify="flex-end">
                            
                                {/* <IconButton
                                ref={logoutRef}
                                aria-controls={logout ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={toggleLogout}
                                style={{marginLeft:40}}
                                > */}
                                {
                                    user&&
                                    <>
                                        {
                                            user.image?
                                            <Avatar style={{ width:25,height:25}} src={process.env.REACT_APP_BACKEND_URL+'/'+user.image} alt="user"/>
                                            :
                                            <Avatar style={{ width:25,height:25}}  alt="">{user.firstname.charAt(0)+user.lastname.charAt(0)}</Avatar>
                                        }
                                    </>
                                }
                                {/* </IconButton>
                                <LogoutModal logout={logout} logoutRef={logoutRef} setLogout={setLogout} /> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
    </div>
    )
}
const mapStateToProps =state=>({
    dashboard:state.dashboard,
    user:state.user
})
const mapDispatchToProps = dispatch => ({
    chooseDashboard: (payload) => dispatch(chooseDashboard(payload)),
    setUser: (payload) => dispatch(setUser(payload))
  });
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AppHeader)))
AppHeader.propTypes = {
    search:PropTypes.bool,
    onSearch:PropTypes.func
}
AppHeader.defaultProps={
    search:false,
    onSearch:null
}