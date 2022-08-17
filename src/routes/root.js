import React, {Component} from "react";
import {Switch} from "react-router-dom"
import Payment from "../pages/Payment";
import Index from "../pages/index"
import  Search from "../pages/search";
import Single from "../pages/single";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Dashboard from "../pages/app/dashboard";
import Properties from "../pages/app/properties";
import AddProperty from "../pages/app/addProperty";
import DashboardPayment from "../pages/app/DashboardPayment";
import DashboardCalendar from "../pages/app/DashboardCalendar";
import EditProperty from "../pages/app/editProperty";
import Inbox from "../pages/app/inbox";
import Setting from "../pages/app/host/setting";
import RentSetting from "../pages/app/renter/setting";
import Profile from "../pages/app/host/profile";
import RentProfile from "../pages/app/renter/profile";
import Review from "../pages/app/review";
import EditProfile from "../pages/app/host/editProfile";
import RentEditProfile from "../pages/app/renter/editProfile";
import Home from "../pages/app/home";
import PrivateSearch from "../pages/app/search";
import PrivateSingle from "../pages/app/single";
import PrivatePayment from "../pages/app/payment";
import Favourites from "../pages/app/renter/favourites";
import History from "../pages/app/renter/history";
import Activates from "../pages/activate";
import Verify from "../pages/verify";
import PublicRoute from "./publicRoute";
import RentRoute from "./privateRoute";
import HostRoute from "./auth";
// import More from "../pages/app/more";
import VerifyRoute from "./verification";
import ForgetPassword from "../pages/forget";
import NotFound from "../pages/404";
import ChangePassword from "../pages/change-password";
import HostLogin from "../pages/app/host/login";
import HostRegister from "../pages/app/host/register";
// import AdminLogin from "../pages/admin/login";
// import AdminRoute from "./adminRoute";
// import AdminDashboard from "../pages/admin/dashboard";
// import Amenities from "../pages/admin/amenities";
// import AdminProperties from "../pages/admin/properties";
// import RootAdmin from "./rootAdmin";
// import AdminProfile from "../pages/admin/profile";
//import users from "../pages/admin/users";

class Root extends Component{

    render(){
    return(
        <Switch>
            <HostRoute exact component={Dashboard} path='/app/dashboard' />
            <HostRoute exact component={Properties} path='/app/cribs' />
            <HostRoute exact path='/app/add-crib' component={AddProperty} />
            <HostRoute exact component={EditProperty} path='/app/edit-crib/:id' />
            <HostRoute exact path='/app/withdraws' component={DashboardPayment} />
            <RentRoute exact path='/app/history' component={History} />
            <RentRoute exact path='/app/favourites' component={Favourites} />
            <RentRoute exact path='/app/search' component={PrivateSearch} />
            <RentRoute exact path='/app/payment' component={PrivatePayment} />
            <RentRoute exact path='/app/crib/:id' component={PrivateSingle} />
            <RentRoute exact path='/app/reviews' component={Review} />
            <RentRoute exact path='/app/home' component={Home} />
            <HostRoute exact path='/app/settings' component={Setting} />
            <RentRoute exact path='/app/setting' component={RentSetting} />
            <HostRoute exact path='/app/profile' component={Profile} />
            <RentRoute exact path='/app/myprofile' component={RentProfile} />
            {/* <RentRoute exact path='/app/more-cribs' component={More} /> */}
            <HostRoute exact path='/app/edit-profile' component={EditProfile} />
            <RentRoute exact path='/app/edit-myprofile' component={RentEditProfile} />
            <HostRoute exact path='/app/inbox' component={Inbox} />
            <HostRoute exact path='/app/calendar' component={DashboardCalendar} />
            <VerifyRoute exact path='/verification' component={Activates} />
            <VerifyRoute exact path='/verification/:token' component={Verify} />
            
            {/* <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
            <RootAdmin exact path='/admin/login' component={AdminLogin} />
            <AdminRoute exact path='/admin/amenities' component={Amenities} />
            <AdminRoute exact path='/admin/properties' component={AdminProperties} />
            <AdminRoute exact path='/admin/profile' component={AdminProfile} />
            <AdminRoute exact path='/admin/users' component={users} /> */}


            <PublicRoute exact path='/payment' component={Payment} />
            <PublicRoute exact path='/register' component={SignUp} />
            <PublicRoute exact path="/search" component={Search}/>
            <PublicRoute exact path="/crib/:id" component={Single}/>
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/host-login" component={HostLogin} />
            <PublicRoute exact path="/host-register" component={HostRegister} />
            <PublicRoute exact path="/forgot-password" component={ForgetPassword} />
            <PublicRoute exact path="/password/:token"  component={ChangePassword} />
            
            

            <PublicRoute exact path="/" component={Index} />
            <PublicRoute exact path='/*' component={NotFound} />
            <RentRoute exact path='/app/*' component={NotFound} />
            <HostRoute exact path='/app/*' component={NotFound} />
            
        </Switch>
    )
}
}
export default Root;