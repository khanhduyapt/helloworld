import React from "react";
import { Link } from "react-router-dom";
import "./VocabularyEditor.css";
import Button from "react-bootstrap/Button";

function VocabularyEditor(props) {
  //   console.log("VocabularyEditor:", props);
  //   console.log("param id:", props.location.state.id);
  const data = props.location.state;
  return (
    <div className="vocabulary__editor">
      <div className="vocabulary__editor__controls">
        <Link to="/admin/vocabularies">
          <Button
            className="vocabulary__editor__controls_button"
            variant="outline-primary"
          >
            Back
          </Button>
        </Link>

        <Link to="/admin/vocabularies">
          <Button
            className="vocabulary__editor__controls_button"
            variant="outline-danger"
          >
            Save
          </Button>
        </Link>
      </div>

      <div className="vocabulary__editor__main">
        <p>{data.id}</p>

        <p>{data.thumbnail}</p>

        <p>{data.title}</p>
        <p>{data.category_name}</p>
        <p>{data.short_content}</p>

        <p>{data.contents}</p>
      </div>
    </div>
  );
}

export default VocabularyEditor;
