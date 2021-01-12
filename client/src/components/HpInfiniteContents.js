import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import ArticleCard from "./commons/ArticleCard";
import useBookSearch from "./commons/useBookSearch";
import Spinner from "react-bootstrap/Spinner";
import "./HpInfiniteContents.css";
import AOS from "aos";
import "aos/dist/aos.css";

function HpInfiniteContents() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

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
    <div className="infinite" id="common_vocabulary">
      <h1
        className="blog__header"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        Từ vựng thông dụng
      </h1>

      <div className="infinite__content">
        <div className="infinite__content__deck">
          {books.map((book, index) => {
            if (books.length === index + 1) {
              return (
                <div ref={lastBookElementRef} key={index + 1}>
                  {ReactHtmlParser(book.title)}
                </div>
              );
            } else {
              return (
                <div
                  key={`infinite_row_${book._id}`}
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                >
                  <ArticleCard
                    key={index}
                    title={ReactHtmlParser(book.title)}
                    artical_url="https://llv.edu.vn/vi/kham-pha-nhung-cau-noi-khich-le-tinh-than-bang-thanh-ngu-tieng-anh/"
                    category_name={book.category_name}
                    category_url="https://llv.edu.vn/vi/ngu-phap/"
                    read_count={book.read_count}
                    short_content={ReactHtmlParser(book.short_content)}
                    thumbnail={book.thumbnail}
                  ></ArticleCard>
                </div>
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

export default HpInfiniteContents;
