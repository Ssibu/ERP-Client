

import { Link, useLocation } from "react-router-dom";
import { navItems } from "@/config/nav-config";
import useAuth from "@/hooks/useAuth";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UserNav } from "./TopNavUserMenu";

export function AppSidebar() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const hasPermission = (permission) => {
    if (!permission) return true;
    if (user.is_master) return true;
    return user.permissions?.includes(permission);
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  const isSubmenuActive = (subItems) =>
    subItems.some(
      (item) => pathname === item.href || pathname.startsWith(item.href + "/")
    );

  const isItemActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  const renderNavItem = (item) => {
    if (item.isSubmenu) {
      const visibleSubItems = item.subItems.filter((subItem) =>
        hasPermission(subItem.permission)
      );

      if (visibleSubItems.length === 0) return null;

      const isOpen = openSubmenu === item.label;
      const isActive = isSubmenuActive(visibleSubItems);

      return (
        <Collapsible
          key={item.label}
          open={isOpen}
          onOpenChange={() => toggleSubmenu(item.label)}
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className="w-full justify-between h-10 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer"
                isActive={isActive}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="pl-2 mt-1 space-y-1">
                {visibleSubItems.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.href}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isItemActive(subItem.href)}
                      className="h-10"
                    >
                      <Link
                        to={subItem.href}
                        className={`flex items-center py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          isItemActive(subItem.href)
                            ? "bg-cyan-100 text-cyan-700"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.label}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    if (!hasPermission(item.permission)) return null;

    return (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton
          asChild
          isActive={isItemActive(item.href)}
          className="h-10"
        >
          <Link
            to={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              isItemActive(item.href)
                ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md"
                : "hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="bg-white border-r border-gray-200 shadow-lg rounded-r-xl">
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserNav />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems
                .filter((item) => {
                  if (item.isSubmenu) {
                    return item.subItems.some((subItem) =>
                      hasPermission(subItem.permission)
                    );
                  }
                  return hasPermission(item.permission);
                })
                .map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
