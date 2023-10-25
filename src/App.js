import "./App.scss";
import { Outlet } from "react-router-dom";
import React, { useEffect, useRef, useReducer } from "react";
import MyHeader from "./component/MyHeader";

import { getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { collection } from "firebase/firestore";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.hid !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        //action.data.hid에서 받은 id와 일치하는 데이터라면 action.data를 그대로 돌려주고, 아닌 데이터라면 그 데이터 그대로
        it.hid === action.data.hid ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState; //이 리턴 값이 새로운 상태값이 된다
};

//데이터 state와 dispatch 함수를 컴포넌트 전역에 공급하기 위한 context
export const HealthStateContext = React.createContext();
export const HealthDispatchContext = React.createContext();

//router컴포넌트에서는 라우터를 만들고 app에서는 라우터 적용
const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  //✅컴포넌트가 마운트 되었을 때 firebase에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      // firebase에서 데이터를 가져와서 해당 데이터를 records 변수에 저장한다
      const querySnapshot = await getDocs(collection(db, "health"));
      const records = querySnapshot.docs.map((doc) => doc.data());

      // 데이터 최신으로 정렬
      const recordList = records.sort(
        (a, b) => parseInt(b.hid) - parseInt(a.hid)
      );

      // 데이터가 있다면 새로 작성하는 데이터의 id가 +1 되도록
      if (recordList.length >= 1) {
        dataId.current = parseInt(recordList[0].hid + 1);
        dispatch({ type: "INIT", data: recordList });
      }
    };

    fetchData(); //함수 호출
  }, []);

  //✅새로운 데이터를 받아서 건강기록객체(data)로 만들어준다
  const onCreate = (exercise, time, sleep, water, mind) => {
    dispatch({
      type: "CREATE",
      data: { hid: dataId.current, exercise, time, sleep, water, mind },
    });
    dataId.current += 1;
  };

  //✅데이터 삭제함수
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //✅데이터 수정함수
  const onEdit = (targetId, exercise, time, sleep, water, mind) => {
    dispatch({
      type: "EDIT",
      date: {
        hid: targetId,
        exercise,
        time,
        sleep,
        water,
        mind,
      },
    });
  };

  return (
    <HealthStateContext.Provider value={data}>
      <HealthDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <div className="app">
          <MyHeader />
          <Outlet />
          {/* Outlet : 중첩된 라우팅 구조에서 부모 라우트 컴포넌트 내에서 자식 라우트 컴포넌트를 렌더링하기 위해 사용 */}
        </div>
      </HealthDispatchContext.Provider>
    </HealthStateContext.Provider>
  );
};

export default App;
