import React from 'react'
import { Box, Stack, Avatar, Typography, Divider, ListItem } from '@mui/material'

const GroupInfo = () => {
    return (
      <>
     <Box sx={{ padding: "40px 15px" }}>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "60px",
                height: "60px",
              }}
              alt="Remy Sharp"
              src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            />
            <Typography variant="h6">Huy Bui</Typography>
            <Typography sx={{ opacity: "0.5", fontSize: "14px" }} variant="h6">
              @account
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box>
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Reminders</Typography>
            <Typography sx={{ opacity: "0.5", fontSize: "14px" }}>
              See all
            </Typography>
          </ListItem>
        </Box>
        <Box>
          <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Shared Media</Typography>
            <Typography sx={{ opacity: "0.5", fontSize: "14px" }}>
              See all
            </Typography>
          </ListItem>
        </Box>
        </>
  )
}

export default GroupInfo