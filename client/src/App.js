import "./App.css";
import S0_Menu from "./components/S0_Menu";
import S1_SliderBar from "./components/S1_SliderBar";
import S2_MySpecial from "./components/S2_MySpecial";
import S2_WhyUs from "./components/S2_WhyUs";
import S3_Satisfact from "./components/S3_Satisfact";
import S4_Courses from "./components/S4_Courses";
import S4_HowToFree from "./components/S4_HowToFree";
import S5_ChoosePlan from "./components/S5_ChoosePlan";
import S6_InfiniteContents from "./components/S6_InfiniteContents";
import S7_Footer from "./components/S7_Footer";

function App() {
  return (
    <div className="app">
      <S0_Menu />
      <S1_SliderBar />
      <S2_WhyUs />
      <S2_MySpecial />
      <S3_Satisfact />
      <S4_Courses />
      <S5_ChoosePlan />
      <S4_HowToFree />
      <S6_InfiniteContents />
      <S7_Footer />
    </div>
  );
}

export default App;
