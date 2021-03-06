import React from "react";
import "./AdDashboard.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminMenu from "./components/AdminMenu";
import DayCalendar from "./components/DayCalendar";
import MonthCalendar from "./components/MonthCalendar";
import Contacts from "./components/Contacts";
import Teachers from "./components/Teachers";
import Students from "./components/Students";
import Admins from "./components/Admins";
import Sliderbar from "./components/Sliderbar";
import MySpecial from "./components/MySpecial";
import Training from "./components/Training";
import ChoosePlan from "./components/ChoosePlan";
import Youtube from "./components/Youtube";
import Vocabularies from "./components/Vocabularies";
import UploadImage from "./components/UploadImage";
import StudentEdit from "./components/StudentEdit";
import TeacherEdit from "./components/TeacherEdit";
import TeacherSchedule from "./components/TeacherSchedule";
import StudentCourse from "./components/StudentCourse";
import CourseEdit from "./components/CourseEdit";
import Courses from "./components/Courses";
import AdminEdit from "./components/AdminEdit";
import CategoryEdit from "./components/CategoryEdit";

function AdDashboard() {
  return (
    <BrowserRouter>
      <div className="dashboard">
        <AdminMenu />

        <div className="dashboard__content">
          <Switch>
            <Route path="/admin/daycalendar">
              <DayCalendar />
            </Route>
            <Route path="/admin/monthcalendar">
              <MonthCalendar />
            </Route>

            <Route path="/admin/contacts" component={Contacts} />

            <Route path="/admin/course/:id" component={CourseEdit} />

            <Route
              path="/admin/teacher_schedule/:id"
              component={TeacherSchedule}
            />
            <Route path="/admin/teacher/:id" component={TeacherEdit} />
            <Route path="/admin/teachers" component={Teachers} />

            <Route path="/admin/student_course/:id" component={StudentCourse} />
            <Route path="/admin/student/:id" component={StudentEdit} />
            <Route path="/admin/students" component={Students} />

            <Route path="/admin/administrator/:id" component={AdminEdit} />
            <Route path="/admin/administrators" component={Admins} />

            <Route path="/admin/sliderbar/:id" component={UploadImage}></Route>
            <Route path="/admin/sliderbar" component={Sliderbar}></Route>

            <Route path="/admin/myspecial/:id" component={UploadImage}></Route>
            <Route path="/admin/myspecial" component={MySpecial}></Route>

            <Route path="/admin/category/:id" component={CategoryEdit} />
            <Route path="/admin/training" component={Training} />
            <Route path="/admin/courses" component={Courses} />

            <Route path="/admin/chooseplan">
              <ChoosePlan />
            </Route>
            <Route path="/admin/samples">
              <Youtube />
            </Route>
            <Route path="/admin/vocabularies">
              <Vocabularies />
            </Route>

            <Route path="/admin">
              <DayCalendar />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AdDashboard;
