import React, {Component} from "react"
import PropTypes from 'prop-types';
import "./guest.scss"
import Guests from "./guests";
class Guest extends Component{
    constructor(props){
        super(props)
        this.state={
            onOpen:false,
            update:false,
            value:this.props.adult+this.props.childrens
        }
        this.guest = React.createRef();
        this.container = React.createRef();
        this.top = React.createRef();
    }
    handleClick=   (e)=>{
     
        if(this.guest.current && this.container.current){
            if(!this.guest.current.contains(e.target) && this.state.onOpen && !this.container.current.contains(e.target)){
 
                this.onClose()
              }
        }

     }
    componentDidUpdate(prevProp, prevState){
        if(!prevState.onOpen && this.state.onOpen){
            document.addEventListener('click', (e)=>this.handleClick(e) )
        }

    }
    componentWillUnmount(){
       document.removeEventListener('click',this.handleClick)
    }
    setGuest=(guest)=>{
        this.setState({value:guest.adult+guest.children})
        if(this.props.onChange)
        this.props.onChange(guest)

    }
    onClick=()=>{
        this.guest.current.parentElement.style.position="relative" 
        this.setState({onOpen:!this.state.onOpen}, ()=>{
            if(this.state.onOpen){
            
            
                this.guest.current.classList.replace('close','open')
                this.container.current.classList.replace('close','open')
                // this.guest.current.style.width = '25vw'
                // this.guest.current.style.height = '300px'
                this.guest.current.style.right = this.props.right
                
                
     
                //  setTimeout(()=>{
                //      this.guest.current.firstChild.style.display="block"
                     this.top.current.style.width="30px"
                     this.top.current.style.height="30px"
                //      this.guest.current.style.opacity = '1'
                //      this.guest.current.style.visibility = 'visible'
                //      this.guest.current.firstChild.style.opacity="1"
                //  },100)
             }
             else
             {
                this.guest.current.classList.replace('open','close')
                this.container.current.classList.replace('open','close')
            //      this.guest.current.style.opacity = '0'
            //      this.guest.current.firstChild.style.opacity="0"
            //     this.guest.current.style.width = '0px'
            //     this.guest.current.style.height = '0px'
            //  //    this.guest.current.style.left = '35%'
                 this.top.current.style.width="0"
                 this.top.current.style.height="0"
            //      this.guest.current.style.visibility = 'hidden'
            //      this.guest.current.firstChild.style.display="none"
                 
             }
        })

    }

    onClose=()=>{
        this.setState({onOpen:!this.state.onOpen}, ()=>{
            this.guest.current.classList.replace('open','close')
            this.container.current.classList.replace('open','close')
            //      this.guest.current.style.opacity = '0'
            //      this.guest.current.firstChild.style.opacity="0"
            //     this.guest.current.style.width = '0px'
            //     this.guest.current.style.height = '0px'
            //  //    this.guest.current.style.left = '35%'
                 this.top.current.style.width="0"
                 this.top.current.style.height="0"
            //      this.guest.current.style.visibility = 'hidden'
            //      this.guest.current.firstChild.style.display="none"
                 

        })

    }
    render(){
        console.log(this.props)
        return(
            <>
            <div onClick={this.onClick} ref={this.container} className="search-guest close">
                <div>{this.props.label}</div>
                <div>{this.props.value?this.props.value:this.props.placeholder}</div>
                <div ref={this.top} style={{bottom:this.props.caret}}   className="top"></div>
            </div>
            <Guests 
            refs={this.guest}  
            onCheck={this.props.onCheck} 
            checked={this.props.checked} 
            setGuest={this.setGuest} 
            onClose={this.onClose} 
            top={this.props.top} 
            infant={this.props.infant}
            adult={this.props.adult}
            childrens={this.props.childrens}
            />
            </>
        )
    }
}
export default Guest
Guest.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    adult: PropTypes.number,
    childrens: PropTypes.number,
    infant: PropTypes.number,
    onClick: PropTypes.func,
    onCheck: PropTypes.func,
    onChange: PropTypes.func,
    right: PropTypes.any,
    top:PropTypes.any,
    caret:PropTypes.any,
    checked:PropTypes.bool
  };
  
  Guest.defaultProps = {
    label:'',
    placeholder:'',
    value: '',
    right:'1vmin',
    top:'120%',
    caret:'-70%',
    onClick:null,
    onChange:null,
    onCheck:null,
    checked:false,
    adult:0,
    childrens:0,
    infant:0
  };

