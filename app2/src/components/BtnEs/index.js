import React from 'react';

const BtnEs = (props) => {
  const onClick = () => {
    console.log('hello');
  };
  return (
    <div>
      <button onClick={onClick}>app2组件</button>
    </div>
  );
};

export default BtnEs;
