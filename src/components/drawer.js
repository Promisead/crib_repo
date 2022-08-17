import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeWorkIcon from '@material-ui/icons/HomeWorkOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link} from "react-router-dom"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
});

export default function SideBar({toggleDrawer,state}) {
  const classes = useStyles();


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button>
            <ListItemText primary={<p style={{fontSize:29,color:'#00A8C8'}}>{process.env.REACT_APP_NAME}</p>} />
          </ListItem>

        <Link to={'/accommodation'}>
            <ListItem button>
                <ListItemIcon> <HomeWorkIcon htmlColor="#046FA7" /></ListItemIcon>
                <ListItemText primary={<p style={{color:'#046FA7'}}>Host Accommodation</p>} />
            </ListItem>
        </Link>
        <Link to={'/register'}>
        <ListItem button>
           
                <ListItemIcon> <LockOutlinedIcon htmlColor="#046FA7" /></ListItemIcon>
                <ListItemText primary={<p style={{color:'#046FA7'}}>Signup</p>} />

        </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
    </div>
  );
}

