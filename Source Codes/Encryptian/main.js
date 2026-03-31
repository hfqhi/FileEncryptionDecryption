const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 700,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle file selection
ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile']
    });
    
    if (result.canceled) {
        return null;
    }
    
    const filePath = result.filePaths[0];
    const fileBuffer = await fs.readFile(filePath);
    const fileName = path.basename(filePath);
    
    return {
        path: filePath,
        name: fileName,
        buffer: Array.from(fileBuffer)
    };
});

// Handle saving encrypted file and deleting original
ipcMain.handle('save-encrypted-file', async (event, { originalPath, encryptedData, fileName }) => {
    const encryptedPath = originalPath + '.encrypted';
    
    // Save encrypted file
    await fs.writeFile(encryptedPath, encryptedData);
    
    // Delete original file
    await fs.unlink(originalPath);
    
    return { success: true };
});