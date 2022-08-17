import React, {Component} from "react"
import PropTypes from "prop-types"
import "./switch.scss"
class Switch extends Component{
    state={
        value:false
    }
    componentDidMount(){
        this.setState({value:this.props.value})
    }
    render(){
        return(
            <label style={{backgroundColor:this.props.value?'#0066FF':this.props.trackColor, border:this.props.trackBorder}} className="cswitch">
                <input checked={this.state.value}   onChange={(e)=>{this.setState({value:e.target.checked}); if(this.props.onChange)this.props.onChange(e.target.checked)}} type="checkbox"  />
                <span style={{backgroundColor:this.props.color}} className="sknob"></span>
            </label>
        )
    }
}

export default Switch

Switch.propTypes ={
    onChange: PropTypes.func,
    value:PropTypes.bool,
    color:PropTypes.string,
    trackColor:PropTypes.string
}
Switch.defaultProps={
    onChange:null,
    value:false,
    color:'#fff',
    trackColor:'#C4C4C4',
    trackBorder:''
}