'use client'
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Stack } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import ContactEmergencyRoundedIcon from '@mui/icons-material/ContactEmergencyRounded';
import useResponsive from "@/hooks/useResponsive";
import useTranslation from "next-translate/useTranslation";
import { usePathname } from 'next/navigation'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import { useSession } from "next-auth/react";
import Profile from "./Profile";
import Followers from "./Followers";
import Friends from "./Friends";
import Gallery from "./Gallery";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export type UserInfoProps = {
  userName: string;
  email: string;
  emailConfirmed: boolean;
  name: string;
  surname: string | null;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  isExternal: boolean;
  hasPassword: boolean;
  extraProperties: {};
};


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "95%", }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UserBanner = () => {
const { data: session } = useSession();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const isMobile = useResponsive("down", "sm");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
    const handleCloseSnack = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "95%",
          margin: "auto",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            bgcolor: "background.paper",
            width: "100%",
            height: 290,
            position: "relative",
            backgroundPosition: "center",
            backgroundImage:
              "linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)), url(https://api-prod-minimal-v5.vercel.app/assets/images/cover/cover_4.jpg)",
          }}
        >
          <Stack
            className={`${
              !isMobile
                ? "absolute left-8 top-[45%]"
                : "w-full items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
            direction={isMobile ? "column" : "row"}
          >
            <Avatar
              sx={{
                width: isMobile ? 70 : 200,
                height: isMobile ? 70 : 200,
                border: "3px solid white",
              }}
              variant="circular"
              alt="Remy Sharp"
              src={session?.user._doc.avatar}
            />

            <ListItemText
              className={`${isMobile ? "m-0 text-center mt-6" : "m-auto ml-8"}`}
              sx={{ marginTop: isMobile ? "0" : "70px"}}
            >
              <Typography
                sx={{
                  fontSize: isMobile ? "20px" : "30px",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {session?.user._doc.name} {session?.user._doc.surname}
              </Typography>
              <Typography
                sx={{
                  fontSize: isMobile ? "14px" : "20px",
                  color: "#FFFFFF",
                  opacity: 0.8,
                }}
              >
                {session?.user._doc.email}
              </Typography>
            </ListItemText>
          </Stack>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              "& .MuiButtonBase-root": {
                marginLeft: isMobile ? "-3px" : "auto",
                marginRight: isMobile ? "-5px" : "auto",
              },
              "& .MuiTabs-scroller": {
                display: "flex",
                justifyContent: "end",
                "& .MuiTabs-indicator": {
                  background: "#212B36",
                },
              },
              "& .MuiTabs-flexContainer": {
                padding: "10px 0",
                "& button": {
                  color: "#212B36 !important",
                },
              },

              margin: "auto",
              width: "100%",
              padding: "1px 10px",
            }}
          >
            <Tab
              label={
                <div>
                  <ContactEmergencyRoundedIcon sx={{ marginRight: "8px" }} />
                  Profile
                </div>
              }
              {...a11yProps(0)}
              sx={{ fontSize: !isMobile ? "16px" : "14px", color: "#212B36" }}
            />
            <Tab
              label={
                <div>
                  <FavoriteRoundedIcon
                    fontSize="medium"
                    sx={{ marginRight: "8px" }}
                  />
                Followers
                </div>
              }
              {...a11yProps(1)}
              sx={{ fontSize: !isMobile ? "16px" : "14px" }}
            />
            <Tab
              label={
                <div>
                  <PeopleAltRoundedIcon
                    fontSize="medium"
                    sx={{ marginRight: "8px" }}
                  />
                  Friends
                </div>
              }
              {...a11yProps(2)}
              sx={{ fontSize: !isMobile ? "16px" : "14px" }}
            />
            <Tab
              label={
                <div>
                  <CollectionsRoundedIcon
                    fontSize="medium"
                    sx={{ marginRight: "8px" }}
                  />
                  Gallery
                </div>
              }
              {...a11yProps(3)}
              sx={{ fontSize: !isMobile ? "16px" : "14px" }}
            />
          </Tabs>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Followers />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Friends />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Gallery />
      </TabPanel>
    </Box>
  );
};

export default UserBanner;
