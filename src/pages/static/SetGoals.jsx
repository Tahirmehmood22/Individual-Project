import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Calendar, CheckCircle, Clock, TrendingUp, Star } from "lucide-react";

// Mock data for goals
const mockGoals = [
  {
    id: 1,
    title: "Master Advanced Forehand Techniques",
    description: "Perfect forehand clear, drop shots, and smashes with 90% accuracy",
    target: "90% accuracy",
    deadline: "2024-03-15",
    progress: 75,
    status: "In Progress",
    category: "Technique",
    priority: "High",
    milestones: [
      { text: "Achieve 70% accuracy", completed: true },
      { text: "Master drop shot variations", completed: true },
      { text: "Perfect smash technique", completed: false },
      { text: "Reach 90% overall accuracy", completed: false }
    ]
  },
  {
    id: 2,
    title: "Win Regional Tournament",
    description: "Compete and win first place in the upcoming regional badminton tournament",
    target: "1st Place",
    deadline: "2024-05-20",
    progress: 30,
    status: "In Progress",
    category: "Competition",
    priority: "High",
    milestones: [
      { text: "Qualify for tournament", completed: true },
      { text: "Complete training program", completed: false },
      { text: "Win quarter-finals", completed: false },
      { text: "Win semi-finals", completed: false },
      { text: "Win finals", completed: false }
    ]
  },
  {
    id: 3,
    title: "Improve Footwork Speed",
    description: "Enhance court movement and agility to reach balls faster",
    target: "20% faster",
    deadline: "2024-02-28",
    progress: 100,
    status: "Completed",
    category: "Physical",
    priority: "Medium",
    milestones: [
      { text: "Complete agility training", completed: true },
      { text: "Improve reaction time", completed: true },
      { text: "Master court positioning", completed: true },
      { text: "Achieve 20% speed increase", completed: true }
    ]
  },
  {
    id: 4,
    title: "Learn Advanced Serving Techniques",
    description: "Master different types of serves including flick and drive serves",
    target: "5 serve types",
    deadline: "2024-04-10",
    progress: 60,
    status: "In Progress",
    category: "Technique",
    priority: "Medium",
    milestones: [
      { text: "Master basic serve", completed: true },
      { text: "Learn flick serve", completed: true },
      { text: "Learn drive serve", completed: true },
      { text: "Learn short serve", completed: false },
      { text: "Learn high serve", completed: false }
    ]
  }
];

export default function SetGoals() {
  const [goal, setGoal] = useState("");
  const [saved, setSaved] = useState(false);
  const [goals, setGoals] = useState(mockGoals);
  const navigate = useNavigate();

  const handleSave = async e => {
    e.preventDefault();
    // Create new goal
    const newGoal = {
      id: goals.length + 1,
      title: "Custom Goal",
      description: goal,
      target: "Custom Target",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      progress: 0,
      status: "Not Started",
      category: "Custom",
      priority: "Medium",
      milestones: [
        { text: "Define goal", completed: true },
        { text: "Create action plan", completed: false },
        { text: "Start implementation", completed: false },
        { text: "Achieve goal", completed: false }
      ]
    };
    
    setGoals([newGoal, ...goals]);
    setSaved(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSaved(false);
      setGoal("");
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
        Set Goals
      </h1>
      <p className="text-muted-foreground mb-6">Define and track your badminton goals and milestones</p>
      
      {saved ? (
        <div className="bg-success/10 border border-success/30 rounded p-6 text-success text-lg font-semibold mb-6">
          Goal created successfully!
        </div>
      ) : (
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Goal</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <textarea
              className="w-full border rounded p-3 min-h-[100px] resize-none"
              placeholder="Describe your goal and what you want to achieve..."
            value={goal}
            onChange={e => setGoal(e.target.value)}
            required
          />
            <Button type="submit" className="w-full">
              <Star className="w-5 h-5 mr-2" />
              Create Goal
            </Button>
        </form>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Your Goals
        </h2>
        
        {goals.map((goalItem) => (
          <div key={goalItem.id} className="bg-card border rounded-lg p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{goalItem.title}</h3>
                <p className="text-muted-foreground mb-3">{goalItem.description}</p>
                
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-primary" />
                    <span>Target: {goalItem.target}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Deadline: {goalItem.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      goalItem.category === 'Competition' ? 'bg-purple-100 text-purple-700' :
                      goalItem.category === 'Technique' ? 'bg-blue-100 text-blue-700' :
                      goalItem.category === 'Physical' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {goalItem.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      goalItem.priority === 'High' ? 'bg-red-100 text-red-700' :
                      goalItem.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {goalItem.priority} Priority
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  goalItem.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  goalItem.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {goalItem.status === 'Completed' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                  {goalItem.status === 'In Progress' && <Clock className="w-4 h-4 inline mr-1" />}
                  {goalItem.status}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="font-medium">{goalItem.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${goalItem.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Milestones */}
            <div>
              <h4 className="font-medium mb-3">Milestones:</h4>
              <div className="space-y-2">
                {goalItem.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      milestone.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-muted border-2 border-muted-foreground'
                    }`}>
                      {milestone.completed && <CheckCircle className="w-3 h-3" />}
                    </div>
                    <span className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {milestone.text}
                    </span>
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
