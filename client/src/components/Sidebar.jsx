import React from "react";
import { useUser, useClerk, useSignIn } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { tools } from "../assets/assets";

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const { signIn } = useSignIn();

  if (!isLoaded) return null;

  

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center
      max-sm:absolute top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      } transition-all duration-300 ease-in-out`}
    >
      {/* User Info */}
      <div className="my-7 w-full">
        <div className="flex flex-col items-center gap-2">
          <img
            src={user?.imageUrl || "/default-avatar.png"}
            alt={user?.fullName}
            className="w-14 h-14 rounded-full"
          />
          <h1 className="mt-1 text-center font-medium">
            {user?.fullName || "Guest"}
          </h1>
        </div>

        {/* Nav Items */}
        <nav className="px-6 mt-5 text-sm text-gray-600 font-medium flex flex-col gap-1">
          {tools.map(({ title, path, icon: Icon, bg }) => (
            <NavLink
              key={path}
              to={user ? path : "#"}
              onClick={() => {
                setSidebar(false);
                if (!user) signIn.openSignIn();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2 rounded transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <div
                className="p-2 rounded-lg"
                style={{
                  background: `linear-gradient(to bottom, ${bg.from}, ${bg.to})`,
                }}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
              {title}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer: Profile & Logout */}
      <div className="w-full border-t border-gray-200 p-4 px-6 flex items-center justify-between">
        <div
          onClick={user ? openUserProfile : () => signIn.openSignIn()}
          className="flex gap-3 items-center cursor-pointer"
        >
          <img
            src={user?.imageUrl || "/default-avatar.png"}
            alt={user?.fullName || "Guest"}
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-sm font-medium">{user?.fullName || "Guest"}</h1>
        </div>
        {user && (
          <LogOut
            onClick={signOut}
            className="w-5 h-5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar; 