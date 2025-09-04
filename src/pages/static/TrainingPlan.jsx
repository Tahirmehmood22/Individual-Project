import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Target, Clock, TrendingUp, CheckCircle, PlayCircle } from "lucide-react";

// Mock data for training plans
const mockTrainingPlans = [
  {
    id: 1,
    title: "Advanced Technique Mastery",
    description: "Focus on perfecting advanced badminton techniques including drop shots, smashes, and defensive plays",
    duration: "8 weeks",
    difficulty: "Advanced",
    focus: ["Forehand Techniques", "Backhand Mastery", "Footwork"],
    progress: 75,
    status: "In Progress",
    startDate: "2024-01-15",
    sessions: [
      { day: "Monday", focus: "Forehand Clear & Drop", duration: "90 min" },
      { day: "Wednesday", focus: "Backhand Techniques", duration: "75 min" },
      { day: "Friday", focus: "Footwork & Agility", duration: "60 min" },
      { day: "Saturday", focus: "Match Practice", duration: "120 min" }
    ]
  },
  {
    id: 2,
    title: "Beginner Foundation",
    description: "Build solid fundamentals for new players with basic strokes and court movement",
    duration: "6 weeks",
    difficulty: "Beginner",
    focus: ["Basic Strokes", "Court Movement", "Serving"],
    progress: 100,
    status: "Completed",
    startDate: "2023-12-01",
    sessions: [
      { day: "Tuesday", focus: "Basic Forehand", duration: "60 min" },
      { day: "Thursday", focus: "Basic Backhand", duration: "60 min" },
      { day: "Sunday", focus: "Serving Practice", duration: "45 min" }
    ]
  },
  {
    id: 3,
    title: "Competition Preparation",
    description: "Intensive training program designed to prepare for upcoming tournaments",
    duration: "4 weeks",
    difficulty: "Advanced",
    focus: ["Match Strategy", "Mental Toughness", "Endurance"],
    progress: 25,
    status: "In Progress",
    startDate: "2024-01-20",
    sessions: [
      { day: "Monday", focus: "Strategy & Tactics", duration: "90 min" },
      { day: "Tuesday", focus: "Endurance Training", duration: "75 min" },
      { day: "Thursday", focus: "Mental Preparation", duration: "60 min" },
      { day: "Saturday", focus: "Competition Simulation", duration: "120 min" }
    ]
  }
];

export default function TrainingPlan() {
  const [plan, setPlan] = useState("");
  const [saved, setSaved] = useState(false);
  const [trainingPlans, setTrainingPlans] = useState(mockTrainingPlans);
  const navigate = useNavigate();

  const handleSave = async e => {
    e.preventDefault();
    // Create new training plan
    const newPlan = {
      id: trainingPlans.length + 1,
      title: "Custom Training Plan",
      description: plan,
      duration: "4 weeks",
      difficulty: "Intermediate",
      focus: ["Custom Focus"],
      progress: 0,
      status: "Not Started",
      startDate: new Date().toISOString().split('T')[0],
      sessions: [
        { day: "Monday", focus: "Custom Session", duration: "60 min" },
        { day: "Wednesday", focus: "Custom Session", duration: "60 min" },
        { day: "Friday", focus: "Custom Session", duration: "60 min" }
      ]
    };
    
    setTrainingPlans([newPlan, ...trainingPlans]);
    setSaved(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSaved(false);
      setPlan("");
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4 flex justify-start">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Target className="w-8 h-8 text-primary" />
        Training Plans
      </h1>
      <p className="text-muted-foreground mb-6">Create and manage your personalized training programs</p>
      
      {saved ? (
        <div className="bg-success/10 border border-success/30 rounded p-6 text-success text-lg font-semibold mb-6">
          Training plan created successfully!
        </div>
      ) : (
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Training Plan</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <textarea
              className="w-full border rounded p-3 min-h-[120px] resize-none"
              placeholder="Describe your training plan goals and focus areas..."
            value={plan}
            onChange={e => setPlan(e.target.value)}
            required
          />
            <Button type="submit" className="w-full">
              <PlayCircle className="w-5 h-5 mr-2" />
              Create Training Plan
            </Button>
        </form>
        </div>
      )}

      {/* Training Plans List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Your Training Plans
        </h2>
        
        {trainingPlans.map((trainingPlan) => (
          <div key={trainingPlan.id} className="bg-card border rounded-lg p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{trainingPlan.title}</h3>
                <p className="text-muted-foreground mb-3">{trainingPlan.description}</p>
                
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{trainingPlan.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-primary" />
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      trainingPlan.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                      trainingPlan.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {trainingPlan.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Started: {trainingPlan.startDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  trainingPlan.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  trainingPlan.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {trainingPlan.status === 'Completed' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                  {trainingPlan.status === 'In Progress' && <PlayCircle className="w-4 h-4 inline mr-1" />}
                  {trainingPlan.status}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="font-medium">{trainingPlan.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${trainingPlan.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Focus Areas */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Focus Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {trainingPlan.focus.map((focus, idx) => (
                  <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                    {focus}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Weekly Sessions */}
            <div>
              <h4 className="font-medium mb-2">Weekly Schedule:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trainingPlan.sessions.map((session, idx) => (
                  <div key={idx} className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{session.day}</span>
                      <span className="text-sm text-muted-foreground">{session.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{session.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
