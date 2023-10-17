import React from "react";
import "../style/component/MyButton.scss";

const MyButton = ({ type, text, onClick }) => {
  //✅button type 설정 : props로 받은 type에 positive 또는 negative가 포함되어 있으면 해당 type 그대로, 없으면 default
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {/* <button onClick={setHealth}>저장하기</button> */}
      {text}
    </button>
  );
};

//⚡defaultProps : props 값을 따로 지정하지 않았을 때 기본으로 보여줄 값 지정
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
