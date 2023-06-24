import React from 'react'
import MessageCard from './MessageCard'
import { useSession } from 'next-auth/react';
import {
  Box,
  Avatar,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { theme } from "../../theme"
import { useRef } from 'react';


interface GroupBodyProps {
    id: string
}

const GroupBody = ({ id }: GroupBodyProps) => {
    const { data: session } = useSession();
    const [initialMessages, setInitialMessages] = React.useState([])
    const messageRef = useRef("")
    async function getAllMessages() {
        const messages = await fetch(`/api/group/message/${id}`, {
            method: "GET",
        });
        const data = await messages.json();
        return data;
    }
    React.useEffect(() => {
        getAllMessages().then((res) => {
            setInitialMessages(res);
        })
    }, []);
    const sendMessage = async () => {
        await fetch(`/api/message`, {
            method: "POST",
            body: JSON.stringify({
                recipient: null,
                recipientGroup: id,
                content: messageRef.current,
                parentMessage: null,
                hearts: null,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

  return (
    <>
      {initialMessages.map((message: any) => (
        <MessageCard
          avatar={
            message.sender._id === session?.user._doc._id
              ? ""
              : message.sender.avatar
          }
          title={
            message.sender._id === session?.user._doc._id
              ? ""
              : message.sender.name + " " + message.sender.surname
          }
          position={
            message.sender._id === session?.user._doc._id ? "right" : "left"
          }
          text={message.content}
          date={new Date(message.createdAt).toLocaleString()}
          type="text"
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          padding: "15px 20px",
          width: "50%",
          left: "30%",
        }}
      >
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  src={session?.user?._doc.avatar}
                  alt="avatar"
                  sx={{ width: "30px", height: "30px" }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Stack direction="row" sx={{ display: "flex", gap: "15px" }}>
                  <KeyboardVoiceRoundedIcon
                    fontSize="small"
                    sx={{ opacity: "0.6" }}
                  />
                  <AttachFileRoundedIcon
                    fontSize="small"
                    sx={{ opacity: "0.6" }}
                  />
                  <ImageOutlinedIcon fontSize="small" sx={{ opacity: "0.6" }} />
                  <SendRoundedIcon
                    fontSize="small"
                    sx={{ opacity: "0.7" }}
                    color="primary"
                  />
                </Stack>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",
            borderRadius: "20px",
            background: theme.palette.background.neutral,
            marginLeft: "15px",
            "& fieldset": { border: "none" },
            "& .MuiInputBase-root": {
              height: "50px",
            },
          }}
                  placeholder="Type a message"
                  defaultValue={messageRef.current}
                  onKeyDown={
                      (e) => {
                            if (e.key === "Enter") {
                                sendMessage()
                                messageRef.current = ""
                            }
                        }
                  }
                  onChange={(e) => {
                      messageRef.current = e.target.value
                  }
                    }
        />
      </Box>
    </>
  );
}

export default GroupBody