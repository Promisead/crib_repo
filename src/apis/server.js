


export const checkLoggedIn = async () => {
    const response = await fetch('/api/user/auth')

    const { user } = await response.json();
    if(user === undefined)
    return null
    if (user)
    return user;
    return null
  };

  export const getCountryCode = async () => {
    const response= await fetch('https://ipapi.co/json/')
    const  {country_code, country_calling_code}  = await response.json();
    return {country_code, country_calling_code};
  };
  export const registerUser = async (data) => {
    const response = await fetch('/api/user/register',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user= await response.json();
    return user;
  };

  export const registerHost = async (data) => {
    const response = await fetch('/api/user/host-register',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user= await response.json();
    return user;
  };



  export const uploadProfileImage = async (id,data) => {
    const response = await fetch('/api/user/profile-photo/'+id,{
      method:'POST',
      body:data
    });
    const  user= await response.json();
    return user;
  };



  export const resendEmail = async (data) => {
    const response = await fetch('/api/user/resend',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user= await response.json();
    return user;
  };

  export const loginUser = async (data) => {
    const response = await fetch('/api/user/login',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user= await response.json();
    return user;
  };
  //logout
  export const signOut = async () => {
    const response = await fetch('/api/user/logout',{method:"DELETE"});
    const  user  = await response.json();

    if (user)
    return null
  };
  export const verifyEmail = async (token) => {
    const response = await fetch(`/user/verify?token=${token}`);
    const  user = await response.json();

    if (user)
    return user;
  };
  export const makeHost = async (id) => {
    const response = await fetch(`/api/user/make_host/${id}`);
    const  user = await response.json();

    if (user)
    return user;
  };

  export const getWallet = async (id) => {
    const response = await fetch(`/api/user/wallet/${id}`);
    const  user = await response.json();

    if (user)
    return user;
  };
  export const changeRole = async (id, data) => {
    const response = await fetch(`/api/user/change_role/${id}`,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user = await response.json();

    if (user)
    return user;
  };


  //property
  export const addProperty = async (data) => {
    const response = await fetch('/api/property/add_property',{
      method:'POST',
      body:data,
      // headers:{
      //   'Content-Type':'multipart/form-data'
      // }
    });
    const  user= await response.json();
    return user;
  };

  export const editProperty = async (data,id) => {
    const response = await fetch('/api/property/edit_property/'+id,{
      method:'PATCH',
      body:data,
      // headers:{
      //   'Content-Type':'multipart/form-data'
      // }
    });
    const  user= await response.json();
    return user;
  };

  export const getProperties = async (id) => {
    const response = await fetch('/api/property/properties/'+id);
    const  properties= await response.json();
    return properties.properties;
  };

  export const propertyTypes = async () => {
    const response = await fetch('/api/property/types');

    const { types, topTypes, topCities } = await response.json();
    return { types, topTypes, topCities } 
  };
  export const getTrendingAndBestCribs = async () => {
    const [trending_crib, best_crib] = await Promise.all([
      fetch('/api/property/trending_cribs'),
      fetch('/api/property/best_cribs')
    ]);
    const  [trending_cribs, best_cribs]= await Promise.all([
      trending_crib.json(),
      best_crib.json()
    ]);
    return {trending_cribs:trending_cribs.trending, best_cribs:best_cribs.best};
  };
  export const getCribById = async (id) => {
    const response = await fetch('/api/property/property/'+id);

    const { property } = await response.json();
    return property
  };


  export const reserveCrib = async (data, id) => {
    const response = await fetch('/api/property/book/'+id,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  {transaction}= await response.json();
    return transaction;
  };

  export const sendReview = async (data, id) => {
    const response = await fetch('/api/property/review/'+id,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  {transaction}= await response.json();
    return transaction;
  };


  export const updateHost = async (data, id) => {
    const response = await fetch(`/api/user/host_profile/${id}`,{
      method:'PATCH',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user = await response.json();
    console.log(user)
    if (user)
    return user;
  };

  export const deleteProperty = async (id) => {
    const response = await fetch('/api/property/delete_property/'+id,{method:"DELETE"});
    return await response.json();
  };

  export const searchProperties = async (data) => {
    const response = await fetch('/api/property/search_property', {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    });

    const { properties } = await response.json();
    return properties
  };

  export const getHistoriesByUserId = async (id) => {
    const response = await fetch('/api/user/history/'+id);

    const { histories } = await response.json();
    return histories
  };

  export const deleteHistory = async (data) => {
    const response = await fetch('/api/user/delete_history', {
      method:'DELETE',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const { message } = await response.json();
    return message
  }

  export const getFavourite = async (data) => {
    const response = await fetch('/api/user/favourites', {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const { favourites } = await response.json();
    return favourites
  }




  //withdraw

  export const paypalWithdraw = async (data) => {
    const response = await fetch('/api/withdraw/paypal',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  {withdraw}= await response.json();
    return withdraw;
  };

  export const bankWithdraw = async (data) => {
    const response = await fetch('/api/withdraw/bank',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  {withdraw}= await response.json();
    return withdraw;
  };

  export const getWithdraw = async (id) => {
    const response = await fetch('/api/withdraw/withdraws/'+id);
    const  {withdraws}= await response.json();
    return withdraws;
  };


  export const getDashboard = async (id,date) => {
    const response = await fetch('/api/property/dashboard/'+id,{
      method:'POST',
      body:JSON.stringify({date:date}),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  dashboard= await response.json();
    return dashboard;
  };


  export const changePassword = async (data) => {
    const response = await fetch('/api/user/change_password', {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    });
   
    const res = await response.json();
    return res
  };


//forgot password

export const forgotPassword = async (data) => {
  const response = await fetch('/api/user/forgot-password',{
    method:'POST',
    body:JSON.stringify(data),
    headers:{
      'Content-Type':'application/json'
    }
  });
  const res= await response.json();
  return res;
};
export const newPassword = async (data) => {
  const response = await fetch('/api/user/new-password',{
    method:'POST',
    body:JSON.stringify(data),
    headers:{
      'Content-Type':'application/json'
    }
  });
  const res= await response.json();
  return res;
};

export const subscriber = async (data) => {
  const response = await fetch('/subscribe',{
    method:'POST',
    body:JSON.stringify(data),
    headers:{
      'Content-Type':'application/json'
    }
  });
  const res= await response.json();
  return res;
};