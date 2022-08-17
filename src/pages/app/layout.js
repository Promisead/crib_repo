import React from "react";
import Sidebar from "./sidebar"
import "./layout.css"
import PropTypes from "prop-types"

const Layout = ({children})=>{
    return (
        <div className="site">
            <div className="dashboard close">
                <aside>
                    <Sidebar />
                </aside>
              
                <div className="dashboard-content">
                    
                    <div className="dashboard-main">
                        <main>{children}</main>
                    </div>
                </div>
            </div>

        </div>
    )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
  }
export default Layout;