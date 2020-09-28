import myRequest from "../utils/request";
import api from "../config/api";
import { parseSerialNo, parseSearchStr } from "../utils/parseLocation";
import { ICreateOrderRes } from "../types/data";

export function createOrder() {
  let { pathname, search } = window.location;
  let searchObj = parseSearchStr(search);
  let code = searchObj ? searchObj.code : "";
  return myRequest.post<ICreateOrderRes>(api.createOrder, {
    code: code,
    serialno: parseSerialNo(pathname),
  });
}
