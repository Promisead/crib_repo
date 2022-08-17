import React, {createRef} from "react";
import  "./../inbox.css"
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import PanToolIcon from '@material-ui/icons/PanTool';
import PropTypes from "prop-types"
import { 
    IconButton, 
    withStyles,
    InputBase, 
    Grid,
    Typography,
    Avatar,
    Button,
    CircularProgress
 } from "@material-ui/core";
 import Rating from '@material-ui/lab/Rating';
import { fade } from '@material-ui/core/styles';
import AppHeader from "../../../components/head";
import Table, { TableBody, TableHead, TableRow, TableCell } from './../../../components/table/index';
import { getMonthInWord } from "../../../helpers/helpers";
import Modal from "../../../components/modal";
import WithdrawPopUp from "../../../components/withdrawPopup";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { connect } from "react-redux";
import { deleteHistory, getHistoriesByUserId, sendReview } from "../../../apis/server";
import { setHistories } from "../../../state/actions";
import Footer from "../../../components/footer";
import Seo from "../../../components/seo";
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
      trRoot:{
        backgroundColor:'#fff !important',
        cursor:'pointer'
    },
    tdRoot:{
        borderBottom:'none !important'
    },
    tdHead:{
        borderBottomColor:'#DCDCDC !important',
        fontWeight:'bold !important'
    }
})

const StyledRating = withStyles({
    iconFilled: {
      color: '#FCEC0A',
    },
    iconHover: {
      color: '#FCEC0A',
    },
  })(Rating);

const TabPanel=(props)=>{
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  const a11yProps=(index)=> {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
class History extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            histories:[],
            loading:true,
            selected:[],
            deleteStatus:false,
            open:false,
            history:null,
            value:0,
            rating:0,
            review:'',
            labels : {
                0.5: 'Useless',
                1: 'Useless+',
                1.5: 'Poor',
                2: 'Poor+',
                2.5: 'Ok',
                3: 'Ok+',
                3.5: 'Good',
                4: 'Good+',
                4.5: 'Excellent',
                5: 'Excellent+',
            },
            hover:-1,
            reviewLoading:false,
            massage:'',


        }
        this.search = createRef()
        
    }

    componentDidMount(){
        this.onLoadHistories()
    }
    onLoadHistories=()=>{
        getHistoriesByUserId(this.props.user.id)
        .then((histories)=>{
            this.props.setHistories(histories)
            this.setState({loading:false, histories:histories})
        })
    }
	handleClickOpen = (history) => {
		this.setState({open:true, history:history});
      }
    handleClose = () => {
    this.setState({open:false});
    }
    onSearch = (text)=>{
        const histories= this.props.histories.filter(props=>{
            if(props.status === 0)
               props.stat= 'success'
           else if(props.status ===1)
               props.stat='pending'
               const createdAt = new Date(props.createdAt)
           props.create = createdAt.getDate()+' ' + getMonthInWord(createdAt)+', '+ createdAt.getFullYear()+' '+createdAt.getHours()+':'+createdAt.getMinutes()+':'+createdAt.getSeconds()
           let  td = Object.values(props);
           return (td.toString().toUpperCase().indexOf(text.toUpperCase()) > -1)? td:''
         })
        
        this.setState({histories})
    }

    onSelect = (id, checked)=>{
        if(checked)
        this.setState({selected:[...this.state.selected, id]})
        else{
           const selected = this.state.selected.filter(select=> select !== id)
           this.setState({selected:selected})
        }
    }
    handleChange = (event, newValue) => {
        this.setState({value:newValue});
      };
    
    handleChangeIndex = (index) => {
        this.setState({value:index});
      };
    onDelete = ()=>{
       
        if(this.state.selected.length<1)
        return
        this.setState({deleteStatus:true})
        deleteHistory({selected:this.state.selected})
        .then(()=>{
            const histories = this.props.histories.filter(history=>!this.state.selected.includes(history.reference))
            this.props.setHistories(histories)
            this.setState({histories,deleteStatus:false})
        })
        .catch(e=>{
            this.setState({deleteStatus:false})
        })
    }
    onDisplayUsers = e=>{
        e.preventDefault();
        document.querySelector('.delete-modal').style.display="flex"
    }
    closeModal = e=>{
        e.preventDefault();
        document.querySelector('.delete-modal').style.display="none"
    }

    onSendReview=()=>{
        if(this.state.review === '' || this.state.rating === 0)
       {
           this.setState({err:'Rating and review are required.'})
            return false
       }
       this.setState({err:'', reviewLoading:true})
        const {user} = this.props
        const data ={
            name:user.firstname+' '+user.lastname,
            // checkIn:this.state.history.checkIn,
            // checkOut:this.state.history.checkOut,
            image:user.image,
            // propertyID:this.state.history.propertyID,
            // amount:this.state.history.amount,
            review:this.state.review,
            stars:this.state.rating,
            host_id:this.state.history.host_id,
            trans_id:this.state.history._id
            // email:user.email,
            // hostId:
        }
        const property_id = this.state.history.property_id
        sendReview(data, property_id)
        .then(()=>{
            this.onLoadHistories()
            this.handleClose()
            this.setState({review:'',reviewLoading:false, rating:0})
        })
    }
    render(){
        const {history,histories} = this.state
        const inbox = (
            <>
            {histories.length>0?histories.map((history,i)=>{
                const createdAt = new Date(history.createdAt)
                return (
                    <TableRow  key={i}>
                    <TableCell className="history" >
                        <label  htmlFor={history.id} className="radio">
                            <input onChange={(e)=>this.onSelect(history.reference, e.target.checked)}  type="checkbox" value={history._id} name="" id={history._id}/>
                            <span className="radio-mark"></span>
                        </label>
                    </TableCell>
                        <TableCell onClick={()=>{this.handleClickOpen(history)}} style={{textTransform:'capitalize'}} >{history.propertyName}</TableCell>
                        <TableCell onClick={()=>{this.handleClickOpen(history)}} style={{textTransform:'capitalize'}} >{history.amount}</TableCell>
                        <TableCell onClick={()=>{this.handleClickOpen(history)}} style={{textTransform:'capitalize'}} >{history.state}</TableCell>
                        <TableCell onClick={()=>{this.handleClickOpen(history)}} style={{textTransform:'capitalize'}} >{history.city}</TableCell>
                        <TableCell onClick={()=>{this.handleClickOpen(history)}} style={{textTransform:'capitalize'}} >{history.status===0?'Success':'Pending'}</TableCell>
                        <TableCell onClick={()=>{this.handleClickOpen(history)}} style={{textTransform:'capitalize'}} >{createdAt.getDate()+' ' + getMonthInWord(createdAt)+', '+ createdAt.getFullYear()+' '+createdAt.getHours()+':'+createdAt.getMinutes()+':'+createdAt.getSeconds()}</TableCell>
                    </TableRow>
            
                     ) 
            }):''
            }
            </>
        )
        return (
            <>
             <Seo title="Histories" />
            <AppHeader sticky={true} top={0} color="#0066FF"  bgColor="#CCE0FF"  quickSearch={true} openQuickSearch={true}/>
            <Grid container justify ="center">
                { this.state.history&&
                <WithdrawPopUp open={this.state.open} title="" handleClose={this.handleClose} className="history-modal">
                    <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="History" {...a11yProps(0)} />
                    <Tab label="Review" {...a11yProps(1)} />
                    </Tabs>
                    <SwipeableViews
                        axis={this.props.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabPanel value={this.state.value} index={0} dir={this.props.theme.direction}>
                           <p></p>
                           <table>
                               <tr>
                                   <td>Check-in Date</td>
                                   <td>{new Date(history.checkIn).toDateString()}</td>
                               </tr>
                               <tr>
                                   <td>Check-out Date</td>
                                   <td>{new Date(history.checkOut).toDateString()}</td>
                               </tr>
                               <tr>
                                   <td>Amount</td>
                                   <td>{history.amount}</td>
                               </tr>
                               <tr>
                                   <td>Property Name</td>
                                   <td>{history.propertyName}</td>
                               </tr>
                               <tr>
                                   <td>Property City</td>
                                   <td>{history.city}</td>
                               </tr>
                               <tr>
                                   <td>Property State</td>
                                   <td>{history.state}</td>
                               </tr>
                               <tr>
                                   <td>Transaction ID</td>
                                   <td>{history.reference}</td>
                               </tr>
                               {/* <tr>
                                   <td>Total</td>
                                   <td>N 5000</td>
                               </tr> */}
                           </table>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1} dir={this.props.theme.direction}>
                            <div style={{width:'70%', margin:'0 auto'}}>
                                <Avatar style={{width:100,height:100,margin:'20px auto'}} src={this.props.user.image} alt=""/>
                                {
                                    !history.reviews?
                                    <>
                                    <Typography className="rate-title" style={{textAlign:'center' }}>Rate your stay at {history.propertyName}, {history.propertyCity}</Typography>
                                        <div className="rate">
                                            <StyledRating 
                                            name="rating" 
                                            value={this.state.rating}
                                            precision={0.5}
                                            size='large'
                                            emptyIcon={<StarBorderIcon htmlColor="#B2B2B2" fontSize="large" />}
                                            onChange={(event, newValue) => {
                                                this.setState({rating:newValue})
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                this.setState({hover:newHover});
                                            }}
                                            />
                                        </div>
                                        {this.state.rating !== null? <Box className="rate-value" ml={2}>{this.state.labels[this.state.hover !== -1 ? this.state.hover : this.state.rating]}</Box>:
                                            <Box className="rate-value" ml={2}>{' '}</Box>
                                        }
                                        <textarea name="review" onChange={(e)=>this.setState({review:e.target.value})}/>
                                    <div>
                                            {
                                                !this.state.reviewLoading?
                                                <Button onClick={this.onSendReview}>Done</Button>
                                                :
                                                <Button><div className="review"><CircularProgress/></div>Please wait...</Button>
                                            }
                                    </div>
                                    </>
                                    :
                                    <>
                                        <div className="rate">
                                            <StyledRating 
                                            name="rating" 
                                            value={history.reviews.stars}
                                            className='rated-star'
                                            precision={0.5}
                                            size='large'
                                            disabled
                                            emptyIcon={<StarBorderIcon htmlColor="#B2B2B2" fontSize="large" />}
                                            />
                                            <Typography>{history.reviews.review}</Typography>
                                        </div>
                                    </>
                                }

                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </WithdrawPopUp>
                    }
                <Grid item md={11} xs={12} >
                    <div style={{paddingTop:70}} className="inbox">
                        <div className="inbox-head dashboard-mt">
                            <div className="inbox-title">
                                <h4>Your History</h4>
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
                                        onChange={(e)=>this.onSearch(e.target.value)}

                                        inputRef={this.search}
                                        inputProps={{ 'aria-label': 'search' }}
                                        />
                                         <IconButton onClick={()=>this.search.current.focus()}>
                                            <SearchIcon  htmlColor="#0066FF"/>
                                        </IconButton>
                                    </li>
                                    {/* <li style={{marginRight:20}}>
     
                                    </li> */}
                                    <li>
                                        {
                                            this.state.deleteStatus?
                                                <PanToolIcon htmlColor="#0066FF" />
                                            :
                                            <IconButton onClick={this.onDelete}>
                                                <DeleteIcon htmlColor="#0066FF"/>
                                            </IconButton>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div style={{position:'relative'}}  className="inbox-body">
                            
                                <Modal loading={this.state.loading}/>
                                <Table  className="cribs-histories">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell className="history"  >
                                        <label htmlFor="radio" className="radio">
                                            <input type="checkbox"  name="" id="radio"/>
                                            <span className="radio-mark"></span>
                                        </label>
                                        </TableCell>
                                        <TableCell  >Property Name</TableCell>
                                        <TableCell  >Amount</TableCell>
                                        <TableCell  >State</TableCell>
                                        <TableCell  >City</TableCell>
                                        <TableCell  >Status</TableCell>
                                        <TableCell  >Date</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                {inbox}
                                    </TableBody>
                            </Table>
                                {histories.length<1&& <Typography style={{margin:'10px 20px', color:'#979797'}} variant="subtitle2" component="p">No crib history yet</Typography>}
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
                                   
                                {/* </tbody>
                            </table> */}
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Footer/>
            </>
        )
    }
}
const mapStateToProps=state=>({
    histories:state.histories,
    user:state.user
})
const mapDispatchToProps=dispatch=>({
    setHistories:(payload)=>dispatch(setHistories(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{withTheme:true})(History));