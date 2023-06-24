"use client";
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
  Badge
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import GroupCard from "./GroupCard";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";

const Group = () => {
  return (
    <Box sx={{ padding:"20px 15px" }}>
      <Box sx={{ paddingBottom: "15px" }}>
        <ListItem>
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
          <ListItemText
            sx={{ marginLeft: "15px" }}
            primary={<Typography variant="h4">Rohmad Khoir</Typography>}
            secondary={
              <Typography sx={{ opacity: "0.5", fontSize: "14px" }}>
                My account
              </Typography>
            }
          />
        </ListItem>
      </Box>
      <Divider />
      <Box sx={{ paddingTop: "33px" }}>
        <Typography variant="h4"> Online now</Typography>
        <ListItem
          sx={{
            gap: "15px",
            maxWidth: "100%",
            overflowX: "auto",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Badge
            color="success"
            overlap="circular"
            badgeContent=" "
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 56, height: 56, marginTop: "7px" }}
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            />
          </Badge>
          <Badge
            color="success"
            overlap="circular"
            badgeContent=" "
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 56, height: 56, marginTop: "7px" }}
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            />
          </Badge>
          <Badge
            color="success"
            overlap="circular"
            badgeContent=" "
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 56, height: 56, marginTop: "7px" }}
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            />
          </Badge>
          <Badge
            color="success"
            overlap="circular"
            badgeContent=" "
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 56, height: 56, marginTop: "7px" }}
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            />
          </Badge>
          <Badge
            color="success"
            overlap="circular"
            badgeContent=" "
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 56, height: 56, marginTop: "7px" }}
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            />
          </Badge>
        </ListItem>
      </Box>
      <Box>
        <Box
          sx={{
            paddingTop: "30px",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4"> Messages</Typography>
          <AddToPhotosOutlinedIcon
            fontSize="medium"
            sx={{ opacity: "0.5", marginRight: "15px" }}
          />
        </Box>
        <Box>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search"
              sx={{
                marginLeft: "15px",
                "& fieldset": { border: "none" },
                "& .MuiInputBase-root": {
                  height: "50px",
                },
                background: "white",
                borderRadius: "10px",
              }}
              //   onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Box sx={{ width: "100%" }}>
            <List sx={{ width: "100%" }}>
              <GroupCard />
              <GroupCard />
              <GroupCard />
              <GroupCard />
              <GroupCard />
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Group;
