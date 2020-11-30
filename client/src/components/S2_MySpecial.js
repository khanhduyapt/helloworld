import React from "react";
import "./S2_MySpecial.css";
import MediumCard from "./commons/MediumCard";

function S2_MySpecial() {
  const contents = [
    {
      header: "Chú trọng vào tiếng Anh giao tiếp",
      image: "https://glats.co.jp/static/img/home/Feature_img01_pc.jpg",
      arr_contents: [
        "Sau khi chọn khóa học, lộ trình và nội dung khóa học sẽ bán sát trình độ của bé.",
        "Các bài kiểm tra nhỏ được ghép vào khóa học thông qua các trò chơi.",
        "Báo cáo kết quả học tập của con hàng tháng bằng email.",
      ],
    },
    {
      header: "Video Call trên nhiều thiết bị khác nhau",
      image: "https://glats.co.jp/static/img/home/Feature_img02_pc.jpg",
      arr_contents: [
        "Có thể học trực tiếp với giáo viên bằng Video Call trên trình duyệt web của máy tính hoặc Ipad mà không cần cài đặt phức tạp.",
        "Có thể dùng smart phone nếu không có máy tính, cô giáo sẽ giảng bài trực tiếp qua app.",
        "Luôn hướng đến phương án tốt nhất, phù hợp nhất với điều kiện của học viên.",
      ],
    },
    {
      header: "Học theo lộ trình với thời gian phù hợp",
      image: "https://glats.co.jp/static/img/home/Feature_img03_pc.jpg",
      arr_contents: [
        "Có thể học bất kỳ thời điểm nào trong ngày.",
        "Giao tiếp với giáo viên hàng tuần sẽ tạo sự tự tin khi giao tiếp.",
        "Một kèm một nên không phải lo lắng khi mắc lỗi với các học sinh khác. Giáo viên sẽ nhẹ nhàng hỗ trợ sự phát triển của bé.",
      ],
    },
  ];

  return (
    <div className="myspecial">
      <h1 className="blog__header">Điểm đặc biệt của Kimini</h1>
      <div className="myspecial__content">
        <div className="myspecial__content__deck">
          {contents.map((content, index) => {
            return (
              <MediumCard
                key={`myspecial_${index}`}
                header={content.header}
                image={content.image}
                arr_contents={content.arr_contents}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default S2_MySpecial;
