import React from "react";
import "./S2_WhyUs.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

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

      <div className="whyus__online">
        <h1 className="blog__header">Điểm đặc biệt của Kimini</h1>

        <CardDeck>
          <Card className="whyus__online__benefit">
            <Card.Header>Chú trọng vào tiếng Anh giao tiếp</Card.Header>
            <Card.Img
              variant="top"
              src="https://glats.co.jp/static/img/home/Feature_img01_pc.jpg"
            />
            <Card.Body>
              <Card.Text className="textLeft">
                Sau khi chọn khóa học, lộ trình và nội dung khóa học sẽ bán sát
                trình độ của bé.
              </Card.Text>
              <Card.Text className="textLeft">
                Các bài kiểm tra nhỏ được ghép vào khóa học thông qua các trò
                chơi.
              </Card.Text>
              <Card.Text className="textLeft">
                Báo cáo kết quả học tập của con hàng tháng bằng email.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="whyus__online__benefit">
            <Card.Header>Video Call trên nhiều thiết bị khác nhau</Card.Header>
            <Card.Img
              variant="top"
              src="https://glats.co.jp/static/img/home/Feature_img02_pc.jpg"
            />
            <Card.Body>
              <Card.Text className="textLeft">
                Có thể học trực tiếp với giáo viên bằng Video Call trên trình
                duyệt web của máy tính hoặc Ipad mà không cần cài đặt phức tạp.
              </Card.Text>
              <Card.Text className="textLeft">
                Có thể dùng smart phone nếu không có máy tính, cô giáo sẽ giảng
                bài trực tiếp qua app.
              </Card.Text>
              <Card.Text className="textLeft">
                Luôn hướng đến phương án tốt nhất, phù hợp nhất với điều kiện
                của học viên.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="whyus__online__benefit">
            <Card.Header>Học theo lộ trình với thời gian phù hợp</Card.Header>
            <Card.Img
              variant="top"
              src="https://glats.co.jp/static/img/home/Feature_img03_pc.jpg"
            />
            <Card.Body>
              <Card.Text className="textLeft">
                Có thể học bất kỳ thời điểm nào trong ngày.
              </Card.Text>
              <Card.Text className="textLeft">
                Giao tiếp với giáo viên hàng tuần sẽ tạo sự tự tin khi giao
                tiếp.
              </Card.Text>
              <Card.Text className="textLeft">
                Một kèm một nên không phải lo lắng khi mắc lỗi với các học sinh
                khác. Giáo viên sẽ nhẹ nhàng hỗ trợ sự phát triển của bé.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    </div>
  );
}

export default S2_WhyUs;
