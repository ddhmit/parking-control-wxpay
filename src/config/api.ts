import env from "../utils/env";
const Timeout = 5000;
let BaseUrl: string = "https://frp.bgonline.cn";
if (env.IsProd) {
  // 生产环境
  BaseUrl = "https://park.ddhmit.com";
}

const createOrder = "/api/pay/wechat/create";

export default {
  Timeout,
  BaseUrl,
  createOrder,
};
