
document.getElementById("serverIPForm").addEventListener("submit", function(event) {
  event.preventDefault();


  const serverIP = document.getElementById("serverIP").value;
  document.getElementById("info").innerHTML = ` <p>${serverIP}</p>`;

  updateIP(serverIP);
})

document.getElementById("ack").addEventListener("submit", () => {
  acknowledgeDuressAlert();
})

// Sends the user entered IP address to the main function to be used as the server
function updateIP(ip) {
  console.log(`This is in the updateIP function ${ip}`);
  window.versions.ipAddress(ip);
}

async function acknowledgeDuressAlert() {
  console.log('Duress Alert Acknowledged in the renderer');
  let event, deviceName = await window.versions.acknowledgeDuressAlert();
  document.getElementById("acknowledgements").innerHTML += `<p>${deviceName}</p>`
}

window.versions.acknowledgementReceived(() => {
  console.log('We have received an acknowledged from the server')
})
