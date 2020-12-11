const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    category_name: { type: String },
    thumbnail: { type: String },
    title: { type: String, required: true },
    short_content: { type: String },
    contents: { type: String },
    read_count: { type: Number },
    last_modify_id: { type: String },
    last_modify_account: { type: String },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

/*
      id: "3cE3SM3nTWY2MLleUhAh",
      category_name: "Từ vựng tiếng Anh theo chủ đề",
      thumbnail: "https://www.voca.vn/assets/img/news/market-store-icon-1540363857.jpg",
      title: "Từ vựng Tiếng Anh về dụng cụ học tập",
      short_content:
        "Tổng hợp tất tần tật từ vựng tiếng anh về dụng cụ học tập được trình bày sinh động với hình ảnh, ví dụ, âm thanh giúp bạn dễ dàng ghi nhớ và ứng dụng.",
      contents: "Danh sách từ vựng Tiếng Anh về dụng cụ học tập",
      read_count: 1,
      last_modify_id: ["127.0.0.1"],
      last_modify_account: "duydk",
*/
