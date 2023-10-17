import { getDocs } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../style/HealthList.scss";
import { HealthStateContext } from "../App";

const HealthList = () => {
  //✅useContex로 HealthStateContext에서 제공하는 data 받기(props로 받는 것 대신)
  const healthData = useContext(HealthStateContext);

  const [healthRecord, setHealthRecord] = useState([]);
  const [healthId, setHealthId] = useState("");

  const navigate = useNavigate();
  //버튼을 두번 클릭해야 페이지 이동이 되는데
  //useState는 비동기적이기 때문에 변경사항이 즉시 반영되지 않는다.

  //경로 이동
  const clickHandler = (healthId) => {
    //클릭하면 해당 이벤트타겟의 value값으로 healthId가 변경
    // setHealthId(e.target.value);
    navigate(`/healthlist/${healthId}`);
    //healthId에 id 저장한 이유? 상세정보 페이지로 이동하기 위해
  };

  // //해당 id의 주소로 이동한다
  // useEffect(() => {
  //   //healthId가 변경될 때마다 실행 -> 즉, 클릭이벤트가 실행될 때마다 실행
  //   if (healthId === undefined) {
  //   } else {
  //   }
  // }, [healthId]);

  // 전체 리스트(데이터) 가져오기
  useEffect(() => {
    async function getAllHealth() {
      const data = await getDocs(healthData);
      // healthData의 전체데이터가 변수 data에 저장되고
      // 이 data로 setHealthRecord함수를 이용하여 healthRecord를 변경한다.
      // healthRecord : 과일정보가 객체모양으로 들어가있는 배열로, 과일 리스트 출력 시 사용
      console.log(data.docs);
      setHealthRecord(
        // data : 데이터의 모든 정보
        // data.docs : 데이터의 document 정보 => {name : 귤, color : orange ... }
        // item : 기존 객체=> {name : 귤, color : orange ... }

        // 새로운 객체 생성 : 기존객체에는 이름이 없으므로 이름을 추가해준다.
        data.docs.map((item) => ({
          ...item.data(), // 기존값 객체 = field 값
          name: item.id, // item.id = docuemnt 이름
          // pid: item.data().id,
        }))

        // 새로운 객체 = { name : 귤, color ... , pid : p001 }
      );
      console.log(healthRecord);
    }
    getAllHealth();
  }, []);

  //healthRecord를 map함수를 돌려 새로운 배열 health로 만들어주는데 테이블 형태이다.
  const showRecord = healthRecord.map((health) => (
    <tr
      key={health.hid}
      className="healthTr"
      onClick={() => {
        clickHandler(health.hid);
      }}
    >
      <td className="hidTd">{health.hid}</td>
      <td>{health.exercise}</td>
      <td>{health.time}</td>
      <td>{health.sleep}</td>
      <td>{health.water}</td>
      <td className="mindTd">{health.mind}</td>
      {/* <td>
        <button
          onClick={() => {
            clickHandler(health.hid);
          }}
          className="infoBtn"
        >
          <FiEdit2 />
        </button>
      </td> */}
    </tr>
  ));

  return (
    <div className="healthList">
      <p className="desc">
        지금까지 기록한 목록입니다. 항목 클릭 시 내용을 수정 및 삭제 할 수
        있어요.
      </p>
      <table className="healthTable">
        <tbody>
          <tr className="healthToptr">
            <th>일자</th>
            <th>운동</th>
            <th>운동시간</th>
            <th>수면시간</th>
            <th>수분섭취(ml)</th>
            <th className="thMind">마음건강</th>
          </tr>
          {showRecord}
        </tbody>
      </table>
    </div>
  );
};

export default HealthList;
