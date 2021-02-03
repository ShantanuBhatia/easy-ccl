const { app, BrowserWindow } = require('electron')
const ipcMain = require('electron').ipcMain
const path = require('path');
const mediaPath = __dirname;


// hopefully for sending messages to the renderer process about how the saving is going
let win;

// for actually saving the videos
const videoshow = require('videoshow');
videoshow.ffmpeg = require('fluent-ffmpeg');
// videoshow.ffmpeg.setFfmpegPath('/usr/snap/ffmpeg')
// videoshow.ffmpeg.setFfprobePath("/snap/bin/ffmpeg.ffprobe")

const saveVideo = (images, audioFile, videoOptions, outputName) => {
  const resolvedImgPaths = images.map(val=>path.join(mediaPath, val))
  console.log("using song", path.join(mediaPath, audioFile));
  videoshow(resolvedImgPaths, videoOptions)
    .audio(path.join(mediaPath, audioFile))
    .save(path.join(mediaPath, "..", outputName))
    .on('start', function (command) {
      console.log('ffmpeg process started:', command)
      // setSaveMessage("Saving...")
    })
    .on('error', function (err, stdout, stderr) {
      console.error('Error:', err)
      console.error('ffmpeg stderr:', stderr)
      win.webContents.send('video-save-progress', stderr)
    })
    .on('end', function (output) {
      console.error('Video created in:', output)
      // setSaveMessage(`Video created at ${output}`)
      win.webContents.send('video-save-progress', `Video created at ${output}`)
    })
}

// really basic IPC method to see if IPC works
ipcMain.on('save-video', (event, arg) => {
  console.log(arg); // prints "hana, dul, set..."
  saveVideo(arg.images, arg.songFileName, arg.videoOptions, arg.outputName);
  event.reply('video-save-progress', 'Saving video...')
})



function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here