export default (state, action) => {
    switch (action.type) {
      case "USER":
        return {
          ...state,
          user: action.payload
        };
      case "AUTH":
        return {
          ...state,
          auth: action.payload
        };
      case "ENV":
        return {
          ...state,
          env: action.payload
        };
      case "DASHBOARD":
        return {
          ...state,
          dashboard: action.payload
        };
      case "DASHBOARD_DATA":
        return {
          ...state,
          dashboardData: action.payload
        };
      case "PROPERTIES":
        return {
          ...state,
          properties: action.payload
        };
      case "SEARCH":
        return {
          ...state,
          searches: action.payload
        };
        case "SEARCH_DATA":
          return {
            ...state,
            searchData: action.payload
          };
      case "HISTORY":
        return {
          ...state,
          histories: action.payload
        };
        case "PROPERTY_TYPES":
          return {
            ...state,
            propertyTypes: action.payload
          };
        case "TRENDING_AND_BEST_CRIBS":
          return {
            ...state,
            trendingCribs: action.payload.trending_cribs,
            bestCribs: action.payload.best_cribs
          };
        case "CRIB":
          return {
            ...state,
            crib: action.payload.property
          };
        case "FAVOURITES":
          return {
            ...state,
            favourites: action.payload
          };
      default:
        return state;
    }
  };