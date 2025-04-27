const { app, ipcMain, Tray, Menu, nativeImage, BrowserWindow } = require('electron');
const { globalShortcut, Notification } = require('electron/main');
const io = require('socket.io-client');
const path = require('node:path');
const os = require('os');

let socket = io("http://0.0.0.0:3000");

// Helper function that sets the IP address for the application
async function changeIP(event, ip) {
	socket = io(`http://${ip}:3000`);
	console.log(ip);
}

// Sending a duress alert to the backend server
function sendDuressAlert() {
	const alertData = {
		user: "John Doe",
		timestamp: new Date().toISOString(),
		location: "Room",
	};
	createWindow('duressAlert.html');
	socket.emit("duress-alert", alertData);
}

// Acknowledging a duress alert that has been sent
function acknowledgeDuress() {
	let deviceName = os.hostname();
	console.log(deviceName);
	console.log("We are in the main file")
	socket.emit("acknowledgement", deviceName)
	// Receive acknowledgement from the server
	socket.on('receive-ack', (data) => {
		console.log("Acknowledgement receieved:", data);
	})
	return deviceName
}

function changeComputerName(computerName) {
}
let tray

// Electron boilerplate for creating a window and loading preload
const createWindow = (page) => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		},
	});

	win.loadFile(page);
}


app.whenReady().then(() => {




	ipcMain.on('set-ip', changeIP);
	ipcMain.on('set-computerName', changeComputerName);
	// This is the icon that shows on the toolbar
	const icon = nativeImage.createFromPath('./images/tempimage.png');
	tray = new Tray(icon);

	// This is the menu items that show when you right click the icon
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Quit', type: 'normal', role: 'quit' }
	])
	tray.setContextMenu(contextMenu);

	// This is the tool tip that shows when you hover over the icon
	tray.setToolTip('This is my duress alarm');
	tray.setTitle('This is a title');

	// This is the global shortcut that will trigger the alarm
	globalShortcut.register('Ctrl+Shift+E', () => {
		console.log('The alarm has been activated');
		sendDuressAlert();
	})

	ipcMain.handle('acknowledgeDuress', acknowledgeDuress);

	createWindow('index.html');
})

// Setting the default behaviour of closed windows so that the application still runs
app.on('window-all-closed', () => { })

// Create notification when we receive a duress alert from the server
socket.on("receive-alert", (data) => {
	console.log("Alert Received:", data);
	const NotificationTitle = "Duress Alert";
	const NotificationBody = `Alert from ${data.user} at ${data.location}`;
	new Notification({
		title: NotificationTitle,
		body: NotificationBody
	}).show();
});
