import React from "react";
import "../style/page/Main.scss";

const Main = () => {
  return (
    <div className="main">
      <div className="main_img">
        <img className="image" src="/img/main.jpg" alt="main img" />
      </div>
      <div className="main_text">
        <h1>
          오늘 더 <b>건강</b>해지는 <b>습관</b>
        </h1>
        <p>매일 간단하게 건강을 기록해보세요!</p>
      </div>
    </div>
  );
};

export default Main;
