const Firestore = require("@google-cloud/firestore");
const { FS_COLLECTION_NAME, FS_ROLE } = require("./firestore_collections");

const path = require("path");

class FirestoreClient {
  constructor() {
    this.Firestore = new Firestore({
      projectId: "glossy-apex-295803",
      keyFilename: path.join(
        __dirname,
        "./glossy-apex-295803-197c18913e04.json"
      ),
    });
  }

  async saveCenter(data) {
    const docRef = this.Firestore.collection(
      FS_COLLECTION_NAME.LANGUAGE_CENTERS
    ).doc(data.ShortName);
    await docRef.set(data);
  }

  async saveTeacher(centerShortName, teacher) {
    const docRef = this.Firestore.collection(
      FS_COLLECTION_NAME.LANGUAGE_CENTERS
    )
      .doc(centerShortName)
      .collection(FS_COLLECTION_NAME.TEACHERS)
      .doc(teacher.TeacherAccount);

    await docRef.set(teacher);
  }

  async saveStudent(centerShortName, student) {
    const docRef = this.Firestore.collection(
      FS_COLLECTION_NAME.LANGUAGE_CENTERS
    )
      .doc(centerShortName)
      .collection(FS_COLLECTION_NAME.STUDENTS)
      .doc(student.StudentAccount);

    await docRef.set(student);
  }

  async saveCourse(centerShortName, course) {
    const docRef = this.Firestore.collection(
      FS_COLLECTION_NAME.LANGUAGE_CENTERS
    )
      .doc(centerShortName)
      .collection(FS_COLLECTION_NAME.COURSE_INFO)
      .doc(course.CourseName);

    await docRef.set(course);
  }

  async saveStudentSchedule(centerShortName, schedule) {
    const docRef = this.Firestore.collection(
      FS_COLLECTION_NAME.LANGUAGE_CENTERS
    )
      .doc(centerShortName)
      .collection(FS_COLLECTION_NAME.STUDENT_SCHEDULE)
      .doc(schedule.Id);

    await docRef.set(schedule);
  }

  // async saveByPath(path, data) {
  //   const docRef = this.Firestore.doc(path);
  //   await docRef.set(data);
  // }

  async getCollectionByPath(path) {
    try {
      let response = [];
      const snapshot = await this.Firestore.collection(path).get();
      // const snapshot = await docRef.get();
      snapshot.forEach((doc) => {
        // console.log(doc.data());
        response.push({
          Id: doc.data()["Id"],
          StudentAccount: doc.data()["StudentAccount"],
          FullName: doc.data()["FullName"],
          Avatar: doc.data()["Avatar"],
          DateOfBirth: doc.data()["DateOfBirth"],
          YearOfBirth: doc.data()["YearOfBirth"],
          StudentPhoneNumber: doc.data()["StudentPhoneNumber"],
          ParentName: doc.data()["ParentName"],
          ParentPhoneNumber: doc.data()["ParentPhoneNumber"],
          StudentEmail: doc.data()["StudentEmail"],
          ParentEmail: doc.data()["ParentEmail"],
          Facebook: doc.data()["Facebook"],
          Address: doc.data()["Address"],
          ZoomId: doc.data()["ZoomId"],
          Role: doc.data()["Role"],
          // LoginPassword: doc.data()["LoginPassword"],
        });
      });
      return response;
    } catch (error) {
      return [];
    }
  }

  async getDocByPath(path) {
    const docRef = this.Firestore.collection(path);
    const response = await docRef.get();

    return response.data();
  }

  // async getCollectionByDocName(rootCollection,rootDocName, subCollectionName, subDocName, searchCondition)
  // {
  //   const docRef = this.Firestore.collection(rootCollection).doc(rootDocName).collection()
  // }
}

module.exports = new FirestoreClient();
