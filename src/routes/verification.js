import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//import { getDashboard } from '../helpers/helpers';

const VerifyRoute = ({component: Component,history, ...rest}) => {
    
    return (
        <Route {...rest} render={props => (
                rest.user || rest.computedMatch.params.token !== undefined?
                <Component {...props} />
                    :
                <Redirect to="/register" />
            
        )} />
    );
};

const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps)(VerifyRoute);