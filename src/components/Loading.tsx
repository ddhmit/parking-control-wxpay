import React from "react";

const Loading: React.FC = (props: any) => {
  return (
    <div className="weui-loadmore">
      <i className="weui-loading"></i>
      <span className="weui-loadmore__tips">正在加载中...</span>
    </div>
  );
};
export default Loading;
