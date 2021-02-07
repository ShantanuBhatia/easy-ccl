import React, { useEffect, useState }  from "react";
// In renderer process (web page).
const { ipcRenderer } = require('electron')

const VideoSaver= (props) => {



  const [saveMessage, setSaveMessage] = useState("video not yet saved"); 
  const [outputPath, setOutputPath] = useState("mylyricsvideo.mp4");

  const handleOutputPathChange = (evt) => {
    setOutputPath(evt.target.value);
  }

  useEffect(()=>{ 
    ipcRenderer.on('video-save-progress', (event, arg) => {
      console.log(arg) // prints "pong"
      setSaveMessage(arg)
    })
  }, [])


  const images  = [
        'irene.jpeg',
        'seulgi.jpeg'
    ]
    
    const videoOptions = {
      fps: 25,
      loop: 5, // seconds
      transition: false,
      videoBitrate: 1024,
      videoCodec: 'libx264',
      size: '733x?',
      audioBitrate: '128k',
      audioChannels: 2,
      format: 'mp4',
      pixelFormat: 'yuv420p'
    }


    return (
        <div>
            <h1>Hello there!</h1>
            <p>This is Easy-CCL</p>
            <p>Joining the following images:</p>
            <ul>
                {props.imagePaths.map((val)=><li>{val}</li>)}
            </ul>
            <p>Using the song {props.musicPath}</p>
            <p>Working from path {window.location.pathname}</p>
            <p>Status: {saveMessage}</p>
            <form>
              <label>
                Save As:<br></br>
                <input type="text" value={outputPath} onChange={handleOutputPathChange} />
              </label>
            </form>
            <button onClick={()=>{
                ipcRenderer.send('save-video', {
                  songFileName: "badboy.mp3",
                  outputName: outputPath,
                  images: images,
                  videoOptions: videoOptions
                })
            }}>Generate</button>
        </div>
    )
}

export default VideoSaver;