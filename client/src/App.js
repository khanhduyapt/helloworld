import "./App.css";
import HpMenu from "./components/HpMenu";
import HpSliderBar from "./components/HpSliderBar";
import HpMySpecial from "./components/HpMySpecial";
import HpSatisfact from "./components/HpSatisfact";
import HpCourses from "./components/HpCourses";
import HpHowToFree from "./components/HpHowToFree";
import HpChoosePlan from "./components/HpChoosePlan";
import HpInfiniteContents from "./components/HpInfiniteContents";
import HpFooter from "./components/HpFooter";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdDashboard from "./admin/AdDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/admin">
            <AdDashboard />
          </Route>

          <Route path="/">
            <HpMenu />
            {/* <HpSliderBar />
            <HpMySpecial />
            <HpSatisfact />
            <HpCourses />
            <HpChoosePlan />
            <HpHowToFree />
            <HpInfiniteContents /> */}
            <HpFooter />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
