
document.getElementById("serverIPForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const serverIP = document.getElementById("serverIP").value;

  document.getElementById("info").innerHTML = ` <p>${serverIP}</p>`;
})

const updateIP = async () => {
  const response = await window.versions.serverIP();
  console.log(response);
}

updateIP();
