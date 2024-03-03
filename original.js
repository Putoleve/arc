//generates timeslot inputs 
//receives number of days per week as a parameter
//let numberOfClassesPerWeek = document.getElementsByName("numberOfClassesPerWeek").value;
//console.log(numberOfClassesPerWeek)
let form=document.getElementById('form')

/* form.addEventListener('submit',function(e){
    e.preventDefault();
   // let nameOfGroup=document.getElementById("nameOfGroup").value;
    //console.log(nameOfGroup)
    //let startingDate=new Date()
}) */
function handleSubmit(){
    let nameOfGroup=document.getElementById("nameOfGroup").value;
    let date=document.getElementById("startingDate").value;
    let classesPerWeek=document.getElementById("numberOfClassesPerWeek").value;
   
    let selectedDaysOfTheWeek=[];
    let selectedStartTime=[];
    let selectedEndTime=[];
   
    let tempArrayCounter=0;
   
    for(i=1;i<=classesPerWeek;i+=1){
        selectedDaysOfTheWeek[tempArrayCounter]=document.getElementById("timeslotWeekDay"+i).value
        selectedStartTime[tempArrayCounter]=document.getElementById("timeslotStartTime"+i).value
        selectedEndTime[tempArrayCounter]=document.getElementById("timeslotEndTime"+i).value
        tempArrayCounter+=1
    }

    //console.log("Index value of postion is "+ selectedStartTime[0])

    let days = getDaysInTheMonthV2(new Date(date).getMonth(), new Date(date).getFullYear(),new Date(date).getUTCDate())

    //console.log("days returned "+days)
    generateSlots(days,selectedDaysOfTheWeek,selectedStartTime,selectedEndTime)
}

function generateSlots(days,selectsedDay,selectedStartTImes,selectedEndTimes){
   

console.log("BELOW ARE TIMESLOTS FOR " + nameOfGroup.toLocaleUpperCase() + " GROUP \n")
for (let i = 0; i < days.length; i++) {
    /*  //console.log(new Date(days[i]).getDay()===0)
     if (new Date(days[i]).getDay() === 1||new Date(days[i]).getDay() === 2||new Date(days[i]).getDay() === 4||new Date(days[i]).getDay() === 5) {
         console.log(new Date(days[i]).getDate() +"-"+ monthNames[month] +"-"+year)
     }  */


    if (new Date(days[i]).getDay() === selectsedDay[0]) {
        console.log(new Date(days[i]).getDate() + "-" + monthNames[month] + "-" + year + " @ " + timeSlots[0])
    }

    if (new Date(days[i]).getDay() === selectsedDay[1]) {
        console.log(new Date(days[i]).getDate() + "-" + monthNames[month] + "-" + year + " @ " + timeSlots[1])
    }

    if (new Date(days[i]).getDay() === [2]) {
        console.log(new Date(days[i]).getDate() + "-" + monthNames[month] + "-" + year + " @ " + timeSlots[2])
    }

    if (new Date(days[i]).getDay() === selectsedDay[3]) {
        console.log(new Date(days[i]).getDate() + "-" + monthNames[month] + "-" + year + " @ " + timeSlots[3])
    }
}
}
function getDaysInTheMonthV2(month, year,StartingInitialDay) {
    let date = new Date(year, month, StartingInitialDay);
    let days = []

    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1)
    }
    return days;
}
function generateTimeSlotInputs(numberOfClassesPerWeek) {
    //console.log("function called")
    //console.log(numberOfClassesPerWeek)
    /* for (let i = 0; i < numberOfClassesPerWeek; i++) {
        displayInputV2()
    } */
    displayInputV2(numberOfClassesPerWeek)
}


function displayInput() {
    let timeInputElement = document.createElement('input');
    timeInputElement.type = 'time'

    let dayOfTheWeekInput = document.createElement('select');
    dayOfTheWeekInput.selectedOptions = ['']

    let container = document.getElementById("timeslots");
    container.appendChild(timeInputElement)
    container.appendChild(dayOfTheWeekInput)

}

function displayInputV2(dayOfTheWeekInput) {
    let html = '<select required  id="timeslotWeekDay'+dayOfTheWeekInput+'" >\
    <option default  value="-1">Choose day</option>\
    <option value="1">Monday</option>\
    <option value="2">Tuesday</option>\
    <option value="3">Wednesday</option>\
    <option value="4">Thursday</option>\
    <option value="5">Friday</option>\
    <option value="6">Saturday</option>\
    <option value="0">Sunday</option>\
</select>\
        <label> Start Time</label>\
    <input type="time" required id="timeslotStartTime'+dayOfTheWeekInput+'"/>\
    <label>End Time</label>\
    <input type="time" required id="timeslotEndTime'+dayOfTheWeekInput+'"/> <br/> <br/>';

    let container = document.getElementById("timeslots");
    container.innerHTML+=(html)
}



let date = new Date(2023, 1, 1);

let month = 1
let year = 2023
let StartingInitialDay = 6
let nameOfGroup = "CUS Blue FT"
let timeSlots = ["10:30-11:30", "14:00-15:00", "07:30-08:30", "08:30-09:30"]
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function getDaysInTheMonth(month, year) {
    let date = new Date(year, month, StartingInitialDay);
    let days = []

    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1)
    }
    return days;
}

let days = getDaysInTheMonth(month, year)



let i = 0

console.log("BELOW ARE TIMESLOTS FOR " + nameOfGroup.toLocaleUpperCase() + " GROUP \n")
for (i = 0; i < days.length; i++) {
    /*  //console.log(new Date(days[i]).getDay()===0)
     if (new Date(days[i]).getDay() === 1||new Date(days[i]).getDay() === 2||new Date(days[i]).getDay() === 4||new Date(days[i]).getDay() === 5) {
         console.log(new Date(days[i]).getDate() +"-"+ monthNames[month] +"-"+year)
     }  */

    if (new Date(days[i]).getDay() === 1) {
        console.log(new Date(days[i]).getDate() + "-" + monthNames[month] + "-" + year + " @ " + timeSlots[0])
    }

    if (new Date(days[i]).getDay() === 2) {
        console.log(new Date(days[i]).getDate() + "-" + monthNames[month] + "-" + year + " @ " + timeSlots[1])
    }

    if (new Date(days[i]).getDay() === 4) {
        console.log(new Date(days[i]).getDate() + "-" + monthNames[month] + "-" + year + " @ " + timeSlots[2])
    }

    if (new Date(days[i]).getDay() === 5) {
        console.log(new Date(days[i]).getDate() + "-" + monthNames[month] + "-" + year + " @ " + timeSlots[3])
    }
}
