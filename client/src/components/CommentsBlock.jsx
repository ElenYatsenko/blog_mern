import React from "react";
import { getPostComments } from "../redux/slices/comments";
import { useDispatch, useSelector } from "react-redux";
import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { Index } from "./AddComment/index";
import { useParams } from "react-router-dom";

export const CommentsBlock = ({ isLoading = true }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getPostComments(id));
  }, []);

  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading ? [...Array(5)] : comments).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar
                    alt={obj.author.fullName}
                    src={obj.author.avatarUrl}
                  />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.author.fullName}
                  secondary={obj.comment}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Index />
    </SideBlock>
  );
};
