import io from "socket.io-client";
import api from "../config/api";

export enum VerifyStatus {
  Paying = "paying",
  Ok = "ok",
}

export const VerifyNS = "/payNotice";

const socket = io(api.BaseUrl + VerifyNS);

export default socket;
