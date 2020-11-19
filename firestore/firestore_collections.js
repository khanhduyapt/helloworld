const FS_ROLE = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  GUEST: "guest",
};

const FS_COLLECTION_NAME = {
  LANGUAGE_CENTERS: "language_centers",
  TEACHERS: "teachers",
  STUDENTS: "students",
  COURSE_INFO: "course_info",
  STUDENT_SCHEDULE: "student_course_schedules",
  COURSE_REPORTS: "course_reports",
};

const FS_CENTERS = {
  ShortName: "pantado",
  CenterName: "Công ty Cổ Phần Phát Triển Công Nghệ PANTADO",
  Address: "Số 33, Tầng 16 – Tòa Nhà INTRACOM Cầu Diễn, Từ Liêm, Hà Nội.",
  PhoneNumber: "0988.696.655",
  Website: "https://pantado.vn/",
  Email: "pantado.vn@gmail.com",
  MST: "0107540008",
};

const FS_TEACHERS = {
  Id: "TC61",
  TeacherAccount: "hoanglehaiyenvcvb@gmail.com",
  FullName: "Hoàng Lê Hải Yến",
  PhoneNumber: "PhoneNumber",
  Email: "hoanglehaiyenvcvb@gmail.com",
  Facebook: "hoanglehaiyenvcvb@facebook.com",
  ZoomId: "ZoomId",
  Achievement: "5 nam lien la giao vien day gioi",
  Address: "Address",
  DateJoiningcompany: "DateJoiningcompany",
  role: FS_ROLE.TEACHER,
};

const FS_STUDENTS = {
  Id: "Id",
  StudentAccount: "StudentAccount",
  FullName: "FullName",
  DateOfBirth: "DateOfBirth",
  YearOfBirth: "YearOfBirth",
  StudentPhoneNumber: "StudentPhoneNumber",
  ParentName: "ParentName",
  ParentPhoneNumber: "ParentPhoneNumber",
  StudentEmail: "StudentEmail",
  ParentEmail: "ParentEmail",
  Facebook: "Facebook",
  Address: "Address",
  ZoomId: "ZoomId",
  role: FS_ROLE.STUDENT,
};

const FS_COURSE_INFO = {
  Id: "Id",
  CourseName: "Level0",
  CourseFullName: "Pre - A1",
  DurationMonth: "12 tháng",
  TotalNumberOfLessons: 60,
  TotalPractices: 8,
  TotalTests: 4,
  StudyTime: "30 phút",
  Topics: "16 topics, 250 vocabulary",
  Description:
    "- Học ngôn ngữ ở cấp độ từ, nhận biết và đọc được bảng chữ cái, số lượng, màu sắc, hình khối + \n +" +
    "- Từ vựng thuộc chủ đề quen thuộc: gia đình, đồ dùng học tập, đồ chơi, con vật….., thực hiện được các hướng dẫn đơn giản, hình thành phản xạ giao tiếp.",
};

const FS_STUDENT_SCHEDULE = {
  Id: "Id",
  CourseName: "CourseName",
  StudentAccount: "StudentAccount",
  StartDate: "StartDate",
  EndDate: "EndDate",
  ReferenceFees: "ReferenceFees",
  Timetable_mon: "",
  Timetable_tue: "",
  Timetable_wed: "",
  Timetable_thu: "",
  Timetable_fri: "",
  Timetable_sat: "",
  Timetable_sun: "",
  NumberOfLessonsRemain: 60,
};

module.exports = {
  FS_COLLECTION_NAME: FS_COLLECTION_NAME,
  FS_CENTERS: FS_CENTERS,
  FS_TEACHERS: FS_TEACHERS,
  FS_STUDENTS: FS_STUDENTS,
  FS_COURSE_INFO: FS_COURSE_INFO,
  FS_STUDENT_SCHEDULE: FS_STUDENT_SCHEDULE,
  FS_ROLE: FS_ROLE,
};
