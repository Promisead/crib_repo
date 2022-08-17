import React, {Component} from "react"
import PropTypes from 'prop-types';
import moment from 'moment';
import "./index.scss"
class Dates extends Component{
    state={
        bookings:[],
        date:moment()
    }
    componentDidMount(){
        this.setState({bookings:this.props.bookings, date:this.props.date})
    }
    firstDayOfMonth = () => {
        let dateObject = this.props.date;
        let firstDay = moment(dateObject)
                     .startOf("month")
                     .format("d"); 
       return firstDay;
    };
    lastDayOfMonth = () => {
        let dateObject = this.props.date;
        let lastDay = moment(dateObject)
                     .endOf("month")
                     .format("d");
       return lastDay;
    };
    daysInMonth = () => {
        let dateObject = this.props.date;
        let firstDay = moment(dateObject)
        .daysInMonth()
       return firstDay;
    };
      renderHeader() {
        const weekdayshort = moment.weekdaysShort();
       return weekdayshort.map(day => {
            return (
              <th key={day} className="week-day">
               {day.substr(0,2)}
              </th>
            );
         });
      }
    
      renderDays() {
        let blanks = [];
        let nextBlanks = []
        let pastMontDays = moment(this.props.date).subtract(1, 'month').daysInMonth()


        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            let books = Object.assign({}, this.props.date);
            books = moment(books).set('date', pastMontDays-i).set('month',moment(this.props.date).startOf('month').month()-1);
            books = this.isBooked(books)
          blanks.unshift(
            <td className={`past-month-day ${books?'booked':''}`}>
                <button type="button">{pastMontDays-i}</button>
            </td>
          );
        }



        for (let i = 6; i > this.lastDayOfMonth(); i--) {
            let books = Object.assign({}, this.props.date);
            books = moment(books).set('date', 7-i).set('month',moment(this.props.date).startOf('month').month()+1);
            books = this.isBooked(books)
            nextBlanks.push(
            <td className={`past-month-day ${books?'booked':''}`}>
                <button type="button">{7-i}</button>
            </td>
          );
        }


        
        let month = moment(this.props.date).startOf("month").month()
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let books = Object.assign({}, this.props.date);
            books = moment(books).set('date', d);
            books = this.isBooked(books)
          let currentDay= this.state.date.isSame(new Date(), 'day')? "today" : ""; 
          daysInMonth.push(
            <td key={d} className={`calendar-day ${currentDay} ${books?'booked':''}`}>
                {
                    !books?
                    <button onClick={e => { 
                        this.onDayClick(month, d);
                      }} type="button">{d}</button>
                    :
                    <button type="button">{d}</button>
                }

            </td>
          );
        }
        var totalSlots = [...blanks, ...daysInMonth, ...nextBlanks];
        let rows = [];
        let cells = [];
        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
              cells.push(row); // if index not equal 7 that means not go to next week
            } else {
              rows.push(cells); // when reach next week we contain all td in last week to rows 
              cells = []; // empty container 
              cells.push(row); // in current loop we still push current row to new container
            }
            if (i === totalSlots.length - 1) { // when end loop we add remain date
              rows.push(cells);
            }
          });
         return rows.map((d, i) => {
            return <tr>{d}</tr>;
          });
      }
    
  
    
      onDayClick = (e,day) => {
        let dateObject = Object.assign({}, this.props.date);
        dateObject = moment(dateObject).set("month", e).set("date", day);

         if(this.props.onChange)
         this.props.onChange(dateObject._d)
      };
      currentDay = () => {  
            return Number(this.props.date.format("D"));
      };
    sortDatesAsc = (date1, date2) => {
        if (date1 > date2) {
          return 1;
        }
        return date1 < date2 ? -1 : 0;
      };
    isBooked=(date)=> {
        let isBooked = false;
        const sortedBookings = this.state.bookings.sort(this.sortDatesAsc);
        for (let i = 0; i < sortedBookings.length; i += 1) {
          if (date.isSame(sortedBookings[i], 'day')) {
            isBooked = true;
            break;
          }
        }
        return isBooked;
      }
    render(){
        return(
            <div ref={this.props.refs} style={{top:this.props.top}}  className="booking-display">

                <div className="booking-dates">
                    <table>
                            <thead>
                                <tr>{this.renderHeader()}</tr>
                            </thead>
                            <tbody>
                                {this.renderDays()}
                            </tbody>
                            
                    </table>
                </div>
            </div>
        )
    }
}
export default Dates
Dates.propTypes = {
    date:PropTypes.instanceOf(moment).isRequired
  };
  
  Dates.defaultProps = {
    date:''
  };

