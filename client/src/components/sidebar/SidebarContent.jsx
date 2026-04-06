import {
  Tabs,
} from "@chakra-ui/react"
import * as React from "react"
import {RiDashboard2Fill, RiTable2} from "react-icons/ri"
import { useNavigate, useLocation } from "react-router-dom"

export default function SidebarContent() {
    const navigate = useNavigate()
    const location = useLocation()
      
    const getActiveValue = () => {
        if (location.pathname === '/tables') return 'tables'
        return 'dashboard'
    }
    
    const handleNavigation = (path) => {
        navigate(path)
    }
  return(
      <Tabs.Root
      variant="subtle"
      defaultValue="Sidebar Item"
      orientation="vertical"
      size="lg"
    >
      <Tabs.List>
        <Tabs.Trigger 
            onClick={() => handleNavigation('/')}
            value="dashboard"
        ><RiDashboard2Fill/>Dashboard</Tabs.Trigger>
        
        <Tabs.Trigger 
            onClick={() => handleNavigation('/tables')}
            value="tables"
        ><RiTable2/>Tables</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )

}