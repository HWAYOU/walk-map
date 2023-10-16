import "./App.scss";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import Navigation from "./component/Navigation";
import { getDocs } from "firebase/firestore";

import { db } from "./firebase";
import { collection } from "firebase/firestore";

//firebase db의 collection인 fruits를 연결하기
// const data = collection(db, "health");
// const data = await getDocs(healthRef);
// console.log(db);

export const HealthStateContext = React.createContext();

//라우터 적용
const App = () => {
  useEffect(() => {
    console.log(db);
  });
  return (
    // <HealthStateContext.Provider value={data}>
    <div className="app">
      <Navigation />
      <Outlet />
      {/* Outlet : 중첩된 라우팅 구조에서 부모 라우트 컴포넌트 내에서 자식 라우트 컴포넌트를 렌더링하기 위해 사용 */}
    </div>
    // </HealthStateContext.Provider>
  );
};

export default App;
