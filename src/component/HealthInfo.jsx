import {
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/HealthInfo.scss";

const HealthInfo = (props) => {
  const { healthRef } = props;

  //아래의 useState()들은 변수에 값을 저장하기 위한 것
  //건강기록 변경사항을 저장할 수 있는 set***()함수
  const [hid, setHid] = useState();
  const [exercise, setExercise] = useState();
  const [time, setTime] = useState();
  const [sleep, setSleep] = useState();
  const [water, setWater] = useState();
  const [mind, setMind] = useState();

  // 상단 주소에 있는 healthId 가져오기
  //useParams : url에 포함되어 있는 파라미터 값을 가져와서 사용할 수 있다.
  const { healthId } = useParams();

  //데이터베이스에서 제품 상세정보 가져오기(query, where로 조건 검색하기)
  useEffect(() => {
    async function getHealth() {
      //필드 조건
      //await query? 쿼리만 해도 가능하긴하지만 조건 데이터를 들고올때까지 기다리려고
      const data = await query(healthRef, where("hid", "==", healthId));

      //전체데이터 가져오기
      const querySnapshot = await getDocs(data);

      //id가 healthId인 제품의 정보 하나씩 빼서 item에 저장
      //item.data() : field 값
      querySnapshot.forEach((item) => {
        setHid(item.data().hid);
        // setName(item.id);
        ///name인데 왜 .id? 원래 document에 id가 들어가야하고, item.id하면 무조건 document명!
        setExercise(item.data().exercise);
        setTime(item.data().time);
        setSleep(item.data().sleep);
        setWater(item.data().water);
        setMind(item.data().mind);

        console.log(item.id, " : ", item.data());
      });
    }
    getHealth();
  }, []); //최초 한번만 실행

  //버튼 클릭시 정보 수정
  function submitHandler(e) {
    e.preventDefault();
    updateDate();
  }

  //페이지 이동을 위한 navigate함수 리턴
  //수정 또는 삭제 후에 페이지 이동
  const navigate = useNavigate();

  //정보 수정 함수
  //변경 '키:값'의 '값'은 useState에서 지정한 변수값
  //input값을 다 입력하지 않으면 저장되지 않는다?네
  //{}안의 지정한 속성을 다 입력해줘야한다
  async function updateDate() {
    await updateDoc(doc(healthRef, hid), {
      exercise: exercise,
      time: time,
      sleep: sleep,
      water: water,
      mind: mind,
    });
    alert("수정되었습니다.");

    //페이지 이동 => 리스트 페이지
    navigate(`/healthList`);
  }

  async function deleteData() {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(healthRef, hid));
      alert("삭제되었습니다.");

      console.log(hid);

      //페이지 이동 => 리스트 페이지
      navigate(`/healthList`);
    } else {
      alert("취소합니다.");
    }
  }

  // value 왜 이렇게 넣는건지? value={pid || ""}
  // value에 값이 없을때 undefined 뜨지 않게 하기위해서? 맞음
  // value가 undefined => error가 난다. 그래서 value=""으로라도 넣어주기

  return (
    <div className="healthInfo">
      <p className="desc">기록을 수정 또는 삭제할 수 있습니다.</p>
      <form onSubmit={submitHandler}>
        <div className="info date">
          <label>일자</label>
          <input
            type="date"
            value={hid || ""}
            name="hid"
            onChange={(e) => setHid(e.target.value)}
          />
        </div>

        <div className="info exercise">
          <label>운동</label>
          <select
            name="exercise"
            value={exercise || ""}
            onChange={(e) => setExercise(e.target.value)}
          >
            <option value={5}>안함</option>
            <option value={4}>헬스</option>
            <option value={3}>러닝</option>
            <option value={2}>등산</option>
            <option value={1}>수영</option>
          </select>
        </div>

        <div className="info time">
          <label>운동시간</label>
          <input
            type="text"
            value={time || ""}
            name="time"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="info sleep">
          <label>수면시간</label>
          <input
            type="text"
            value={sleep || ""}
            name="sleep"
            onChange={(e) => setSleep(e.target.value)}
          />
        </div>

        <div className="info sleep">
          <label>수분섭취(ml)</label>
          <input
            type="text"
            value={water || ""}
            name="water"
            onChange={(e) => setWater(e.target.value)}
          />
        </div>

        <div className="info sleep">
          <label>마음건강</label>
          <textarea
            type="text"
            value={mind || ""}
            name="mind"
            rows="4"
            onChange={(e) => setMind(e.target.value)}
          />
        </div>

        <div className="button">
          <button className="updateBtn">수정</button>
          <button type="button" className="deleteBtn" onClick={deleteData}>
            삭제
          </button>
        </div>
      </form>
    </div>
  );
};

export default HealthInfo;
