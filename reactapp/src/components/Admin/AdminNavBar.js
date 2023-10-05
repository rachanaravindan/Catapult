import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AdminNavbar() {
  const { userId } = useParams();
  // console.log('User ID:', userId);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  //App Drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleListItemClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#0C1618" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div>
            <Hidden smUp>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              VacServ
            </Typography>
          </div>
          <Hidden smDown>
            <div>
              {/* Conditionally render buttons based on drawer state */}
              {!isDrawerOpen && (
                <>
                  <Link
                    to={`/admin/AdminHomePage/${userId}`}
                    className="nav-link"
                  >
                    <Button color="inherit" style={{ color: "white" }}>
                      Home
                    </Button>
                  </Link>

                  <Link
                    to={`/admin/addServiceCenter/${userId}`}
                    className="nav-link"
                  >
                    <Button color="inherit" style={{ color: "white" }}>
                      Add Center
                    </Button>
                  </Link>

                  <Link
                    to={`/admin/CenterProfile/${userId}`}
                    className="nav-link"
                  >
                    <Button color="inherit" style={{ color: "white" }}>
                      Center Profile
                    </Button>
                  </Link>
                  <Link
                    to={`/admin/AdminAppointmentView/${userId}`}
                    className="nav-link"
                  >
                    <Button color="inherit" style={{ color: "white" }}>
                      Appointments
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Hidden>
          <div>
            <Link to="/login" className="nav-link">
              <Button style={{ color: "red" }}>Logout</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        variant="temporary"
      >
        <List>
          <ListItem button onClick={handleListItemClick}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleListItemClick}>
            <ListItemText primary="Add Center" />
          </ListItem>
          <ListItem button onClick={handleListItemClick}>
            <ListItemText primary="Center Profile" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
