import React, {createRef,useEffect, useState} from 'react';
import '../../scss/LocationCard.scss';
import {Link} from "react-router-dom"

const LocationCard = ({results, inputRef}) => {
    const location = createRef()
    const [show, setShow]=useState(false)
    useEffect(() => {
        const handleChange =(e)=>{
            if(inputRef.current)
                if(inputRef.current === e.target && results.length>0)
                {
                    setShow(true)
                }
        }
        const handleClick=(e)=>{

            if(inputRef.current)
            if(inputRef.current === e.target && results.length>0)
            {
                setShow(true)
            }
            else if(location.current)
            if(!location.current.contains(e.target)){
                setShow(false)
            }
          
    }

    document.addEventListener('click',handleClick)
    document.addEventListener('keyup',handleChange)
    return () => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('keyup',handleChange)
    };
}, [results, location, inputRef])
    if(results.length>0)
    return (
        <div ref={location} style={{visibility:show?'visible':'hidden'}} className="location__card">

            {
                results.map((result,i)=>(
                    <Link key={i} to={`/crib/${result._id}`} className="location__result">
                        <div className="image">
                            <img src={process.env.REACT_APP_BACKEND_URL+'/'+result.featuredImage} alt={result.name}/>
                        </div>
                        <div className="details">
                            <h1>{result.name}</h1>
                            <small>{result.city}, Nigeria</small>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
    return ''
}

export default LocationCard;

// const Card = styled.div`
// z-index: 999999;
// `;

// const DropDownIcon = styled.div`
// 	height: 0;
// 	width: 0;
// 	border-left: 20px solid transparent;
// 	border-right: 20px solid transparent;
// 	border-bottom: 20px solid #fff;
// `;
