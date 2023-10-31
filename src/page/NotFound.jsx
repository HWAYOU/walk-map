import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/page/NotFound.scss";
import MyButton from "../component/MyButton";

const NotFound = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/");
  };
  return (
    <div className="NotFound">
      <h1>404</h1>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <MyButton type={"positive"} text={"홈으로"} onClick={clickHandler} />
    </div>
  );
};

export default NotFound;
