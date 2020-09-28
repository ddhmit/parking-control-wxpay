import { ICarInfo, CarType, IPaymentOrder } from "../types/data";
import moment from "moment";

/**
 * 根据车辆类型，返回显示的识别码
 *
 * @param {ICarInfo} car
 * @returns {string}
 */
export const createVehicleID = function (car: ICarInfo): string {
  /* 汽车显示车牌号，三轮车显示 id */
  if (!car) return "";
  if (car.type === CarType.Motor) {
    return car.license || "该机动车车牌号未设置";
  } else {
    return car._id;
  }
};
/**
 * 创建停车时长文本
 *
 * @param {IPaymentOrder} payment
 * @returns {string}
 */
export const createVehicleParkingDuration = function (
  payment: IPaymentOrder
): string {
  return payment
    ? `${payment.days || 0}天${payment.hours || 0}小时${payment.minutes || 0}分`
    : "";
};

export const createVehicleInTime = (time: string) => {
  return moment(time).format("YYYY年M月DD日 HH:mm");
};

const decimalRex = /\.(\d+)$/;
/**
 * 格式化费用数字，变为小数格式的字符串
 *
 * @param {IPaymentOrder} payment
 * @returns {string}
 */
export const createVehicleFee = function (payment: IPaymentOrder): string {
  let price = payment ? String(payment.price) : "";
  let match = price.match(decimalRex);
  let fee = "";
  switch (match) {
    case null:
      fee = `${price}.00`;
      break;
    default:
      if (match[1].length === 1) {
        fee = `${price}0`;
      } else {
        fee = price;
      }
  }
  return fee;
};
