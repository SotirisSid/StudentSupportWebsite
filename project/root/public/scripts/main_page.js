var cur_date=new Date();



function create_calendar(){
    var cal= document.querySelector(".days");
    

    for(let i=0;i<=31;i++){
    cal_days=document.createElement("div"); 
    cal_days.innerHTML=String(i);
    cal.appendChild(cal_days);
    }

}

create_calendar();