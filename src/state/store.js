import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import {setDashboard } from "../helpers/helpers";

function configureStore(preload) {
  if(preload.user)
    setDashboard(preload.user.role)
  const state = { 
    auth: false,
    user:null,
    env: {
      country_code:'ng',
      country_calling_code:'+234'

    },
    properties:[],
    histories:[],
    favourites:[],
    trendingCribs:[],
    bestCribs:[],
    propertyTypes:[],
    topTypes:[],
    topCities:[],
    notifications:[],
    searchData:{
      location: '',
      checkIn: null,
      checkOut: null,
      guest: 0,
      children:0,
      adult:0,
      infant:0,
      pet:false,
    },
    searches:[],
    crib:null,
    amenities:[],
    states:[],
    chart:{
      monthly:[],
      weekly:[],
      yearly:[]
    },
    dashboardData:{
      earning:0,
      totalCribs:0,
      totalBooking:0,
      recentTransactions:[],
      recentCribs:[],
      recentWithdraws:[]
    },
    dashboard:false,
    ...preload,
   }
  return createStore(rootReducer,state,applyMiddleware(loadingBarMiddleware()));
}
export default configureStore;