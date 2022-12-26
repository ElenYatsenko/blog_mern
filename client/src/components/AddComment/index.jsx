import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { createComment } from "../../redux/slices/comments";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const Index = () => {
  const [comment, setComment] = React.useState("");
  const dispatch = useDispatch();
  const params = useParams();

  const handleSubmit = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Write a comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};
