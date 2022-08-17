import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
// import AppContext from '../state/context';

const RootAdmin = ({component: Component,history, ...rest}) => {
    // const {state} = useContext(AppContext)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
                <>
                {
                    state.userData?
                        state.userData.role === 3?
                        <Redirect to="/admin/dashboard" />
                        :
                        <Redirect to="/app/home" />
                    :
                    <Component {...props} />
                }
                
                </>
            
        )} />
    );
};

export default RootAdmin;