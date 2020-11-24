import React from "react";
import "./S2_WhyUs.css";
function S2_WhyUs() {
  return (
    <div className="whyus">
      <div className="whyus__title">
        <h1>Tại sao Ripple Kids Park được chọn</h1>
      </div>
      <div className="whyus__motive">
        <ul>
          <li className="whyus__motive__box motive1">
            <a href="#motive1" id="tomotive1">
              <h1>1</h1>
              <h3>Học tiếng Anh trong khi vui chơi</h3>
            </a>
          </li>

          <li className="whyus__motive__box motive2">
            <a href="#motive2" id="tomotive2">
              <h1>2</h1>
              <h3>Bắt đầu từ con số 0</h3>
            </a>
          </li>

          <li className="whyus__motive__box motive3">
            <a href="#motive3" id="tomotive3">
              <h1>3</h1>
              <h3>Học dễ dàng chỉ từ 500k 1 tháng</h3>
            </a>
          </li>

          <li className="whyus__motive__box motive4">
            <a href="#motive4" id="tomotive4">
              <h1>4</h1>
              <h3>
                Theo sát quá trình học tập của bé như người thân trong gia đình.
              </h3>
            </a>
          </li>
        </ul>
      </div>

      <div className="whyus__online">
        <div className="whyus__online__title">
          <h2>Tại sao lựa chọn tiếng Anh trực tuyến?</h2>
        </div>
        <ul className="whyus__online__benefit">
          <li className="online1">
            Không cần đưa đón
            <br />
            Có thể học ở bất kỳ đâu bạn thích.
          </li>
          <li className="online2">
            Dễ dàng bắt đầu ngay hôm nay
            <br />
            Lựa chọn thời gian phù hợp với bé.
          </li>
          <li className="online3">
            Học thử miễn phí
            <br />
            Lựa chọn lộ trình phù hợp với lứa tuổi.
          </li>
        </ul>
      </div>

      <div className="whyus__motive__detail">
        <ul>
          <li id="motive1" className="skewR">
            <div className="skewL">
              <div class="detailBox posR">
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
                <div class="linkBtn sizeM darkBtn bgff0">
                  <a
                    href="https://www.ripple-kidspark.com/user/curriculum/"
                    id="motive1"
                  >
                    レッスンの特徴を詳しく見る
                  </a>
                </div>
                <a href="#motive2">
                  <div class="nextMotive">NEXT</div>
                </a>
              </div>
            </div>
          </li>
          <li id="motive2" className="skewL">
            <div className="skewR">
              <div class="detailBox posL nonview">
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
                <div class="linkBtn sizeM darkBtn bgff0">
                  <a
                    href="https://www.ripple-kidspark.com/user/ripple/teacher.php"
                    id="motive2"
                  >
                    先生たちを詳しく見る
                  </a>
                </div>
                <a href="#motive3">
                  <div class="nextMotive">NEXT</div>
                </a>
              </div>
            </div>
          </li>
          <li id="motive3" className="skewR">
            <div className="skewL">
              <div class="detailBox posR">
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
                <div class="linkBtn sizeM darkBtn bgff0">
                  <a
                    href="https://www.ripple-kidspark.com/user/payment/payment.php"
                    id="motive3"
                  >
                    料金プランを詳しく見る
                  </a>
                </div>
                <a href="#motive4">
                  <div class="nextMotive">NEXT</div>
                </a>
              </div>
            </div>
          </li>
          <li id="motive4" className="skewL">
            <div className="skewR">
              <div class="detailBox posL nonview">
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
                <div class="linkBtn sizeM darkBtn bgff0">
                  <a href="#inquiry" id="motive4">
                    事務局に問い合わせる
                  </a>
                </div>
                <a href="#strength">
                  <div class="nextMotive">NEXT</div>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="whyus__strength skewR">
        <div className="skewL">
          <h5>
            <span>
              まだまだある、
              <br class="br-sp" />
              リップルキッズパークならではの強み
            </span>
          </h5>
          <ul>
            <li>
              <ul>
                <li>トラブルがあった際には、振替レッスンで対応</li>
                <li>事前の申請があれば、レッスンの繰り越しも</li>
              </ul>
            </li>
            <li>
              <ul>
                <li>9段階のレベル判定で最適なレッスンを</li>
                <li>複数人で並んでレッスンも可能</li>
              </ul>
            </li>
          </ul>
          <div class="linkBtn sizeM darkBtn bgff0">
            <a
              href="https://www.ripple-kidspark.com/u/advantage/"
              id="advantage"
            >
              詳しく見る
            </a>
          </div>
        </div>
      </div>

      <div class="whyus__regist">
        <div class="registinnner">
          <span>2回まで完全無料で体験できる</span>
          <div class="linkBtn sizeL registBtn">
            <a
              href="https://www.ripple-kidspark.com/user/login/member_regist.php"
              id="registarea_regist1"
            >
              無料の体験レッスンを受ける
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default S2_WhyUs;
