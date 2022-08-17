import React from "react";
import "./inbox.css"
import {Link} from "react-router-dom"
import Layout from "./layout"
import {
    withStyles,
    Grid,
    Fab,
    Snackbar, Slide,
    IconButton,
    Typography,
} from "@material-ui/core"
import {Alert} from "@material-ui/lab"
import AddIcon from "@material-ui/icons/Add"
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import AppHeader from "../../components/appHeader"
import { currency } from "../../helpers/helpers";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { deleteProperty, getProperties } from "../../apis/server";
import { setProperties } from "../../state/actions";
import  Table, { 
    TableHead,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    TableContainer
} from "../../components/table/index"
import ActionDialog from "../../components/action-dialog";
import { TableDataSkeleton } from "../../components/skeleton";
import Seo from "../../components/seo";

const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }

  


export const styles = (theme)=>({

    btn:{
        width:36,
        height:36, 
        marginLeft:theme.spacing(2)
    },
    btnRoot:{
        backgroundColor:'#00A8C8',
        color:'#fff'
    },
    trRoot:{
        backgroundColor:'#fff !important'
    },
    tdRoot:{
        borderBottom:'none !important'
    },
    tdCell:{
        minWidth:120
    }
})

class Properties extends React.Component{
    constructor(prop){
        super(prop)
        this.state ={
            property:[],
            properties :[],
            page:1,
            rowsPerPage:10,
            loading:true,
            success:false,
            message:'',
            transition:undefined,
            open:false,
            dialogOpen:false,
            deleted:{},
            index:'',
            actionDialog:false,
            actionDom:undefined,
            search:''
        }
    }
    componentDidMount(){
        getProperties(this.props.user.id)
        .then(properties=>{
            this.props.setProperties(properties)
            this.setState({loading:false, properties})
        })

    }
    handleClick = (Transition) => () => {
        this.setState({transition:Transition, open:true})
        };
    handleCloseSnackBar = (event,reason) => {
        if (reason === 'clickaway') {
            return;
          }
        this.setState({open:false})
        }
    handleClickOpen = (Transition, crib,i) => {
        this.setState({dialogOpen:true, deleted:crib,transition:Transition,index:i});
        };
    
    handleClose = () => {
        this.setState({dialogOpen:false});
    };
    changeHandler =e=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onDelete=()=>{
        this.setState({loading:true,success:false})
        deleteProperty(this.state.deleted._id)
        .then(()=>{
            console.log('dome')
            this.props.properties.splice(this.state.index, 1)
            this.props.setProperties(this.props.properties)
            this.setState({loading:false, message:'Deleted Successfully',success:true, properties:this.props.properties})
        })
    }
    handleChangePage = (newPage) => {
		this.setState({page:newPage});
	  };
	handleChangeRowsPerPage = (event) => {
		this.setState({rowsPerPage:Number(event.target.value),page:0});
	  };
    str_length = (str, length, ending)=> {
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      };
      openActionDialog=(e)=>{
          this.setState({actionDialog:e.target})
      }
      onSearch=(e)=>{

         const properties= this.props.properties.filter(props=>{
             if(props.status === 0)
                props.stat= 'pending'
            else if(props.status ===1)
                props.stat='success'
            else if(props.status === -1)
                props.stat='failed'
            props.create = new Date(props.createdAt).toDateString() 
            props.update = new Date(props.updatedAt).toDateString() 
            let  td = Object.values(props);
            return (td.toString().toUpperCase().indexOf(e.toUpperCase()) > -1)? td:''
          })
          this.setState({properties})
      }
    render(){
        const {properties} = this.state
        const offset = (this.state.page-1)* this.state.rowsPerPage
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, properties.length - offset);


        return (
            <>
                <Seo title="Cribs" />
                <AppHeader search={true} onSearch={this.onSearch} />
                <Layout>
                
                    <Dialog
                        open={this.state.dialogOpen}
                        TransitionComponent={TransitionUp}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        id="crib-delete-alert"
                    >
                        <DialogTitle style={{color:'#A60E0E'}} id="alert-dialog-delete">{"Confirm!!"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-delete-description">
                        Are sure you want to delete crib <strong>{this.state.deleted.name}</strong>?
                        </DialogContentText>
                        </DialogContent>
                        <div className="action-bottom">
                            <button onClick={this.handleClose}>
                                No
                            </button>
                            <button onClick={()=>{this.handleClose();this.onDelete()}}>
                                Yes
                            </button>
                        </div>
                    </Dialog>
                                            {
                                this.state.message&&
                                <Snackbar
                                open={this.state.open}
                                onClose={this.handleCloseSnackBar}
                                TransitionComponent={this.state.transition}
                                anchorOrigin={{vertical:'top',horizontal:'right'}}
                                autoHideDuration={5000}
                                key={this.state.transition ? this.state.transition.name : ''}
                                >
                                    <Alert variant="filled" severity={this.state.success?"success":"error"}>{this.state.message}</Alert>
                                </Snackbar>
                            }
                    <div className="property-main">
                        <Grid>
                            <div >
                                <div>
                                    <div  style={{margin:'30px 0'}}>
                                        <Link  id="add" to="/app/add-crib">
                                            <Fab  size="small"  aria-label="add">
                                                <AddIcon fontSize="small" />
                                            </Fab>
                                            Add New Crib
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="property-well">
                                <p>Crib List</p>
                            </div>
                            <TableContainer>
                                {
                                    this.state.loading?
                                        [1,2,3,4].map(i=>(
                                            <TableDataSkeleton className="tables" key={i} columns={7} />
                                        ))
                                    :
                                <>
                                <Table  className="property-table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell style={{minWidth:120}}>Name</TableCell>
                                        <TableCell style={{minWidth:120}}>Description</TableCell>
                                        <TableCell style={{minWidth:120}}>Amount</TableCell>
                                        <TableCell style={{minWidth:120}}>Date Added</TableCell>
                                        <TableCell style={{minWidth:120}}>Updated</TableCell>
                                        <TableCell style={{minWidth:120}}>Verified</TableCell>
                                        <TableCell> </TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                    properties.length>0?
                                    properties.slice(offset, offset + this.state.rowsPerPage).map((property, i) =>{
                                            const updatedAt = new Date(property.updatedAt).toDateString() //update.getDate()+'/'+(update.getMonth()+1)+'/'+update.getFullYear() 
                                            const createdAt = new Date(property.createdAt).toDateString() //created.getDate()+'/'+(created.getMonth()+1)+'/'+created.getFullYear() 
                                        return(
                                            <TableRow key={i}>
                                            <TableCell style={{minWidth:120}}>
                                                {property.name}
                                            </TableCell>
                                            <TableCell style={{minWidth:120}}>{this.str_length(property.description, 30)}</TableCell>
                                            <TableCell style={{minWidth:120}}>{currency(property.amount)}</TableCell>
                                            <TableCell style={{minWidth:120}}>{createdAt}</TableCell>
                                            <TableCell style={{minWidth:120}}>{updatedAt}</TableCell>
                                            <TableCell style={{minWidth:120}}>
                                                {
                                                    property.status === 0?
                                                    <span className="props-status-p">Pending</span>
                                                    :
                                                    property.status === 1?
                                                    <span className="props-status-s">Success</span>
                                                    :
                                                    <span className="props-status-f">Failed</span>
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                                                    {/* <Link to={`/app/edit-property/${property._id}`}>
                                                        <IconButton>
                                                            <EditIcon/>
                                                        </IconButton>
                                                    </Link> */}
                                                <button className="tb-view-btn">View</button>
                                                {/* <IconButton onClick={()=>{this.handleClickOpen(TransitionUp,property._id, i)}}> */}
                                                <IconButton onClick={this.openActionDialog}>
                                                    <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.99992 3.66666C2.91658 3.66666 3.66658 2.91666 3.66658 1.99999C3.66658 1.08333 2.91658 0.333328 1.99992 0.333328C1.08325 0.333328 0.333252 1.08333 0.333252 1.99999C0.333252 2.91666 1.08325 3.66666 1.99992 3.66666ZM1.99992 5.33333C1.08325 5.33333 0.333252 6.08333 0.333252 6.99999C0.333252 7.91666 1.08325 8.66666 1.99992 8.66666C2.91658 8.66666 3.66658 7.91666 3.66658 6.99999C3.66658 6.08333 2.91658 5.33333 1.99992 5.33333ZM1.99992 10.3333C1.08325 10.3333 0.333252 11.0833 0.333252 12C0.333252 12.9167 1.08325 13.6667 1.99992 13.6667C2.91658 13.6667 3.66658 12.9167 3.66658 12C3.66658 11.0833 2.91658 10.3333 1.99992 10.3333Z" fill="black" fill-opacity="0.54"/>
                                                    </svg>
                                                    <ActionDialog open={this.state.actionDialog}>
                                                        <ul>
                                                            <li><button><VisibilityOutlined fontSize="small"/> View</button></li>
                                                            <li>
                                                                <Link to={`/app/edit-crib/${property._id}`}>
                                                                <button><EditIcon fontSize="small" /> Edit</button>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <button onClick={()=>{this.handleClickOpen(TransitionUp,property, i)}}> <DeleteIcon fontSize="small" /> Delete</button>
                                                            </li>
                                                        </ul>
                                                    </ActionDialog>
                                                </IconButton>
                                                </div>
                                            </TableCell>
                                            </TableRow>
                                        )
                                    })
                                    :
                                    <Typography style={{margin:'10px 20px', color:'#979797'}} variant="subtitle2" component="p">No crib found</Typography>
                                }
                                    {emptyRows > 0 && (
                                            <TableRow style={{ height: 82 * emptyRows }}>
                                            <TableCell  colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[8, 16, 24]}
                                    count={properties.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </>
                                }
                            </TableContainer>
                        </Grid>

                    </div> 
                </Layout>
            </>
        )
    }
}
const mapStateToProps=state=>({
    properties:state.properties,
    user:state.user
})
const mapDispatchToProps=dispatch=>({
    setProperties:(payload) => dispatch(setProperties(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Properties));