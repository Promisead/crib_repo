import moment from "moment"
export const getDates=(startDate, stopDate)=> {
    for(var arr=[],dt=new Date(startDate); dt<=stopDate; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
}
 export const getMonthInWord = (date) => {

        const d = new Date(date);
        return d.toLocaleString('default', { month: 'short' });
    };
export const sendMail =async(from, to, subject, message, senderName='')=> {
    const res = await fetch('https://us-central1-cribng.cloudfunctions.net/api/send-mail', {
         method:'post',
         body:JSON.stringify({
             email:to,
             message:message,
             subject:subject,
             from:from,
             senderName:senderName,
             host:process.env.REACT_APP_MAIL_HOST,
             port:process.env.REACT_APP_MAIL_PORT,
             username:process.env.REACT_APP_MAIL_USERNAME,
             password:process.env.REACT_APP_MAIL_PASSWORD
         }),
         headers:{
             'Content-Type':'application/json'
         }
     })
    return await res.json()
    }
    export const verifyMail =async(from, to, subject, senderName='', firstname)=> {
        const res = await fetch('https://us-central1-cribng.cloudfunctions.net/api/verify-mail', {
             method:'post',
             body:JSON.stringify({
                 email:to,
                 subject:subject,
                 from:from,
                 firstname:firstname,
                 domain:process.env.NODE_ENV === 'development'?process.env.REACT_APP_LOCAL_URL:process.env.REACT_APP_PROD_URL,
                 senderName:senderName,
                 host:process.env.REACT_APP_MAIL_HOST,
                 port:process.env.REACT_APP_MAIL_PORT,
                 username:process.env.REACT_APP_MAIL_USERNAME,
                 password:process.env.REACT_APP_MAIL_PASSWORD
             }),
             headers:{
                 'Content-Type':'application/json'
             }
         })
        return await res.json()
        }
export const getFav = (id,user)=>{
    let favourite = false
    let item = user?user.id:'fi'
    let favourites = JSON.parse(window.localStorage.getItem(`@${item}`))
    if(favourites !== null){
        favourites.forEach(propId=>{
            if(propId === id)
            favourite = true
        })
    }
    return favourite
}
export const setDashboard = (dashboard)=>{
    try{
        window.sessionStorage.setItem('@dash', JSON.stringify(dashboard))
    }
    catch(e){}

}
export const getDashboard = ()=>{
    try{
       let dashboard = JSON.parse(window.sessionStorage.getItem('@dash'))
       dashboard = dashboard === null?true:dashboard
       return dashboard;
    }
    catch(e){}

}

export const currency=(amount, decimal, decSeperator, thouSeperator)=> {
   const decPlaces = isNaN(decimal = Math.abs(decimal)) ? 2 : decimal;
    const decSep = typeof decSeperator === "undefined" ? "." : decSeperator;
    const thouSep = typeof thouSeperator === "undefined" ? "," : thouSeperator;
    let sign = amount < 0 ? "-" : "";
    let i = String(parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decPlaces)));
    let j =0
     j= (j = i.length) > 3 ? j % 3 : 0;
    
    return '₦ '+ sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(amount - i).toFixed(decPlaces).slice(2) : "");
    }


export const getFavs = (user)=>{
    let data = [];
    let item = user?user.id:'fi'
    let favourites = JSON.parse(window.localStorage.getItem('@'+item))
    if(favourites !== null){
        data = [...favourites]
    }
    return data
}

export const getWeekNumber = ()=>{
    const today = new Date()
    const onejan = new Date(today.getFullYear(), 0, 1);
    const weekNumber = Math.ceil( (((today.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 )
    return weekNumber
}
   
export const isDescendant=(parent, child)=> {
    var node = child.parentNode;
    if(child.className === 'qsearch1'){
        return true
    }
        
    while (node) {
        if (node === parent) {
            return true;
        }
        
        node = node.parentNode;
    }
    return false;
}


export const verified=(number)=> {
    let whole = 0;
    if(number > 0){
        if(number >= 1000){
            whole = parseInt(number/1000)
            return whole*1000+'+'
        }
        else if(number >= 100){
            whole = parseInt(number/100)
            return whole*100+'+'
        }
        else if(number >=10){
            whole = parseInt(number/10)
            return whole*10 +'+'
        }
        return number
    }
    return number;
}
export const maxStringLength = (text,leng = 80)=>{
    if(text.length> leng){
       return text.substr(0, leng)+'...';
    }
    return text;
  }

  export const humanDiff = (date)=>{
    const prevDate = moment(date).fromNow()
    return prevDate
  }

  export function seo(data = {title:'', metaDescription:''}) {
    data.title = `${data.title } | ${process.env.REACT_APP_NAME}` || process.env.REACT_APP_NAME;
    data.metaDescription = data.metaDescription || 'CribNg is a stay and property booking system. Number one property site in Nigeria';
  
    document.title = data.title;
    document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
  }