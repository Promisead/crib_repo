import React from "react";
import "../scss/footer.scss"
import PropTypes from "prop-types"
const Subscribe = ({onChangeValue, onSubmit, value, loading})=>{
    const handleChange=(e)=>{
            if(onChangeValue)
                onChangeValue(e.target.value)
    }
    const handleSubmit=(e)=>{
        if(onSubmit)
            onSubmit(e)
    }
    return(
        <form onSubmit={handleSubmit} className="subscribe">
            
            <input value={value} onChange={handleChange} placeholder="Email address" required/>
            <label className="sub-label">Email address</label>
            {
                loading?
                <button type="button">Please wait</button>
                :
                <button>Subscribe</button>
            }
        </form>
    )
}
export default Subscribe;
Subscribe.propTypes = {
    onChangeValue:PropTypes.func,
    onSubmit:PropTypes.func,
    value:PropTypes.string,
    loading:PropTypes.bool
}

Subscribe.defaultTypes={
    onChangeValue:null,
    onSubmit:null,
    value:"",
    loading:false
}