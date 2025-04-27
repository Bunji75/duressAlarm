

// Gets the IP address from the form then writes it to the page 
document.getElementById("serverIPForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const serverIP = document.getElementById("serverIP").value;
  document.getElementById("info").innerHTML = ` <p>${serverIP}</p>`;
  // Updates the IP address in the main file
  updateIP(serverIP);
})

document.getElementById("computerNameForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const computerName = document.getElementById("computerName").value;
  document.getElementById("computer").innerHTML = `<p>${computerName}</p>`;
  updateComputerName(computerName);
})

function updateComputerName(computerName) {
  console.log(`This is the new computer name ${computerName}`);
  window.versions.computerName(computerName);
}


// Sends the user entered IP address to the main function to be used as the server
function updateIP(ip) {
  console.log(`This is in the updateIP function ${ip}`);
  window.versions.ipAddress(ip);
}


// listens for the acknowledgement to be submitted
document.getElementById("ack").addEventListener("submit", function(event) {
  event.preventDefault();
  acknowledgeDuressAlert();
})

async function acknowledgeDuressAlert() {
  console.log('Duress Alert Acknowledged in the renderer');
  let event, deviceName = await window.versions.acknowledgeDuressAlert();
  document.getElementById("acknowledgements").innerHTML += `<p>${deviceName}</p>`
}

// Prints if we have received an acknowledgement from the server 
window.versions.acknowledgementReceived(() => {
  console.log('We have received an acknowledged from the server')
})

