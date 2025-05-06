import React, { useState } from "react";
import {
  Home,
  Users,
  Calendar,
  BarChart2,
 
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    // { link: "", name: "Dashboard", icon: Home },
    { link: "doctor", name: "Doctor", icon: BarChart2 }, 
    { link: "appointments", name: "Appointments", icon: Calendar },
    { link: "", name: "Patients", icon: Users },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-dark-300 text-gray-300 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo/Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white">MediCare</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-gray-800"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.link}
                  onClick={() => setActiveItem(item.name)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeItem === item.name
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${collapsed ? "mx-auto" : "mr-3"}`}
                  />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            DR
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Dr. John Doe
              </p>
              <p className="text-xs text-gray-400 truncate">Neurologist</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <button className="flex items-center w-full mt-4 p-2 rounded-lg hover:bg-gray-800 text-sm">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
