import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Bolt, Brain, Star, Info } from "lucide-react";

// Mock skill history for demonstration
const skillHistory = {
  "Forehand Clear": [5, 6, 7],
  "Backhand Drop": [3, 4, 5],
};

const getSkillIcon = (category) => {
  switch (category) {
    case "technique": return <Target className="w-5 h-5 text-primary" />;
    case "physical": return <Bolt className="w-5 h-5 text-secondary" />;
    case "mental": return <Brain className="w-5 h-5 text-accent" />;
    default: return <Target className="w-5 h-5 text-primary" />;
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case "technique": return "bg-primary/10 text-primary";
    case "physical": return "bg-secondary/10 text-secondary";
    case "mental": return "bg-accent/10 text-accent";
    default: return "bg-primary/10 text-primary";
  }
};

const SkillEditForm = ({ skill, onSave, onCancel }) => {
  const [level, setLevel] = useState(skill.level);
  const [improvement, setImprovement] = useState(skill.improvement);
  return (
    <form className="flex flex-col gap-2 mt-2" onSubmit={e => { e.preventDefault(); onSave({ ...skill, level, improvement }); }}>
      <label className="text-xs">Level
        <input type="number" min={0} max={skill.maxLevel} value={level} onChange={e => setLevel(Number(e.target.value))} className="ml-2 border rounded px-2 py-1 w-16" />
      </label>
      <label className="text-xs">Improvement
        <input type="number" min={0} value={improvement} onChange={e => setImprovement(Number(e.target.value))} className="ml-2 border rounded px-2 py-1 w-16" />
      </label>
      <div className="flex gap-2 mt-1">
        <Button type="submit" size="sm">Save</Button>
        <Button type="button" size="sm" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

const SkillDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editIdx, setEditIdx] = useState(null);
  const [skills, setSkills] = useState(location.state?.skills || []);
  const [showInfo, setShowInfo] = useState(null);

  const handleEdit = (idx) => setEditIdx(idx);
  const handleSave = async (idx, updatedSkill) => {
    const newSkills = skills.map((s, i) => (i === idx ? updatedSkill : s));
    setSkills(newSkills);
    setEditIdx(null);
    // Persist to backend
    try {
      await fetch("http://localhost:4000/api/player", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: newSkills }),
      });
    } catch (e) {
      // Optionally show error
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="mb-4 flex justify-start">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg> Back
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-success" />
            Skill Development Details
          </CardTitle>
          <CardDescription>Detailed view of your badminton skills progress</CardDescription>
        </CardHeader>
        <CardContent>
          {skills.map((skill, idx) => {
            const percent = (skill.level / skill.maxLevel) * 100;
            const history = skillHistory[skill.name] || [skill.level];
            return (
              <div key={idx} className="mb-8 p-4 rounded bg-muted/10 shadow flex flex-col gap-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    {getSkillIcon(skill.category)}
                    <span className="font-semibold text-lg">{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => setShowInfo(showInfo === idx ? null : idx)}
                      className={`ml-1 rounded-full p-1 transition-colors ${showInfo === idx ? 'bg-primary/10' : ''}`}
                      aria-label="Show info"
                    >
                      <Info className={`w-4 h-4 ${showInfo === idx ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`} />
                    </button>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(skill.category)}`}>{skill.category}</span>
                </div>
                {showInfo === idx && (
                  <div className="text-xs bg-background border p-2 rounded mb-2">
                    <b>About:</b> {skill.name} is a {skill.category} skill. Level shows your current proficiency. Improvement is your recent progress. <Button size="xs" variant="ghost" onClick={() => setShowInfo(null)}>Close</Button>
                  </div>
                )}
                <div className="flex items-center gap-4 text-sm">
                  <span>Level: <b>{skill.level}</b> / {skill.maxLevel}</span>
                  <span className="flex items-center gap-1 text-success"><Star className="w-4 h-4" /> +{skill.improvement}</span>
                  <span>{percent.toFixed(1)}% Complete</span>
                  <Button
                    size="sm"
                    variant="default"
                    className="rounded-full px-4 py-1 font-semibold shadow-md border-2 border-primary/40 bg-gradient-to-r from-primary/80 to-success/70 text-white hover:from-success hover:to-primary transition-all duration-200"
                    onClick={() => handleEdit(idx)}
                  >
                    ✏️ Edit
                  </Button>
                </div>
                {editIdx === idx && (
                  <SkillEditForm skill={skill} onSave={updated => handleSave(idx, updated)} onCancel={() => setEditIdx(null)} />
                )}
                <div className="w-full bg-muted/30 rounded h-3 overflow-hidden relative">
                  <div className="bg-gradient-to-r from-primary to-success h-3 rounded transition-all duration-500" style={{ width: `${percent}%` }}></div>
                </div>
                {/* Skill history chart (simple bar) */}
                <div className="mt-2">
                  <div className="text-xs mb-1 text-muted-foreground">Progress History</div>
                  <div className="flex gap-2 items-end h-10">
                    {history.map((val, i) => (
                      <div key={i} className="w-4 bg-primary/30 rounded" style={{ height: `${(val / skill.maxLevel) * 40 + 10}px` }} title={`Level ${val}`}></div>
                    ))}
                  </div>
                </div>
                {/* Achievements */}
                <div className="mt-2 flex gap-2 flex-wrap">
                  {percent === 100 && <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Maxed Out!</span>}
                  {skill.improvement > 0 && <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">Improved!</span>}
                </div>
              </div>
            );
          })}
          {/* Back button moved to top */}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillDetails;
