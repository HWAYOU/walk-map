import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HealthAdd from "./component/HealthAdd";
import NotFound from "./component/NotFound";
import HealthList from "./component/HealthList";
import Main from "./component/Main";
import Root from "./component/Root";
import { db } from "./firebase";
import { collection } from "firebase/firestore";
import HealthInfo from "./component/HealthInfo";

//firebase db의 collection인 fruits를 연결하기
const healthRef = collection(db, "health");

//라우터 생성
//healthRef={healthRef} : 각각의 컴포넌트에 데이터 연결하기
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: "/healthadd", element: <HealthAdd healthRef={healthRef} /> },
      { path: "/healthlist", element: <HealthList healthRef={healthRef} /> },
      {
        path: "/healthlist/:healthId",
        element: <HealthInfo healthRef={healthRef} />,
      },
    ],
  },
]);

//라우터 적용
const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
