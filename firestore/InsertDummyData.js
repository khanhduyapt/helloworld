const FirestoreClient = require("./firestoreClient");
const { v4: uuidv4 } = require("uuid");

const {
  FS_COLLECTION,
  FS_CENTERS,
  FS_TEACHERS,
  FS_STUDENTS,
  FS_COURSE_OF_STUDENTS,
  FS_ROLE,
} = require("./firestore_collections");

const initData = function () {
  const pantado = {
    ShortName: "pantado",
    CenterName: "Công ty Cổ Phần Phát Triển Công Nghệ PANTADO",
    Address: "Số 33, Tầng 16 – Tòa Nhà INTRACOM Cầu Diễn, Từ Liêm, Hà Nội.",
    PhoneNumber: "0988.696.655",
    Website: "https://pantado.vn/",
    Email: "pantado.vn@gmail.com",
    MST: "0107540008",
  };
  const chipchip = {
    ShortName: "chipchip",
    CenterName: "Công ty CP Công nghệ Giáo dục ChipChip",
    Address:
      "Tầng 9, N2, 210 Lê Trọng Tấn, toà nhà ACCI, 210 Lê Trọng Tấn, Thanh Xuân, Hà Nội.",
    PhoneNumber: "024 66624235 - 0983 005 801",
    Website: "https://chipchip.edu.vn/",
    Email: "contact@chipchip.edu.vn",
    MST: "0107540008",
  };

  const saveLangueageCenter = async (object) => {
    await FirestoreClient.saveCenter(object);
  };

  //   saveLangueageCenter(pantado);
  //   saveLangueageCenter(chipchip);

  //------------------------------------------------
  //#region Teachers
  const hoanglehaiyenvcvb = {
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
    Role: FS_ROLE.TEACHER,
    LoginPassword: "hoanglehaiyenvcvb123",
  };

  const phuongvu = {
    Id: "TC62",
    TeacherAccount: "phuongvu.ekids@gmail.com",
    FullName: "Vũ Đỗ Phương",
    PhoneNumber: "0976150850",
    Email: "phuongvu.ekids@gmail.com",
    Facebook: "phuongvu@facebook.com",
    ZoomId: "ZoomId",
    Achievement: "Sinh vin DH QGHN",
    Address: "Address2",
    DateJoiningcompany: "11/07/2020",
    Role: FS_ROLE.ADMIN,
    LoginPassword: "phuongvu123",
  };

  const saveTeacher = async (centerShortName, teacher) => {
    await FirestoreClient.saveTeacher(centerShortName, teacher);
  };

  // saveTeacher(pantado.ShortName, hoanglehaiyenvcvb);
  // saveTeacher(pantado.ShortName, phuongvu);
  //#endregion Teachers
  //------------------------------------------------

  //#region Students
  const hientaivu2016 = {
    Id: uuidv4(),
    StudentAccount: "hientaivu2016@gmail.com",
    FullName: "Phạm Phương Thảo",
    Avatar:
      "https://static1.ohman.vn/YanNews/2167221/201911/kieu-trinh-xiu-la-ai-tieu-su-su-nghiep-doi-tu-cua-hot-girl-vuon-dao-20191106-024932.jpg",
    DateOfBirth: "DateOfBirth",
    YearOfBirth: "YearOfBirth",
    StudentPhoneNumber: "StudentPhoneNumber",
    ParentName: "Chị Hiền",
    ParentPhoneNumber: "0989 966 255",
    StudentEmail: "hientaivu2016@gmail.com",
    ParentEmail: "ParentEmail",
    Facebook: "Facebook",
    Address: "Address",
    ZoomId: "ZoomId",
    Role: FS_ROLE.STUDENT,
    LoginPassword: "hientaivu123",
  };
  const aosenthatbao = {
    Id: uuidv4(),
    StudentAccount: "aosenthatbao@gmail.com",
    FullName: "Tạ Hoàng Quỳnh Như",
    Avatar:
      "https://kenh14cdn.com/thumb_w/660/2018/2/21/1-1519202806152612799845.png",
    DateOfBirth: "DateOfBirth",
    YearOfBirth: "YearOfBirth",
    StudentPhoneNumber: "StudentPhoneNumber",
    ParentName: "chị Quyên",
    ParentPhoneNumber: "0948 788 616",
    StudentEmail: "aosenthatbao@gmail.com",
    ParentEmail: "ParentEmail",
    Facebook: "Facebook",
    Address: "Address",
    ZoomId: "ZoomId",
    Role: FS_ROLE.STUDENT,
    LoginPassword: "aosenthatbao123",
  };
  const emgaimua211006 = {
    Id: uuidv4(),
    StudentAccount: "emgaimua211006@gmail.com",
    FullName: "Bùi Hà Nam Phương",
    Avatar:
      "https://media.ngoisao.vn/news/2017/05/22/hotgirl-kieu-trinh-la-ai-1-ngoisao.vn-w580-h514.stamp2.jpg",
    DateOfBirth: "DateOfBirth",
    YearOfBirth: "YearOfBirth",
    StudentPhoneNumber: "StudentPhoneNumber",
    ParentName: "chị Hà",
    ParentPhoneNumber: "0397545629",
    StudentEmail: "emgaimua211006@gmail.com",
    ParentEmail: "ParentEmail",
    Facebook: "Facebook",
    Address: "Address",
    ZoomId: "ZoomId",
    Role: FS_ROLE.STUDENT,
    LoginPassword: "emgaimua123",
  };
  const saveStudent = async (centerShortName, student) => {
    await FirestoreClient.saveStudent(centerShortName, student);
  };

  saveStudent(pantado.ShortName, hientaivu2016);
  saveStudent(pantado.ShortName, aosenthatbao);
  saveStudent(pantado.ShortName, emgaimua211006);
  //#endregion Students

  // #region Courses
  const Level0 = {
    Id: uuidv4(),
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

  const Level1 = {
    Id: uuidv4(),
    CourseName: "Level1",
    CourseFullName: "Pre - A1",
    DurationMonth: "12 tháng",
    TotalNumberOfLessons: 120,
    TotalPractices: 12,
    TotalTests: 8,
    StudyTime: "30 phút",
    Topics: "20 topics, 550 vocabulary",
    Description:
      "- Chủ đề từ vựng thuộc phạm vi nhỏ: gia đình, trường lớp, nơi sinh sống + \n +" +
      "- Nhận biết, phát âm nguyên âm, phụ âm, có thể giới thiệu, miêu tả, đưa ra câu trả lời ngắn, bắt đầu chủ động tìm tòi, sáng tạo, được rèn luyện kỹ năng trình bày thông qua dự án cá nhân.",
  };

  const Level06 = {
    Id: uuidv4(),
    CourseName: "Level6",
    CourseFullName: "B1",
    DurationMonth: "12 tháng",
    TotalNumberOfLessons: 120,
    TotalPractices: 8,
    StudyTime: "30 phút",
    Topics: "20 topics, 120 vocabulary",
    Description:
      "- Có thể nghe hiểu, giao tiếp tốt trong nhiều tình huống, giải thích, diễn đạt mạch lạc nhiều ý tưởng sáng tạo + \n +" +
      "- Khám phá lịch sử, văn hóa, ngôn ngữ, xã hội, rèn luyện kỹ năng giải quyết vấn đề, tiếp cận các vấn đề mang tính toàn cầu.",
  };
  const saveCourse = async (centerShortName, course) => {
    await FirestoreClient.saveCourse(centerShortName, course);
  };

  // saveCourse(pantado.ShortName, Level0);
  // saveCourse(pantado.ShortName, Level1);
  // saveCourse(pantado.ShortName, Level06);
  //#endregion

  //#region
  const hientaivu2016_SCHEDULE = {
    Id:
      pantado.ShortName +
      "_" +
      Level0.CourseName +
      "_" +
      hientaivu2016.StudentAccount,
    CourseName: "Level0",
    StudentAccount: "hientaivu2016@gmail.com",
    StartDate: "7/18/2019",
    EndDate: "9/18/2019",
    ReferenceFees: "ReferenceFees",
    Timetable_mon: "17:30 -18:15",
    Timetable_tue: "",
    Timetable_wed: "",
    Timetable_thu: "17:30 -18:15",
    Timetable_fri: "",
    Timetable_sat: "",
    Timetable_sun: "",
    NumberOfLessonsRemain: 60,
  };

  const saveStudentSchedule = async (centerShortName, schedule) => {
    await FirestoreClient.saveStudentSchedule(centerShortName, schedule);
  };

  //saveStudentSchedule(pantado.ShortName, hientaivu2016_SCHEDULE);
  //#endregion
};

module.exports = { initData };
