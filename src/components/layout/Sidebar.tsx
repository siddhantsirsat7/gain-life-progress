
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Activity, Weight, Award, Settings } from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Workouts", icon: Activity, path: "/workouts" },
    { name: "Measurements", icon: Weight, path: "/measurements" },
    { name: "Goals", icon: Award, path: "/goals" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="flex items-center px-4 py-2">
        <span className="text-lg font-bold text-primary">FitTrack</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        isActive ? "text-primary font-medium" : "text-foreground"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-muted-foreground">
        FitTrack v1.0
      </SidebarFooter>
    </SidebarComponent>
  );
};
