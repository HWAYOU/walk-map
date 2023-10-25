import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/page/List.scss";

const HealthItem = ({ hid, exercise, time, sleep, water, mind }) => {
  const navigate = useNavigate();

  //item 클릭 시 detail 페이지로 이동
  const clickHandler = (id) => {
    navigate(`/List/${id}`);
  };

  return (
    <tr
      key={hid}
      className="healthTr"
      onClick={() => {
        clickHandler(hid);
      }}
    >
      <td className="hidTd">{hid}</td>
      <td>{exercise}</td>
      <td>{time}</td>
      <td>{sleep}</td>
      <td>{water}</td>
      <td className="mindTd">{mind}</td>
    </tr>
  );
};

export default HealthItem;
