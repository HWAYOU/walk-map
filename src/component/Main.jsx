import React from "react";
import "../style/Main.scss";

const Main = () => {
  return (
    <div className="main">
      <div className="main_img">
        <img
          className="image"
          src="https://images.pexels.com/photos/8330304/pexels-photo-8330304.jpeg"
          alt="main image"
        />
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
