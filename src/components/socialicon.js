import React from "react";

const SocialIcon = ({icon, image, href,target, backgroundColor,children})=>{
    return(
        <li style={{height:40, width:40, borderRadius:20, backgroundColor:backgroundColor, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <a style={{width:'100%', height:'100%', display:"flex", justifyContent:'center', alignItems:'center'}} href={href} target={target}>
                {
                    image?
                    <img style={{height:20, width:20}} src={image} alt=""/>
                    :
                    [children]
                }
            </a>
        </li>
    )
}
export default SocialIcon