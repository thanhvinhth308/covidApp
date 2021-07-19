import React from 'react';
import styles from './NotFound.module.css';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>Trang này không hiển thị</h1>
      <p>Có thể liên kết đã hỏng hoặc trang đã bị gỡ</p>
      <p>Hay kiểm tra lại liên kết mà bạn đang mở có chính xác không</p>
      <NavLink to="/">
        <button className={styles.button}>Quay về</button>
      </NavLink>
    </div>
  );
}

export default NotFound;
