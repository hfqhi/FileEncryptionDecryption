const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFile: () => ipcRenderer.invoke('select-file'),
    saveDecryptedFile: (data) => ipcRenderer.invoke('save-decrypted-file', data)
});