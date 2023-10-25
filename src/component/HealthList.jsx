import React from "react";
import HealthItem from "./HealthItem";
import "../style/page/List.scss";

const HealthList = ({ healthList }) => {
  return (
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
        {healthList.map((it) => (
          <HealthItem key={it.hid} {...it} />
        ))}
      </tbody>
    </table>
  );
};

export default HealthList;
