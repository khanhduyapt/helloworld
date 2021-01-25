import "./App.css";
import HpMenu from "./components/HpMenu";
import HpSliderBar from "./components/HpSliderBar";
import HpMySpecial from "./components/HpMySpecial";
import HpTraining from "./components/HpTraining";
import HpCourses from "./components/HpCourses";
import HpHowToFree from "./components/HpHowToFree";
// import HpChoosePlan from "./components/HpChoosePlan";
import HpInfiniteContents from "./components/HpInfiniteContents";
import HpFooter from "./components/HpFooter";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AdDashboard from "./admin/AdDashboard";
import Login from "./components/Login";

function App() {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("user") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/login" component={Login} />

          <PrivateRoute path="/admin" component={AdDashboard} />

          <Route path="/">
            <HpMenu />
            <HpSliderBar />
            <HpCourses />
            <HpTraining />
            <HpMySpecial />
            {/* <HpChoosePlan /> */}
            <HpHowToFree />
            <HpInfiniteContents />
            <HpFooter />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
