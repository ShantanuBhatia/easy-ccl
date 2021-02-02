import React, { FunctionComponent }  from "react";

type VideoSaverProps = {
    imagePaths: Array<string>,
    musicPath: string
}

const VideoSaver: FunctionComponent<VideoSaverProps> = (props: VideoSaverProps) => {
    return (
        <div>
            <h1>Hello there!</h1>
            <p>General Kenobi!</p>
            <p>Joining the following images:</p>
            <ul>
                {props.imagePaths.map((val)=><li>{val}</li>)}
            </ul>
            <p>Using the song {props.musicPath}</p>
        </div>
    )
}

export default VideoSaver;