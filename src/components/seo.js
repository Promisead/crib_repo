import React, {Component} from "react"
import PropTypes from "prop-types"
import { seo } from "../helpers/helpers"
class Seo  extends Component{
    componentDidMount(){
        seo({title:this.props.title, metaDescription:this.props.description})
    }
    render(){
    return (
        <>
        </>
    )
}
}
export default Seo
Seo.propTypes ={
    title:PropTypes.string,
    description:PropTypes.string
}
Seo.defaultProps={
    title:'',
    description:''
}