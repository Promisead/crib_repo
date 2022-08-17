import React, {Component} from "react"
import PropTypes from 'prop-types';
import moment from 'moment';
import "./calendar.scss"
import Dates from "./dates";
class Calendar extends Component{
    constructor(props){
        super(props)
        this.state={
            onOpen:false,
            update:false,
            deviceWidth:0,
            sm:760
        }
        this.dates = React.createRef();
        this.top = React.createRef();
        this.container = React.createRef();
    }
    handleClick=   (e)=>{
        if(this.dates.current && this.container.current)
       if(!this.dates.current.contains(e.target) && this.state.onOpen && !this.container.current.contains(e.target)){

         this.onClose()
       }
    }

    handleResize=e=>{
        this.setState({deviceWidth:e.target.innerWidth})
    }

componentDidMount(){
    window.addEventListener('resize',this.handleResize)
    this.setState({deviceWidth:window.innerWidth})
}
componentDidUpdate(prevProp, prevState){
        if(!prevState.onOpen && this.state.onOpen){
            document.addEventListener('click', (e)=>this.handleClick(e) )
        }

    }
    componentWillUnmount(){
       document.removeEventListener('click',this.handleClick)
       window.removeEventListener('resize',this.handleResize)
    }
    onClick=()=>{
        if(this.dates.current){
            this.dates.current.parentElement.style.position="relative" 
            this.setState({onOpen:!this.state.onOpen}, ()=>{
                if(this.state.onOpen){
                
                this.setState({update:true})
                    //this.container.current.classList.add('active')
                    // this.dates.current.style.width = '50vw'
                    // this.dates.current.style.height = '390px'
                    this.dates.current.classList.replace('close','open')
                    this.container.current.classList.replace('close','open')
                        
                    
                    
         
                    //  setTimeout(()=>{
                        this.dates.current.style.right = this.props.right
                    //},100)
                 }
                 else
                 {
                    this.dates.current.classList.replace('open','close')
                    this.container.current.classList.replace('open','close')
                    //this.container.current.classList.remove('active')
                    //  this.dates.current.style.opacity = '0'
                    //  this.dates.current.firstChild.style.opacity="0"
                    // this.dates.current.style.width = '0px'
                    // this.dates.current.style.height = '0px'
                 //    this.dates.current.style.left = '35%'
                    //  this.top.current.style.width="0"
                    //  this.top.current.style.height="0"
                    //  this.dates.current.style.visibility = 'hidden'
                    //  this.dates.current.firstChild.style.display="none"
                     
                 }
            })
        }

    }

    onClose=()=>{
        this.setState({onOpen:!this.state.onOpen}, ()=>{
            this.container.current.classList.remove('active')
                 this.dates.current.classList.replace('open','close')
                 this.container.current.classList.replace('open','close')
            //      this.dates.current.firstChild.style.opacity="0"
            //     this.dates.current.style.width = '0px'
            //     this.dates.current.style.height = '0px'
            //  //    this.dates.current.style.left = '35%'
            //      this.top.current.style.width="0"
            //      this.top.current.style.height="0"
            //      this.dates.current.style.visibility = 'hidden'
            //      this.dates.current.firstChild.style.display="none"
                 
        })

    }
    render(){
        return(
            <>
            <div   onClick={this.onClick} ref={this.container} className="search-calendar close">
                <div>{this.props.label}</div>
                <div>{this.props.value?moment(this.props.value).format('D/M/yyyy'):this.props.placeholder}</div>
                {/* <div ref={this.top}   className="top"></div> */}
            </div>
            <Dates refs={this.dates} label={this.props.label} onOpen={this.state.onOpen} onClose={this.onClose} top={this.props.top} onChange={this.props.onChange}  deviceWidth={this.state.deviceWidth} sm={this.state.sm} count={this.state.count}/>
            </>
        )
    }
}
export default Calendar
Calendar.propTypes = {
    format: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    right: PropTypes.any,
    top:PropTypes.any,
    caret:PropTypes.any
  };
  
  Calendar.defaultProps = {
    format: 'dd/MM/yyyy',
    label:'',
    placeholder:'',
    value: '',
    right:'15%',
    top:'120%',
    caret:'-70%',
    onClick:null,
    onChange:null
  };

