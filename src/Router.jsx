import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Main from "./page/Main";
import New from "./page/New";
import Detail from "./page/Detail";
import List from "./page/List";
import NotFound from "./page/NotFound";

//✅라우터 생성(사용은 app.js에서)
//createBrowserRouter를 사용하는 이유? data api(errorElement) 사용할 수 있다
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> }, //index: true -> 해당경로에 대한 기본페이지. 즉 '/' 일때 <Main /> 렌더링
      { path: "/new", element: <New /> },
      { path: "/list", element: <List /> },
      {
        path: "/list/:id",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
