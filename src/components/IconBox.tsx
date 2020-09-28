import React from "react";
import { PayResultStatus } from "../types";
import { createTitleByPayStatus } from "../utils/statusTitle";
import { IPaymentOrder } from "../types/data";
import { createVehicleFee } from "../utils/createVehicleInfo";

const IconBox: React.FC<{ status: PayResultStatus; order: IPaymentOrder }> = (
  props
) => {
  const { status, order } = props;
  const title = createTitleByPayStatus(status);
  return (
    <div className="icon-box">
      <ResultIcon status={status} />
      <div className="icon-box__ctn">
        <h3 className="icon-box__title">{title}</h3>
        <p className="icon-box__desc">{createVehicleFee(order)}</p>
      </div>
    </div>
  );
};

const ResultIcon: React.FC<{ status: PayResultStatus }> = (props) => {
  const { status } = props;
  switch (status) {
    case PayResultStatus.SUCCESS:
      return <i className="weui-icon-success weui-icon_msg"></i>;
    case PayResultStatus.FAIL:
      return <i className="weui-icon-warn weui-icon_msg"></i>;
    default:
      return <i className="weui-icon-waiting weui-icon_msg"></i>;
  }
};
export default IconBox;
