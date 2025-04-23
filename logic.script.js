//const XLSX = require("xlsx");
let form = document.getElementById('form')
let currentAllowableClasses_perWeek = 0;

//function to fetch from public holidays API
async function getPublicHolidaysFromAPI(countryCode, dateFromUser) {
    //handleReset()
    //API LINK source : https://date.nager.at/Api
    //extract the date
    const yearFromDate = new Date(dateFromUser).getFullYear()

    //sending the request to the API, the API expects a country code as an input
    const request = await fetch("https://date.nager.at/api/v3/PublicHolidays/" + yearFromDate + "/" + countryCode)
    //getting the reponse
    const PublicHolidays = await request.json();
    //days to exclude input
    daysToexclude = document.getElementById("DaysToExclude")
    //ressetting input
    daysToexclude.value = ""

    for (i = 0; i < PublicHolidays.length; i += 1) {
        //check if the date provided is part of the current month
        if (new Date(PublicHolidays[i].date).getMonth() == new Date(dateFromUser).getMonth()) {
            //console.log(PublicHolidays[i].date)
            //append to input
            daysToexclude.value += new Date(PublicHolidays[i].date).getDate() + ";"
            console.log(new Date(PublicHolidays[i].date).getDate() + ";")
        }
    }

}
const masterTimeslots = [{}];

let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const mastertimeslotProps =
{
    date: null,
    time: null
}



function handleReset() {
    location.reload()
}

function handleSubmit() {
    let nameOfGroup = document.getElementById("nameOfGroup").value;
    let date = document.getElementById("startingDate").value;
    let classesPerWeek = document.getElementById("numberOfClassesPerWeek").value;
    //public holidays
    //getPublicHolidaysFromAPI("NA", date)
    let daysToExlude = document.getElementById("DaysToExclude").value;

    let selectedDaysOfTheWeek = [];
    let selectedStartTime = [];
    let selectedEndTime = [];
    let publicHolidaysOrRecess = daysToExlude.split(";");
    let data = [];



    let tempArrayCounter = 0;


    for (i = 0; i < classesPerWeek; i += 1) {
        selectedDaysOfTheWeek[tempArrayCounter] = document.getElementById("timeslotWeekDay" + i).value
        selectedStartTime[tempArrayCounter] = document.getElementById("timeslotStartTime" + i).value
        selectedEndTime[tempArrayCounter] = document.getElementById("timeslotEndTime" + i).value
        tempArrayCounter += 1
    }

    //extract the date
    const monthFromDate = new Date(date).getMonth();
    const yearFromDate = new Date(date).getFullYear()



    //console.log("Index value of postion is "+ selectedStartTime[0])

    let days = getDaysInTheMonthV2(monthFromDate, yearFromDate, new Date(date).getUTCDate(), publicHolidaysOrRecess)

    let data_to_display = "BELOW ARE TIMESLOTS FOR " + nameOfGroup.toLocaleUpperCase() + " GROUP \n"
    //console.log("BELOW ARE TIMESLOTS FOR " + nameOfGroup.toLocaleUpperCase() + " GROUP \n")
    for (let i = 0; i < days.length; i++) {
        let dayOfTheWeek = new Date(days[i]).getDay().toString();
        if (selectedDaysOfTheWeek.includes(dayOfTheWeek)) {
            let day = new Date(days[i]).getDate()
            let month = new Date(days[i]).getMonth()
            let year = new Date(days[i]).getFullYear()
            //console.log(`${day}-${monthNames[month]}-${year} @ ` + selectedStartTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)]
            //  + `-` + selectedEndTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)])
            let dateArray = new Array(
                formatToDate(day, monthNames[month], year),
                formatStartAndEndTime(selectedStartTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)], selectedEndTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)]))
            data.push(dateArray)
            data_to_display += `${day}-${monthNames[month]}-${year} @ ` + selectedStartTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)]
                + `-` + selectedEndTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)] + `\n`;

        }

    }

    //alert(data_to_display)
    //prompt(`Copy Timeslots for ${nameOfGroup.toLocaleUpperCase()}`,data_to_display)
    //saveTextAsFile(data_to_display, nameOfGroup, "text/plain")
    saveToExcelFile(data, nameOfGroup)
}

function formatToDate(day, month, year) {
    return day + " " + month + " " + year;
}

function formatStartAndEndTime(startTime, endTime) {
    return startTime + "-" + endTime;
}
function saveToExcelFile(data, fileNameToSaveAs) {
    let csvContent = 'data:text/csv;charset=utf-8,';
    data.forEach(row => {
        const rowContent = row.join(',');
        csvContent += rowContent + '\n';
    });

    // Create a link element and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.download = fileNameToSaveAs;
    link.click();
}

function saveTextAsFile(textContent, fileNameToSaveAs, fileType) {
    let textFileAsBlob = new Blob([textContent], { type: fileType });
    let downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';

    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(
            textFileAsBlob
        );
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function getDaysInTheMonthV2(month, year, StartingInitialDay, excludedDays) {
    let date = new Date(year, month, StartingInitialDay);
    let days = []

    while (date.getMonth() === month) {
        //excluding public holidays
        if (!excludedDays.includes(date.getDate().toString())) {
            days.push(new Date(date));
        }
        date.setDate(date.getDate() + 1)

    }
    return days;
}


function createTimeSlotInputsV2(numberOfAllowableClassesPerWeek) {
    const timeslotContainer = document.getElementById('timeslots')
    const daysOfTheWeek = ['Choose a day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    //number of inputs
    const numberOfInputs = parseInt(numberOfAllowableClassesPerWeek)
    //clear all inputs
    timeslotContainer.innerHTML = ''

    //div class="row" id="timeslotWeekDay_Container' + newAllowableClasses_perWeek


    // Add options to select element
    for (let i = 0; i < numberOfInputs&&numberOfAllowableClassesPerWeek<=4; i++) {
        const row = document.createElement('div')
        row.className = "row"
        row.id = "timeslotWeekDay_Container" + i
        row.style = { 'padding-bottom:': '200px' }

        const column1 = document.createElement('div')
        column1.className = "col"
        const column2 = document.createElement('div')
        column2.className = "col"
        const column3 = document.createElement('div')
        column3.className = "col"




        const selectElement = document.createElement('select');
        selectElement.className = 'form-select'
        selectElement.id = 'timeslotWeekDay' + i
        selectElement.required = true

        const startTime = document.createElement('input')
        startTime.type = 'time'
        startTime.className = 'form-control'
        startTime.id = 'timeslotStartTime' + i

        const endTime = document.createElement('input')
        endTime.type = 'time'
        endTime.className = 'form-control'
        endTime.id = 'timeslotEndTime' + i


        for (let i = 0; i < daysOfTheWeek.length; i += 1) {
            const option = document.createElement('option');
            //option.id='timeslotWeekDay'+i
            option.text = daysOfTheWeek[i]
            option.value = i


            selectElement.appendChild(option)
            column1.appendChild(selectElement)
        }

        /* option.text = `Option ${i + 1}`;
        option.value = `value${i + 1}`;
        selectElement.appendChild(option); */

        column2.appendChild(startTime)
        column3.appendChild(endTime)
        row.appendChild(column1)
        row.appendChild(column2)
        row.appendChild(column3)

        const lineBreak = document.createElement('br')

        timeslotContainer.appendChild(row)
        timeslotContainer.appendChild(lineBreak)



    }

}










