import React from "react";
import styles from "./UserInfo.module.scss";
import Moment from "react-moment";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || "/noavatar.png"}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <Moment date={additionalText} format="D MMM YYYY" />
      </div>
    </div>
  );
};
