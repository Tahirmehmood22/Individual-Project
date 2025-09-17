import { generateUserGoals } from "@/utils/userDataUtils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Goals() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Load user data and generate goals
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userSkills = JSON.parse(localStorage.getItem('userSkills') || '[]');
    const userGoals = generateUserGoals(currentUser, userSkills);
    setGoals(userGoals);
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 bg-white dark:bg-zinc-900 rounded">
      <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Goals</h1>
      <ul className="space-y-3">
        {goals.map((g, idx) => (
          <li key={idx} className="p-4 bg-white dark:bg-zinc-800 rounded shadow flex items-center gap-3">
            <span className="inline-block w-8 h-8 bg-blue-800 dark:bg-blue-400 rounded-full flex items-center justify-center text-white dark:text-black font-bold">🎯</span>
            <span className="text-lg font-medium text-foreground">{g.goal}</span>
            <span className="ml-auto px-3 py-1 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black text-xs font-semibold">{g.progress}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


