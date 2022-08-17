import React, {Component} from "react"
import './index.scss'
class ActionDialog extends Component{
    action = React.createRef()
    handleClick=(e)=>{
            document.querySelectorAll('.crib-dialog-action').forEach(dom=>{
                dom.classList.replace('open', 'close')
            })
            if(e.target.nextElementSibling){
                if(e.target.nextElementSibling.className !=='')
                if(e.target.nextElementSibling.className.includes('crib-dialog-action')){
                    e.target.nextElementSibling.classList.replace('close', 'open')
                    this.setState({open:true})
                   }
            }
            if(e.target.parentElement){
                if(e.target.parentElement.localName !== 'svg')
                if(e.target.parentElement.className !== '')
                if(e.target.parentElement.className.includes('ad-parentc')){
                    e.target.classList.replace('close', 'open')
                }
            }
            if(e.target.firstElementChild){
                if(e.target.firstElementChild.localName !== 'svg' && e.target.firstElementChild.localName !== 'path')
                if(e.target.firstElementChild.className.includes('ad-parentc')){
                    e.target.firstElementChild.lastElementChild.classList.replace('close', 'open')
                }
            }
            if(e.target.localName === 'path'){
                if(e.target.parentElement.parentElement.className.includes('ad-parentc'))
                e.target.parentElement.nextElementSibling.classList.replace('close', 'open')
            }
    }
    componentDidMount(){
        this.action.current.parentElement.style.position='relative'
        this.action.current.parentElement.classList.add('ad-parentc')
        document.addEventListener('click', this.handleClick)
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClick)
    }
    render(){

        return (
            <div ref={this.action} className={`crib-dialog-action close`}>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default ActionDialog
