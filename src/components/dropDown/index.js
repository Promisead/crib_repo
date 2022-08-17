import React, {Component} from "react"
import PropTypes from "prop-types"
import './index.scss'
class DropDown extends Component{
    onChange=(e)=>{
        if(this.props.onChange)
        this.props.onChange(e)
    }
    render(){
        return(
            <select name={this.props.name} onChange={this.onChange} className={`crib-dropdown-menu ${this.props.className}`} defaultValue={this.props.value}>
                {this.props.children}
            </select>
        )
    }
}
export class DropDownItem extends Component{
    render(){
        return(
            <option value={this.props.value}>
                {this.props.children}
            </option>
        )
    }
}
export default DropDown
DropDownItem.propTypes = {
    value:PropTypes.any,
    className:PropTypes.string
}
DropDownItem.defaultProps={
    value:'',
    className:''
}
DropDown.propTypes = {
    value:PropTypes.any,
    className:PropTypes.string,
    onChange:PropTypes.func,
    name:PropTypes.string,
}
DropDown.defaultProps={
    value:'',
    className:'',
    onChange:null,
    name:''
}