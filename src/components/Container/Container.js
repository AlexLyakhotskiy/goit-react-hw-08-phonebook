import React from 'react';

import styles from './Container.module.css';

const Container = ({ children, className = null }) => (
  <div className={[styles.Container, className].join(' ')}>{children}</div>
);

export default Container;
