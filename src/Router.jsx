import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Main from "./page/Main";
import HealthAdd from "./page/HealthAdd";
import HealthInfo from "./page/HealthInfo";
import HealthList from "./page/HealthList";
import NotFound from "./page/NotFound";

//✅라우터 생성(사용은 app.js에서)
//createBrowserRouter를 사용하는 이유? data api 사용(errorElement)
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> }, //index: true -> 해당경로에 대한 기본페이지. 즉 '/' 일때 <Main /> 렌더링
      { path: "/healthadd", element: <HealthAdd /> },
      { path: "/healthlist", element: <HealthList /> },
      {
        path: "/healthlist/:healthId",
        element: <HealthInfo />,
      },
    ],
  },
]);

export default router;
