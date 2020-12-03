import React from "react";
import "./A1_Dashboard.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminMenu from "./components/AdminMenu";
import DayCalendar from "./components/DayCalendar";
import WeekCalendar from "./components/WeekCalendar";
import MonthCalendar from "./components/MonthCalendar";
import Contacts from "./components/Contacts";
import Teachers from "./components/Teachers";
import Students from "./components/Students";
import Admins from "./components/Admins";
import Sliderbar from "./components/Sliderbar";
import MySpecial from "./components/MySpecial";
import WhyUs from "./components/WhyUs";
import Satisfact from "./components/Satisfact";
import ChoosePlan from "./components/ChoosePlan";
import Samples from "./components/Samples";
import Vocabularies from "./components/Vocabularies";

function A1_Dashboard() {
  return (
    <BrowserRouter>
      <div className="dashboard">
        <AdminMenu />

        <div className="dashboard__content">
          <Switch>
            <Route path="/admin/daycalendar">
              <DayCalendar />
            </Route>
            <Route path="/admin/weekcalendar">
              <WeekCalendar />
            </Route>
            <Route path="/admin/monthcalendar">
              <MonthCalendar />
            </Route>
            <Route path="/admin/contacts">
              <Contacts />
            </Route>
            <Route path="/admin/teachers">
              <Teachers />
            </Route>
            <Route path="/admin/students">
              <Students />
            </Route>
            <Route path="/admin/admins">
              <Admins />
            </Route>
            <Route path="/admin/sliderbar">
              <Sliderbar />
            </Route>
            <Route path="/admin/myspecial">
              <MySpecial />
            </Route>
            <Route path="/admin/whyus">
              <WhyUs />
            </Route>
            <Route path="/admin/satisfact">
              <Satisfact />
            </Route>
            <Route path="/admin/chooseplan">
              <ChoosePlan />
            </Route>
            <Route path="/admin/samples">
              <Samples />
            </Route>
            <Route path="/admin/vocabularies">
              <Vocabularies />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default A1_Dashboard;
