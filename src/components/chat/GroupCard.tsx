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
import { theme } from "../../theme"
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {useSession} from "next-auth/react";

interface GroupCardProps {
  name: string;
  latestMessage: string;
  avatar: string;
  time: string;
  url: string;
}

const GroupCard = ({ name, latestMessage, avatar, time, url }: GroupCardProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    if (pathname === url) {
      setIsActive(true);
      // dispatch({ type: MENU_OPEN, id: item.id });
    } else {
      setIsActive(false);
    }
    // eslint-disable-next-line
  }, [pathname]);
  
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
      }}
      selected={isActive}
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
            src={avatar}
          />
        </Badge>
      </ListItemAvatar>
      <ListItem alignItems="flex-start">
        <ListItemText
          sx={{ width: "70%" }}
          primary={<Typography variant="h6">{name}</Typography>}
          secondary={
            <React.Fragment>
              <Typography noWrap sx={{ marginTop: "10px", opacity: "0.5"}}>
                {latestMessage}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItem
          sx={{
            paddingTop: "10px",
            marginLeft: "auto",
            paddingLeft: "0px",
            justifyContent: "flex-end",
            width: "30%",
            marginRight: "15px",
          }}
        >
          <Stack
            direction="column"
            gap="3px"
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px", opacity: "0.7" }}>
              {time}
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
