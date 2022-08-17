import React, {Component} from "react"
import PropTypes from "prop-types"
import "./index.scss"
import { maxStringLength } from "../../helpers/helpers"
class Detail  extends Component{
    render(){
        const {crib} = this.props
    return (
        <div className="crib-d-detail">
            <div className="d-details">
                <div>
                    <p>{crib.city}, {crib.state}</p>
                    <h4>{crib.name}</h4>
                    <p>{maxStringLength(crib.description, 50)}</p>
                </div>
                <div>
                    <img src={process.env.REACT_APP_BACKEND_URL+'/'+crib.featuredImage} alt={crib.name}/>
                </div>
            </div>
            <div className="d-views">
                <button>View</button>
            </div>
        </div>
    )
}
}
export default Detail
Detail.propTypes={
    data:PropTypes.array
}
Detail.defaultProps={
    data:[]
}
