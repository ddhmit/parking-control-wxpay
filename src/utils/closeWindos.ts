import { isWeChat } from "./checkUserAgent";

export function closeWindow(e?: React.MouseEvent<HTMLElement>) {
  e && e.preventDefault();
  isWeChat()
    ? WeixinJSBridge.invoke("closeWindow", {}, function (res: any) {
        // console.log(" close window => ", res);
      })
    : window.history.back();
}
