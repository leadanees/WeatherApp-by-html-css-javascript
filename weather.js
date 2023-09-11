// import {myApi} from './api.js'
const apikey='f056eb0da9fb4142a97ac49b8e3734a2';
// window.addEventListener("load",()=>{
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition((position)=>{
//             let lon=position.coords.longitude;
//             let lat=position.coords.latitude;
//             let url=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
//             console.log("Urls :"+url);
//                 fetch(url).then((res)=>{
//                     return res.json;
//                 }).then((data)=>{
//                     console.log(data);
//                     weatherReport(data);    
//                 })
//         })
//     }
// })
btn=document.getElementById('search')
console.log("btn",btn)
btn.addEventListener("click",()=>{
    
    var place=document.getElementById('input').value;
    console.log("location is",place)
    var urlsearch=`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;
    console.log("data",urlsearch)
    fetch(urlsearch).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        
        // document.getElementById("city").innerText=data.name+" , " +data.sys.country;
        weatherReport(data);
    })
})


function weatherReport(data){
    var urlcast=`http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}`;
    console.log("forcast Urlcast : "+urlcast);
    console.log(data);
    fetch(urlcast).then((res)=>{
                return res.json();
            }).then((forecast)=>{
                console.log(forecast.place);
                console.log(data);
                hourForecast(forecast);
                dayForecast(forecast);
            })
            document.getElementById("city").innerText=data.name+" , " +data.sys.country;

            document.getElementById("temperature").innerText=Math.floor(data.main.temp-273)+" °C";

            document.getElementById("clouds").innerText=data.weather[0].description;

        let icon=data.weather[0].icon;
        let iconurl="http://api.openweathermap.org/img/w"+ icon + ".png";
        document.getElementById("img").src=iconurl;
    }

function hourForecast(forecast){
    document.querySelector('.templist').innerHTML='';
    for(let i=0;i<5;i++){
        let date=new Date(forecast.list[i].dt*1000);
        console.log((date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00',''));

        let hourR=document.createElement('div');
        hourR.setAttribute('class','next');
        console.log(hourR);

        let div=document.createElement('div');

        let time=document.createElement('p');
        time.setAttribute('class','time');
        time.innerText=(date.toLocaleTimeString(undefined,'./Asia/Kolkata')).replace('.00','');
        div.appendChild(time);

        let temp=document.createElement('p');
        temp.innerText=Math.floor((forecast.list[i].main.temp_max-273))+' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min-273))+' °C';
        div.appendChild(temp);

        let desc=document.createElement('p');
        desc.setAttribute('class','desc');
        desc.innerText=forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML=''
    for (let i = 8; i < forecast.list.length; i+=8) {
        console.log(forecast.list[i]);
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
        
        let day= document.createElement('p');
        day.setAttribute('class','date')
        day.innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
        div.appendChild(day);

        let temp= document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';
        div.appendChild(temp)

        let description= document.createElement('p');
        description.setAttribute('class','desc')
        description.innerText= forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div)
}
}