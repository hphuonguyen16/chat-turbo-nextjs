import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {ChatBubbleOutlineOutlined} from "@mui/icons-material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { signOut } from "next-auth/react";
import Link from "next/link";

function App() {
  const { collapseSidebar } = useProSidebar();

  return (
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
		<Link href="/dashboard">
          <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
		</Link>
		<Link href="/message">
          <MenuItem icon={<ChatBubbleOutlineOutlined />}>Messages</MenuItem>
		</Link>
		<Link href="/people">
          <MenuItem icon={<PeopleAltOutlinedIcon />}>People</MenuItem>
		</Link>
		<Link href="/reminder">
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Reminders</MenuItem>
		</Link>
		<Link href="/setting">
          <MenuItem icon={<SettingsOutlinedIcon />}>Settings</MenuItem>
		</Link>
		  <MenuItem
            icon={<LogoutOutlinedIcon />}
            onClick={() => {
              signOut().then(() => {
				window.location.href = "/login";
			  }
			  );
            }}
          >
			Sign Out
          </MenuItem>
        </Menu>
      </Sidebar>
  );
}

export default App;