import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Trophy, Target, Zap, Brain, Award, TrendingUp } from "lucide-react";

const defaultSkills = [
  { name: "Forehand Clear", category: "technique", icon: Target },
  { name: "Backhand Drop", category: "technique", icon: Target },
  { name: "Lightning Footwork", category: "physical", icon: Zap },
  { name: "Strategic Mind", category: "mental", icon: Brain },
  { name: "Precision Serve", category: "technique", icon: Target },
  { name: "Power Smash", category: "physical", icon: Zap },
];

// Mock data for past assessments
const mockAssessments = [
  {
    id: 1,
    date: "2024-01-15",
    overallScore: 7.2,
    achievements: ["Precision Master", "Speed Demon"],
    skills: [
      { name: "Forehand Clear", level: 8, improvement: "+2" },
      { name: "Backhand Drop", level: 7, improvement: "+1" },
      { name: "Lightning Footwork", level: 9, improvement: "+3" },
      { name: "Strategic Mind", level: 6, improvement: "+1" },
      { name: "Precision Serve", level: 8, improvement: "+2" },
      { name: "Power Smash", level: 7, improvement: "+1" }
    ]
  },
  {
    id: 2,
    date: "2024-01-08",
    overallScore: 6.8,
    achievements: ["Technique Trainee"],
    skills: [
      { name: "Forehand Clear", level: 6, improvement: "+1" },
      { name: "Backhand Drop", level: 6, improvement: "+0" },
      { name: "Lightning Footwork", level: 6, improvement: "+2" },
      { name: "Strategic Mind", level: 5, improvement: "+0" },
      { name: "Precision Serve", level: 6, improvement: "+1" },
      { name: "Power Smash", level: 6, improvement: "+0" }
    ]
  },
  {
    id: 3,
    date: "2024-01-01",
    overallScore: 6.2,
    achievements: ["Beginner Badge"],
    skills: [
      { name: "Forehand Clear", level: 5, improvement: "+0" },
      { name: "Backhand Drop", level: 6, improvement: "+0" },
      { name: "Lightning Footwork", level: 4, improvement: "+0" },
      { name: "Strategic Mind", level: 5, improvement: "+0" },
      { name: "Precision Serve", level: 5, improvement: "+0" },
      { name: "Power Smash", level: 6, improvement: "+0" }
    ]
  }
];

export default function Assessment() {
  const [form, setForm] = useState(defaultSkills.map(skill => ({ ...skill, level: 0 })));
  const [submitted, setSubmitted] = useState(false);
  const [assessments, setAssessments] = useState(mockAssessments);
  const navigate = useNavigate();

  const handleChange = (idx, value) => {
    setForm(f => f.map((s, i) => i === idx ? { ...s, level: Number(value) } : s));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Calculate overall score
    const overallScore = (form.reduce((sum, skill) => sum + skill.level, 0) / form.length).toFixed(1);
    
    // Create new assessment
    const newAssessment = {
      id: assessments.length + 1,
      date: new Date().toISOString().split('T')[0],
      overallScore: parseFloat(overallScore),
      achievements: overallScore >= 7 ? ["Skill Master"] : overallScore >= 6 ? ["Technique Trainee"] : ["Beginner Badge"],
      skills: form.map(skill => ({
        name: skill.name,
        level: skill.level,
        improvement: "+0"
      }))
    };
    
    setAssessments([newAssessment, ...assessments]);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setForm(defaultSkills.map(skill => ({ ...skill, level: 0 })));
    }, 3000);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-4 flex justify-start">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="w-8 h-8 text-primary" />
        Unlock New Achievement
      </h1>
      <p className="text-muted-foreground mb-6">Rate your current skill level for each area (0-10) to unlock achievements:</p>
      {submitted ? (
        <div className="bg-success/10 border border-success/30 rounded p-6 text-success text-lg font-semibold mb-6">
          Assessment submitted! Thank you.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            {form.map((skill, idx) => {
              const IconComponent = skill.icon;
              return (
                <div key={skill.name} className="bg-card border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{skill.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={skill.level}
                      onChange={e => handleChange(idx, e.target.value)}
                      className="flex-1 accent-primary"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{skill.level}</span>
                      <span className="text-sm text-muted-foreground">/ 10</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button type="submit" className="w-full" size="lg">
            <Star className="w-5 h-5 mr-2" />
            Submit Assessment & Unlock Achievements
          </Button>
        </form>
      )}
      {/* Past Assessments */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          Assessment History & Achievements
        </h2>
        {assessments.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">No assessments yet.</div>
        ) : (
          <div className="grid gap-6">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="bg-card border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{assessment.date}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-2xl font-bold text-primary">{assessment.overallScore}</span>
                      <span className="text-sm text-muted-foreground">Overall Score</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {assessment.achievements.map((achievement, idx) => (
                      <div key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        <Star className="w-3 h-3 inline mr-1" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {assessment.skills.map((skill) => (
                    <div key={skill.name} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-green-600">{skill.improvement}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(skill.level / 10) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span className="font-medium">{skill.level}</span>
                        <span>10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


