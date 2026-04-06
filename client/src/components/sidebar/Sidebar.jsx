import {
  Box,
  VStack,
  Button,  
  ButtonGroup,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { ColorModeProvider, ColorModeButton } from "../ColorMode"
import {RiHome2Fill} from "react-icons/ri"
import SidebarContent from "./SidebarContent"

export default function Sidebar() {
  let variantChange = "0.2s linear";
  let sidebarBg = "bg.emphasized"
  let sidebarRadius = "md";
  let sidebarMargins = "0px";
  
  return (
    <Box
      w="180px"
      h="100vh"
      position="sticky"
      top="0"
      bg={sidebarBg}
      transition={variantChange}
      ms="0"
      my="0"
      ps="20px"
      pe="20px"
      m={sidebarMargins}
      borderRadius={sidebarRadius}
      flexShrink={0}
    >
      <VStack>
       <ColorModeButton></ColorModeButton>
       <SidebarContent></SidebarContent>
      </VStack>
    </Box>
  );
}
