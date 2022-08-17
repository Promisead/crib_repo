import React from "react";
import  "./inbox.css"
import {Link} from "react-router-dom"
import Backend from "../app/layout"
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from "@material-ui/core";
class Review extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[],
        }
    }

    componentDidMount(){
    }
    onDisplayUsers = e=>{
        e.preventDefault();
        document.querySelector('.delete-modal').style.display="flex"
    }
    closeModal = e=>{
        e.preventDefault();
        document.querySelector('.delete-modal').style.display="none"
    }
    render(){
        const {users} = this.state
        const inbox = (
            <>
            {users?users.map((user,i)=>{
                return (
                    <tr key={i} className="new">
                    <td>
                        <label htmlFor="radio" className="radio">
                            <input type="checkbox" defaultChecked name="" id="radio"/>
                            <span className="radio-mark"></span>
                        </label>
                    </td>
                    <td>
                        <Link to={`/chat?user=${user.id}`}>6hrs ago</Link>
                    </td>
                    <td>
                        <Link to={`/chat?user=${user.id}`}>{user.name}</Link>
                    </td>
                    <td>
                        <Link to={`/chat?user=${user.id}`}>Hi there, I am writing with regards to the apartme...</Link>
                    </td>
                </tr>
                )
            }):''}
            </>
        )
        return (
            <>
                <Backend>
                    <div style={{paddingTop:120}} className="inbox">
                        <div className="inbox-head dashboard-mt">
                            <div className="inbox-title">
                                <h4>My Inbox</h4>
                            </div>
                            <div className="inbox-icons">
                                <ul className="inbox-menu">
                                    <li style={{marginRight:20}}>
                                        <IconButton>
                                            <SearchIcon  htmlColor="#00A8C8"/>
                                        </IconButton>
                                    </li>
                                    <li>
                                        <IconButton>
                                            <DeleteIcon htmlColor="#00A8C8"/>
                                        </IconButton>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="inbox-body">
                            <table>
                                <tbody>
                                    {inbox}
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Backend>
            </>
        )
    }
}
export default Review;