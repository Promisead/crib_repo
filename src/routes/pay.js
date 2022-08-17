import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PayRoute = ({component: Component,history, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            <Redirect to={{ pathname: "/login", state: { referer: props.location } }} />
            
        )} />
    );
};

export default PayRoute;