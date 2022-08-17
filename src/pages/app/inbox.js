import React, {createRef} from "react";
import  "./inbox.css"
import {Link} from "react-router-dom"
import Backend from "../app/layout"
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, withStyles,InputBase } from "@material-ui/core";
import { fade } from '@material-ui/core/styles';
import Footer from "../../components/footer";
const styles = (theme)=>({
    inputRoot: {
        color: 'inherit',
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
})
class Inbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[],
        }
        this.search = createRef()
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

        // const usersDom = (
        //     <>
        //     {users?users.map((user,i)=>{
        //         return (
        //             <tr key={i}>
        //             <td>
        //                 <Link to={`/chat?user=${user.id}`}>{user.name}</Link>
        //             </td>
        //             <td>
        //                 <Link to={`/chat?user=${user.id}`}>{user.name}</Link>
        //             </td>
        //         </tr>
        //         )
        //     }):''}
        //     </>
        // )
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
                                    <li style={{marginRight:20,position:'relative'}} className={this.props.classes.search}>

                                        <InputBase
                                        placeholder="Search…"
                                        style={{position:'absolute',right:0}}
                                        classes={{
                                            root: this.props.classes.inputRoot,
                                            input: this.props.classes.inputInput,
                                        }}

                                        inputRef={this.search}
                                        inputProps={{ 'aria-label': 'search' }}
                                        />
                                         <IconButton onClick={()=>this.search.current.focus()}>
                                            <SearchIcon  htmlColor="#00A8C8"/>
                                        </IconButton>
                                    </li>
                                    {/* <li style={{marginRight:20}}>
     
                                    </li> */}
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
                                    {/* <tr className="new">
                                        <td>
                                            <label htmlFor="radio" className="radio">
                                                <input type="checkbox" defaultChecked name="" id="radio"/>
                                                <span className="radio-mark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <Link to="/chat">6hrs ago</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Locram Bella</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Hi there, I am writing with regards to the apartme...</Link>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <label htmlFor="unread" className="radio">
                                                <input type="checkbox" name="" id="unread" />
                                                <span className="radio-mark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <Link to="/chat">24 weeks ago</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Locram Bella</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Hi there, I am writing with regards to the apartme...</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="btn1" className="radio">
                                                <input type="checkbox" name="" id="btn1" />
                                                <span className="radio-mark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <Link to="/chat">24 weeks ago</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Locram Bella</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Hi there, I am writing with regards to the apartme...</Link>
                                        </td>
                                    </tr> */}
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Backend>
                <Footer/>
            </>
        )
    }
}
export default withStyles(styles)(Inbox);