import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HealthStateContext } from "../App";
import HealthEditor from "../component/HealthEditor";
import "../style/page/Editor.scss";

const Detail = () => {
  //✅useContex로 HealthStateContext에서 제공하는 data 받기(props로 받는 것 대신)
  const healthData = useContext(HealthStateContext);

  //선택한 건강기록 데이터 상태
  const [originData, setOriginData] = useState();

  //✅상단 주소에 있는 id 가져오기(useParams : url에 포함되어 있는 파라미터 값을 가져와서 사용할 수 있다.)
  const { id } = useParams();

  //페이지 이동을 위한 navigate함수 리턴(수정 또는 삭제 후에 페이지 이동)
  const navigate = useNavigate();

  //✅healthData를 받아오고 params로 가져온 id와 일치하는 요소를 찾아 originData에 데이터 저장
  useEffect(() => {
    if (healthData.length >= 1) {
      const targetData = healthData.find(
        (it) => parseInt(it.hid) === parseInt(id) //params로 가져온 id가 string일 수 있으므로 형변환
      );

      if (targetData) {
        setOriginData(targetData);
      } else {
        //targetData가 없을 때 = undefined일 때 = false일 때 홈으로
        alert("없는 기록입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, healthData]);

  return (
    <div className="Detail">
      <p className="desc">기록을 수정 또는 삭제할 수 있습니다.</p>
      {originData && <HealthEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Detail;
