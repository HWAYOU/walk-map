import React from "react";
import "../style/component/MyInput.scss";

const MyInput = ({ text, name, value, placeholder, onChange }) => {
  return (
    <div className={["add", `${name}`].join(" ")}>
      <label>{text}</label>
      <input
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

//⚡defaultProps : props 값을 따로 지정하지 않았을 때 기본으로 보여줄 값 지정
MyInput.defaultProps = {
  placeholder: "",
};

export default MyInput;
