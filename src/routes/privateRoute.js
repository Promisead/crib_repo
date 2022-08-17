import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

const RentRoute = ({component: Component,history, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => {
            return(


                // state.user && state.user.emailVerified?
                rest.user?
                rest.user.emailVerify?
                    // rest.location.state === undefined?
                    // <Component {...props}  />
                    // :
                    !rest.dashboard?
                    <Component {...props} />
                    :
                    <Redirect to='/app/dashboard' />
                :
                <Redirect to='/verification' />
                :
                <Redirect to={{ pathname: "/login", state: { referer: props.location } }}  />

            
        )}} />
    );
};
const mapStateToProps=state=>({
    user:state.user,
    dashboard:state.dashboard
})
export default connect(mapStateToProps)(withRouter(RentRoute));