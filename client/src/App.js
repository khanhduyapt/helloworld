import "./App.css";
import S1_SliderBar from "./components/S1_SliderBar";
import S2_WhyUs from "./components/S2_WhyUs";
import S3_Satisfact from "./components/S3_Satisfact";
import S4_HowToFree from "./components/S4_HowToFree";
import S5_ChoosePlan from "./components/S5_ChoosePlan";
import S6_InfiniteContents from "./components/S6_InfiniteContents";

function App() {
  return (
    <div className="app">
      <S1_SliderBar />
      <S2_WhyUs />
      <S3_Satisfact />
      <S4_HowToFree />
      <S5_ChoosePlan />
      <S6_InfiniteContents />
      <p id="backtoTop" class="">
        <a href="#root" id="back_to_top">
          TOP
        </a>
      </p>
    </div>
  );
}

export default App;
