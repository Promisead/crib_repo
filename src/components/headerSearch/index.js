import React, { Component } from "react"
import PropTypes from "prop-types"
import Calendar from "../calender"
import "./index.scss"
import Guest from "../guest"
import { getDates } from "../../helpers/helpers"
import { searchProperties } from "../../apis/server"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { storeSearchData } from "../../state/actions"
class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: this.props.searchData.location,
            checkIn: this.props.searchData.checkIn,
            checkOut: this.props.searchData.checkOut,
            guest: this.props.searchData.guest,
            children:this.props.searchData.children,
            adult:this.props.searchData.adult,
            infant:this.props.searchData.infant,
            pet:this.props.searchData.pet,
            open: false,
            interval:null,
            deviceWidth:13300
        }
        this.searchForm= React.createRef()
    }
    componentDidMount() {
        this.setState({ 
            open: this.props.open?this.props.open:this.state.open,
            location: this.props.searchData.location,
            checkIn: this.props.searchData.checkIn,
            checkOut: this.props.searchData.checkOut,
            guest: this.props.searchData.guest,
            adult: this.props.searchData.adult,
            children: this.props.searchData.children,
            infant: this.props.searchData.infant,
            pet: this.props.searchData.pet
         })
         this.handleResize()
         document.addEventListener('click', this.handleClick)
         window.addEventListener('resize', this.handleResize)
    }
    handleResize = ()=>{
        this.setState({deviceWidth:window.innerWidth})
    }
    handleClick=(e)=>{

        if(this.searchForm.current){
            const className = typeof e.target.className === 'object'? e.target.className.baseVal:e.target.className
            if(!this.searchForm.current.contains(e.target) && this.props.open && this.props.width>15 && className !=='qsearch1'){

                if(this.props.onClose)
                this.props.onClose()
            }
        }
          
    }
    componentDidUpdate(prevProps) {
        if(prevProps.searchData !== this.props.searchData){
            
            this.setState({
                location: this.props.searchData.location,
                checkIn: this.props.searchData.checkIn,
                checkOut: this.props.searchData.checkOut,
                guest: this.props.searchData.guest,
                adult: this.props.searchData.adult,
                children: this.props.searchData.children,
                infant: this.props.searchData.infant,
                pet: this.props.searchData.pet
            })
        }
    }
    componentWillUnmount(){
        clearTimeout(this.state.interval)
        document.removeEventListener('click', this.handleClick)
        window.removeEventListener('resize', this.handleResize)
    }
    setDays = () => {
        const dates = getDates(this.state.checkIn, this.state.checkOut)
        this.setState({ days: dates.length })
    }
     onSubmit =(e)=>{
        e.preventDefault()
        if(this.state.deviceWidth>770)
            {
                if(!this.state.location || !this.state.checkOut || !this.state.checkIn)
                {
                    return
                }
            }
        else
            {
                if(this.state.location === '')
                {
                   return
                }
            }
            
        const data = {
            location: this.state.location,
            checkIn: this.state.checkIn,
            checkOut: this.state.checkOut,
            guest: this.state.guest,
            children:this.state.children,
            adult:this.state.adult,
            infant:this.state.infant,
            pet:this.state.pet,
        }
        this.props.storeSearchData(data)
        searchProperties({search:this.state.location})
        .then(()=>{
            //setLoading(false)
            this.props.history.push({
                pathname: !this.props.user?'/search':'/app/search',
                search: `?location=${this.state.location}&check-in=${this.state.checkIn}&check-out=${this.state.checkOut}&guest=${this.state.guest}&children=${this.state.children}&adult=${this.state.adult}&infant=${this.state.infant}&pet=${this.state.pet}`
            })
        })
        .catch((er)=>{
            //setLoading(false)
        })
    }
    render() {
        
        return (
            <>
                {
                    this.props.width > 0 ?
                        <div style={{ width: `${this.props.width}vw`, backgroundColor: this.props.color }} ref={this.searchForm} className={`form-index ${this.props.open?'open':'close'}`}>
                            {
                                // this.state.open &&
                                <form onSubmit={this.onSubmit}>
                                    <div className="location">
                                        <input className='location__input' value={this.state.location} onChange={e=>this.setState({location:e.target.value})} type="text" name="location" id="" placeholder="Where do you want to lodge?" />
                                      
                                        <label className='location__text' htmlFor="">Location</label>
                                    </div>
                                    <div className="checkin">
                                        <Calendar
                                            top="160%"
                                            caret="-90%"
                                            right="-26vw"
                                            label="Check In"
                                            format="dd/MM/yyyy"
                                            value={this.state.checkIn}
                                            placeholder="Pick Dates"
                                            onChange={(e) => {
                                                if (Date.parse(e) > Date.parse(this.state.checkOut) || this.state.checkOut === '')
                                                    this.setState({ checkIn: e, checkOut: e }, () => { this.setDays() })
                                                else
                                                    this.setState({ checkIn: e }, () => { this.setDays() })
                                            }}
                                        />
                                    </div>
                                    <div className="checkin">
                                        <Calendar
                                            top="160%"
                                            caret="-90%"
                                            right="-18vw"
                                            label="Check Out"
                                            format="dd/MM/yyyy"
                                            placeholder="Pick Dates"
                                            value={this.state.checkOut}
                                            onChange={(e) => { this.setState({ checkOut: e }) }}
                                          
                                        />
                                    </div>
                                    <div className="checkin">
                                        <Guest
                                            caret="-90%"
                                            top="160%"
                                            right="-9vw"
                                            label="Guests"
                                            placeholder="Select Guests"
                                            onChange={(e)=>{this.setState({guest:(e.adult+e.children), adult:e.adult, children:e.children, infant:e.infant})}}
                                            adult={this.state.adult}
                                            childrens={this.state.children}
                                            infant={this.state.infant}
                                            onCheck={pet=>this.setState({pet})}
                                            checked={this.state.pet}
                                            value={this.state.guest}
                                        />
                                    </div>

                                    <button className="s-button">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 11C0 17.0751 4.92486 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92486 0 0 4.92487 0 11ZM4.76685 10.2454C4.76685 7.30226 7.15323 4.91724 10.0963 4.91724C13.0394 4.91724 15.4244 7.30226 15.4244 10.2454C15.4244 11.136 15.2065 11.9754 14.8202 12.7134C14.8236 12.7126 14.8275 12.7114 14.8309 12.7107L17.2331 15.1143L15.2633 17.0828L12.9443 14.7651C12.9426 14.7613 12.942 14.7569 12.9403 14.7531C12.1173 15.2735 11.142 15.5748 10.0963 15.5748C7.15321 15.5748 4.76685 13.1885 4.76685 10.2454ZM7.13416 10.2454C7.13416 11.8809 8.46074 13.2075 10.0963 13.2075C11.7319 13.2075 13.0571 11.8809 13.0571 10.2454C13.0571 8.60977 11.7319 7.28455 10.0963 7.28455C8.46074 7.28455 7.13416 8.60977 7.13416 10.2454Z" fill="#FCFCFC"/>
                                        </svg>
                                    </button>
                                </form>
                            }
                            {
                                this.props.width <= 15 ?
                                    <button id="qsearch1" className="qsearch1" onClick={this.props.onClick}>
                                        <span className="qsearch1">Quick Search</span>
                                        <svg className="qsearch1" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className="qsearch1" d="M0 11C0 17.0751 4.92486 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92486 0 0 4.92487 0 11ZM4.76685 10.2454C4.76685 7.30226 7.15323 4.91724 10.0963 4.91724C13.0394 4.91724 15.4244 7.30226 15.4244 10.2454C15.4244 11.136 15.2065 11.9754 14.8202 12.7134C14.8236 12.7126 14.8275 12.7114 14.8309 12.7107L17.2331 15.1143L15.2633 17.0828L12.9443 14.7651C12.9426 14.7613 12.942 14.7569 12.9403 14.7531C12.1173 15.2735 11.142 15.5748 10.0963 15.5748C7.15321 15.5748 4.76685 13.1885 4.76685 10.2454ZM7.13416 10.2454C7.13416 11.8809 8.46074 13.2075 10.0963 13.2075C11.7319 13.2075 13.0571 11.8809 13.0571 10.2454C13.0571 8.60977 11.7319 7.28455 10.0963 7.28455C8.46074 7.28455 7.13416 8.60977 7.13416 10.2454Z" fill="#FCFCFC"/>
                                        </svg>
                                    </button>
                                    : ''
                            }
                        </div>
                        : ''
                }
            </>
        )
    }
}

const mapStateToProps=state=>({
    searchData:state.searchData,
    user:state.user
})
const mapDispatchToProps=dispatch=>({
    storeSearchData:(payload)=>dispatch(storeSearchData(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Form))

Form.propTypes = {
    onClick: PropTypes.func,
    onClose:PropTypes.func,
}
Form.defaultProps={
    onClose:null
}