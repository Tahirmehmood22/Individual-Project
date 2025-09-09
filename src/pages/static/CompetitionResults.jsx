import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Trophy, Medal, Award, Star } from "lucide-react";
import { mockAchievements } from "@/mockData";
const mockResults = [
  {
    id: 1,
    date: "2025-08-15",
    event: "Junior League Finals",
    result: "2nd Place",
    category: "U10 Boys",
    score: "21-15, 21-18",
    achievement: mockAchievements[0],
    medalType: "silver"
  },
  {
    id: 2,
    date: "2025-07-20",
    event: "Summer Open",
    result: "Quarterfinals",
    category: "U10 Boys",
    score: "19-21, 21-19, 18-21",
    achievement: mockAchievements[1],
    medalType: "bronze"
  }
];

export default function CompetitionResults() {
  // const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [event, setEvent] = useState("");
  const [result, setResult] = useState("");
  const [saved, setSaved] = useState(false);
  const [results, setResults] = useState(mockResults);
  const navigate = useNavigate();

  // Function to render medal icon based on type
  const renderMedalIcon = (medalType) => {
    const baseClasses = "w-6 h-6";
    
    switch (medalType) {
      case "gold":
        return (
          <div className="relative">
            <Star className={`${baseClasses} text-yellow-700 dark:text-yellow-400 drop-shadow-lg`} />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-700 to-yellow-400 rounded-full blur-sm opacity-30"></div>
          </div>
        );
      case "silver":
        return (
          <div className="relative">
            <Star className={`${baseClasses} text-gray-700 dark:text-gray-300 drop-shadow-lg`} />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-300 rounded-full blur-sm opacity-30"></div>
          </div>
        );
      case "bronze":
        return (
          <div className="relative">
            <Star className={`${baseClasses} text-amber-800 dark:text-amber-400 drop-shadow-lg`} />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-800 to-amber-400 rounded-full blur-sm opacity-30"></div>
          </div>
        );
      default:
        return <Medal className={`${baseClasses} text-primary`} />;
    }
  };

  const handleSave = async e => {
    e.preventDefault();
    // Add new result to the list
    const newResult = {
      id: results.length + 1,
      date,
      event,
      result,
      category: "U10 Boys",
      score: "21-15, 21-18",
      achievement: "New Achievement",
      medalType: "gold" // Default to gold for new achievements
    };
    setResults([newResult, ...results]);
    setSaved(true);
    // Reset form
    setTimeout(() => {
      setSaved(false);
      setDate("");
      setEvent("");
      setResult("");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-4 flex justify-start">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Competition Results</h1>
      {saved ? (
        <div className="bg-success/10 border border-success/30 rounded p-6 text-success text-lg font-semibold">Result saved!</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <input
            type="date"
            className="border rounded px-2 py-1 w-full"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            placeholder="Event name"
            value={event}
            onChange={e => setEvent(e.target.value)}
            required
          />
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            placeholder="Result (e.g. 1st Place)"
            value={result}
            onChange={e => setResult(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Save</Button>
        </form>
      )}
      {/* Show competition results */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Competition Results
        </h2>
        {results.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">No results yet.</div>
        ) : (
          <div className="grid gap-4">
            {results.map((competition) => (
              <div key={competition.id} className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors relative overflow-hidden">
                {/* Medal glow effect */}
                <div className={`absolute top-0 right-0 w-20 h-20 opacity-10 ${
                  competition.medalType === 'gold' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  competition.medalType === 'silver' ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  'bg-gradient-to-br from-amber-500 to-amber-700'
                } rounded-full -translate-y-10 translate-x-10 blur-xl`}></div>
                
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-lg">{competition.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderMedalIcon(competition.medalType)}
                    <span className={`text-sm font-medium ${
                      competition.medalType === 'gold' ? 'text-yellow-600' :
                      competition.medalType === 'silver' ? 'text-gray-600' :
                      'text-amber-600'
                    }`}>
                      {competition.achievement}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-foreground mb-2 text-lg">{competition.event}</h3>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="bg-muted/50 px-2 py-1 rounded">Category: {competition.category}</span>
                  <span className="bg-muted/50 px-2 py-1 rounded">Score: {competition.score}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${
                    competition.medalType === 'gold' ? 'bg-yellow-100' :
                    competition.medalType === 'silver' ? 'bg-gray-100' :
                    'bg-amber-100'
                  }`}>
                    <Award className={`w-5 h-5 ${
                      competition.medalType === 'gold' ? 'text-yellow-600' :
                      competition.medalType === 'silver' ? 'text-gray-600' :
                      'text-amber-600'
                    }`} />
                  </div>
                  <span className={`text-xl font-bold ${
                    competition.medalType === 'gold' ? 'text-yellow-600' :
                    competition.medalType === 'silver' ? 'text-gray-600' :
                    'text-amber-600'
                  }`}>
                    {competition.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
