import React, {Component} from "react"
import PropTypes from 'prop-types';
import moment from 'moment';
import "./calendar.scss"
class Dates extends Component{

    state = {
        selectedDay:moment(),
        dateObject: moment()
    }
    firstDayOfMonth = (e) => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
                     .startOf("month")
                     .format("d"); 
        if(e===2){
            firstDay = moment(dateObject).add(1, "months")
            .startOf("month")
            .format("d"); 
        }
       return firstDay;
    };
    lastDayOfMonth = (e) => {
      let dateObject = this.state.dateObject;
      let lastDay = moment(dateObject)
                   .endOf("month")
                   .format("d"); 
      if(e===2){
          lastDay = moment(dateObject).add(1, "months")
          .endOf("month")
          .format("d"); 
      }
     return lastDay;
  };
    daysInMonth = (e) => {
        let dateObject = this.state.dateObject;
        //let year= moment(dateObject).startOf("month").month() === 11?moment(dateObject).add(1, "years").startOf("year").year():moment(dateObject).startOf("year").year()
        
        let firstDay = moment(dateObject)
        .daysInMonth()
        if(e===2){
         firstDay = moment(dateObject).add(1, "months")
            .daysInMonth()
        }

       return firstDay;
    };
      renderHeader() {
        const weekdayshort = moment.weekdaysShort();
       return weekdayshort.map(day => {
            return (
              <th key={day} className="week-day">
               {day}
              </th>
            );
         });
      }
    
      renderDays(e) {
        let blanks = [];
        let lastBlanks = []
        let prevMonth = moment(this.state.dateObject).subtract(1, "month").startOf("month").month()
        let prevMonthDays = moment(this.state.dateObject).subtract(1, "month").daysInMonth()
        let prevMonthYear = moment(this.state.dateObject).subtract(1, 'month').startOf("month").year()
        if(e===2)
        {
          prevMonth = moment(this.state.dateObject).startOf("month").month()
          prevMonthYear = moment(this.state.dateObject).startOf("month").year()
          prevMonthDays = moment(this.state.dateObject).daysInMonth()
        }
        for (let i = 0; i < this.firstDayOfMonth(e); i++) {
          blanks.unshift(
            <td key={'month'+i} className="past-month-day">
                <button
                  onClick={e => { 
                    this.onDayClick(prevMonth, prevMonthDays-i, prevMonthYear);
                    this.props.onClose()
                  }}
                type="button">{prevMonthDays-i}</button>
            </td>
          );
        }


        let nextMonth = moment(this.state.dateObject).add(1, "months").startOf("month").month()
        let nextMonthYear = moment(this.state.dateObject).add(1, "months").startOf("month").year()
        if(e===2)
        {
          nextMonth = moment(this.state.dateObject).add(2, "months").startOf("month").month()
          nextMonthYear = moment(this.state.dateObject).add(2, "months").startOf("month").year()
        }
        for (let i = 6; i > this.lastDayOfMonth(e); i--) {
          lastBlanks.push(
            <td key={'last'+i} className="next-month-day">
                <button
                
                onClick={e => { 
                  this.onDayClick(nextMonth, 7-i, nextMonthYear);
                  this.props.onClose()
                }}
                type="button">{7-i}</button>
            </td>
          );
        }
        let month = moment(this.state.dateObject).startOf("month").month()
        let year = moment(this.state.dateObject).startOf("month").year()
        let currentMonth = moment().startOf("month").month()
        let currentYear = moment().startOf("month").year()
        if(e===2)
         {
          month = moment(this.state.dateObject).add(1, "months").startOf("month").month()
          year  = moment(this.state.dateObject).add(1, "months").startOf("month").year()
         }
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(e); d++) {
          let currentDay = d === this.currentDay() ? "today" : ""; 
          daysInMonth.push(
            <td key={'current'+d} className={`calendar-day ${(currentMonth===month && year===currentYear)?currentDay:''}`}>
                <button onClick={()=> { 
             this.onDayClick(month, d, year);
             this.props.onClose()
           }} type="button">{d}</button>
            </td>
          );
        }
        var totalSlots = [...blanks, ...daysInMonth, ...lastBlanks];
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
            return <tr key={i}>{d}</tr>;
          });
      }
    
      renderMonth(e) {
        let dateObject = this.state.dateObject;
        let month = moment(dateObject).startOf("month").format('MMMM') +" "+ moment(dateObject).startOf("year").format('YYYY')
        if(e===2)
        month = moment(dateObject).add(1, "months").startOf("month").format('MMMM') + " "+ (moment(dateObject).startOf("month").month() === 11?moment(dateObject).add(1, "years").startOf("year").format('YYYY'):moment(dateObject).startOf("year").format('YYYY'))
        return month
      }
    
      onDayClick = (month,day,year ) => {
        let dateObject = moment(this.state.dateObject).set("month", month).set("date", day).set('year', year);
        this.setState({
            selectedDay: dateObject
          },
         );
         if(this.props.onChange)
         this.props.onChange(dateObject._d)
      };
      currentDay = () => {  
            return Number(this.state.dateObject.format("D"));
      };
      nextMonth = () => {
        let dateObject = Object.assign({}, this.state.dateObject);
   

        dateObject = moment(dateObject).set("month", moment(dateObject).startOf("month").month()+1)
        this.setState({
          dateObject: dateObject
        },
       );
      };
    
      prevMonth = () => {
        let dateObject = Object.assign({}, this.state.dateObject);
   

          dateObject = moment(dateObject).set("month", moment(dateObject).startOf("month").month()-1)
          this.setState({
            dateObject: dateObject
          },
        );
      };
    render(){
        return(
            <div ref={this.props.refs} style={{top:this.props.top}}  className="calendar-display close">

                <div className="calendar-dates">
                <div className="title">
                  <p>Choose {this.props.label.toLowerCase()} date</p>
                  <button onClick={this.props.onClose} type="button">
                    <span></span>
                    <span></span>
                  </button>
                  
                </div>
                    <div className="first">
                        <div className="month-label">
                            {this.renderMonth(1)}
                        </div>
                        <table>
                            <thead>
                                <tr>{this.renderHeader()}</tr>
                            </thead>
                            <tbody>
                                {this.renderDays(1)}
                            </tbody>
                            
                        </table>
                    </div>
                    <div className="second">
                        <div className="month-label">
                            {this.renderMonth(2)}
                        </div>
                        <table>
                            <thead>
                                <tr>{this.renderHeader()}</tr>
                            </thead>
                            <tbody>
                                {this.renderDays(2)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="calendar-nav">
                    <div className="calendar-pag">
                        <button onClick={this.prevMonth} type="button">Prev.</button>
                        <button onClick={this.nextMonth} type="button">Next</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dates
Dates.propTypes = {
    day: PropTypes.string,
    onSelect: PropTypes.func,
    deviceWidth:PropTypes.number,
    sm:PropTypes.number,
    label:PropTypes.string,
    onClick:PropTypes.func,
    onChange:PropTypes.func,
    onClose:PropTypes.func
  };
  
  Dates.defaultProps = {
    day: '',
    onSelect:null,
    deviceWidth:0,
    sm:0,
    label:'',
    onClick:null,
    onChange:null,
    onClose:null
  };

