import React from "react"
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import {Link} from "react-router-dom"
const SlideBanner = ({content})=>{
    return(
        <>
            
            {content.length > 0?(
                <>
                <Carousel
                    slidesPerPage={1}
                    slidesPerScroll={1}
                    infinite
                    autoPlay={2500}
                    dots
                    className="community-banner"
                    >
                    {content.map((property,index)=>{
                    return (
                        <Link to={`/crib/${property.id}`}  key={'slidess'+index}>
                            <img style={{width:'100%', height:200}} alt="" src={property.image}/>
                        </Link>
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
export default SlideBanner;