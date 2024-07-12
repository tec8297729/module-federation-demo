/*
 * @Author: zqzhan
 * @Date: 2022-05-05 22:49:15
 * @LastEditors: zqzhan
 * @LastEditTime: 2022-05-05 23:24:04
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from "@hose/eui";
import { ConfigTheme } from "@hose/eui-theme";

const theme = new ConfigTheme();
theme.config({ prefix: "eui", platform: "eui" });

const BtnEsReactRender = (props) => {
	console.log("app3组件接收到的参数：", props);
	const onClick = () => {
		document.body.setAttribute("theme-platform", "eui");
		Modal.confirm({
			title: "确定要提交吗？",
			centered: true,
			onOk: async () => {
				console.log("app3 > hello");
			},
		});
	};

	ReactDOM.render(
		<div theme-platform="eui">
			<Button onClick={onClick}>打印输出（app3 BtnEsReactRender组件）</Button>
		</div>,
		document.getElementById("root"),
	);
};

export default BtnEsReactRender;
