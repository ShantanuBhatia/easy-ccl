import React, { useEffect, useState }  from "react";
import axios from 'axios';
const { ipcRenderer } = require('electron');


const IdolNamesExtractor = (props) => {
    
    const [isFetching, setIsFetching] = useState(false);
    const [fetchStatusMessage, setFetchStatusMessage] = useState("");
    const [songMetadata, setSongMetadata] = useState(null);
    const [cclURL, setCCLURL] = useState("");

    useEffect(()=>{
        ipcRenderer.on('song-metadata', (event, arg) => {
            setIsFetching(false)
            setSongMetadata(arg)
          })
    }, [])


    const handleCclURLChange = (evt) => {
        setCCLURL(evt.target.value);
    };

    const fetchIdolNames = (pageURL) => {
        setIsFetching(true);
        setFetchStatusMessage("Fetching song data...");
        axios.get(cclURL).then(resp=>{
            ipcRenderer.send("get-song-metadata", {
                data: resp.data
            })
        }).catch(err=>{
            setFetchStatusMessage("Oh no an error happened")
        })
        
    }



    return (
        <div>
            
            {(!isFetching && !songMetadata)&& <div>
                <h2>Please enter the colorcodedlyrics.com url for the song</h2>
                <input type="text" value={cclURL} onChange={handleCclURLChange} />
                <button onClick={()=>{fetchIdolNames(cclURL)}}>Search</button>
            </div>}
            {isFetching && <div><p>{fetchStatusMessage}</p></div>}
            {songMetadata && <div>
                <h2>Song Data Acquired!</h2>
                <p>Group: {songMetadata.artist}</p>
                <p>Song Title: {songMetadata.title}</p>
                <span>Idols:</span>
                <ul>
                    {songMetadata.idols.map((val, idx)=><li style={{
                        color:val.color
                    }}key={idx}>{val.idolName}</li>)}
                </ul>
            </div>}
        </div>
        
    )
}

export default IdolNamesExtractor;