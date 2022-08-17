import React, { useState } from 'react';
import Layout from './layout';
import '../../scss/dashboard_calendar.scss';


import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Button } from '@material-ui/core';
import BookingCalendar from '../../components/booking';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import AppHeader from '../../components/appHeader';
import { search } from '../../state/actions';






const DashboardCalendar = ({history,trendingCribs, search}) => {



    const [available, setAvailable] = useState(false);
    const [property, setProperty] =useState(null)
    const [dates, setDates]=useState([new Date()])
    const [guest, setGuest]=useState(1)
    const [location, setLocation]=useState('')
    const date = new Date();
    const [bookingDate, setBookingDate] = useState(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    const bookNow = ()=>{
        const data = {
            checkIn:bookingDate,
            checkOut:bookingDate,
            guest:guest,
            location:location

        }
        search(data)
        history.push(`/app/crib/${property.id}`)
    }
    const handlePropertyChange = (event) => {
        if(event.target.value === ''){
            setAvailable(false)
            setProperty(null)

        }
        else{
            const proper = JSON.parse(event.target.value)
            setProperty(proper)
            setLocation(proper.state)
            const dates = []
            proper.bookedDates.forEach(date=>dates.push(new Date(date.seconds*1000)))
            dates.sort((a,b)=>new Date(b)-new Date(a))
            setDates([...new Set(dates)])
            if(proper.checkIn.length>0)
            proper.checkIn.filter(check=>{
                if(new Date(check.seconds*1000).toDateString() === bookingDate.toDateString())
                return setAvailable(false)
                else
                return setAvailable(true)
            })
            else
             setAvailable(true)
        }


    };

    const handleCalendar = (e) => {
        const date = new Date(e)
        const bookDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        if(property){
            setLocation(property.state)
            const dates = []
            property.bookedDates.forEach(date=>dates.push(new Date(date.seconds*1000)))
            dates.sort((a,b)=>new Date(b)-new Date(a))
            setDates([...new Set(dates)])
            if(property.checkIn.length>0)
            property.checkIn.filter(check=>{
                if(new Date(check.seconds*1000).toDateString() === bookingDate.toDateString())
                return setAvailable(false)
                else
                return setAvailable(true)
            })
            else
            setAvailable(true)
        }
 
         
        setBookingDate(bookDate);
    }

    return (
        <>
        
        <Layout>
        <AppHeader/>

            <div className="calendar__heading">
                <h1>Calendar</h1>
            </div>

            <div className="calendar__details">
                <div className="select__property">
                    {/* <h3>Select Property</h3>
                     */}
                    <label  htmlFor='properties'>
                        <h3 className='title'>Select Property</h3>
                    </label>
                    <FormControl  id="property">
                        <NativeSelect
                        className='input'
                        style={{width:'100%', height:'2rem'}}
                        // value={state.age}
                        onChange={handlePropertyChange}
                        IconComponent={ExpandMoreIcon}
                        inputProps={{
                            name: 'properties'
                        }}
                        >
                            <option value=''>Select property</option>
                            {trendingCribs.map((property, index)=>{
                                return <option key={index} value={JSON.stringify(property)} >{property.name}</option>
                            })}
                        </NativeSelect>
                    </FormControl>

                    <div className="availability">

                        <div className="availability__switch">
                            <h3 className='title'>Availability</h3>
                            <FormControlLabel
                                control={<Switch checked={available}  />}

                            />
                        </div>

                        <div className="room">
                            <h4 className='title'>Room</h4>
                            {/* <input type="number" placeholder='0' min='1' step='1' id="" /> */}
                            <FormControl >
                                <NativeSelect
                                className='input'
                                value={property?property.bedroom:''}
                                // onChange={handleChange}
                                style={{height:'1.6rem'}}
                                IconComponent={ExpandMoreIcon}
                                inputProps={{
                                    name: 'room'
                                }}
                                >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div className="guests">
                            <h4 className='title'>Guests</h4>
                            <FormControl >
                                <NativeSelect
                                 style={{height:'1.6rem'}}
                                className='input'
                                value={property?property.guest:''}
                                onChange={setGuest}
                                IconComponent={ExpandMoreIcon}
                                inputProps={{
                                    name: 'guest'
                                }}
                                >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div className="price">
                            <h4 className='title'>Price</h4>
                            <div className="amount">{property?property.amount:'0'}</div>
                            <span>/night</span>
                        </div>
                        {
                            available &&
                            <Button onClick={bookNow} className='button__book'>Book</Button>
                        }

                    </div>

                </div>

                <div className="actual__calendar">
                    <BookingCalendar
                        // onChange={handleCalendar}
                        bookings={[...dates]}
                        onChangeValue={handleCalendar}
                        // nextLabel={<ArrowForwardIcon style={{fontSize:15}}/>}
                        // prevLabel={<ArrowBackIcon style={{fontSize:15}}/>}
                        // defaultValue={[...dates]}
                        // activeStartDate={bookingDate}

                    />
                </div>
            </div>

        </Layout>
        </>
    );
}
const mapStateToProps=state=>({
    user:state.user,
    trendingCribs:state.trendingCribs
})
const mapDispatchToProps=dispatch=>({
    search:(payload)=>dispatch(search(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(DashboardCalendar));
