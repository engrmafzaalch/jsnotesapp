// =========================CLOCK==================
var hour, mins, sec , date, month, day
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekday =["Sunday",  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",  "Saturday"]
function clocky(){
    const d = new Date();
    date = d.getDate()
    month =  monthNames[d.getMonth()];
        day = weekday[d.getDay()]
        hour = d.getHours();
        mins = d.getMinutes();
        sec = d.getSeconds();
        if(date<10){
            date = '0' + date;
        }
        if(sec<10){
            sec = '0' + sec;
        } 
     var period = 'AM'
     if(hour>12){
         hour-=12
         period = 'PM'
     }
     if(hour < 10){
         hour = '0' + hour 
        }
        if(mins < 10){
            mins = '0' + mins 
        }
        document.getElementById('date').innerHTML = day + ' - ' +   month + '&nbsp;&nbsp;&nbsp;' + date;
        document.getElementById('time').innerHTML = hour + ':' +  mins;
        document.getElementById('period').innerHTML = period;
        document.getElementById('seconds').innerHTML = sec
        
        setTimeout(clocky, 1000)
        
    }
    clocky();


// =========================CLOCK ENDS==================

