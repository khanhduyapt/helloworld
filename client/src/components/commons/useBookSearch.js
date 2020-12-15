import { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://localhost:3001/articles",
      params: { p: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [...prevBooks, ...res.data];
        });

        // console.log("page:", pageNumber, " data count:", books.length);
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error:", e);
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, books, hasMore };
}
