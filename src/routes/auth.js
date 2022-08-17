import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const HostRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => {
            return(
            // state.user && state.user.emailVerified?
            //  Boolean(state.userData)?
            
            Boolean(rest.user)?
            rest.dashboard && rest.user.emailVerify?
                <Component {...props} />
                :
                <Redirect to="/app/home"  />
                :
                <Redirect to={{ pathname: "/login", state: { referer: props.location } }}  />
                // :
                // <Redirect to="/verification"  />
            // : <Redirect to={{ pathname: "/login", state: { referer: props.location } }}  />

            // :
            // <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
        )}} />
    );
};
const mapStateToProps=state=>({
    user:state.user,
    dashboard:state.dashboard
})
export default connect(mapStateToProps)(HostRoute);