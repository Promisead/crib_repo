import React from "react"
import Carousel from "./carousel";
import PropTypes from"prop-types"
const Slide = ({children, infinite, auto, showArrows})=>{
    return(
                <Carousel
                    slidesPerPage={4}
                    slidesPerScroll={1}
                    offset={16}
                    infinite={infinite}
                    auto={auto}
                    minDraggableOffset={200}
                    showArrows={showArrows}
                    // arrowLeft={
                    //     <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,left:-15, display:'flex', alignItems:'center',justifyContent:'center'}} className="left">
                    //         <ArrowLeftIcon htmlColor="#fff"/>
                    //     </div>}
                    // arrowRight={
                    //     <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,right:-15, display:'flex', alignItems:'center',justifyContent:'center'}} className="right">
                    //         <ArrowRightIcon htmlColor="#fff"/>
                    //     </div>
                    // }
                    
                    >
                        {children}
                </Carousel>
    )
}
export default Slide;

Slide.propTypes ={
    infinite:PropTypes.bool,
    auto:PropTypes.number,
    showArrows:PropTypes.bool
}
Slide.defaultProps={
    infinite:false,
    auto:0,
    showArrows:true
}