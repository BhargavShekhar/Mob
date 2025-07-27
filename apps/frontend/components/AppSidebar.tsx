import { Calendar, Home, Inbox, Search, Settings, MessageSquareMoreIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

const items = [
  {
    title: "Your Projects1",
    url: "#",
    icon: MessageSquareMoreIcon,
  },
  {
    title: "Your Projects2",
    url: "#",
    icon: MessageSquareMoreIcon,
  },
  {
    title: "Your Projects3",
    url: "#",
    icon: MessageSquareMoreIcon,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-br from-black from-45% to-blue-950 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-2xl mb-4">Mob</SidebarGroupLabel>
          <div className="grid w-full max-w-sm items-center gap-3">
            <h1>Your projects</h1>
            <Input type="text" id="Search" placeholder="Search" />
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}