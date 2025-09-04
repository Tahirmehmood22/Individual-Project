import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Target, TrendingUp } from "lucide-react";

// Mock data for demonstration
const mockSessions = [
  {
    id: 1,
    date: "2024-01-14",
    notes: "Focused on forehand technique. Improved accuracy by 15%",
    duration: "90 minutes",
    focus: "Forehand accuracy",
    improvement: "+15%"
  },
  {
    id: 2,
    date: "2024-01-12",
    notes: "Backhand drills and footwork practice. Good progress on movement",
    duration: "75 minutes",
    focus: "Backhand & footwork",
    improvement: "+8%"
  },
  {
    id: 3,
    date: "2024-01-10",
    notes: "Serving practice. Working on power and placement",
    duration: "60 minutes",
    focus: "Serving technique",
    improvement: "+12%"
  },
  {
    id: 4,
    date: "2024-01-08",
    notes: "Match simulation with coach. Applied strategy techniques",
    duration: "120 minutes",
    focus: "Game strategy",
    improvement: "+20%"
  }
];

export default function RecordPractice() {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [sessions, setSessions] = useState(mockSessions);
  const navigate = useNavigate();

  const handleSave = async e => {
    e.preventDefault();
    // Add new session to the list
    const newSession = {
      id: sessions.length + 1,
      date,
      notes,
      duration: "60 minutes",
      focus: "General practice",
      improvement: "+5%"
    };
    setSessions([newSession, ...sessions]);
    setSaved(true);
    // Reset form
    setTimeout(() => {
      setSaved(false);
      setDate("");
      setNotes("");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-4 flex justify-start">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Record Practice Session</h1>
      {saved ? (
        <div className="bg-success/10 border border-success/30 rounded p-6 text-success text-lg font-semibold">Practice session saved!</div>
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
            placeholder="Practice notes..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Save</Button>
        </form>
      )}
      {/* Show practice sessions */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Practice Sessions
        </h2>
        {sessions.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">No practice sessions yet.</div>
        ) : (
          <div className="grid gap-4">
            {sessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-lg">{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    {session.improvement}
                  </div>
                </div>
                <p className="text-foreground mb-2">{session.notes}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Duration: {session.duration}</span>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {session.focus}
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
