// components/Sidebar.tsx
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HouseDoorFill, PinMapFill } from "react-bootstrap-icons";
import { FaLeaf } from "react-icons/fa";
import sideBarLogo from "/fotos/Jerivaldo.png";
import "../App.css";

export default function MySidebar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      style={{ height: "100vh", position: "fixed", zIndex: 1000 }}
    >
      <Sidebar
        collapsed={collapsed}
        transitionDuration={300}
        style={{
          borderRight: "1px solid #01C061",
          backgroundColor: "#fff",
          height: "100vh",
          color: "#005B60",
        }}
      >
        <div
          className="p-3 fw-bold fs-5 text-center d-flex align-items-center justify-content-center gap-2"
          style={{ borderBottom: collapsed ? "" : "1px solid #01C061" }}
        >
          <img
            src={sideBarLogo}
            alt="Logo"
            style={{
              width: collapsed ? "50px" : "40px",
              height: collapsed ? "50px" : "40px",
              borderRadius: "50%",
            }}
          />
          {!collapsed && <span>Jardim Botânico</span>}
        </div>

        <Menu>
          <MenuItem
            icon={<HouseDoorFill />}
            component={<Link to="/" />}
            className="sidebar-item"
          >
            Início
          </MenuItem>
          <MenuItem
            icon={<FaLeaf />}
            component={<Link to="/listagem" />}
            className="sidebar-item"
          >
            Biodiversidade
          </MenuItem>
          <MenuItem
            icon={<PinMapFill />}
            component={<Link to="/trilha" />}
            className="sidebar-item"
          >
            Trilha
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
