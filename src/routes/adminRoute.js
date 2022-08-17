import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({component: Component,history, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (

                Boolean(state.userData)&&state.userData.role === 3?
                <Component {...props} />
                :
                <Redirect to="/admin/login"/>
            
        )} />
    );
};

export default AdminRoute;