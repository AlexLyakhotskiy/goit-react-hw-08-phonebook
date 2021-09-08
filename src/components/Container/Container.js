import React from 'react';

import styles from './Container.module.css';

const Container = ({ children, extraClass = null }) => (
  <div className={[styles.Container, extraClass].join(' ')}>{children}</div>
);

export default Container;
