import React from "react"
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
const DetailSlide = ({content})=>{
    return(
        <>
            
            {content.length > 0?(
                <>
                <Carousel
                    slidesPerPage={1}
                    slidesPerScroll={1}
                    infinite
                    minDraggableOffset={20}
                    dots={true}
                    className="detail-slider"
                    arrowLeft={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,left:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="left">
                            <ArrowLeftIcon htmlColor="#fff"/>
                        </div>}
                    arrowLeftDisabled={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,left:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="left">
                            <ArrowLeftIcon htmlColor="#fff"/>
                        </div>
                    }
                    arrowRight={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,right:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="right">
                            <ArrowRightIcon htmlColor="#fff"/>
                        </div>
                    }
                    arrowRightDisabled={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,right:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="right">
                        <ArrowRightIcon htmlColor="#fff"/>
                    </div>
                    }
                    addArrowClickHandler
                    >
                    {content.map((image,index)=>{
                    return (
                        <img key={index} style={{width:'100%'}} id="slide-cover-img" src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt=""/>
                    )
                    })
                    }
                </Carousel>
                </>
            ):(
                <div>
                    <h1>null</h1>
                </div>
                )}
        </>
    )
}
export default DetailSlide;