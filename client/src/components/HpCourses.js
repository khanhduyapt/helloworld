import React, { useEffect } from "react";
import "./HpCourses.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CourseModal from "./commons/CourseModal";
import Rating from "./commons/Rating";
import AOS from "aos";
import "aos/dist/aos.css";

function HpCourses() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

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

  const [modalShow, setModalShow] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);

  return (
    <div className="s4sourses">
      <CourseModal
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <h1
        className="blog__header"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        Các khóa học nổi bật
      </h1>
      <div className="special__courses">
        <CardDeck className="special__courses__deck">
          {contents.map((course) => {
            return (
              <Card
                className="special__courses__card"
                key={course.course_name}
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
              >
                <Card.Img
                  variant="top"
                  src={course.imgage}
                  className="card__link"
                  onClick={() => {
                    setModalData(course);
                    setModalShow(true);
                  }}
                />
                <Card.Body>
                  <p
                    className="card__link textLeft"
                    onClick={() => {
                      setModalData(course);
                      setModalShow(true);
                    }}
                  >
                    {course.course_name}
                  </p>
                  <div className="textLeft">
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
                  </div>
                </Card.Body>
                <Card.Footer className="courses__card__footer text-muted">
                  <img
                    src="http://localhost:3000/icon/www.png"
                    className="card__icon"
                    alt="Web"
                  ></img>
                  <img
                    src="http://localhost:3000/icon/skype.png"
                    className="card__icon"
                    alt="Skype"
                  ></img>
                  <img
                    src="http://localhost:3000/icon/zoom.png"
                    className="card__icon"
                    alt="Zoom"
                  ></img>

                  <Rating star={5} />
                </Card.Footer>
              </Card>
            );
          })}
        </CardDeck>
      </div>
    </div>
  );
}

export default HpCourses;
