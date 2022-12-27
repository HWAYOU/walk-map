import { useEffect, useRef, useState, useMemo } from "react";
import "./App.css";
import Editor from "./component/Editor";
import RecordList from "./component/RecordList";

function App() {
  const [data, setData] = useState([]);

  //변수로 사용할 Id를 만듦
  const dataId = useRef(0);

  //컴포넌트 마운트 시점에 api를 호출하는 함수를 만들어서 자바스크립트 내장객체 fetch와 async, await를 이용해서
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    //데이터 가공 후
    const initData = res.slice(0, 20).map((it) => {
      return {
        exercise: Math.floor(Math.random() * 5) + 1,
        time: it.email,
        sleep: it.id,
        water: it.name,
        mind: it.name,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    //데이터 초기화
    setData(initData);
  };

  //마운트되는 시점에 콜백함수 수행
  useEffect(() => {
    getData();
  }, []);

  //data에 새로운 배열을 추가하는 함수
  const onCreate = (exercise, time, sleep, water, mind) => {
    const created_date = new Date().getTime();
    const newItem = {
      exercise,
      time,
      sleep,
      water,
      mind,
      created_date,
      id: dataId.current,
      // dataId.current = 0
    };
    //newItem을 만들면 id +1 되도록
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  // targetId를 전달받아 함수를 수행하고, data가 변경되면 RecordList에 다시 내려준다
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newRecordList = data.filter((it) => it.id !== targetId);
    //선택한 아이디가(targetId) data의 배열 중 일치하는 id(it.id)가 아닌 애들만 모아서
    setData(newRecordList);
  };

  //수정하기(수정대상, 수정내용)
  const onEdit = (targetId, newMind) => {
    setData(
      data.map((it) => (it.id === targetId ? { ...it, mind: newMind } : it))
    );
  };

  //useMemo(연산 최적화)를 사용하는 이상 함수가 아니라 값이 된다.
  const getexerciseAnalysis = useMemo(() => {
    console.log("일기분석 시작");

    const dontCount = data.filter((it) => (it.exercise = 5)).length;
    const doCount = data.length - dontCount;
    const doRatio = (doCount / data.length) * 100;
    return { doCount, dontCount, doRatio };
  }, [data.length]);
  //getData가 실행되면서 재랜더링 되서 두번실행되지만
  //useMemo를 사용하면 호출이 되더라도 실행되지 않고, data.length가 변경될때만 실행
  const { doCount, dontCount, doRatio } = getexerciseAnalysis;

  return (
    <div className="App">
      <Editor onCreate={onCreate} />
      <div>전체 기록 : {data.length}</div>
      <div>운동 기록 : {doCount}</div>
      <div>운동 안함 기록 : {dontCount}</div>
      <div>운동 기록 비율 : {doRatio}</div>
      <RecordList onEdit={onEdit} recordList={data} onRemove={onRemove} />
    </div>
  );
}

export default App;
