import React, { Component } from "react";
import {
    Grid, 
    Avatar
} from '@material-ui/core'
import Chart from "../../../components/chart/index";
import Detail from "../../../components/detail/index";
import { currency, humanDiff, maxStringLength } from "../../../helpers/helpers";
import { connect } from "react-redux";
import "./dashboard.scss"
import Table , {TableBody, TableRow, TableCell} from "../../../components/table";
import { setDashboardData } from "../../../state/actions";
import { getDashboard } from "../../../apis/server";
import moment from "moment";
import { DetailSkeleton, SmallSkeleton, TableDataSkeleton } from "../../../components/skeleton";


class HostDashboard extends Component{
    state={
        data:{},
        loading:true
    }
    componentDidMount(){
        this.onLoad()
    }
     onLoad = ()=>{
         const date = moment().subtract('day',7)._d
        getDashboard(this.props.user.id, date)
        .then(dashboardData=>{
            const week = {
                0:0,
                1:0,
                2:0,
                3:0,
                4:0,
                5:0,
                6:0
            }
            this.props.setDashboardData(dashboardData)
            dashboardData.activities.forEach(activity=>{
               const day = moment(activity.createdAt).get('day')
               week[day] += 1
            })
            this.setState({loading:false, data:week})
        })
        .catch(e=>{
            this.setState({loading:false})
        })
    } 
    render(){
        const {classes,user,dashboardData} = this.props
        const data = this.state.data
        return (
            <>
                <Grid container className="dashboard-center" spacing={2} justify="space-between">
                    <div className="impression">
                        <div className="user">
                            <div className={classes.userInner}>
                                <p>Welcome {user.firstname}!</p>
                                <p>What a great day to organise sales, make the best of it.</p>
                            </div>
                        </div>
                        <div className="sales">
                            <div className="sales-content">
                                <svg width="62" height="47" viewBox="0 0 62 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30.9999 21.9106C36.2106 21.9106 40.4348 17.0057 40.4348 10.9553C40.4348 4.90485 36.2106 0 30.9999 0C25.7892 0 21.5651 4.90485 21.5651 10.9553C21.5651 17.0057 25.7892 21.9106 30.9999 21.9106Z" fill="#1053FF"/>
                                <path d="M49.8696 28.2195C53.5915 28.2195 56.6087 24.716 56.6087 20.3943C56.6087 16.0727 53.5915 12.5692 49.8696 12.5692C46.1477 12.5692 43.1305 16.0727 43.1305 20.3943C43.1305 24.716 46.1477 28.2195 49.8696 28.2195Z" fill="#1053FF"/>
                                <path d="M12.3218 28.2195C16.0437 28.2195 19.0609 24.716 19.0609 20.3943C19.0609 16.0727 16.0437 12.5692 12.3218 12.5692C8.59995 12.5692 5.58276 16.0727 5.58276 20.3943C5.58276 24.716 8.59995 28.2195 12.3218 28.2195Z" fill="#1053FF"/>
                                <path d="M30.9999 25.0894C21.3387 25.0894 13.4781 34.2167 13.4781 45.4349C13.4781 46.2988 14.082 47 14.826 47H47.1738C47.9178 47 48.5217 46.2988 48.5217 45.4349C48.5217 34.2167 40.6612 25.0894 30.9999 25.0894Z" fill="#1053FF"/>
                                <path d="M14.6455 31.6388C13.8206 31.4353 12.9822 31.3007 12.1304 31.3007C5.44252 31.3007 0 37.6203 0 45.386C0 46.2499 0.603868 46.9511 1.34787 46.9511H11.0306C10.8796 46.4598 10.7826 45.937 10.7826 45.386C10.7826 40.2496 12.2275 35.5076 14.6455 31.6388Z" fill="#1053FF"/>
                                <path d="M49.8696 31.3496C49.0178 31.3496 48.1794 31.4841 47.3546 31.6877C49.7726 35.5564 51.2175 40.2985 51.2175 45.4349C51.2175 45.9858 51.1204 46.5085 50.9694 47H60.6522C61.3962 47 62 46.2988 62 45.4349C62 37.6692 56.5575 31.3496 49.8696 31.3496Z" fill="#1053FF"/>
                                </svg>
                                {
                                    this.state.loading?
                                    <SmallSkeleton/>
                                    :
                                    <p>{dashboardData.totalCribs}</p>
                                }
                                <p>Total Cribs</p>
                            </div>
                        </div>
                        <div className="sales">
                                <div className="sales-content">
                                    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0)">
                                    <path d="M24.5932 6.02001L26.0607 4.15906C26.2358 3.93133 26.5047 3.79584 26.7919 3.78958H32.0871C30.8572 2.32209 29.4668 1.23397 28.0926 0.572661C26.6642 -0.115228 25.4224 -0.182454 24.6871 0.365252C23.9512 0.912957 23.6714 2.12614 23.9194 3.69213C24.0539 4.49154 24.2801 5.27219 24.5932 6.02001Z" fill="#1053FF"/>
                                    <path d="M46.4608 27.2696H45.5415V32.2057H46.4608C47.0585 32.2057 47.4092 31.8722 47.4092 31.1457V28.3817C47.4092 27.6563 47.0585 27.2696 46.4608 27.2696Z" fill="#1053FF"/>
                                    <path d="M42.1965 52.6173H20.4013C20.1674 52.6308 19.9386 52.5443 19.7718 52.3796C19.6045 52.2149 19.5159 51.9872 19.5269 51.7527V27.8699L10.9043 52.0904L38.8904 62.0002L42.1965 52.6173Z" fill="#1053FF"/>
                                    <path d="M36.1925 17.8043C37.4312 17.8054 38.4985 16.9335 38.745 15.7198C38.991 14.5066 38.3474 13.2877 37.2066 12.8062C36.981 13.8391 36.4823 14.6614 35.7355 15.2175C35.1409 15.6505 34.4316 15.8991 33.6968 15.9309C34.021 17.0398 35.0372 17.8028 36.1925 17.8043Z" fill="#1053FF"/>
                                    <path d="M51.1447 13.1382L45.1423 5.65737H27.2432L25.5125 7.85548C25.8184 8.38026 26.1524 8.88836 26.5131 9.37718C27.9003 11.2418 29.5695 12.7056 31.2141 13.4972C31.4528 13.6129 31.6978 13.7145 31.9479 13.8031C32.6598 11.6295 34.8959 10.3428 37.1331 10.8186C39.3703 11.2949 40.8878 13.3815 40.6528 15.6562C40.4178 17.9315 38.5053 19.6632 36.218 19.6721C33.9313 19.6809 32.0052 17.9638 31.753 15.6906C29.5252 15.0523 27.0456 13.2168 25.0205 10.495C24.7579 10.1417 24.5364 9.78574 24.3071 9.42772L21.3945 13.1382V50.7495H51.1447V13.1382ZM37.537 26.3644C37.537 26.0121 37.9878 25.8625 38.4042 25.8625C38.82 25.8625 39.2713 26.0121 39.2713 26.3644V32.2057H41.6263C41.9468 32.2057 42.1068 32.5762 42.1068 32.9394C42.1068 33.3021 41.9468 33.6732 41.6263 33.6732H38.2541C37.8908 33.6732 37.537 33.4939 37.537 33.1526V26.3644ZM30.1995 28.3817C30.1995 26.5457 31.3225 25.8625 32.7952 25.8625C34.2685 25.8625 35.4025 26.5457 35.4025 28.3817V31.2098C35.4025 33.0452 34.2685 33.7284 32.7952 33.7284C31.3225 33.7284 30.1995 33.0458 30.1995 31.2098V28.3817ZM23.1096 32.3839C23.1096 32.0207 23.4295 31.4871 23.835 31.4871C24.3368 31.4871 24.6568 32.2771 25.6495 32.2771C26.1404 32.2771 26.6845 32.0848 26.6845 31.5725C26.6845 30.2812 23.3013 30.5053 23.3013 28.008C23.3013 26.4071 24.6995 25.7984 26.0336 25.7984C26.599 25.7984 28.1577 25.9053 28.1577 26.738C28.1577 27.0257 27.9654 27.613 27.4959 27.613C27.1118 27.613 26.9086 27.2076 26.0336 27.2076C25.2759 27.2076 24.9663 27.5171 24.9663 27.8475C24.9663 28.9148 28.3495 28.7126 28.3495 31.4021C28.3495 32.9389 27.2291 33.7712 25.6813 33.7712C24.2837 33.7712 23.1096 33.0885 23.1096 32.3839ZM46.9522 47.6811H25.4338C24.9179 47.6811 24.4999 47.2626 24.4999 46.7472C24.4999 46.2313 24.9179 45.8134 25.4338 45.8134H46.9522C47.4681 45.8134 47.8861 46.2313 47.8861 46.7472C47.8861 47.2626 47.4681 47.6811 46.9522 47.6811ZM46.9522 42.6116H25.4338C24.9179 42.6116 24.4999 42.1931 24.4999 41.6777C24.4999 41.1618 24.9179 40.7439 25.4338 40.7439H46.9522C47.4681 40.7439 47.8861 41.1618 47.8861 41.6777C47.8861 42.1931 47.4681 42.6116 46.9522 42.6116ZM49.1436 31.1457C49.1436 32.9817 47.934 33.6732 46.4608 33.6732H44.5717C44.1345 33.6732 43.9406 33.4298 43.9406 33.163V26.3644C43.9406 26.0976 44.1345 25.8021 44.5717 25.8021H46.4608C47.934 25.8021 49.1436 26.5457 49.1436 28.3817V31.1457Z" fill="#1053FF"/>
                                    <path d="M35.279 12.7692C34.6683 13.0001 34.1664 13.4508 33.8715 14.0335C34.1419 13.9871 34.3978 13.8792 34.6203 13.7192C34.9304 13.4758 35.1597 13.1449 35.279 12.7692Z" fill="#1053FF"/>
                                    <path d="M32.7954 32.2771C33.3931 32.2771 33.8017 31.9462 33.8017 31.2098V28.3817C33.8017 27.6453 33.3931 27.3144 32.7954 27.3144C32.1982 27.3144 31.8005 27.6453 31.8005 28.3817V31.2098C31.8005 31.9462 32.1976 32.2771 32.7954 32.2771Z" fill="#1053FF"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0">
                                    <rect width="62" height="62" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    {
                                        this.state.loading?
                                        <SmallSkeleton/>
                                        :
                                        <p>{dashboardData.totalBooking}</p>
                                    }
                                    <p>Total Bookings</p>
                                </div>
                        </div>
                        <div className="sales">
                            <div className="sales-content">
                                <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.2341 29.0255L25.153 32.6288H27.2659L26.2341 29.0255Z" fill="#1053FF"/>
                                <path d="M59.2478 30.9999L61.9999 26.0901L57.8651 22.2709L58.9655 16.7507L53.853 14.3962L53.1936 8.80628L47.6037 8.14693L45.2491 3.03436L39.7291 4.13462L35.9099 0L30.9999 2.75209L26.0901 0L22.271 4.13474L16.751 3.03448L14.3964 8.14705L8.80653 8.80641L8.14717 14.3963L3.03448 16.7509L4.13486 22.271L0 26.0901L2.75221 30.9999L0 35.9098L4.13474 39.729L3.03436 45.2491L8.14693 47.6037L8.80628 53.1936L14.3962 53.853L16.7507 58.9655L22.2708 57.8651L26.0898 61.9999L30.9997 59.2478L35.9096 61.9999L39.7286 57.8651L45.2486 58.9655L47.6032 53.853L53.1931 53.1936L53.8525 47.6037L58.965 45.2491L57.8647 39.729L61.9994 35.9098L59.2478 30.9999ZM20.2643 35.2411C20.0077 35.716 19.6691 36.0957 19.2489 36.3794C18.8283 36.6634 18.3533 36.8681 17.8239 36.9936C17.2942 37.119 16.7619 37.182 16.2269 37.182C15.801 37.182 15.3642 37.1492 14.9168 37.0838C14.469 37.0183 14.0242 36.9255 13.5818 36.8054C13.1396 36.6854 12.7137 36.5434 12.3043 36.3795C11.8949 36.2157 11.5154 36.0303 11.166 35.8226L12.5418 33.0218C12.9238 33.2621 13.3222 33.4751 13.7373 33.6606C14.0867 33.8244 14.4825 33.9717 14.9248 34.1028C15.367 34.2339 15.8175 34.2994 16.2761 34.2994C16.6253 34.2994 16.8682 34.2531 17.0049 34.1601C17.1414 34.0675 17.2096 33.9447 17.2096 33.7915C17.2096 33.6277 17.1413 33.4885 17.0049 33.3739C16.8682 33.2592 16.6799 33.1583 16.4399 33.0709C16.1996 32.9837 15.9239 32.8964 15.6128 32.8088C15.3017 32.7216 14.9713 32.6179 14.6219 32.4977C14.1086 32.3232 13.6664 32.1348 13.2952 31.9327C12.9239 31.7307 12.6181 31.5015 12.3781 31.2448C12.1378 30.9884 11.9604 30.6961 11.8457 30.3686C11.7312 30.041 11.6738 29.6643 11.6738 29.2384C11.6738 28.5942 11.791 28.0264 12.0258 27.5351C12.2606 27.0438 12.5798 26.6343 12.9839 26.3067C13.3877 25.9792 13.8492 25.731 14.368 25.5615C14.8864 25.3923 15.4351 25.3077 16.014 25.3077C16.4399 25.3077 16.8548 25.3486 17.2586 25.4306C17.6626 25.5125 18.053 25.6165 18.4297 25.7417C18.8064 25.8674 19.1586 26.0037 19.4861 26.1512C19.8137 26.2987 20.1085 26.4379 20.3706 26.5689L18.9949 29.2058C18.6673 29.0093 18.3287 28.8347 17.9794 28.6817C17.6846 28.5506 17.3542 28.4278 16.9885 28.3131C16.6225 28.1986 16.265 28.141 15.9158 28.141C15.6317 28.141 15.4053 28.1848 15.2361 28.2722C15.0668 28.3597 14.9823 28.5071 14.9823 28.7144C14.9823 28.8675 15.0313 28.9928 15.1298 29.0911C15.228 29.1894 15.3697 29.2796 15.5557 29.3613C15.7412 29.4432 15.9676 29.5226 16.2354 29.5988C16.5027 29.6752 16.8057 29.7682 17.1443 29.8772C17.6792 30.041 18.1623 30.2211 18.5938 30.4176C19.0251 30.6141 19.3936 30.8463 19.6995 31.1136C20.0049 31.3813 20.2399 31.7062 20.4038 32.0881C20.5676 32.4705 20.6494 32.9344 20.6494 33.4803C20.6491 34.1793 20.5208 34.7662 20.2643 35.2411ZM28.4779 37.0345L27.7736 34.7581H24.6781L23.9902 37.0345H20.7308L24.7763 25.406H27.6917L31.7208 37.0345H28.4779ZM32.687 37.0345V25.406H35.8807V34.2503H41.1545V37.0346H32.687V37.0345ZM50.5558 37.0345H50.5557H42.2683V25.406H50.4084V28.1904H45.4621V29.8282H49.6878V32.416H45.4621V34.2505H50.5558V37.0345Z" fill="#1053FF"/>
                                </svg>
                                {
                                    this.state.loading?
                                    <SmallSkeleton/>
                                    :
                                    <p>{currency(dashboardData.earning)}</p>
                                }
                                <p>Total Earnings</p>
                            </div>
                        </div>
                    </div>
                    <div className="recents">
                        <div className="recent-activity">
                            <div className="display-chart">
                                <p className="recent-title">Recent Activity</p>
                                <div className="my-chart">
                                    <Chart data={[data[1],data[2],data[3], data[4], data[5], data[6], data[0]]}/>
                                </div>
                            </div>
                            <div className="recent-cribs">
                                <p className="recent-title">Recent Cribs</p>
                                {
                                    this.state.loading?
                                    <div>
                                        <div className="recent-cribs-scroll">
                                            {
                                                [1,2].map(i=>(
                                                    <DetailSkeleton key={i}/>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    <>
                                    {
                                        dashboardData.recentCribs.length>0?
                                        <div>
                                            <div className="recent-cribs-scroll">
                                                {
                                                    dashboardData.recentCribs.map((crib,i)=>(
                                                        <Detail key={i} crib={crib} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        :
                                        <p>You have not uploaded a crib yet</p>
                                    }
                                    </>
                                }
                            </div>
                        </div>


                        <div className="recent-transactions">
                            <div className="transactions">
                                <p className="recent-title">Recent Transactions</p>
                                {
                                    this.state.loading?
                                        [1,2,3,4].map(i=>(
                                            <TableDataSkeleton key={i} className="rtransactions" columns={5}/>
                                        ))
                                    :
                                    <>
                                    {
                                        dashboardData.recentTransactions.length>0?
                                        <Table className="recent-transactions-table">
                                            <TableBody>
                                                {
                                                    dashboardData.recentTransactions.map((transaction,i)=>(
                                                        <TableRow key={i} style={{height:67}}>
                                                            <TableCell style={{flexBasis:0}}>
                                                                <Avatar src={process.env.REACT_APP_BACKEND_URL+'/'+transaction.renter.image} style={{height:30, width:30}}/>
                                                            </TableCell>
                                                            <TableCell style={{whiteSpace: 'nowrap', minWidth:160}}>
                                                                <p className="recent-title-head">{maxStringLength(transaction.renter.firstname +' ' +transaction.renter.lastname, 23) }</p>
                                                                <span className="recent-title-subhead">{maxStringLength(transaction.propertyName, 23)}</span>    
                                                            </TableCell>
                                                            <TableCell style={{textAlign:'center',whiteSpace: 'nowrap', minWidth:100}}>
                                                                {humanDiff(transaction.createdAt)}
                                                            </TableCell>
                                                            <TableCell style={{whiteSpace: 'nowrap'}}>
                                                            <span className={!transaction.status?'tdelivered':'tpending'}>{!transaction.status?'success':'pending'}</span>
                                                            </TableCell>
                                                            <TableCell style={{whiteSpace: 'nowrap'}}>
                                                            {currency(transaction.amount)}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                        :
                                        <p>No Transactions yet!</p>
                                    }
                                    </>
                                }
                            </div>
                            <div className="recent-withdraws">
                                <p className="recent-title">Recent Withdraws</p>
                                {
                                    this.state.loading?
                                    [1,2,3,4].map(i=>(
                                        <TableDataSkeleton style={{minWidth:100}} key={i} columns={5}/>
                                    ))
                                    :
                                    <>
                                    {
                                        dashboardData.recentWithdraws.length>0?
                                        <Table className="recent-withdraws-table">
                                            <TableBody>
                                                {
                                                    dashboardData.recentWithdraws.map((withdraw,i)=>(
                                                        <TableRow key={i} style={{height:67}}>
                                                            <TableCell style={{whiteSpace: 'nowrap',minWidth:160}}>
                                                                <p className="recent-title-head">{!withdraw.method?'With Paypal':'With Bank'}</p>
                                                                <span className="recent-title-subhead">{!withdraw.method?maxStringLength(withdraw.paypal_email, 20):maxStringLength(withdraw.account_number,20)}</span>    
                                                            </TableCell>
                                                            <TableCell style={{textAlign:'center',whiteSpace: 'nowrap'}}>
                                                                {humanDiff(withdraw.createdAt)}   
                                                            </TableCell>
                                                            <TableCell style={{whiteSpace: 'nowrap'}}>
                                                                {
                                                                    withdraw.status ===0?
                                                                    <span className="wpending"> Pending</span>
                                                                    :
                                                                    withdraw.status ===1?
                                                                    <span className="wdelivered"> paid</span>
                                                                    :
                                                                    <span className="wdeclined"> Declined</span>
                                                                }
                                                            </TableCell>
                                                            <TableCell style={{whiteSpace: 'nowrap'}}>
                                                                {currency(withdraw.amount)}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                        :
                                        <p>No withdrawals yet!</p>
                                    }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    </Grid>
            </>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user,
    notifications:state.notifications,
    chart:state.chart,
    dashboardData:state.dashboardData
})
const mapDispatchToProps=dispatch=>({
    setDashboardData:(payload) => dispatch(setDashboardData(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(HostDashboard);