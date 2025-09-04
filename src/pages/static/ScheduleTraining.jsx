import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Target } from "lucide-react";

// Mock data for demonstration
const mockTrainings = [
  {
    id: 1,
    date: "2024-01-15",
    details: "Forehand technique practice with coach",
    time: "14:00",
    duration: "90 minutes",
    focus: "Forehand accuracy"
  },
  {
    id: 2,
    date: "2024-01-17",
    details: "Backhand and footwork drills",
    time: "16:00",
    duration: "60 minutes",
    focus: "Backhand consistency"
  },
  {
    id: 3,
    date: "2024-01-20",
    details: "Match practice and strategy",
    time: "15:30",
    duration: "120 minutes",
    focus: "Game strategy"
  },
  {
    id: 4,
    date: "2024-01-22",
    details: "Serving practice and return drills",
    time: "14:30",
    duration: "75 minutes",
    focus: "Serve accuracy"
  }
];

export default function ScheduleTraining() {
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [saved, setSaved] = useState(false);
  const [trainings, setTrainings] = useState(mockTrainings);
  const navigate = useNavigate();

  const handleSave = async e => {
    e.preventDefault();
    // Add new training to the list
    const newTraining = {
      id: trainings.length + 1,
      date,
      details,
      time: "14:00",
      duration: "60 minutes",
      focus: "General practice"
    };
    setTrainings([...trainings, newTraining]);
    setSaved(true);
    // Reset form
    setTimeout(() => {
      setSaved(false);
      setDate("");
      setDetails("");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-4 flex justify-start">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Schedule Training</h1>
      {saved ? (
        <div className="bg-success/10 border border-success/30 rounded p-6 text-success text-lg font-semibold">Training scheduled!</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <input
            type="date"
            className="border rounded px-2 py-1 w-full"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <textarea
            className="w-full border rounded p-2 min-h-[80px]"
            placeholder="Training details..."
            value={details}
            onChange={e => setDetails(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Save</Button>
        </form>
      )}
      {/* Show scheduled trainings */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Scheduled Trainings
        </h2>
        {trainings.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">No trainings scheduled yet.</div>
        ) : (
          <div className="grid gap-4">
            {trainings.map((training) => (
              <div key={training.id} className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-lg">{training.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {training.time}
                  </div>
                </div>
                <p className="text-foreground mb-2">{training.details}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Duration: {training.duration}</span>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {training.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
