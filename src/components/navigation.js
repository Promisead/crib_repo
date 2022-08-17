import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
// import Header from './header';
import Root from "../routes/root";
import ScrollTop from "./scrollTop";
// import AppContext from "../state/context";
// import Splash from "./splash";

const Navigation =()=>{
    // const {state} = useContext(AppContext)
    return(
        <Router>
            {
                // state.initializing && state.userData === undefined?
                // <Splash/>
                // :
                <>
                    {/* <Header/> */}
                        <ScrollTop>

                                <Root user={null}/>

                        </ScrollTop>
                   
                </>
            }
        </Router>
    )
}
export default Navigation;