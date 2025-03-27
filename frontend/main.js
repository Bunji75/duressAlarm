import { app, Tray, Menu, nativeImage } from 'electron';
import { globalShortcut, Notification } from 'electron/main';
import { io } from "socket.io-client";


const socket = io("http://192.168.20.54:3000");

function sendDuressAlert() {
	const alertData = {
		user: "John Doe",
		timestamp: new Date().toISOString(),
		location: "Room 4",
	};

	socket.emit("duress-alert", alertData);
}

let tray

app.whenReady().then(() => {

	// This is the icon that shows on the toolbar
	const icon = nativeImage.createFromPath('./images/tempimage.png');
	tray = new Tray(icon);
	// This is the menu items that show when you right click the icon
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Item1', type: 'radio' }
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
})

socket.on("receive-alert", (data) => {
	console.log("Alert Received:", data);
	new Notification("Duress Alert", {
		body: `Alert from ${data.user} at ${data.location}`,
	});
});

