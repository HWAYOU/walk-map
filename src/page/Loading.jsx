import React from "react";
import "../style/page/Loading.scss";

const Loading = () => {
  return (
    <div class="Loading">
      <div className="widthSetting">
        <div class="spinner"></div>
      </div>
      로딩중..
    </div>
  );
};

export default Loading;
