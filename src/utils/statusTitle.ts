import { PayResultStatus } from "../types";

export const createTitleByPayStatus = function (
  status: PayResultStatus,
  isLoading: boolean = false
) {
  return isLoading
    ? "支付中..."
    : status === PayResultStatus.SUCCESS
    ? "支付成功"
    : status === PayResultStatus.FAIL
    ? "支付失败"
    : status === PayResultStatus.VERIFYING
    ? "等待结果"
    : "等待支付";
};
