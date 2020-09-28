import React, { useState, useEffect, useCallback, useRef } from "react";
import IconBox from "./components/IconBox";
import OrderContent from "./components/OrderContent";
import PayButton from "./components/PayButton";
import Loading from "./components/Loading";
import ErrorEntry from "./components/ErrorEntry";
import { isWeChat } from "./utils/checkUserAgent";
import { PayResultStatus } from "./types";
import { invokePay } from "./utils/pay";
import { closeWindow } from "./utils/closeWindos";

import "./App.scss";
import { createOrder } from "./services/createOrder";
import { VerifyStatus } from "./services/verifyPayResult";
import useVerifyPayResult from "./hooks/useVerifyPayResult";
import { ICarInfo, IPaymentOrder, IVerifySocketRes } from "./types/data";

function App() {
  // 检查是否是微信内置浏览器
  const inWeChat = isWeChat();
  // 初始化 loading
  const [initLoading, setInitLoading] = useState(true);
  // 初始化失败/订单生成失败 原因, 如果为 undefined， 那么 初始化/订单生成 成功
  const [initFailedMsg, setInitFailedMsg] = useState<string | undefined>(
    inWeChat ? undefined : "请使用微信扫码打开该页面"
  );
  // 支付中标记
  const [paying, setPaying] = useState(false);
  // 支付状态
  const [payStatus, setPayStatus] = useState<PayResultStatus>(
    PayResultStatus.PENDING
  );
  // 支付接口配置对象
  const payConfig = useRef<any>(null);
  // 支付订单数据
  const [payOrder, setPayOrder] = useState<{
    car: ICarInfo;
    order: IPaymentOrder;
  } | null>(null);

  // 请求订单
  useEffect(() => {
    if (!inWeChat) return;
    (async () => {
      try {
        // 发送创建订单请求
        let res = await createOrder();
        // 保存支付接口需要的配置
        payConfig.current = res.data.pay;
        // 保存订单的渲染内容
        setPayOrder({ order: res.data.payInfo, car: res.data.car });
      } catch (err) {
        setInitFailedMsg(err.message || "创建订单出错，请重新扫码");
      } finally {
        // 创建订单请求完成后才会关闭初始化 loading
        setInitLoading(false);
      }
    })();
  }, [inWeChat]);

  // 支付接口成功回调
  const paySuccess = useCallback(() => {
    setPaying(false);
    setPayStatus(PayResultStatus.VERIFYING);
  }, []);

  // 支付接口失败回调
  const payFail = useCallback(() => {
    setPayStatus(PayResultStatus.FAIL);
    setPaying(false);
  }, []);

  // 点击支付按钮
  const onClick = useCallback(() => {
    if (initLoading) return;
    if (paying) return;
    // 支付成功或失败后，点击按钮，关闭内置网页
    if (payStatus !== PayResultStatus.PENDING) {
      closeWindow();
      return;
    }
    if (!payConfig.current) return;
    setPaying(true);
    invokePay(payConfig.current, paySuccess, payFail);
  }, [initLoading, paying, payStatus, paySuccess, payFail]);

  // 监听对订单的核实结果
  const verifyListener = useCallback((data: IVerifySocketRes) => {
    if (data.status === VerifyStatus.Ok) {
      // 审核结果为 ok 时，才是真正的支付成功
      setPayStatus(PayResultStatus.SUCCESS);
    }
  }, []);
  useVerifyPayResult(verifyListener, payStatus === PayResultStatus.VERIFYING);

  return (
    <div className="App page">
      <div className="page__bd page__bd_spacing">
        {
          /* 是不是微信内部并且不存在初始化错误 */
          inWeChat && !initFailedMsg ? (
            /* 初始化中 */
            initLoading ? (
              <Loading />
            ) : (
              /* 支付订单界面 */
              payOrder && (
                <>
                  <IconBox status={payStatus} order={payOrder.order} />
                  <div className="weui-form-preview">
                    <OrderContent
                      status={payStatus}
                      loading={paying}
                      order={payOrder!.order}
                      car={payOrder!.car}
                    />
                    {/* 核实订单状态中，不显示底部按钮 */}
                    {payStatus !== PayResultStatus.VERIFYING && (
                      <PayButton
                        onClick={onClick}
                        status={payStatus}
                        loading={paying}
                      />
                    )}
                  </div>
                </>
              )
            )
          ) : (
            /* 非微信内部打开提示 || 获取订单数据失败 */
            <ErrorEntry errMsg={initFailedMsg} />
          )
        }
      </div>
    </div>
  );
}

export default App;
