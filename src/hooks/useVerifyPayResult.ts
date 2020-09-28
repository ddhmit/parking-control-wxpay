import { useEffect } from "react";
import verifySocket from "../services/verifyPayResult";
import { parseSerialNo } from "../utils/parseLocation";
import { IVerifySocketRes } from "../types/data";

export default function useVerifyPayResult(
  cb: (status: IVerifySocketRes) => void,
  startListening: boolean
) {
  useEffect(() => {
    const serialNo = parseSerialNo(window.location.pathname);
    startListening && verifySocket.on(serialNo, cb);
    return () => {
      verifySocket.off(serialNo);
    };
  }, [cb, startListening]);
}
