
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

function acknowledgeDuressAlert(device) {
  console.log('Duress Alert Acknowledged in the renderer');
  window.versions.acknowledgeDuressAlert();
}

window.versions.acknowledgementReceived(() => {
  console.log("Ack received")
})
