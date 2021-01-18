import React from 'react';

const BtnPm = (props) => {
  const onClick = () => {
    console.log('hello', props);
  };
  return (
    <div>
      <button onClick={onClick}>参数按钮组件</button>
    </div>
  );
};

export default BtnPm;
