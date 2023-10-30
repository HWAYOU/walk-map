import React from "react";
import HealthEditor from "../component/HealthEditor";
import "../style/page/New.scss";

const New = () => {
  return (
    <div className="New">
      <p className="desc">오늘의 건강을 기록해보세요.</p>
      <HealthEditor />
    </div>
  );
};

export default New;
