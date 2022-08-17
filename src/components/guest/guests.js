import React, {Component} from "react"
import PropTypes from 'prop-types';
import "./guest.scss"
import Switch from "../switch";
class Guests extends Component{

    state = {
        
        guest: this.props.adult+this.props.childrens,
        adult:this.props.adult,
        children:this.props.childrens,
        infant:this.props.infant,
        pet:this.props.checked
    }

    componentDidMount(){
        this.setState({pet:this.props.checked, guest: this.props.adult+this.props.childrens, adult:this.props.adult, children:this.props.childrens, infant:this.props.infant})
    }

      renderHeader() {
       return (
           <div className="row">
               <div>
                   <p>Adults</p>
                   <p>Ages 13 and above</p>
               </div>
               <div>
                   {
                       this.state.adult>0?
                       <button onClick={()=>this.setState({adult:this.state.adult-1, guest:this.state.guest-1}, ()=>{this.props.setGuest({adult:this.state.adult, children:this.state.children, infant:this.state.infant})})} type="button">-</button>
                       :
                       <button style={{borderColor:'#C4C4C4'}} type="button">-</button>
                   }
                  
                   <span>{this.state.adult}</span>
                   <button onClick={()=>this.setState({adult:this.state.adult+1, guest:this.state.guest+1}, ()=>{this.props.setGuest({adult:this.state.adult, children:this.state.children, infant:this.state.infant})})} type="button">+</button>
               </div>
           </div>
       )
      }
    
      renderChildren() {
         return (
            <div className="row">
                <div>
                    <p>Children</p>
                    <p>Ages 2 to 12</p>
                </div>
                <div>
                    {
                       this.state.children>0?
                       <button onClick={()=>this.setState({children:this.state.children-1, guest:this.state.guest-1}, ()=>{this.props.setGuest({adult:this.state.adult, children:this.state.children, infant:this.state.infant})})} type="button">-</button>
                       :
                       <button style={{borderColor:'#C4C4C4'}} type="button">-</button>
                   }
                    <span>{this.state.children}</span>
                    <button onClick={()=>this.setState({children:this.state.children+1, guest:this.state.guest+1}, ()=>{this.props.setGuest({adult:this.state.adult, children:this.state.children, infant:this.state.infant})})} type="button">+</button>
                </div>
            </div>
         )
      }
    
      renderInfant() {
        return(
            <div className="row">
                <div>
                    <p>Infants</p>
                    <p>Below Age 2</p>
                </div>
                <div>
                    {
                       this.state.infant>0?
                       <button onClick={()=>this.setState({infant:this.state.infant-1},()=>{this.props.setGuest({adult:this.state.adult, children:this.state.children, infant:this.state.infant})})} type="button">-</button>
                       :
                       <button style={{borderColor:'#C4C4C4'}} type="button">-</button>
                   }
                    <span>{this.state.infant}</span>
                    <button onClick={()=>this.setState({infant:this.state.infant+1},()=>{this.props.setGuest({adult:this.state.adult, children:this.state.children, infant:this.state.infant})})} type="button">+</button>
                </div>
            </div>
        )
      }

    render(){
        return(
            <div ref={this.props.refs} style={{top:this.props.top}}  className="guest-display close">
                
                <div className="guests">
                    <div className="title">
                    <p>Guest</p>
                    <button onClick={this.props.onClose} type="button">
                        <span></span>
                        <span></span>
                    </button>
                    
                    </div>
                    {this.renderHeader()}
                    {this.renderChildren()}
                    {this.renderInfant()}
                </div>
                <div className="guest-bottom">
                    <p>Are you traveling with pets?</p>
                    <div className="pets">
                    <Switch value={this.props.checked} onChange={(e)=>this.props.onCheck(e)}/>

                    </div>
                </div>
            </div>
        )
    }
}
export default Guests
Guests.propTypes = {
    day: PropTypes.string,
    onSelect: PropTypes.func,
    width:PropTypes.number,
    height:PropTypes.number,
    count:PropTypes.any,
    onClick:PropTypes.func,
    onChange:PropTypes.func,
    onClose:PropTypes.func
  };
  
  Guests.defaultProps = {
    day: '',
    onSelect:null,
    width:0,
    height:0,
    count:0,
    onClick:null,
    onChange:null,
    onClose:null
  };

