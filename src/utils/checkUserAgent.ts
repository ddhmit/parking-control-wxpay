const WechatUAReg = /MicroMessenger/i;
export function isWeChat() {
  var ua = navigator.userAgent.toLowerCase();
  return WechatUAReg.test(ua);
}
