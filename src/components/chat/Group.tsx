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
  Badge,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useMemo } from "react";
import GroupCard from "./GroupCard";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Link from "next/link";
import { timeSince } from "../../utils/changeDate";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import AvatarOnline from "./AvatarOnline";
import RootModal from "../modals/RootModal";
import NewGroup from "./NewGroup";

const Group = () => {
  const [initialGroups, setInitialGroups] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  async function getAllGroups() {
    const groups = await fetch("/api/group", {
      method: "GET",
    });
    const data = await groups.json();
    return data;
  }
  const pusherKey = useMemo(() => {
    return session?.user._doc._id;
  }, [session?.user._doc._id]);

  useEffect(() => {
    if (!pusherKey) return;
    pusherClient.subscribe(pusherKey);
    const updateHandler = (conversation: any) => {
      setInitialGroups((current: any) => {
        const index = current.findIndex(
          (group: any) => group._id === conversation._id
        );
        if (index === -1) {
          return current;
        }
        //remove the group by index
        const newGroups = current.filter(
          (group: any) => group._id !== conversation._id
        );
        return [conversation, ...newGroups];
      });
    };
    pusherClient.bind("group:update", updateHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("group:update", updateHandler);
    };
  }, [pusherKey]);
  useEffect(() => {
    getAllGroups().then((res) => {
      setInitialGroups(res);
    });
  }, []);
  return (
    <Box>
      <Box sx={{ padding: "25px" }}>
        <ListItem>
          <ListItemAvatar>
            <div
              className="progress-bar"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background:
                  "radial-gradient(closest-side, white 88%, white 80%, transparent 100%), conic-gradient(rgb(19, 85, 255) 75%, transparent 0deg)",
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  width: "70px",
                  height: "70px",
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  border: "3px solid white",
                }}
                alt="Remy Sharp"
                src={session?.user?._doc.avatar}
              />
            </div>
          </ListItemAvatar>
          <ListItemText
            sx={{ marginLeft: "15px" }}
            primary={
              <Typography variant="h4">
                {session?.user._doc.name} {session?.user._doc.surname}
              </Typography>
            }
            secondary={
              <Typography sx={{ opacity: "0.5", fontSize: "14px" }}>
                {session?.user._doc.quote}
              </Typography>
            }
          />
        </ListItem>
      </Box>
      <Divider />
      <Box sx={{ paddingTop: "33px", marginLeft: "12px" }}>
        <Typography variant="h4"> Online now</Typography>
        <ListItem
          sx={{
            gap: "15px",
            maxWidth: "100%",
            overflowX: "auto",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
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
            marginLeft: "12px",
          }}
        >
          <Typography variant="h4"> Messages</Typography>
          <Button sx={{ marginRight: "15px" }} onClick={() => setOpen(true)}>
            <AddToPhotosOutlinedIcon
              fontSize="medium"
              sx={{ opacity: "0.5" }}
            />
          </Button>
          
            <NewGroup handleOk={(newGroup : any) => {
              newGroup.current = newGroup;
          }}
            open={open} handleClose={() => setOpen(false)}
          />
        </Box>
        <Box>
          <FormControl sx={{ width: "90%" }}>
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
                marginBottom: "15px",
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
            <List sx={{ width: "92%", margin: "auto" }}>
              {initialGroups.map((group: any) => {
                let isGroup = false;
                if (group?.members?.length > 2) {
                  isGroup = true;
                }
                const friend = group?.members.filter(
                  (member: any) => member._id !== session?.user._doc._id
                );
                return (
                  <Link href={`/message/${group._id}`} key={group._id}>
                    <GroupCard
                      key={group.id}
                      url={`/message/${group._id}`}
                      name={isGroup ? group.name : friend[0]?.name + " " + friend[0]?.surname}
                      avatar={isGroup ? group.avatar : friend[0]?.avatar}
                      latestMessage={
                        group.latestMessage?.type === "photo" ?(
                          group.latestMessage?.sender === session?.user._doc._id
                          ? "You have sent a photo"
                          : "Has sent a photo"
                        ) : (
                          group.latestMessage?.sender === session?.user._doc._id
                          ? "You: " + group.latestMessage?.content
                          : group.latestMessage?.content
                        )
                      }
                      seenBy={group.latestMessage?.seenBy}
                      time={timeSince(new Date(group.latestMessage?.createdAt))}
                      sender={group.latestMessage?.sender}
                    />
                  </Link>
                );
              })}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Group;
