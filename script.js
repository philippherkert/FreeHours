function datechange(e) {
  console.log("test",e.value)
  addLineAtEnd()
}

function addLineAtEnd() {
  const userInputHours = document.getElementById("userInputHours")
  const row = userInputHours.insertRow()
  const dateCell = row.insertCell()
  const dateInput = document.createElement("input")
  dateInput.setAttribute("type", "date")
  dateCell.appendChild(dateInput)
  //dateCell.addEventListener("change", datechange(this))

  const activityCell = row.insertCell()
  const activityInput = document.createElement("select")
  addOption("work", "Work", activityInput)
  addOption("free", "Free", activityInput)
  
  activityCell.appendChild(activityInput)
}

function addOption(value, name, parent) {
  const option = document.createElement("option")
  option.setAttribute("value", value)
  option.innerText = name
  parent.appendChild(option)
}