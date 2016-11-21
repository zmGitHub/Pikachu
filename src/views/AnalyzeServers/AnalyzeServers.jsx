import React, { PropTypes } from 'react';

const AnalyzeServers = props => (
  <div>
    {props.children || '加载中...'}
  </div>
);
AnalyzeServers.propTypes = {
  children: PropTypes.element.isRequired,
};
export default AnalyzeServers;

