import React, { PropTypes } from 'react';

const UserSearch = props => (
  <section>
    {props.children || '加载中...'}
  </section>
);

UserSearch.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserSearch;
