import React from "react";
import PropTypes from 'prop-types';

const Main = ({ children }) => (
    <main className="app-main">
      <div className="app-main-wrapper">
        {children}
      </div>
    </main>
  );


Main.propTypes = {
  children: PropTypes.node.isRequired
}

export default Main;