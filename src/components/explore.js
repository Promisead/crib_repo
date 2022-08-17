import React from "react"
import { connect } from "react-redux";
import { verified } from "../helpers/helpers";
import Carousel from './carousel';
import City from "./city"
const Explore = ({height, topCities})=>{

    return(
        <>
            
            {topCities.length > 0?(
                <Carousel
                    slidesPerPage={3}
                    slidesPerScroll={1}
                    infinite
                    minDraggableOffset={200}
                    auto={7000}
                    >
                    {topCities.map((city,index)=>{
                    return (
                        <City height={height} color='#000000' link={`city=${city.name}`} name={city.name} image={process.env.REACT_APP_BACKEND_URL+'/'+city.image} description={`${verified(city.total)} VERIFIED STAYS Book sunny lofts, beachfront flats, and more`}  key={index} />
                    )
                    })
                    }
                </Carousel>
            ):''}
        </>
    )
}
const mapStateToProps=state=>({
    topCities:state.topCities
})
export default connect(mapStateToProps)(Explore);