export enum PayResultStatus {
  SUCCESS = "success", // 支付成功
  FAIL = "fail", // 支付接口调用失败
  PENDING = "pending", // 等待支付
  VERIFYING = "verifying", // 等待确认结果
}
