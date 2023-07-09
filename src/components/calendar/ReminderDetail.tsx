import React from "react";
import {
  AvatarGroup,
  Typography,
  ListItemText,
  Stack,
  Avatar,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Popover,
  ListItem,
  Button,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { ReminderInfoType } from "./Calendar";
interface ReminderDetailProps {
  reminderdetail: ReminderInfoType;
  startTime: string;
  endTime: string;
}


const ReminderDetail = ({reminderdetail, startTime, endTime} : ReminderDetailProps) => {
  return (
    <div style={{ width: "280px" }} >
      <Stack spacing={2}>
        <ListItemText
          sx={{ marginLeft: "15px" }}
          primary={
            <>
              <Typography variant="h4" sx={{ fontSize: "16px" }}>
                {reminderdetail.title}
              </Typography>
            </>
          }
          secondary={
            <>
              <ListItem disablePadding>
                <ListItemIcon>
                  <LocationOnRoundedIcon
                    sx={{ fontSize: "14px", opacity: "0.7" }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ opacity: "0.7", fontSize: "12px" }}>
                    {reminderdetail.location}
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <QueryBuilderOutlinedIcon
                    sx={{ fontSize: "14px", opacity: "0.7" }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ opacity: "0.7", fontSize: "12px" }}>
                    {startTime + " - " + endTime}
                  </Typography>
                </ListItemText>
              </ListItem>
            </>
          }
        />
      </Stack>
      <Stack
        sx={{
          paddingLeft: "15px",
        }}
        spacing={1}
      >
        <Typography sx={{ fontSize: "12px", opacity: "0.8" }}>
          Participants
        </Typography>
        <AvatarGroup
          max={4}
          sx={{
            "& .MuiAvatar-root": {
              width: "20px",
              height: "20px",
              fontSize: "10px",
            },
            display: "flex",
            justifyContent: "left",
          }}
        >
          <Avatar alt="Remy Sharp" src={""} sx={{ width: 20, height: 20 }} />
          <Avatar alt="Remy Sharp" src={""} sx={{ width: 20, height: 20 }} />
        </AvatarGroup>
      </Stack>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DescriptionRoundedIcon sx={{ fontSize: "16px", opacity: "0.7" }} />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ opacity: "0.8", fontSize: "12px" }}>
              {reminderdetail.description}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <Stack sx={{ marginLeft: "15px", paddingRight: "15px", gap: "8px" }}>
        <Typography sx={{ fontSize: "12px", opacity: "0.8" }}>
          Participating?
        </Typography>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            sx={{
              width: "120px",
              fontSize: "12px",
              "& .MuiSvgIcon-root": {
                fontSize: "13px",
              },
            }}
            startIcon={<CheckCircleRoundedIcon sx={{ fontSize: "12px" }} />}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              fontSize: "12px",
              "& .MuiSvgIcon-root": {
                fontSize: "13px",
              },
            }}
            startIcon={<RemoveCircleRoundedIcon sx={{ fontSize: "12px" }} />}
          >
            No
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default ReminderDetail;
