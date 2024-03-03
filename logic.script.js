//const XLSX = require("xlsx");
let form = document.getElementById('form')
let currentAllowableClasses_perWeek = 0;

const masterTimeslots = [{}];

let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const mastertimeslotProps =
{
    date: null,
    time: null
}

function writeToSpreedsheet(excelWorkbookname, excelWorkbookSheetName, workbook_data) {
    const workbook = XLSX.readFile(excelWorkbookname);
    const worksheet = workbook.Sheets[excelWorkbookSheetName]

    const timesloteArray = XLSX.utils.sheet_add_json(worksheet);
}

function handleReset() {
    location.reload()
}

function handleSubmit() {
    let nameOfGroup = document.getElementById("nameOfGroup").value;
    let date = document.getElementById("startingDate").value;
    let classesPerWeek = document.getElementById("numberOfClassesPerWeek").value;
    let daysToExlude = document.getElementById("DaysToExclude").value;

    let selectedDaysOfTheWeek = [];
    let selectedStartTime = [];
    let selectedEndTime = [];
    let publicHolidaysOrRecess = daysToExlude.split(";");



    let tempArrayCounter = 0;


    for (i = 1; i <= classesPerWeek; i += 1) {
        selectedDaysOfTheWeek[tempArrayCounter] = document.getElementById("timeslotWeekDay" + i).value
        selectedStartTime[tempArrayCounter] = document.getElementById("timeslotStartTime" + i).value
        selectedEndTime[tempArrayCounter] = document.getElementById("timeslotEndTime" + i).value
        tempArrayCounter += 1
    }

    //console.log("Index value of postion is "+ selectedStartTime[0])

    let days = getDaysInTheMonthV2(new Date(date).getMonth(), new Date(date).getFullYear(), new Date(date).getUTCDate(), publicHolidaysOrRecess)

    let data_to_display = "BELOW ARE TIMESLOTS FOR " + nameOfGroup.toLocaleUpperCase() + " GROUP \n"
    console.log("BELOW ARE TIMESLOTS FOR " + nameOfGroup.toLocaleUpperCase() + " GROUP \n")
    for (let i = 0; i < days.length; i++) {
        let dayOfTheWeek = new Date(days[i]).getDay().toString();
        if (selectedDaysOfTheWeek.includes(dayOfTheWeek)) {
            let day = new Date(days[i]).getDate()
            let month = new Date(days[i]).getMonth()
            let year = new Date(days[i]).getFullYear()
            console.log(`${day}-${monthNames[month]}-${year} @ ` + selectedStartTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)]
                + `-` + selectedEndTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)])

            data_to_display += `${day}-${monthNames[month]}-${year} @ ` + selectedStartTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)]
                + `-` + selectedEndTime[selectedDaysOfTheWeek.indexOf(dayOfTheWeek)] + `\n`;

        }

    }

    //alert(data_to_display)
    //prompt(`Copy Timeslots for ${nameOfGroup.toLocaleUpperCase()}`,data_to_display)
    saveTextAsFile(data_to_display, nameOfGroup, "text/plain")
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
function generateTimeSlotInputs(numberOfClassesPerWeek) {
    //console.log("function called")
    //console.log(numberOfClassesPerWeek)
    /* for (let i = 0; i < numberOfClassesPerWeek; i++) {
        displayInputV2()
    } */
    handleAddOrRemoveInputFromDisplay(numberOfClassesPerWeek)
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

function handleAddOrRemoveInputFromDisplay(newAllowableClasses_perWeek) {
    //check if increment or decrease.
    console.log(`current: ${currentAllowableClasses_perWeek} New: ${newAllowableClasses_perWeek}`)
    if (newAllowableClasses_perWeek > currentAllowableClasses_perWeek) {
        currentAllowableClasses_perWeek += 1;
        let html = '<div class="row" id="timeslotWeekDay_Container' + newAllowableClasses_perWeek + '">\
                        <div class="col">\
                        <label for="timeslotWeekDay" class="form-label"> Day of the Week</label>\
                            <select required class="form-select" id="timeslotWeekDay' + newAllowableClasses_perWeek + '" >\
                                <option default selected>Choose day</option>\
                                <option value="1">Monday</option>\
                                <option value="2">Tuesday</option>\
                                <option value="3">Wednesday</option>\
                                <option value="4">Thursday</option>\
                                <option value="5">Friday</option>\
                                <option value="6">Saturday</option>\
                                <option value="0">Sunday</option>\
                            </select>\
                        </div>\
                        \
                        <div class="col">\
                            <label for="timeslotStartTime" class="form-label"> Start Time</label>\
                            <input class="form-control" type="time" required id="timeslotStartTime'+ newAllowableClasses_perWeek + '"/>\
                        </div>\
                        <div class="col">\
                            <label for="timeslotEndTime" class="form-label">End Time</label>\
                            <input class="form-control"  type="time" required id="timeslotEndTime'+ newAllowableClasses_perWeek + '"/>\
                        <div>\
                 </div>';

        let container = document.getElementById("timeslots");
        container.innerHTML += (html)
    }
    else {
        //remove on decreaase
        currentAllowableClasses_perWeek -= 1;
        let lastTimeslotInput = document.getElementById(`timeslotWeekDay_Container${currentAllowableClasses_perWeek + 1}`)
        lastTimeslotInput.remove();
    }

    console.log(`**current: ${currentAllowableClasses_perWeek} New: ${newAllowableClasses_perWeek}`)
}




//find the datatable div.
const datatableDiv = document.querySelector("div.datatable");

//table headers
let tableHeaders = ["Date", "Time"];

const generateTimeslotsTable = () => {
    //empty the modal
    /*  while (datatableDiv.firstChild!=null) {
         datatableDiv.removeChild(datatableDiv.firstChild)
     }
   */

    //create the table
    let timeslotdataTable = document.createElement('table');
    timeslotdataTable.className = 'timeslotdataTable';


    //create table headers
    let timeslotdataTableHead = document.createElement('thead');
    timeslotdataTableHead.className = 'timeslotdataTableHead';

    //create table row
    let timeslotdataTableHeaderRow = document.createElement('tr');
    timeslotdataTableHeaderRow.className = 'timeslotdataTableRow';

    //appending the headers
    tableHeaders.forEach(header => {
        let timeslotHeader = document.createElement('th');
        timeslotHeader.innerText = header
        timeslotdataTableHeaderRow.append(timeslotHeader);
    })

    timeslotdataTableHead.append(tableHeaders)
    timeslotdataTable.append(timeslotdataTableHead)

    //create table body group
    let timeslotTableBody = document.createElement('tbody')
    timeslotTableBody.className = 'timeslotTableBody'
    timeslotdataTable.append(timeslotTableBody);
}

const appendTimeslots = (singleTimeslot) => {
    //find the table
    let timeslotdataTable = document.querySelector('timeslotdataTable')

    let timeslotTableBodyRow = document.createElement('tr')
    timeslotTableBodyRow.className = "timeslotTableRowBody"

    let dateData = document.createElement('td');
    dateData.innerText = singleTimeslot.date;

    let timeData = document.createElement('td');
    timeData.innerText = singleTimeslot.time;

    timeslotTableBodyRow.append(dateData, timeData);
    timeslotdataTable.append(timeslotTableBodyRow)
}



