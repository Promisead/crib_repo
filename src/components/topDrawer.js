import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import SearchForm from './searchForm'
import SyncAltIcon from '@material-ui/icons/SyncAlt';

export default function TopDrawer({toggleDrawer,state,location,classes}) {

  return (
    <div>
          <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)}>
            <div className="single-page-search">
                <SearchForm/>
                {
                    location === '/search'&&
                    <ul className="top-drawer-filter" style={{listStyle:'none', display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <li className={classes.searchItem}>Price</li>
                        <li className={classes.searchItem}>Bedrooms</li>
                        <li className={classes.searchItem}>Instant Book</li>
                        <li className={classes.searchItem}>Type of Place</li>
                        <li style={{padding:'5px 15px',boxShadow: '0px 3px 6px #00000029', borderRadius:10, fontSize:10,display:'flex',alignItems:'center'}} className={classes.searchItem}><SyncAltIcon style={{fontSize:16, color:'#270000'}} />More Filters</li>
                    </ul>
                }
            </div>
          </Drawer>
    </div>
  );
}

