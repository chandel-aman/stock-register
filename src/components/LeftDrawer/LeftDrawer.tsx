import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { setActivePage } from "../../redux/pageSlice";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import HomeIcon from "../../assets/icons/Home.icon";
import OrdersIcon from "../../assets/icons/OrdersIcon.icon";
import ProductsIcon from "../../assets/icons/ProductsIcon.icon";
import DeliveryIcon from "../../assets/icons/DeliveryIcon.icon";
import MarketingIcon from "../../assets/icons/MarketingIcon.icon";
import AnalyticsIcon from "../../assets/icons/AnalyticsIcon.icon";
import PaymentsIcon from "../../assets/icons/PaymentsIcon.icon";
import ToolsIcon from "../../assets/icons/ToolsIcon.icon";
import DiscountsIcon from "../../assets/icons/DiscountsIcon.icon";
import AudienceIcon from "../../assets/icons/AudienceIcon.icon";
import AppearanceIcon from "../../assets/icons/AppearanceIcon.icon";
import PluginsIcon from "../../assets/icons/PluginsIcon.icon";

import UserAvatar from "../../assets/images/Image.png";
import CreditIcon from "../../assets/icons/CreditIcon.icon";

export default function LeftDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activePage = useSelector((state: RootState) => state.page.activePage);

  useEffect(() => {
    const path = window.location.pathname;
    const active = path.slice(1).toUpperCase();

    dispatch(setActivePage(active));
  }, [dispatch]);

  const handleListItemClick = (text: string) => {
    dispatch(setActivePage(text));
    navigate(`/${text !== "Home" ? text.toLowerCase() : ""}`);
  };

  const getIconComponent = (text: string) => {
    switch (text) {
      case "Home":
        return <HomeIcon />;
      case "Orders":
        return <OrdersIcon />;
      case "Products":
        return <ProductsIcon />;
      case "Delivery":
        return <DeliveryIcon />;
      case "Marketing":
        return <MarketingIcon />;
      case "Analytics":
        return <AnalyticsIcon />;
      case "Payments":
        return <PaymentsIcon />;
      case "Tools":
        return <ToolsIcon />;
      case "Discounts":
        return <DiscountsIcon />;
      case "Audience":
        return <AudienceIcon />;
      case "Appearance":
        return <AppearanceIcon />;
      case "Plugins":
        return <PluginsIcon />;
      default:
        return null;
    }
  };

  return (
    <Drawer anchor="left" variant="permanent">
      <Box
        sx={{
          width: 250,
          backgroundColor: "#353C53",
          height: "100%",
          color: "#FFF",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Box sx={{ padding: "0 8px" }}>
            <div className="flex gap-2 items-center">
              <Avatar variant="rounded">
                <img src={UserAvatar} alt="user-avatar" />
              </Avatar>
              <div className="w-full">
                <h6 className="font-semibold">Nishyan</h6>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm capitalize underline"
                >
                  Visit Store
                </a>
              </div>

              <KeyboardArrowDownRoundedIcon />
            </div>
          </Box>
          <List>
            {[
              "Home",
              "Orders",
              "Products",
              "Delivery",
              "Marketing",
              "Analytics",
              "Payments",
              "Tools",
              "Discounts",
              "Audience",
              "Appearance",
              "Plugins",
            ].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "12px",
                    borderRadius: "4px",
                    marginBottom: "4px",
                    backgroundColor:
                      activePage?.toLowerCase() === text.toLowerCase() ||
                      (text.toLowerCase() === "home" && activePage === "")
                        ? "#ffffff1a"
                        : "",
                    "&:hover": {
                      backgroundColor: "#ffffff1a",
                    },
                  }}
                  onClick={() => handleListItemClick(text)}
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    {getIconComponent(text)}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <div className="rounded-[4px] bg-[#FFFFFF1A] px-3 py-1.5 flex gap-3 max-h-14 items-center">
          <div className="rounded-[4px] bg-[#FFFFFF1A] p-1.5">
            <CreditIcon />
          </div>
          <div>
            <p>Available credits</p>
            <p className="font-bold">222.10</p>
          </div>
        </div>
      </Box>
    </Drawer>
  );
}
