import React from "react";
import "./404.scss"
import Head from "../components/head";
import Footer from "../components/footer";
import {Link} from "react-router-dom"
import Seo from "../components/seo";


class NotFound extends React.Component{


    render(){
        return (
            <>
                <Seo title="Not Found" />
                <Head top={30} color="#0066FF" />
                <div className="page-notfound">
                    <div className="container">
                        <h3>404</h3>
                        <p>This page is Not Found</p>
                        <Link to="/">Go Back Home</Link>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}
export default NotFound;