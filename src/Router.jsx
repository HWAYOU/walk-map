import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Main from "./page/Main";
import HealthAdd from "./page/HealthAdd";
import HealthInfo from "./page/HealthInfo";
import HealthList from "./page/HealthList";
import NotFound from "./page/NotFound";

import { db } from "./firebase";
import { collection } from "firebase/firestore";

//firebase db의 collection인 fruits를 연결하기
const healthRef = collection(db, "health");

//✅라우터 생성
//createBrowserRouter를 사용하는 이유? data api 사용(errorElement)
//healthRef={healthRef} : 각각의 컴포넌트에 데이터 연결하기 -> 이걸 context api로 가져올 수 있지 않나? props drilling 지양
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> }, //index: true -> 해당경로에 대한 기본페이지. 즉 '/' 일때 <Main /> 렌더링
      { path: "/healthadd", element: <HealthAdd healthRef={healthRef} /> },
      { path: "/healthlist", element: <HealthList healthRef={healthRef} /> },
      {
        path: "/healthlist/:healthId",
        element: <HealthInfo healthRef={healthRef} />,
      },
    ],
  },
]);

export default router;
