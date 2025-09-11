import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, Target, BarChart, Users, Calendar, Settings, LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", path: "/", icon: <Home size={20}/> },
  { name: "Achievements", path: "/achievements", icon: <Trophy size={20}/> },
  { name: "Goals", path: "/goals", icon: <Target size={20}/> },
  // Skill Development will be handled separately to pass state
  { name: "Training Plans", path: "/training", icon: <Users size={20}/> },
  { name: "Profile", path: "/profile/edit", icon: <User size={20}/> },
  { name: "Settings", path: "/settings", icon: <Settings size={20}/> },
];






export default function Sidebar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  return (
    <aside className="h-screen w-16 bg-zinc-900 text-white flex flex-col items-center rounded-xl shadow-2xl border border-zinc-800">
      <div className="py-6 text-2xl border-b border-zinc-800 flex items-center justify-center w-full">
        <span>🏸</span>
      </div>
      <nav className="flex flex-col items-center gap-2 justify-center">
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ease-in-out hover:bg-primary/80 hover:scale-110 ${location.pathname === item.path ? "bg-primary/90 scale-110" : ""}`}
            title={item.name}
          >
            {item.icon}
          </Link>
        ))}
      </nav>
      <div className="pt-2 border-t border-zinc-800 w-full flex flex-col items-center justify-center">
        {isLoggedIn ? (
          <button onClick={onLogout} className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-200 ease-in-out hover:scale-110">
            <LogOut size={16}/>
          </button>
        ) : (
          <Link to="/login" className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200 ease-in-out hover:scale-110">
            <LogIn size={16}/>
          </Link>
        )}
      </div>
    </aside>
  );
}
