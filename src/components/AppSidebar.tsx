
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  FolderOpen,
  Users,
  Calculator,
  Settings,
  TrendingUp,
  Phone
} from "lucide-react";
import HeroIcon from "../../public/budgeting.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Resources", url: "/resources", icon: Users },
  { title: "Rate Calculator", url: "/rate-calculator", icon: Calculator },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Contact Us", url: "/contact", icon: Phone },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card/30 backdrop-blur-sm border-r border-border">
        {/* Company Brand */}
        <div className={`p-6 border-b border-border flex items-center ${collapsed ? "p-5 justify-center" : "p-5 gap-3"}`}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <img className="w-6 h-6" src={HeroIcon} alt="Hero" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-foreground">FinanceScope</h2>
              <p className="text-xs text-muted-foreground">Seeing Beyond Numbers</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    end={item.url === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 border-r-2 border-primary"
                          : "hover:text-foreground hover:bg-muted/50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-white" : "text-primary"}`}
                        />
                        {!collapsed && (
                          <span className={`${isActive ? "text-white" : "text-primary"}`}>
                            {item.title}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>

                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Profit Indicator */}
        {!collapsed && (
          <div className="mt-auto p-6">
            <div className="bg-finance-profit/10 border border-finance-profit/20 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-finance-profit" />
                <span className="text-sm font-medium text-finance-profit">+12.5%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Monthly Growth</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
