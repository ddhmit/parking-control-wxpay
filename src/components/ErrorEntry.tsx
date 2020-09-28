import React from "react";
import { closeWindow } from "../utils/closeWindos";

const ErrorEntry: React.FC<{ errMsg?: string }> = ({ errMsg }) => {
  if (!errMsg || !errMsg.trim()) return null;
  return (
    <div className="weui-msg">
      <div className="weui-msg__icon-area">
        <i className="weui-icon-warn weui-icon_msg"></i>
      </div>
      <div className="weui-msg__text-area">
        <h2 className="weui-msg__title">操作失败</h2>
        <p className="weui-msg__desc">{errMsg}</p>
      </div>
      <div className="weui-msg__opr-area">
        <p className="weui-btn-area">
          <button onClick={closeWindow} className="weui-btn weui-btn_warn">
            返回
          </button>
        </p>
      </div>
    </div>
  );
};
export default ErrorEntry;
