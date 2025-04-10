const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ipAddress: (ip) => ipcRenderer.send('set-ip', ip),
  acknowledgeDuressAlert: () => ipcRenderer.send('acknowledgeDuress'),
  // Variables can be exposed here not just functions
})


