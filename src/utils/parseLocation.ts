export function parseSearchStr(search: string): { [s: string]: any } {
  if (!search) return {};
  return search
    .slice(1)
    .split("&")
    .map((item) => item.split("="))
    .reduce<any>((res, item) => {
      res[item[0]] = item[1];
      return res;
    }, {});
}

const SerialNoReg = /\/(\w*)\/?$/;

export function parseSerialNo(pathname: string): string {
  if (!pathname) return "";
  if (pathname.endsWith("index.html")) {
    pathname = pathname.replace("/index.html", "");
  }
  let match = pathname.match(SerialNoReg);
  if (match) {
    return match[1];
  } else {
    return "";
  }
}
