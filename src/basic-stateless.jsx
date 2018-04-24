import React from 'react';
import PropTypes from 'prop-types';
/**
* basic react functional component
*/
const renameMe = (props) => {
  const { toggle, handleToggle } = props;
  return (
    <div data-testid="root" style={{ backgroundColor: toggle ? 'green' : 'blue' }}>
      <h2>Stateless</h2>
      <label htmlFor="toggled">Current State
      <input id="toggled" name="toggled" type="checkbox" checked={toggle} onChange={handleToggle} />
      </label>
      <button onClick={handleToggle}>Click me!</button>
    </div>
  );
};

renameMe.propTypes = {
  toggle: PropTypes.bool,
  handleToggle: PropTypes.func.isRequired,
};

renameMe.defaultProps = {
  toggle: false,
};

export default renameMe;
