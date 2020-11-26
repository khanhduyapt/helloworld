import React from "react";
import "./S4_Courses.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

function S4_Courses() {
  const contents = [
    {
      course_name: "TOEIC - Cô Vũ Mai Phương",
      url: "course/detail/id/convertname",
      imgage:
        "https://sb-cafetalk.s3.amazonaws.com/user-uploaded-files/cafetalk-optimized-5ea0304fe560a-993953500-1587556431.jpg",
      one_lession_time: "40 phút",
      lessions: 30,
      number_joined: 12,
      evaluate: 4.5,
    },
    {
      course_name: "IELTS - Cô Vũ Mai Phương",
      url: "course/detail/id/convertname",
      imgage:
        "https://sb-cafetalk.s3.amazonaws.com/user-uploaded-files/cafetalk-optimized-5eac05d327e9b-916349600-1588331987.jpg",
      one_lession_time: "45 phút",
      lessions: 10,
      number_joined: "4",
      evaluate: 5,
    },
    {
      course_name: "Tiếng anh giao tiếp 1",
      url: "course/detail/id/convertname",
      imgage:
        "https://sb-cafetalk.s3.amazonaws.com/user-uploaded-files/cafetalk-optimized-5e4259f9c4b06-980564900-1581406713.png",
      one_lession_time: "45 phút",
      lessions: 11,
      number_joined: 8,
      evaluate: 5,
    },
    {
      course_name: "Tiếng anh giao tiếp 2",
      url: "course/detail/id/convertname",
      imgage:
        "https://sb-drops.s3.amazonaws.com/drop/rmopt-5ec63cd7910cb-959414000-1590050007.jpg",
      one_lession_time: "45 phút",
      lessions: 14,
      number_joined: 68,
      evaluate: 5,
    },
    {
      course_name: "Tiếng anh giao tiếp 3",
      url: "course/detail/id/convertname",
      imgage:
        "https://sb-drops.s3.amazonaws.com/drop/rmopt-5f5c5a4bd642b-987761600-1599887947.jpg",
      one_lession_time: "45 phút",
      lessions: 15,
      number_joined: 24,
      evaluate: 5,
    },
  ];

  return (
    <div className="s4sourses">
      <h1 className="blog__header">Các khóa học nổi bật</h1>
      <div className="special__courses">
        <CardDeck className="special__courses__deck">
          {contents.map((course) => {
            return (
              <Card className="special__courses__card">
                <Card.Img variant="top" src={course.imgage} />
                <Card.Body>
                  <Card.Text className="textLeft">
                    <a href={course.url}>{course.course_name}</a>
                  </Card.Text>
                  <Card.Text className="textLeft">
                    <div className="courses__card__lession">
                      <div className="courses__card__lession-item">
                        <p>Tiết học</p>
                        <p className="bold">{course.one_lession_time}</p>
                      </div>
                      <div className="courses__card__lession-item">
                        <p>Bài giảng</p>
                        <p className="bold"> {course.lessions}</p>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="courses__card__footer text-muted">
                  <img src="http://localhost:3000/icon/www.png" alt="Web"></img>
                  <img
                    src="http://localhost:3000/icon/skype.png"
                    alt="Skype"
                  ></img>
                  <img
                    src="http://localhost:3000/icon/zoom.png"
                    alt="Zoom"
                  ></img>
                  <div className="courses__card__rating">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <p>⭐</p>
                      ))}
                  </div>
                </Card.Footer>
              </Card>
            );
          })}
        </CardDeck>
      </div>
    </div>
  );
}

export default S4_Courses;
