import React, { useState, useEffect } from "react";

//React.memo : 컴포넌트 재사용 - 해당 값이 변경될 때만 리렌더링
const Textview = React.memo(({ text }) => {
  //리렌더링이 됐을 때 프롭스가 각각 어떻게 되는지 확인해보자
  //text만 변하더라도 countview도 재렌더링 된다 -> 낭비
  useEffect(() => {
    console.log(`update :: Text : ${text}`);
  });
  return <div>{text}</div>;
});

const Countview = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`update :: count : ${count}`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <Countview count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default OptimizeTest;
