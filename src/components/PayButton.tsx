import React, { memo } from "react";
import classnames from "classnames";
import { PayResultStatus } from "../types";

interface PayButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  status: PayResultStatus;
}

const PayButton: React.FC<PayButtonProps> = ({
  loading,
  status,
  ...restProps
}) => {
  return (
    <div className="weui-form-preview__ft">
      <button
        {...restProps}
        className={classnames("weui-btn pay-btn", {
          "weui-btn_loading": loading,
          "weui-btn_primary": status !== PayResultStatus.FAIL,
          "weui-btn_warn": status === PayResultStatus.FAIL,
        })}
      >
        {loading && <i className="weui-loading"></i>}
        {createButtonText(loading, status)}
      </button>
    </div>
  );
};
export default memo(PayButton);

function createButtonText(loading: boolean, status: PayResultStatus) {
  if (loading) {
    return "支付中";
  } else {
    switch (status) {
      case PayResultStatus.SUCCESS:
        return "返回";
      case PayResultStatus.FAIL:
        return "请返回重试";
      default:
        return "点击支付";
    }
  }
}
