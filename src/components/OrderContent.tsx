import React, { memo } from "react";
import { PayResultStatus } from "../types";
import { createTitleByPayStatus } from "../utils/statusTitle";
import { IPaymentOrder, ICarInfo } from "../types/data";
import {
  createVehicleID,
  createVehicleParkingDuration,
  createVehicleInTime,
} from "../utils/createVehicleInfo";

const OrderContent: React.FC<{
  status: PayResultStatus;
  loading: boolean;
  order: IPaymentOrder;
  car: ICarInfo;
}> = ({ status, loading, order, car }) => {
  const statusText = createTitleByPayStatus(status, loading);
  return !order ? null : (
    <div className="weui-form-preview__bd">
      <div className="weui-form-preview__item">
        <label className="weui-form-preview__label">当前状态</label>
        <span className="weui-form-preview__value">{statusText}</span>
      </div>
      <div className="weui-form-preview__item">
        <label className="weui-form-preview__label">识别码</label>
        <span className="weui-form-preview__value">{createVehicleID(car)}</span>
      </div>
      <div className="weui-form-preview__item">
        <label className="weui-form-preview__label">进站时间</label>
        <span className="weui-form-preview__value">
          {createVehicleInTime(car.createdAt)}
        </span>
      </div>
      <div className="weui-form-preview__item">
        <label className="weui-form-preview__label">停车时长</label>
        <span className="weui-form-preview__value">
          {createVehicleParkingDuration(order)}
        </span>
      </div>
    </div>
  );
};
export default memo(OrderContent);
