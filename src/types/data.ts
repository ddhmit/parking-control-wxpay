import { VerifyStatus } from "../services/verifyPayResult";

export enum CarType {
  Motor = "非三轮车",
  NonMotor = "三轮车",
}

export interface ICarInfo {
  _id: string;
  license?: string;
  type: CarType;
  info: {
    images: {
      portrait: string;
    };
  };
  createdAt: string;
}
export interface IPaymentOrder {
  text: string;
  voice: string;
  price: number;
  status: string;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  firstDateWasLater: boolean;
}

export interface ICreateOrderRes {
  pay: any;
  payInfo: IPaymentOrder;
  car: ICarInfo;
}

export interface IVerifySocketRes {
  status: VerifyStatus;
}
