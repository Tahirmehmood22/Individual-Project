import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Example metrics for physical strength assessment
const metricsList = [
  { name: "Strength", category: "strength", maxValue: 100 },
  { name: "Agility", category: "agility", maxValue: 100 },
  { name: "Endurance", category: "endurance", maxValue: 100 },
  { name: "Flexibility", category: "flexibility", maxValue: 100 },
];

export default function NewAssessment() {
  const [form, setForm] = useState(metricsList.map(m => ({ ...m, value: 0 })));
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (idx, value) => {
    setForm(f => f.map((m, i) => i === idx ? { ...m, value: Number(value) } : m));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // POST to backend
    await fetch("http://localhost:4000/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date().toISOString(),
        results: form.map(({ name, value }) => ({ name, level: value })),
        type: "physical"
      })
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-4 flex justify-start">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">New Physical Strength Assessment</h1>
      {submitted ? (
        <div className="bg-success/10 border border-success/30 rounded p-6 text-success text-lg font-semibold">
          Assessment submitted!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {form.map((metric, idx) => (
            <div key={metric.name} className="flex items-center gap-4">
              <label className="w-32 font-medium">{metric.name}</label>
              <input
                type="number"
                min="0"
                max={metric.maxValue}
                value={metric.value}
                onChange={e => handleChange(idx, e.target.value)}
                className="border rounded px-2 py-1 w-24"
              />
              <span className="text-muted-foreground">/ {metric.maxValue}</span>
            </div>
          ))}
          <Button type="submit" className="w-full">Submit Assessment</Button>
        </form>
      )}
    </div>
  );
}
