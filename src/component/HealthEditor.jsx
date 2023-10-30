import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/page/New.scss";
import MyButton from "../component/MyButton";
import MyInput from "../component/MyInput";
import { HealthDispatchContext } from "../App";

const HealthEditor = () => {
  const { onCreate, onEdit, onRemove } = useContext(HealthDispatchContext);

  const [state, setState] = useState({
    date: "",
    exercise: "안함",
    time: "",
    sleep: "",
    water: "",
    mind: "",
  });

  const [error, setError] = useState({
    date: false,
    sleep: false,
    water: false,
    mind: false,
  });

  const navigate = useNavigate();

  //각각 useRef 선언했던 것을 객체로 묶음
  const inputRefs = {
    date: useRef(),
    sleep: useRef(),
    water: useRef(),
    mind: useRef(),
  };

  //input 값 변경 시 setState함수 실행하여 새로운 value 저장
  function changeInput(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  //오류처리 함수
  const displayError = (field) => {
    if (error[field]) {
      //✨객체에 접근할때 1. 대괄호 표기법(field 변수 값이 동적일 경우) 2. 점 표기법(field라는 정확한 속성명을 사용할 경우)
      return (
        <div className="error-text">
          {state[field].length < 1 ? `빈칸을 입력해주세요` : ""}
        </div>
      );
    } else {
      return <div className="error-hidden"></div>;
    }
  };

  //데이터 추가(create)
  function handleSubmit(e) {
    e.preventDefault();

    //필드 검증 및 오류 처리
    const fieldsToValidate = ["date", "sleep", "water", "mind"];
    let hasError = false; //form 전체에 대한 오류가 있는지 확인
    const newErrorState = {}; //form의 field에 대한 오류가 있는지 확인

    fieldsToValidate.forEach((field) => {
      if (state[field].length < 1) {
        //각 필드가 빈 값이면
        inputRefs[field].current.focus(); //포커스를 이동시키고
        newErrorState[field] = true; //오류가 발생한 필트를 newErrorState에 저장하고
        hasError = true; //hasError는 true로 변경
      }
    });

    if (hasError) {
      //hasError가 true이면(error가 있다면)
      setError({ ...error, ...newErrorState }); //error 상태를 변경시킨다 -> 에러메세지 표시
      return;
    }

    onCreate(
      state.date,
      state.exercise,
      state.time,
      state.sleep,
      state.water,
      state.mind
    );

    alert("기록이 추가 되었습니다.");
    navigate("/list", { replace: true }); //replace: true 작성 완료 후 뒤로가기 안됨
  }

  return (
    <form>
      <div className="add date">
        <label>일자</label>
        <input
          type="date"
          ref={inputRefs.date}
          value={state.date}
          name="date"
          onChange={changeInput}
        />
        {displayError("date")}
      </div>

      <div className="add exercise">
        <label>운동</label>
        <select name="exercise" value={state.exercise} onChange={changeInput}>
          <option value={8}>안함</option>
          <option value={"헬스"}>헬스</option>
          <option value={"러닝"}>러닝</option>
          <option value={"등산"}>등산</option>
          <option value={"수영"}>수영</option>
        </select>
      </div>

      <MyInput
        text={"운동시간"}
        name={"time"}
        value={state.time}
        onChange={changeInput}
        placeholder={"ex) 1:20"}
      />

      <div className="add sleep">
        <label>수면시간</label>
        <input
          value={state.sleep}
          ref={inputRefs.sleep}
          name="sleep"
          onChange={changeInput}
          placeholder="ex) 7:30"
        />
        {displayError("sleep")}
      </div>

      <div className="add sleep">
        <label>수분섭취(ml)</label>
        <input
          value={state.water}
          ref={inputRefs.water}
          name="water"
          onChange={changeInput}
          placeholder="ex) 700"
        />
        {displayError("water")}
      </div>

      <div className="add sleep">
        <label>마음건강</label>
        <textarea
          rows="4"
          value={state.mind}
          ref={inputRefs.mind}
          name="mind"
          onChange={changeInput}
          placeholder="오늘 느꼈던 감정을 작성하세요"
        />
        {displayError("mind")}
      </div>

      <div className="button">
        <MyButton text={"저장"} onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default HealthEditor;
