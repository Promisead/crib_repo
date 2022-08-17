import  React from "react";
import {withStyles} from "@material-ui/core"

const styles =()=>({
    container:{
        height:45,
        // width:100,
        backgroundColor:'#000000',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:45/2
    },
    inner:{
        display:'flex',
        // width:'90%',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        width:20,
        height:20,
        marginRight:10
    },
    paragraphy:{
        fontSize:13,
        color:'#fff',
    }
})
const AppLogo = ({image, name,classes,href, target, status=false})=>{
    return(
        <a style={{textDecoration:'none'}} href={href} target={target}>
            <div className={classes.container}>
                <div className={classes.inner}>
                    <img className={classes.image} src={image} alt=""/>
                    <div>
                        <p className={classes.paragraphy}>{status?'Download from':'Coming Soon on'}</p>
                        <h3 className={classes.paragraphy} style={{fontSize:16,marginTop:-4}}>{name} Store</h3>
                    </div>
                </div>
            </div>
        </a>
    )
}
export default withStyles(styles)(AppLogo);