import React, {Component} from "react"
import PropTypes from 'prop-types';
import moment from 'moment';
import "./index.scss"
import Dates from "./dates";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
class Booking extends Component{
    constructor(props){
        super(props)
        this.state={
            dateObject: moment()
        }
    }

    header=()=>{
        return(
            <div className="bookings-header">
                <button onClick={this.prevMonth}>
                     <ArrowBackIcon/>
                </button>
                <span>{this.renderMonth()}</span>
                <button onClick={this.nextMonth}>
                    <ArrowForwardIcon/>
                </button>
            </div>
        )
    }
    body=()=>{
        return <Dates date={this.state.dateObject}  bookings={this.props.bookings} />

    }
    renderMonth() {
        let dateObject = this.state.dateObject;
        let month = moment(dateObject).startOf("month").format('MMMM') +", "+ 
                    moment(dateObject).startOf("year").format('YYYY')
        return month
      }
    nextMonth = () => {
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", moment(dateObject).startOf("month").month()+1);
        this.setState({
          dateObject: dateObject
        },
       );
      };
    
      prevMonth = () => {
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", moment(dateObject).startOf("month").month()-1);
        this.setState({
          dateObject: dateObject
        },
       );
      };
    render(){
        return(
            <>
            <div  className="bookings">
                {this.header()}
                {this.body()}
            </div>
            </>
        )
    }
}
export default Booking
Booking.propTypes = {
    bookings:PropTypes.array
  };
  
  Booking.defaultProps = {
    bookings:[]
  };

