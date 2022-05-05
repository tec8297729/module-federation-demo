/*
 * @Author: zqzhan
 * @Date: 2022-05-05 22:49:15
 * @LastEditors: zqzhan
 * @LastEditTime: 2022-05-05 23:24:04
 * @Description: 
 */
import React from 'react';

const BtnEs = (props) => {
  console.log('app2组件接收到的参数：', props);
  const onClick = () => {
    console.log('app2 > hello');
  };

  return (
    <div>
      <button onClick={onClick}>打印输出（app2组件）</button>
    </div>
  );
};

export default BtnEs;
