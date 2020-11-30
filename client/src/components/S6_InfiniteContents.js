import React, { useState, useRef, useCallback } from "react";
import ArticleCard from "./commons/ArticleCard";
import useBookSearch from "./commons/useBookSearch";
import Spinner from "react-bootstrap/Spinner";
import "./S6_InfiniteContents.css";

function S6_InfiniteContents() {
  const [pageNumber, setPageNumber] = useState(1);

  const { books, hasMore, loading, error } = useBookSearch(pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="infinite">
      <h1 className="blog__header">Từ vựng thông dụng</h1>

      <div className="infinite__content">
        <div className="infinite__content__deck">
          {books.map((book, index) => {
            if (books.length === index + 1) {
              return (
                <div ref={lastBookElementRef} key={book}>
                  {book}
                </div>
              );
            } else {
              return (
                <ArticleCard
                  key={book}
                  title={book}
                  artical_url="https://llv.edu.vn/vi/kham-pha-nhung-cau-noi-khich-le-tinh-than-bang-thanh-ngu-tieng-anh/"
                  category_name="category_name Ngữ pháp tiếng Anh"
                  category_url="https://llv.edu.vn/vi/ngu-phap/"
                  read_count="153"
                  short_content="Trong cuộc sống, có nhiều lúc chúng ta sẽ cảm thấy chán nản, xuống tinh thần vì những gian nan, khó khăn, trắc trở. Đôi khi, một câu nói mang tính động viên, khích lệ lại là tất cả những gì chúng ta cần để có thêm động lực vượt qua những sóng gió ấy."
                  thumbnail="https://llv.edu.vn/media/2020/11/Screenshot_2-1-600x314.jpg"
                ></ArticleCard>
              );
            }
          })}
        </div>
      </div>

      <div className="infinite__loading">
        {loading && <Spinner animation="border" variant="secondary" />}
      </div>
      <div className="infinite__error">{error}</div>
    </div>
  );
}

export default S6_InfiniteContents;
