import React, { useState } from 'react';
import ReactPlayer from 'react-player';

interface PropsVideo {
    videoUrl: string;
}

function VideoBlock({ videoUrl }: PropsVideo) {
    const [playing, setPlaying] = useState(false);

    function playPauseVideo(e: any) {
        e.preventDefault();
        if (!playing) {
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }

    return (
        <div className="video-block-to-home-page">
            <ReactPlayer url={videoUrl} playing={playing} />
            {playing ? (
                <i className="far fa-pause-circle" onClick={playPauseVideo} />
            ) : (
                <i className="far fa-play-circle" onClick={playPauseVideo} />
            )}
        </div>
    );
}

export default VideoBlock;
