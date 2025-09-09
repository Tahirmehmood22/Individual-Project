
import { mockAchievements } from "@/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Trophy, Medal, Award, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = {
  champion: <Trophy className="text-yellow-700 dark:text-yellow-400" size={32} />,
  award: <Award className="text-purple-800 dark:text-purple-400" size={32} />,
  milestone: <Medal className="text-blue-800 dark:text-blue-400" size={32} />,
};

const badgeMap = {
  champion: <Badge className="bg-yellow-700 text-white dark:bg-yellow-400 dark:text-black">Champion</Badge>,
  award: <Badge className="bg-purple-800 text-white dark:bg-purple-400 dark:text-black">Award</Badge>,
  milestone: <Badge className="bg-blue-800 text-white dark:bg-blue-400 dark:text-black">Milestone</Badge>,
};

export default function Achievements() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const filteredAchievements = mockAchievements.filter((ach) => {
    const matchesType = filter ? ach.type === filter : true;
    const matchesSearch = ach.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="container mx-auto px-2 py-8">
      <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="border rounded px-3 py-2 w-full md:w-48"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="champion">Champion</option>
          <option value="award">Award</option>
          <option value="milestone">Milestone</option>
        </select>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full md:w-64"
          placeholder="Search achievements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredAchievements.map((ach, idx) => (
            <motion.div
              key={idx}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.95 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
              className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-5 flex flex-col items-center group hover:ring-2 hover:ring-primary"
            >
              <div className="absolute top-3 right-3 z-10">
                {badgeMap[ach.type]}
              </div>
              <div className="mb-3">{iconMap[ach.type] || <Star size={32} />}</div>
              <div className="font-semibold text-lg text-center mb-1 text-black dark:text-white">{ach.name}</div>
              <div className="text-sm text-center mb-2 text-gray-800 dark:text-gray-200">{ach.description}</div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none">
                Type: {ach.type.charAt(0).toUpperCase() + ach.type.slice(1)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {filteredAchievements.length === 0 && (
        <div className="text-center text-muted-foreground py-8">No achievements found.</div>
      )}
    </div>
  );
}


