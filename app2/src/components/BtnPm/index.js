/*
 * @Author: zqzhan
 * @Date: 2022-05-05 22:49:15
 * @LastEditors: zqzhan
 * @LastEditTime: 2022-05-05 23:30:40
 * @Description: 
 */
import React from 'react';

const BtnPm = (props) => {
  const onClick = () => {
    console.log('hello', props);
    props.setTitle('你好，我设置了app1标题')
  };
  return (
    <div>
      <button onClick={onClick}>调用父组件方法（app2组件）</button>
    </div>
  );
};

export default BtnPm;
