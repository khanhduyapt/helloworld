import React from "react";
import ReactPlayer from "react-player/lazy";
import VideoModal from "./commons/VideoModal";
import "./HpChoosePlan.css";

function HpChoosePlan() {
  const [videoData, setVideoData] = React.useState({});
  const [videoShow, setVideoShow] = React.useState(false);

  const videos = [
    {
      id: "1",
      title: "Học tiếng Anh kiểu Bi Béo! Quá hài hước...",
      url:
        "https://www.youtube.com/watch?v=o3O3GfIybWg&ab_channel=PANTADO-TI%E1%BA%BENGANHTR%E1%BB%B0CTUY%E1%BA%BEN1TH%E1%BA%A6Y1TR%C3%92",
    },
    {
      id: "2",
      title: "Pantado English - Hoàng Oanh - Class 13/D39 - K109/9",
      url: "https://www.youtube.com/watch?v=4pr8i4a7Lzg&ab_channel=OanhHoang",
    },
    {
      id: "3",
      title:
        "[Pantado][Pan Power] Ngày Đầu Tiên Dạy Tiếng Anh Online | Buổi Dạy Thử | Miss Joyce",
      url: "https://www.youtube.com/watch?v=Y7lWGH0d6Lo&ab_channel=Yoon",
    },
    {
      id: "4",
      title:
        "Group học tiếng Anh Trực tuyến miễn phí ll PANTADO - Hệ thống giáo dục trực tuyến toàn diện",
      url:
        "https://www.youtube.com/watch?v=Enc54bpgpkc&ab_channel=PANTADO-TI%E1%BA%BENGANHTR%E1%BB%B0CTUY%E1%BA%BEN1TH%E1%BA%A6Y1TR%C3%92",
    },
    {
      id: "5",
      title: "Pantado - Lê Như Trang - HS Lê Minh Khôi - 16/3/2020",
      url:
        "https://www.youtube.com/watch?v=w5DqBSUgLak&ab_channel=TrangL%C3%AANh%C6%B0",
    },
    {
      id: "6",
      title: "Pantado English - Hoàng Oanh K117/13.9.18",
      url: "https://www.youtube.com/watch?v=37cD0qfh1oc&ab_channel=OanhHoang",
    },
    {
      id: "7",
      title: "zoom 0",
      url: "https://www.youtube.com/watch?v=QNK6zwDa7Xs&ab_channel=OanhHoang",
    },
    {
      id: "8",
      title: "Pantado English - Hoàng Oanh K121/13.9.18",
      url: "https://www.youtube.com/watch?v=-KiKJ1iGZrE&ab_channel=OanhHoang",
    },
    {
      id: "9",
      title: "Pantado English - Hoàng Oanh K117/4.9.18",
      url: "https://www.youtube.com/watch?v=zhomb58OuLM&ab_channel=OanhHoang",
    },
  ];

  return (
    <div className="plan">
      <VideoModal
        data={videoData}
        show={videoShow}
        onHide={() => setVideoShow(false)}
      />

      <h1 className="blog__header">Trải nghiệm lớp học trực tuyến</h1>

      <div className="video__samples">
        <div className="video__samples__deck">
          {videos.map((video) => {
            return (
              <div
                key={video.id}
                className="video__samples__card"
                onClick={() => {
                  setVideoData(video);
                  setVideoShow(true);
                }}
              >
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
          })}
        </div>
      </div>
    </div>
  );
}

export default HpChoosePlan;
