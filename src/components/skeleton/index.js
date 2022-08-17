import React from "react"
import "./index.scss"
import PropTypes from "prop-types"


export const HomeSkeleton = ()=>{
    return (
        <div className="skeleton">
            <div className="details">
                <h3 aria-hidden="true" className="loadings"></h3>
                <ul className="loadings"></ul>
                <div className="reviews loadings"></div>
            </div>
        </div>
    )
}

export const SmallSkeleton=()=>{
    return(
        <p  aria-hidden="true" className="loadings small-skeleton"></p>
    )
}


export  const DetailSkeleton = ()=>{
    return (
        <div className="result-skeleton">
            <div className="result-description">
                <div>
                    <h3 aria-hidden="true" className="loadings"></h3>
                    <h4 aria-hidden="true" className="loadings"></h4>
                    <p className="loadings"></p>
                </div>
                <div>
                    <div className="simg loadings">

                    </div>
                </div>
            </div>
            <div className="result-third">
                <div className="result-house-price loadings"></div>
            </div>
        </div>
    )
}

export const TableDataSkeleton=({columns, className, style})=>{
    const [total,setTotal] = React.useState([])
    React.useEffect(()=>{
        let tot = []
        for(let i = 0; i< columns;i++){
            tot.push(i)
        }
        setTotal(tot)
    },[columns])
    return(
        <div className={`skeleton-table-data ${className}`}>
            {
                total.map((u,i)=>(
                    <div style={style} className="loadings" key={i}></div>
                ))
            }
        </div>
    )
}
TableDataSkeleton.propTypes={
    className:PropTypes.string,
    style:PropTypes.object
}
TableDataSkeleton.defaultProps={
    className:'',
}