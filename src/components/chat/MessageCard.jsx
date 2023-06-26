import React from "react";
import "react-chat-elements/dist/main.css";
import {
  MessageBox,
  ITextMessageProps,
  IMessageBoxProps,
} from "react-chat-elements";
import { Avatar, ListItem, ListItemAvatar, Box } from "@mui/material";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useSession } from "next-auth/react";
const MessageCard = ({
  avatar,
  title,
  position,
  type,
  text,
  date,
  seenBy
}) => {
  const { data: session } = useSession();
  // loai bo id cua minh ra khoi seenBy
  if (seenBy?.length > 0) {
    seenBy = seenBy.filter((id) => id !== session.user._doc._id);
  }
  console.log(session.user._doc._id)
  console.log(seenBy);
  return (
    <Box>
      {position === "left" ? (
        <ListItem sx={{ padding: "0 15px" }}>
          <ListItemAvatar>
            <Avatar
              sx={{
                width: "56px",
                height: "56px",
              }}
              alt="Remy Sharp"
              src={avatar}
            />
          </ListItemAvatar>
          <MessageBox
            position={position}
            title={title}
            type={type}
            text={text}
            date={date}
            replyButton={true}
          />
        </ListItem>
      ) : (
        <div style={{position: "relative"}}>
        <MessageBox
          position="right"
          type={type}
          text={text}
          date={date}
          replyButton={true}
          />
          { seenBy?.length ? <CheckCircleRoundedIcon sx={{color:"green",
            position: "absolute",
            fontSize: "15px",
            right: "8px",
            bottom: "12px"}}/> : null}
          </div>
      )}
    </Box>
  );
};

export default MessageCard;
