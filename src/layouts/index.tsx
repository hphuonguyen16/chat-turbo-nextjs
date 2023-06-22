'use client'
import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
//
import React, { PropsWithChildren, ReactNode } from "react";
import SideBar from "./Sidebar";
import { Breadcrumbs, Typography, Link, Box } from "@mui/material";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
	display: "flex",
	minHeight: "100%",
	overflow: "hidden",
    maxHeight: "100vh",
});

const Main = styled("div")(({ theme }) => ({
	flexGrow: 1,
	overflow: "auto",
	minHeight: "100%",
	paddingTop: APP_BAR_MOBILE + 24,
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("lg")]: {
		paddingTop: APP_BAR_DESKTOP + 24,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}));

// ----------------------------------------------------------------------

const Layout = ({ children }: PropsWithChildren) => {
	const [open, setOpen] = useState(false);
    
	const router = useRouter();

	return (
    <StyledRoot>
      <SideBar />
      <Main>
        <Box sx={{ ml: "40px", mb: "20px" }}>
          <title>Chat Turbo</title>
          <h4 className="text-2xl mb-3 font-bold mr-5">
            1
          </h4>
        </Box>
        {children}
      </Main>
    </StyledRoot>
  );
};

export default Layout;
