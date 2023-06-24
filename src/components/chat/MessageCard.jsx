import React from "react";
import "react-chat-elements/dist/main.css";
import {
  MessageBox,
  ITextMessageProps,
  IMessageBoxProps,
} from "react-chat-elements";
import { Avatar, ListItem, ListItemAvatar, Box } from "@mui/material";


const MessageCard = ({
  avatar,
  title,
  position,
  type,
  text,
  date,
}) => {
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
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
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
        <MessageBox
          position="right"
          type={type}
          text={text}
          date={date}
          replyButton={true}
        />
      )}
    </Box>
  );
};

export default MessageCard;
