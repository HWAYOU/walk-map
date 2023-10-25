import React, { useEffect, useState, useContext } from "react";

import { HealthStateContext } from "../App";
import HealthList from "../component/HealthList";
import Loading from "./Loading";
import "../style/page/List.scss";

const List = () => {
  //✅useContex로 HealthStateContext에서 제공하는 전체 data 받기(props로 받는 것 대신)
  const healthData = useContext(HealthStateContext);

  //받은 데이터를 넣을 state
  const [data, setData] = useState([]);

  //healthData의 값을 감지하여 변경될 때 data가 업데이트 되도록
  useEffect(() => {
    if (healthData.length >= 1) {
      setData(healthData);
    }
  }, [healthData]);

  if (data.length < 1) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="List">
      <p className="desc">
        지금까지 기록한 목록입니다. 항목 클릭 시 내용을 수정 및 삭제 할 수
        있어요.
      </p>
      <HealthList healthList={data} />
    </div>
  );
};

export default List;
