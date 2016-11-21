import React, { PropTypes } from 'react';

const AnalyzeMembers = props => (
  <section>
    {props.children || '加载中...'}
  </section>
);

AnalyzeMembers.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AnalyzeMembers;
