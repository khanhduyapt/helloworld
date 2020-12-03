import React, { useEffect, useState } from "react";
import "./Vocabularies.css";
import axios from "axios";
import VocabularyCard from "./VocabularyCard";
import { json } from "express";
// import { DataGrid } from "@material-ui/data-grid";

function Vocabularies() {
  // const columns = [
  //   { field: "id", headerName: "ID", width: 100 },
  //   { field: "firstName", headerName: "First name", width: 130 },
  //   { field: "lastName", headerName: "Last name", width: 130 },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.getValue("firstName") || ""} ${
  //         params.getValue("lastName") || ""
  //       }`,
  //   },
  // ];

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  const [Articles, setArticles] = useState([]);

  useEffect(() => {
    let cancel;

    axios({
      method: "GET",
      url: "http://localhost:3001/api/articles",
      params: { p: 1 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setArticles(() => {
          return [...res.data];
        });
      })
      .catch((e) => {
        console.log("error:", e);
      });

    return () => {
      cancel();
    };
  }, []);

  return (
    <div className="Vocabularies">
      <div className="vocabularies__datagrid">
        {Articles.map((item, index) => {
          return <VocabularyCard data={item} />;
        })}
      </div>
    </div>
  );
}

export default Vocabularies;
