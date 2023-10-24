import React, { useRef, useState, useContext } from "react";
import { doc, setDoc } from "firebase/firestore";
import "../style/page/New.scss";
import { HealthStateContext } from "../App";
import MyButton from "../component/MyButton";
import MyInput from "../component/MyInput";

const New = () => {
  //✅useContex로 HealthStateContext에서 제공하는 data 받기(props로 받는 것 대신)
  const healthData = useContext(HealthStateContext);

  //dom요소에 접근할 수 있는 useRef - 입력 되지 않았을 때 focus되도록
  const dateInput = useRef();
  const sleepInput = useRef();
  const waterInput = useRef();
  const mindInput = useRef();

  const [error, setError] = useState({
    date: false,
    sleep: false,
    water: false,
    mind: false,
  });

  const [state, setState] = useState({
    hid: "",
    exercise: "안함",
    time: "",
    sleep: "",
    water: "",
    mind: "",
  });

  //input 값 변경 시 setState함수 실행하여 새로운 value 저장
  function changeInput(e) {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  }

  //버튼 클릭시 입력한 새로운 과일 데이터 저장하는 함수
  async function setHealth(e) {
    e.preventDefault();
    console.log(state.hid);

    if (state.hid === "") {
      dateInput.current.focus();
      setError({ ...error, hid: true });
      return error.hid;
      //return시 함수 실행되지 않음
    }

    if (state.sleep.length < 1) {
      sleepInput.current.focus();
      setError({ ...error, sleep: true });
      return error.sleep;
      //return시 함수 실행되지 않음
    }

    if (state.water.length < 1) {
      waterInput.current.focus();
      setError({ ...error, water: true });
      return error.water;
    }

    if (state.mind.length < 1) {
      mindInput.current.focus();
      setError({ ...error, mind: true });
      return error.mind;
    }

    console.log(state.hid);
    //db저장
    await setDoc(doc(healthData, state.hid), {
      //healthData 컬렉션에 state.hid 값을 가지는 문서를 생성
      // healthCollection에 {}데이터가 들어간 state.name이라는 document 추가할거다.
      hid: state.hid,
      exercise: state.exercise,
      time: state.time,
      sleep: state.sleep,
      water: state.water,
      mind: state.mind,
    });

    alert("기록이 추가 되었습니다.");

    //저장하고 input창 비워주기
    setState({
      hid: "",
      exercise: "안함",
      time: "",
      sleep: "",
      water: "",
      mind: "",
    });

    setError({
      date: false,
      sleep: false,
      water: false,
      mind: false,
    });
  }
  return (
    <div className="New">
      <p className="desc">오늘의 건강을 기록해보세요.</p>
      <form>
        <div className="add date">
          <label>일자</label>
          <input
            type="date"
            ref={dateInput}
            value={state.hid}
            name="hid"
            onChange={changeInput}
          />
          {error.hid ? (
            state.hid.length < 1 ? (
              <div className="qna-error">일자를 선택해주세요</div>
            ) : (
              <div className="qna-hidden"></div>
            )
          ) : (
            <div className="qna-hidden"></div>
          )}
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
            ref={sleepInput}
            name="sleep"
            onChange={changeInput}
            placeholder="ex) 7:30"
          />
          {error.sleep ? (
            state.sleep.length < 1 ? (
              <div className="qna-error">수면시간을 입력해주세요</div>
            ) : (
              <div className="qna-hidden"></div>
            )
          ) : (
            <div className="qna-hidden"></div>
          )}
        </div>

        <div className="add sleep">
          <label>수분섭취(ml)</label>
          <input
            value={state.water}
            ref={waterInput}
            name="water"
            onChange={changeInput}
            placeholder="ex) 700"
          />
          {error.water ? (
            state.water.length < 1 ? (
              <div className="qna-error">수분섭취를 입력해주세요</div>
            ) : (
              <div className="qna-hidden"></div>
            )
          ) : (
            <div className="qna-hidden"></div>
          )}
        </div>

        <div className="add sleep">
          <label>마음건강</label>
          <textarea
            rows="4"
            value={state.mind}
            ref={mindInput}
            name="mind"
            onChange={changeInput}
            placeholder="오늘 느꼈던 감정을 작성하세요"
          />
          {error.mind ? (
            state.mind.length < 1 ? (
              <div className="qna-error">마음건강을 작성해주세요</div>
            ) : (
              <div className="qna-hidden"></div>
            )
          ) : (
            <div className="qna-hidden"></div>
          )}
        </div>

        <div className="button">
          <MyButton text={"저장"} onClick={setHealth} />
        </div>
      </form>
    </div>
  );
};

export default New;
