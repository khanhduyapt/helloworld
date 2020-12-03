const Firestore = require("@google-cloud/firestore");
const { FS_COLLECTION, FS_ROLE } = require("./firestore_collections");

const path = require("path");
const { timeStamp } = require("console");
const { Timestamp } = require("@google-cloud/firestore");

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
      FS_COLLECTION.LANGUAGE_CENTERS
    ).doc(data.ShortName);
    await docRef.set(data);
  }

  async saveTeacher(centerShortName, teacher) {
    const docRef = this.Firestore.collection(FS_COLLECTION.LANGUAGE_CENTERS)
      .doc(centerShortName)
      .collection(FS_COLLECTION.TEACHERS)
      .doc(teacher.TeacherAccount);

    await docRef.set(teacher);
  }

  async saveStudent(centerShortName, student) {
    const docRef = this.Firestore.collection(FS_COLLECTION.LANGUAGE_CENTERS)
      .doc(centerShortName)
      .collection(FS_COLLECTION.STUDENTS)
      .doc(student.StudentAccount);

    await docRef.set(student);
  }

  async saveCourse(centerShortName, course) {
    const docRef = this.Firestore.collection(FS_COLLECTION.LANGUAGE_CENTERS)
      .doc(centerShortName)
      .collection(FS_COLLECTION.COURSE_INFO)
      .doc(course.CourseName);

    await docRef.set(course);
  }

  async saveStudentSchedule(centerShortName, schedule) {
    const docRef = this.Firestore.collection(FS_COLLECTION.LANGUAGE_CENTERS)
      .doc(centerShortName)
      .collection(FS_COLLECTION.STUDENT_SCHEDULE)
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

  async getArticles(page) {
    try {
      const markers = [];

      // const record_per_page = 250;
      // const startAt = (page - 1) * record_per_page;
      // const endAt = page * record_per_page;

      await this.Firestore.collection(FS_COLLECTION.ARTICLES)
        // .orderBy("modify_date", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc, index) => {
            // if (startAt <= index && index < endAt) {
            markers.push({ id: doc.id, ...doc.data() });
            //console.log("get:", index);
            // }
          });
        });

      return markers;
    } catch (error) {
      console.log("getArticles", error);
    }
  }

  async addArticle({
    title,
    thumbnail,
    short_content,
    contents,
    category_name,
    read_count,
    last_modify_id,
    last_modify_account,
  }) {
    // Add a new document with a generated id.
    const res = await this.Firestore.collection(FS_COLLECTION.ARTICLES).add({
      title,
      thumbnail,
      short_content,
      contents,
      category_name,
      read_count,
      create_date: new Date().toUTCString(),
      modify_date: new Date().toUTCString(),
      last_modify_id,
      last_modify_account,
    });

    return { id: res.id };
  }

  async updateArticle({
    id,
    title,
    thumbnail,
    short_content,
    contents,
    category_name,
    last_modify_id,
    last_modify_account,
  }) {
    // Add a new document with a generated id.
    const res = await this.Firestore.collection(FS_COLLECTION.ARTICLES)
      .doc(id)
      .set({
        title,
        thumbnail,
        short_content,
        contents,
        category_name,
        modify_date: new Date().toUTCString(),
        last_modify_id,
        last_modify_account,
      });

    return { id: res };
  }
}

module.exports = new FirestoreClient();
