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
import { useRef, useEffect } from 'react';
import { pusherClient } from '@/libs/pusher';
import { find } from 'lodash'



interface GroupBodyProps {
  id: string
}

const GroupBody = ({ id }: GroupBodyProps) => {
  const { data: session } = useSession();
  const [initialMessages, setInitialMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  async function getAllMessages() {
    const messages = await fetch(`/api/group/message/${id}`, {
      method: "GET",
    });
    const data = await messages.json();
    return data;
  }
  async function seenMessages() {
    const messages = await fetch(`/api/group/${id}/seen`, {
      method: "POST",
    });
    const data = await messages.json();
    return data;
  }
  useEffect(() => {
    seenMessages();
  }, [id])
  useEffect(() => {
    getAllMessages().then((res) => {
      setInitialMessages(res);
    })
  }, []);
  useEffect(() => {
    pusherClient.subscribe(id);
    const messageHandler = (message: any) => {
      setInitialMessages((current: any) => {
        if (find(current, { _id: message._id })) {
          return current;
        }
        return [...current, message];
      });
    }
    pusherClient.bind("messages:new", messageHandler);
    return () => {
      pusherClient.unsubscribe(id);
      pusherClient.unbind("messages:new", messageHandler);
    }
  }, [id])

  const sendMessage = async () => {
    await fetch(`/api/message`, {
      method: "POST",
      body: JSON.stringify({
        sender: session?.user._doc._id,
        recipient: null,
        recipientGroup: id,
        content: message,
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
      <Box
        sx={{
          height: "80vh",
          overflowY: "auto",
          overflowX: "hidden"
        }}
      >
        {initialMessages.map((message: any) => (
          <MessageCard
            key={message._id}
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
            seenBy={message.seenBy}
          />
        ))}
      </Box>
      <Box
        sx={{
          bottom: "0",
          padding: "15px 20px",
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
            "& fieldset": { border: "none" },
            "& .MuiInputBase-root": {
              height: "50px",
            },
          }}
          placeholder="Type a message"
          value={message}
          onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                sendMessage()
                //reset value in input
                setMessage("")

              }
            }
          }
          onChange={(e) => {
            setMessage(e.target.value);
          }
          }
        />
      </Box>
    </>
  );
}

export default GroupBody