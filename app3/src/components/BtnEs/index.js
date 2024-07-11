/*
 * @Author: zqzhan
 * @Date: 2022-05-05 22:49:15
 * @LastEditors: zqzhan
 * @LastEditTime: 2022-05-05 23:24:04
 * @Description:
 */
import React from "react";

const BtnEs = (props) => {
	console.log("app3组件接收到的参数：", props);
	const onClick = () => {
		console.log("app3 > hello");
	};

	return (
		<div>
			<button onClick={onClick}>打印输出（app3组件）</button>
		</div>
	);
};

export default BtnEs;
