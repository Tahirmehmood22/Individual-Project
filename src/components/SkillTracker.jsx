import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap, Award, Brain, Flame, Bolt } from "lucide-react";

export const SkillTracker = ({ skills }) => {
  const navigate = useNavigate();
  const getSkillIcon = (category) => {
    switch (category) {
      case "technique": return <Target className="w-4 h-4" />;
      case "physical": return <Bolt className="w-4 h-4" />;
      case "mental": return <Brain className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getSkillColor = (category) => {
    switch (category) {
      case "technique": return "text-primary";
      case "physical": return "text-secondary";
      case "mental": return "text-accent";
      default: return "text-primary";
    }
  };

  const getSkillGradient = (category) => {
    switch (category) {
      case "technique": return "from-primary/20 to-primary-light/20";
      case "physical": return "from-secondary/20 to-secondary-light/20";
      case "mental": return "from-accent/20 to-accent-glow/20";
      default: return "from-primary/20 to-primary-light/20";
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case "technique": return "default";
      case "physical": return "secondary";
      case "mental": return "outline";
      default: return "default";
    }
  };

  return (
    <Card className="hover:shadow-2xl transition-all duration-500 performance-pulse border-0 bg-gradient-to-br from-card to-success/5">
      <CardHeader className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-primary/10 rounded-t-lg"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-success to-primary-light flex items-center justify-center">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                Skill Development
              </CardTitle>
              <CardDescription>Track your badminton skills progress</CardDescription>
            </div>
            <Button
              variant="skill"
              size="sm"
              className="neon-glow"
              onClick={() => navigate("/skills/details", { state: { skills } })}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        {skills.map((skill, index) => {
          const progressPercentage = (skill.level / skill.maxLevel) * 100;
          
          return (
            <div 
              key={index} 
              className={`space-y-3 p-4 rounded-xl bg-gradient-to-r ${getSkillGradient(skill.category)} hover:scale-105 transition-all duration-300 skill-bounce border border-white/10`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                    skill.category === 'technique' ? 'from-primary to-primary-light' :
                    skill.category === 'physical' ? 'from-secondary to-secondary-light' :
                    'from-accent to-accent-glow'
                  } flex items-center justify-center shadow-md`}>
                    <span className="text-white">
                      {getSkillIcon(skill.category)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{skill.name}</h4>
                    <p className="text-xs text-muted-foreground capitalize">{skill.category} skill</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getCategoryBadge(skill.category)} className="text-xs">
                    {skill.category}
                  </Badge>
                  {skill.improvement > 0 && (
                    <Badge className="text-xs bg-gradient-to-r from-success/20 to-success-glow/20 text-success border-success/30 achievement-glow">
                      +{skill.improvement}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">
                    {skill.level}/{skill.maxLevel}
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={progressPercentage} 
                    className="h-3 bg-muted/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full shimmer"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {progressPercentage.toFixed(1)}% Complete
                  </span>
                  <div className="flex space-x-1">
                    {[...Array(skill.level)].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-secondary pulse-ring" style={{animationDelay: `${i * 0.1}s`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 space-y-3">
          <Button variant="performance" className="w-full group neon-glow" onClick={() => navigate('/assessment')}>
            <Award className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Take Skill Assessment
          </Button>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary-light/10">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary-light mx-auto mb-1"></div>
              <p className="text-xs text-muted-foreground">Technique</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-gradient-to-r from-secondary/10 to-secondary-light/10">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-secondary-light mx-auto mb-1"></div>
              <p className="text-xs text-muted-foreground">Physical</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-gradient-to-r from-accent/10 to-accent-glow/10">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-accent-glow mx-auto mb-1"></div>
              <p className="text-xs text-muted-foreground">Mental</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};