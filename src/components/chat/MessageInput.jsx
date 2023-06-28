import React from "react";
import { TextField, InputAdornment, Avatar, Stack } from "@mui/material";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useSession } from "next-auth/react";
import { theme } from "../../theme";
import { CldUploadButton } from "next-cloudinary";
import Button from "@mui/material/Button";
import { EmojiEmotionsOutlined } from "@mui/icons-material";
import Popover from "@mui/material/Popover";
import Picker from "emoji-picker-react";
import InputEmoji from "react-input-emoji";
import { useState, useRef, useEffect } from "react";
import { EmojiClickData, Emoji, EmojiStyle } from "emoji-picker-react";

const MessageInput = ({ groupId }) => {
  const { data: session } = useSession();
  const [message, setMessage] = React.useState();
   const [anchorEl, setAnchorEl] = React.useState(
     null
  );
  const emojiRef = useRef();
  const [chosenEmoji, setChosenEmoji] = useState(null);

   const [selectedEmoji, setSelectedEmoji] = useState("");

  function onClick(emojiData, event) {
     console.log(emojiData);
    setSelectedEmoji(emojiData.unified);
    console.log(emojiData.emoji);
    const emoji = String.fromCodePoint(`0x${emojiData.unified}`);
    setMessage((prevMessage) => (prevMessage ? prevMessage + emoji : emoji));
   }


   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
     setAnchorEl(null);
  };
  
  console.log(emojiRef.current);
  console.log(document.querySelector(".emoji-element"));


   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;
  let canPublish = true;
  let throttleTime = 200; //0.2 seconds
  const sendMessage = async () => {
    await fetch(`/api/message`, {
      method: "POST",
      body: JSON.stringify({
        sender: session?.user._doc._id,
        recipient: null,
        recipientGroup: groupId,
        content: message,
        parentMessage: null,
        hearts: null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const emojiElement = document.querySelector(".emoji-element");
      console.log(emojiElement);
  }, [selectedEmoji]);

  const handleUpload = async (result) => {
    await fetch(`/api/message`, {
      method: "POST",
      body: JSON.stringify({
        sender: session?.user._doc._id,
        recipient: null,
        recipientGroup: groupId,
        content: result.info.secure_url,
        parentMessage: null,
        hearts: null,
        type: "photo",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
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
              <Stack direction="row" sx={{ display: "flex" }}>
                <Button sx={{ minWidth: "35px" }}>
                  <KeyboardVoiceRoundedIcon
                    fontSize="small"
                    sx={{ opacity: "0.6" }}
                  />
                </Button>
                <Button sx={{ minWidth: "35px" }}>
                  <AttachFileRoundedIcon
                    fontSize="small"
                    sx={{ opacity: "0.6" }}
                  />
                </Button>

                <Button sx={{ minWidth: "35px" }}>
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                  >
                    <ImageOutlinedIcon
                      fontSize="small"
                      sx={{ opacity: "0.6" }}
                    />
                  </CldUploadButton>
                </Button>
                <Button sx={{ minWidth: "35px" }} onClick={handleClick}>
                  <EmojiEmotionsOutlined
                    fontSize="small"
                    sx={{ opacity: "0.8" }}
                  />
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Picker onEmojiClick={onClick} />
                </Popover>
                <Button sx={{ minWidth: "35px" }}>
                  <SendRoundedIcon
                    fontSize="small"
                    sx={{ opacity: "0.7" }}
                    color="primary"
                  />
                </Button>
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (message.trim() !== "") {
              sendMessage();
            }
            //reset value in input
            setMessage("");
          }
        }}
        onKeyUp={(e) => {
          if (canPublish) {
            fetch(`/api/message/user-typing`, {
              method: "POST",
              body: JSON.stringify({
                group_id: groupId,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            canPublish = false;
            setTimeout(function () {
              canPublish = true;
            }, throttleTime);
          }
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <Emoji
        className="emoji-element"
        ref={emojiRef}
        unified={selectedEmoji}
        emojiStyle={EmojiStyle.APPLE}
        size={22}
      />
      <InputEmoji
        value={message}
        onChange={setMessage}
        cleanOnEnter
        onEnter={sendMessage}
        placeholder="Type a message"
      />
    </>
  );
};

export default MessageInput;
