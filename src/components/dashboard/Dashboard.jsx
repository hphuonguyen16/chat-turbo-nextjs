"use client"
import React from 'react'
import { Grid } from "@mui/material";
import TopMessage from '@/components/dashboard/TopMessage';
import Reminder from '@/components/dashboard/Reminder';
import RandomPeople from '@/components/dashboard/RandomPeople';
import FriendRequest from '@/components/dashboard/FriendRequest';
import RequestTo from '@/components/dashboard/RequestTo';
const Dashboard = ({allPeople}) => {
    const [people, setPeople] = React.useState(allPeople)
    React.useEffect(() => {
        setPeople(allPeople)
    }, [allPeople])
    console.log(people)
  return (
    <Grid
        container
        spacing={3}
        sx={{
          width: "auto",
          marginLeft: "auto",
        }}>
        <Grid item xs={12} md={4} lg={4}>
          <TopMessage />
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Reminder />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <RandomPeople />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FriendRequest />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <RequestTo />
        </Grid>
      </Grid>
  )
}

export default Dashboard