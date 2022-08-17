import React, {Component, createRef} from "react"
import PropTypes from "prop-types"
import "./index.scss"
class Modal extends Component{
    modal = createRef()
    closeModal=(e)=>{

        const modal = this.modal.current.contains(e.target)
        if(!modal && this.props.onOpen && e.target.className !=='hamburger'){
            if(this.props.closeMenu && this.props.onOpen)
            this.props.closeMenu()
        }

    }

    componentDidMount(){
        document.addEventListener('click', this.closeModal)
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.closeModal)
    }
    render(){
        return(
            <div style={{transform:this.props.onOpen?' scale(1)':' scale(0)',  transition:this.props.onOpen? 'transform 150ms':'none'}} className="modals-container">
                <div ref={this.modal}  className="modals-content">
                    <div className="modals-header">{this.props.children}</div>
                    <div className="modals-footer">
                        <p>Crib Ng</p>
                    </div>
                </div>
            </div>
        )
    }

}
export default Modal
Modal.propTypes = {
    onOpen:PropTypes.bool,
    closeMenu:PropTypes.func
}
Modal.defaultProps={
    onOpen:false,
    closeMenu:null
}