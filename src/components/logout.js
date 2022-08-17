import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
// import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {withRouter} from "react-router-dom"
// import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import { Divider } from '@material-ui/core';
import { signOut } from '../apis/server';
import { setUser } from '../state/actions';
import { connect } from 'react-redux';
const styles = () => ({
    item:{
        marginLeft:10
    }
});

const LogoutModal=({logout, logoutRef, setLogout,classes,history, dashboard, setUser})=>{
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setLogout(false);
    }
  }
  const closeLogout = (event) => {
    if (logoutRef.current && logoutRef.current.contains(event.target)) {
      return;
    }

    setLogout(false);
  };

  const onLogout = ()=>{
    signOut()
    .then((res)=>{
      setUser(null)
      window.sessionStorage.removeItem('@dash')
      history.push('/')
    })
  }
  return (
      <div>
        <Popper open={logout} anchorEl={logoutRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={closeLogout}>
                  <MenuList autoFocusItem={logout} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {
                      !dashboard?
                        <>
                          <MenuItem onClick={(e)=>{closeLogout(e); history.push('/app/myprofile')}}>Profile</MenuItem>
                          <MenuItem onClick={(e)=>{closeLogout(e); history.push('/app/favourites')}}>Favourites</MenuItem>
                          <MenuItem onClick={(e)=>{closeLogout(e); history.push('/app/home')}}>Dashboard</MenuItem>
                          <MenuItem onClick={(e)=>{closeLogout(e); history.push('/app/history')}}>History</MenuItem>
                          <Divider/>
                          <MenuItem onClick={(e)=>{closeLogout(e); history.push('/app/setting')}}>Settings</MenuItem>
                          <MenuItem onClick={(e)=>{closeLogout(e)}}>EN</MenuItem>
                          <MenuItem onClick={(e)=>{closeLogout(e); history.push('/app/support')}}>Help and Support</MenuItem>
                          <Divider/>
                          <MenuItem onClick={(e)=>{closeLogout(e); onLogout()}}>Logout</MenuItem>
                        </>
                      :
                        <>
                          <MenuItem onClick={(e)=>{closeLogout(e); history.push('/app/dashboard')}}> Dashboard</MenuItem>
                          <MenuItem onClick={(e)=>{closeLogout(e); history.push('/app/profile')}}> Profile</MenuItem>
                          <MenuItem onClick={(e)=>{closeLogout(e); history.push('/app/settings')}}>Settings</MenuItem>
                          <Divider/>
                          <MenuItem onClick={(e)=>{closeLogout(e); onLogout()}}>Logout</MenuItem>
                        </>

                    }
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}
const mapStateToProps=state=>({
  dashboard:state.dashboard
})
const mapDispatchToProps = dispatch => ({
  setUser: (payload) => dispatch(setUser(payload))
});
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(LogoutModal)))