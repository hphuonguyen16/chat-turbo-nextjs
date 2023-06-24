import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Badge,
  Chip,
  Stack,
} from "@mui/material";
import {theme} from "../../theme"

const GroupCard = () => {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        width: "100%",
        borderRadius: "10px",
        "&:hover": {
          background: theme.palette.background.paper,
          transition: "0.3s ease-in-out",
        },
        "&:active": {
          background: theme.palette.background.paper,
        },
      }}
    >
      <ListItemAvatar>
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
      </ListItemAvatar>
      <ListItem alignItems="flex-start">
        <ListItemText
          sx={{ width: "70%" }}
          primary={<Typography variant="h6">Suneo Marinir</Typography>}
          secondary={
            <React.Fragment>
              <Typography noWrap sx={{ marginTop: "10px", opacity: "0.5" }}>
                I'll be in your neighborhood doing errands this Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
              </Typography>
            </React.Fragment>
          }
        />
        <ListItem
          sx={{
            paddingTop: "10px",
            marginLeft: "auto",
            justifyContent: "flex-end",
            width: "30%",
            marginRight: "15px",
          }}
        >
          <Stack
            direction="column"
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px", opacity: "0.7" }}>
              11:11 AM
            </Typography>
            <div
              style={{
                width: "25px",
                height: "25px",
                display: "flex",
                background: "#2065D1",
                borderRadius: "50%",
                color: "#fff",
                fontSize: "12px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              2
            </div>
          </Stack>
        </ListItem>
      </ListItem>
    </ListItem>
  );
};

export default GroupCard;
