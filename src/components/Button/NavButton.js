import React from "react";
import '../../scss/NavButton.scss';
import {Link} from "react-router-dom"

// const Wrapper = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: ${props => props.backgroundColor};
//     color: ${props => props.color};
//     width: ${props => props.width}px;
//     height: ${props => props.height}px;
//     margin-right: ${props => props.marginRight};
//     ${
//         props => props.border && `border: ${props.borderWidth}px solid ${props.borderColor};`
//     }
//     border-radius: ${props => props.borderRadius}px;

// `

// const Text = styled.p`
//     font-family: Poppins;
//     font-weight: 500;
//     font-size: 14px;
//     line-height: 21px;
//     color: #FCFCFC;
// `

const Button = ({ 
        children,
        color,
        backgroundColor,
        width,
        height,
        border,
        borderRadius,
        borderColor,
        borderWidth,
        marginRight,
        href,
    }) => {
    return (
        <Link to={href} style={{
            color:`${color}`,
            backgroundColor:`${backgroundColor}`,
            marginRight:`${marginRight}`,
            border: border ? `${borderWidth}px solid ${borderColor}` : null,
            // border: `${borderWidth} solid ${borderColor}`,
            // border: '1px solid green',
            // border:',
            borderRadius,
            // borderRadius:20,
            // borderColor: `${borderColor}`,
            // borderWidth:


        }}>
            {children}
        </Link>
        // <Wrapper 
        //     color={color}
        //     backgroundColor={backgroundColor}
        //     width={width}
        //     height={height}
        //     borderRadius={borderRadius}
        //     border={border}
        //     borderColor={borderColor}
        //     borderWidth={borderWidth}
        //     marginRight={marginRight}
        // >
        //     <Text>{children}</Text>
        // </Wrapper>
    );
}

export default Button;
