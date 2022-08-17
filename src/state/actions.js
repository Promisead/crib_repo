import { setDashboard } from "../helpers/helpers"

export const setAuth = (payload) => {
  return {
    type: "AUTH",
    payload
  }
}
export const setUser = (payload) => {
  return {
    type: "USER",
    payload
  }
}
export const setEnv = (payload) => {
  return {
    type: "ENV",
    payload
  }
}
export const setHistories = (payload) => {
  return {
    type: "HISTORY",
    payload
  }
}
export const chooseDashboard = (payload) => {
  setDashboard(payload)
  return {
    type: "DASHBOARD",
    payload
  }
}
export const setProperties = (payload) => {
  return {
    type: "PROPERTIES",
    payload
  }
}
export const setDashboardData = (payload) => {
  return {
    type: "DASHBOARD_DATA",
    payload
  }
}
export const setPropertyTypes = (payload) => {
  return {
    type: "PROPERTY_TYPES",
    payload
  }
}
export const setTrendingAndBestCribs = (payload) => {
  return {
    type: "TRENDING_AND_BEST_CRIBS",
    payload
  }
}
export const setCrib = (payload) => {
  return {
    type: "CRIB",
    payload
  }
}

export const setFavourite = (payload) => {
  return {
    type: "FAVOURITES",
    payload
  }
}
export const search = (payload) => {
  return {
    type: "SEARCH",
    payload
  }
}

export const storeSearchData = (payload) => {
  return {
    type: "SEARCH_DATA",
    payload
  }
}