import "./HpVideoCard.css";
import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import VideoModal from "./VideoModal";

function HpVideoCard({ video }) {
  console.log("HpVideoCard", video);

  const [videoData, setVideoData] = useState({});
  const [videoShow, setVideoShow] = useState(false);

  return (
    <div
      key={video.id}
      className="video__samples__card"
      onClick={() => {
        setVideoData(video);
        setVideoShow(true);
      }}
    >
      <VideoModal
        data={videoData}
        show={videoShow}
        onHide={() => setVideoShow(false)}
      />

      <div className="overlay">
        <ReactPlayer
          url={video.url}
          muted={true}
          light={true}
          width="100%"
          className="video__samples__player"
        />
      </div>
      <p className="card__link textLeft">{video.title}</p>
    </div>
  );
}

export default HpVideoCard;
