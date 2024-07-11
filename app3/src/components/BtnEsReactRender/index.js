/*
 * @Author: zqzhan
 * @Date: 2022-05-05 22:49:15
 * @LastEditors: zqzhan
 * @LastEditTime: 2022-05-05 23:24:04
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom";

const BtnEsReactRender = (props) => {
	console.log("app3组件接收到的参数：", props);
	const onClick = () => {
		console.log("app3 > hello");
	};

	ReactDOM.render(
		<div>
			<button onClick={onClick}>打印输出（app3 BtnEsReactRender组件）</button>
		</div>,
		document.getElementById("root"),
	);
};

export default BtnEsReactRender;
