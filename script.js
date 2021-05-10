function rowChange(dateInput, dayCell, activityInput, localResultCell) {
  const dateString = dateInput.value
  const activity = activityInput.value
  let hours = 0
  if(dateString !== "") {
    const date = new Date(dateString)
    const weekDay = getWeekDay(date)
    dayCell.innerHTML = getShortWeekDay(date)
    const usualWorkHours = getWorkHours(date)
    if(activity === "work") {
      hours = 24 - usualWorkHours
    } else {
      hours = - usualWorkHours
    }
  } else {
    dayCell.innerHTML = "--"
  }
  localResultCell.innerHTML = hours
  updateResult()
  updateAccumulated()
  manageLines()
}

function updateAccumulated() {
  
}

function sortLines() {
  const tbody = document.getElementById("userInputHours")
  const rows = Array.from(tbody.querySelectorAll('tr'))
  rows.sort(compareLines).forEach(row => tbody.appendChild(row))
}

function compareLines(line_a, line_b) {
  const a = getDateFromLine(line_a)
  const b = getDateFromLine(line_b)
  return a - b
}

function getDateFromLine(line) {
  const date = line.getElementsByClassName("dateinput")[0].value
  return new Date( date === "" ? 8640000000000000 : date)
}

function updateResult() {
  const offset = Number(document.getElementById("offset").value)
  
  const resultCell = document.getElementById("result")
  resultCell.innerHTML = result
}

function getWorkHours(date) {
  const weekday = getWeekDay(date)
  if(weekday > 0 && weekday < 5) return 8.75
  else if(weekday === 5) return 6
  else return 0
}

function getWeekDay(date) {
  return date.getDay()
}

function getShortWeekDay(date) {
  return date.toLocaleDateString('en', {weekday: 'short'})
}

function manageLines() {
  const allDates = Array.from(document.getElementsByClassName("dateinput"))
  const focusElement = document.activeElement
  const emptyLines = allDates.filter(el => el.value === "")
  const emptyLinesWithoutFocus = emptyLines.filter(el => el !== focusElement)
  if(emptyLines.length === 0) {
    addLineAtEnd()
  } else if(emptyLines.length === 1) {
    
  } else if(emptyLines.length === emptyLinesWithoutFocus.legnth) {
    emptyLines.splice(0, 1)
    deleteLines(emptyLines)
  } else {
    deleteLines(emptyLinesWithoutFocus)
  }
}

function deleteLines(lines) {
  const table = document.getElementById("mainTable")
  lines.forEach(el => {
    const rowIndex = el.parentElement.parentElement.rowIndex
    table.deleteRow(rowIndex)
  })
}

function addLineAtEnd() {
  const userInputHours = document.getElementById("userInputHours")
  const row = userInputHours.insertRow()
  const dateCell = row.insertCell()
  const dateInput = document.createElement("input")
  dateInput.setAttribute("type", "date")
  dateInput.addEventListener("change", ()=>datechange(dateInput))
  dateInput.addEventListener("focusout", ()=>sortLines())
  dateInput.classList.add('dateinput')
  dateCell.appendChild(dateInput)

  const dayCell = row.insertCell()
  dayCell.innerHTML = "--"

  const activityCell = row.insertCell()
  const activityInput = document.createElement("select")
  addOption("work", "Work", activityInput)
  addOption("free", "Free", activityInput)
  activityCell.appendChild(activityInput)

  const localResultCell = row.insertCell()
  localResultCell.innerHTML = "0"
  localResultCell.classList.add('localresult')
  
  const accCell = row.insertCell()
  accCell.classList.add('acc')

  
  dateInput.addEventListener("change", ()=>rowChange(dateInput, dayCell, activityInput, localResultCell))
  activityInput.addEventListener("change", ()=>rowChange(dateInput, dayCell, activityInput, localResultCell))
}

function addOption(value, name, parent) {
  const option = document.createElement("option")
  option.setAttribute("value", value)
  option.innerText = name
  parent.appendChild(option)
}

addLineAtEnd()
updateResult()