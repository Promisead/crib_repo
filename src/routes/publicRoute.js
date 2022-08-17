import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux"
// import AppContext from '../state/context';
// import { getDashboard } from '../helpers/helpers';

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props =>{ 
            return(
            rest.user?
            rest.user.emailVerify?
                rest.location.state === undefined?
                    rest.dashboard?
                    <Redirect to={'/app/home'} />
                    :
                    <Redirect to={'/app/dashboard'} />
                :
                <Redirect to={{pathname:rest.location.state.referer.pathname, search:rest.location.state.referer.search}} />

            :
            <Component {...props} />
            :
            <Component {...props} />
            )}} />
    );
};
const mapStateToProps=state=>{
    return state
}
export default connect(mapStateToProps)(PublicRoute);