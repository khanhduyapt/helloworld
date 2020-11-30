import React from "react";
import "./S2_WhyUs.css";
import RoundCard from "./commons/RoundCard";

function S2_WhyUs() {
  return (
    <div className="whyus">
      <div className="whyus__title">
        <h1>Tại sao Ripple Kids Park được chọn</h1>
      </div>
      <div className="whyus__motive">
        <RoundCard
          image="https://image.shutterstock.com/image-photo/asian-girl-student-wear-wireless-600w-1687801057.jpg"
          href="#motive1"
          item_index="1"
          title="Học tiếng Anh trong khi vui chơi"
        />

        <RoundCard
          image="https://image.shutterstock.com/image-photo/asian-girl-student-online-learning-600w-1675256440.jpg"
          href="#motive2"
          item_index="2"
          title="Bắt đầu từ con số 0"
        />

        <RoundCard
          image="https://image.shutterstock.com/image-photo/cute-asian-little-child-girl-600w-1007688394.jpg"
          href="#motive3"
          item_index="3"
          title="Học dễ dàng chỉ từ 500k 1 tháng"
        />

        <RoundCard
          image="https://image.shutterstock.com/image-photo/female-customer-support-operator-headset-600w-663954997.jpg"
          href="#motive4"
          item_index="4"
          title="Theo sát quá trình học tập của bé"
        />

        <RoundCard
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFhHEDtbjcJc4Yw8e7DyIJMqPzBPNTeVvwHw&usqp=CAU"
          href="#motive5"
          item_index="5"
          title="Đội ngũ kỹ thuật viên tận tình"
        />
      </div>

      <div className="whyus__motive__detail">
        <ul>
          <li id="motive1" className="skewR">
            <div className="skewL">
              <div className="detailBox posR">
                <h5>
                  <span>楽しみながら英語が身につく</span>
                </h5>
                <p>
                  リップルキッズパークは楽しいレッスンで、英語を好きになってもらうことを重視しています。
                  <br />
                  <span>「楽しいから、先生ともっと英語で話したい！」</span>
                  <br />
                  英語教育は継続が命、
                  <span>
                    お子様が英語を好きになり継続できるから英語が身につく
                  </span>
                  んです。
                </p>
                <div className="linkBtn sizeM darkBtn bgff0">
                  <a href="https://www.ripple-kidspark.com/user/curriculum/">
                    レッスンの特徴を詳しく見る
                  </a>
                </div>
                <a href="#motive2">
                  <div className="nextMotive">NEXT</div>
                </a>
              </div>
            </div>
          </li>
          <li id="motive2" className="skewL">
            <div className="skewR">
              <div className="detailBox posL nonview">
                <h5>
                  <span>英語経験ゼロからはじめられる</span>
                </h5>
                <p>
                  リップルキッズパークでは、
                  <span>ABCも分からない英語の未経験者からスタートできるの</span>
                  が特徴です。実際半数以上のお子様が完全初心者からスタートしています。
                  <br />
                  その理由はレッスンの経験が豊富な先生達！
                  <span>累計レッスン数271万回超えの豊富な経験</span>
                  があり、最初は簡単な日本語も交えてレッスンを進められるので、まったくの未経験者もご安心ください。
                </p>
                <div className="linkBtn sizeM darkBtn bgff0">
                  <a href="https://www.ripple-kidspark.com/user/ripple/teacher.php">
                    先生たちを詳しく見る
                  </a>
                </div>
                <a href="#motive3">
                  <div className="nextMotive">NEXT</div>
                </a>
              </div>
            </div>
          </li>
          <li id="motive3" className="skewR">
            <div className="skewL">
              <div className="detailBox posR">
                <h5>
                  <span>月々2838円から、お手軽に</span>
                </h5>
                <p>
                  リップルキッズパークは、毎週レッスンを受講できて
                  <span>月々2838円から</span>。さらにお得な利用方法として、
                  <span>レッスンをご家族で分ける</span>ことができます。
                  <br />
                  例えば、週2プランでご入会いただき、2人のお子様で週1回ずつレッスンを分ければ、お子様1人につき
                  <span>実質、月々2222円</span>でご受講いただけます。
                </p>
                <div className="linkBtn sizeM darkBtn bgff0">
                  <a href="https://www.ripple-kidspark.com/user/payment/payment.php">
                    料金プランを詳しく見る
                  </a>
                </div>
                <a href="#motive4">
                  <div className="nextMotive">NEXT</div>
                </a>
              </div>
            </div>
          </li>
          <li id="motive4" className="skewL">
            <div className="skewR">
              <div className="detailBox posL nonview">
                <h5>
                  <span>日本の事務局が、しっかりサポート</span>
                </h5>
                <p>
                  パソコンの操作に自信がない・・・、レッスンの進め方がわからない・・・。そんな方もご安心ください。
                  <span>
                    リップルキッズパークの事務局が、日本語でしっかりサポート
                  </span>
                  いたします。リップル事務局のサポートは
                  <span>99.8%のお客様にご満足</span>
                  いただいております。ご不安なことがありましたら、まずは事務局にお問い合わせください。
                </p>
                <div className="linkBtn sizeM darkBtn bgff0">
                  <a href="#inquiry">事務局に問い合わせる</a>
                </div>
                <a href="#eduprogram">
                  <div className="nextMotive">NEXT</div>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default S2_WhyUs;
