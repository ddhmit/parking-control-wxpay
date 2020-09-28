function onBridgeReady(params: any, success: () => void, fail: () => void) {
  WeixinJSBridge.invoke('getBrandWCPayRequest', params, function (res: any) {
    if (res.err_msg === 'get_brand_wcpay_request:ok') {
      // 使用以上方式判断前端返回,微信团队郑重提示：
      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      success && success();
    } else {
      fail && fail();
    }
  });
}

export function invokePay(params: any, success: () => void, fail: () => void) {
  const handler = () => {
    onBridgeReady(params, success, fail);
    // setTimeout(success, 2000);
  };
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      // @ts-ignore
      document.addEventListener('WeixinJSBridgeReady', handler, {
        capture: false,
        once: true,
      });

      // @ts-ignore
    } else if (document.attachEvent) {
      // @ts-ignore
      document.attachEvent('WeixinJSBridgeReady', handler);
      // @ts-ignore
      document.attachEvent('onWeixinJSBridgeReady', handler);
    }
  } else {
    handler();
  }
}
