"use client"
import React from 'react'
import { theme } from "../../../theme";
import { Grid } from "@mui/material";
import {
  Box,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  List,
  Divider,
  Badge,
  Stack,
  AvatarGroup
} from "@mui/material";
import DuoOutlinedIcon from "@mui/icons-material/DuoOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import MessageCard from '@/components/chat/MessageCard';
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import GroupInfo from '@/components/chat/GroupInfo';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session } = useSession();
  return (
    <Grid
      container
      sx={{
        background: theme.palette.background.paper,
        height: "100vh",
        maxHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <Grid item xs={12} md={9} lg={9} sx={{
        borderRight: "rgba(145, 158, 171, 0.24) solid",
        borderWidth: "1px"
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 20px",
          }}
        >
          <Typography variant="h6">Group #1</Typography>
          <Stack direction="row" sx={{ display: "flex", gap: "15px" }}>
            <DuoOutlinedIcon fontSize="small" sx={{ opacity: "0.6" }} />
            <CallOutlinedIcon fontSize="small" sx={{ opacity: "0.6" }} />
            <ImageOutlinedIcon fontSize="small" sx={{ opacity: "0.6" }} />
            <TextSnippetOutlinedIcon fontSize="small" sx={{ opacity: "0.7" }} />
          </Stack>
          <AvatarGroup max={3}>
            <Avatar
              alt="Remy Sharp"
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/2.png"
            />
            <Avatar
              alt="Travis Howard"
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png"
            />
          </AvatarGroup>
        </Box>
        <Divider />
        <Box>
          <MessageCard
            avatar={""}
            title={"Huy Bui"}
            position={"left"}
            text={"Hiii there"}
            date={new Date()}
            type={"text"}
          />
          <MessageCard
            avatar={""}
            title={"Huy Bui"}
            position={"left"}
            text={"Hiii there"}
            date={new Date()}
            type={"text"}
          />
          <MessageCard
            avatar={""}
            title={""}
            position={"right"}
            text={"Nice to meet you"}
            date={new Date()}
            type={"text"}
          />
        </Box>
        <Box sx={{
          position: "absolute",
          bottom: "0",
          padding: "15px 20px",
          width: "50%",
          left: "30%",
        }}>
          <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar src={session?.user?._doc.avatar} alt="avatar" sx={{width: "30px", height: "30px"}} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Stack direction="row" sx={{ display: "flex", gap: "15px" }}>
                <KeyboardVoiceRoundedIcon fontSize="small" sx={{ opacity: "0.6" }} />
                <AttachFileRoundedIcon fontSize="small" sx={{ opacity: "0.6" }} />
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
      />
        </Box>
      </Grid>
      <Divider />
      <Grid item xs={12} md={3} lg={3}>
       <GroupInfo />
      </Grid>
    </Grid>
  );
}

export default Page