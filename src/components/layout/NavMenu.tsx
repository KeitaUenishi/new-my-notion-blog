import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { List, ListItem, ListItemButton } from "@mui/material";

import { HeaderMenu } from "@/components/commons";

import styles from "@/styles/components/layout/navbar.module.css";

interface NavItem {
  label: string;
  path: string;
}

export const NavMenu = () => {
  const [state, setState] = useState(false);
  const { asPath } = useRouter();

  const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Posts", path: "/posts" },
    { label: "SandBox", path: "/sandbox" },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <div>
      <HeaderMenu size={36} onClick={toggleDrawer(!state)} onMouseEnter={toggleDrawer(!state)} />
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#111827",
          },
        }}
        anchor="top"
        open={state}
        onClose={toggleDrawer(!state)}
      >
        <Box className={styles.container}>
          <Box className={styles.content} onMouseLeave={toggleDrawer(!state)}>
            <List>
              {navItems.map(({ label, path }) => (
                <ListItem key={label}>
                  <ListItemButton>
                    <Link href={path} passHref>
                      <a className={asPath === path ? "active" : null}>{label}</a>
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};
