import { useState, useEffect } from 'react';
import { useSport } from '@/context/SportContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dumbbell, Brain, Target, TrendingUp, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SkillManagement = () => {
  const { getSportConfig, currentSport } = useSport();
  const { toast } = useToast();
  const sportConfig = getSportConfig();
  
  const [skills, setSkills] = useState({});
  const [originalSkills, setOriginalSkills] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Load current user skills
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Initialize skills with user's current skills or 0
    if (sportConfig?.skills) {
      const userSkills = currentUser.skills || {};
      const initialSkills = {};
      
      sportConfig.skills.forEach(skill => {
        initialSkills[skill.name] = userSkills[skill.name] || 0;
      });
      
      setSkills(initialSkills);
      setOriginalSkills({...initialSkills});
    }
  }, [sportConfig]);

  // Check for changes
  useEffect(() => {
    const changed = Object.keys(skills).some(skillName => 
      skills[skillName] !== originalSkills[skillName]
    );
    setHasChanges(changed);
  }, [skills, originalSkills]);

  const handleSkillChange = (skillName, value) => {
    setSkills(prev => ({ ...prev, [skillName]: value[0] }));
  };

  const getSkillsByCategory = (category) => {
    return sportConfig?.skills?.filter(skill => skill.category === category) || [];
  };

  const calculateCategoryAverage = (category) => {
    const categorySkills = getSkillsByCategory(category);
    if (categorySkills.length === 0) return 0;
    
    const total = categorySkills.reduce((sum, skill) => sum + (skills[skill.name] || 0), 0);
    return Math.round(total / categorySkills.length);
  };

  const calculateOverallProgress = () => {
    const allSkills = Object.values(skills);
    if (allSkills.length === 0) return 0;
    
    const total = allSkills.reduce((sum, skill) => sum + skill, 0);
    return Math.round((total / (allSkills.length * 10)) * 100);
  };

  const handleSave = () => {
    try {
      // Get current user data
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      // Update user profile with new skills
      const updatedProfile = {
        ...currentUser,
        skills: skills,
        skillsLastUpdated: new Date().toISOString(),
      };

      // Update localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedProfile));
      
      // Update userData for the specific user
      if (userData[currentUser.username]) {
        userData[currentUser.username] = updatedProfile;
        localStorage.setItem('userData', JSON.stringify(userData));
      }

      // Update original skills to reflect saved state
      setOriginalSkills({...skills});

      toast({
        title: "Skills Updated",
        description: "Your skill levels have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your skills. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setSkills({...originalSkills});
    toast({
      title: "Changes Reset",
      description: "Your skill levels have been reset to the last saved values.",
    });
  };

  const getSkillColorClass = (value) => {
    if (value >= 8) return "text-green-600 dark:text-green-400";
    if (value >= 6) return "text-blue-600 dark:text-blue-400";
    if (value >= 4) return "text-yellow-600 dark:text-yellow-400";
    if (value >= 2) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getSkillLabel = (value) => {
    if (value >= 9) return "Expert";
    if (value >= 7) return "Advanced";
    if (value >= 5) return "Intermediate";
    if (value >= 3) return "Developing";
    if (value >= 1) return "Beginner";
    return "Not Assessed";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl">{sportConfig?.icon}</div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Skill Management</h1>
          <p className="text-muted-foreground">
            Update your {sportConfig?.name} skills and track your progress
          </p>
        </div>      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Skill Level</span>
                <span className="text-sm text-muted-foreground">{calculateOverallProgress()}%</span>
              </div>
              <Progress value={calculateOverallProgress()} className="h-3" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {calculateCategoryAverage('technique')}
                </div>
                <div className="text-sm text-muted-foreground">Technique</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {calculateCategoryAverage('physical')}
                </div>
                <div className="text-sm text-muted-foreground">Physical</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {calculateCategoryAverage('mental')}
                </div>
                <div className="text-sm text-muted-foreground">Mental</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Assessment */}
      <Tabs defaultValue="technique" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="technique" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Technique
          </TabsTrigger>
          <TabsTrigger value="physical" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            Physical
          </TabsTrigger>
          <TabsTrigger value="mental" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Mental
          </TabsTrigger>
        </TabsList>

        {/* Technique Skills */}
        <TabsContent value="technique">
          <Card>
            <CardHeader>
              <CardTitle>Technique Skills</CardTitle>
              <CardDescription>
                Rate your technical abilities and shot execution (0 = Never tried, 10 = Perfect execution)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {getSkillsByCategory('technique').map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <p className={`text-sm ${getSkillColorClass(skills[skill.name] || 0)}`}>
                          {getSkillLabel(skills[skill.name] || 0)}
                        </p>
                      </div>
                      <Badge variant="outline" className={getSkillColorClass(skills[skill.name] || 0)}>
                        {skills[skill.name] || 0}/10
                      </Badge>
                    </div>
                    <Slider
                      value={[skills[skill.name] || 0]}
                      onValueChange={(value) => handleSkillChange(skill.name, value)}
                      max={10}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Never tried</span>
                      <span>Expert</span>
                    </div>
                    {index < getSkillsByCategory('technique').length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Physical Skills */}
        <TabsContent value="physical">
          <Card>
            <CardHeader>
              <CardTitle>Physical Skills</CardTitle>
              <CardDescription>
                Assess your physical capabilities and fitness level (0 = Very poor, 10 = Elite athlete)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {getSkillsByCategory('physical').map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <p className={`text-sm ${getSkillColorClass(skills[skill.name] || 0)}`}>
                          {getSkillLabel(skills[skill.name] || 0)}
                        </p>
                      </div>
                      <Badge variant="outline" className={getSkillColorClass(skills[skill.name] || 0)}>
                        {skills[skill.name] || 0}/10
                      </Badge>
                    </div>
                    <Slider
                      value={[skills[skill.name] || 0]}
                      onValueChange={(value) => handleSkillChange(skill.name, value)}
                      max={10}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Very poor</span>
                      <span>Elite</span>
                    </div>
                    {index < getSkillsByCategory('physical').length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mental Skills */}
        <TabsContent value="mental">
          <Card>
            <CardHeader>
              <CardTitle>Mental Skills</CardTitle>
              <CardDescription>
                Evaluate your mental game and strategic thinking (0 = Very weak, 10 = Exceptional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {getSkillsByCategory('mental').map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <p className={`text-sm ${getSkillColorClass(skills[skill.name] || 0)}`}>
                          {getSkillLabel(skills[skill.name] || 0)}
                        </p>
                      </div>
                      <Badge variant="outline" className={getSkillColorClass(skills[skill.name] || 0)}>
                        {skills[skill.name] || 0}/10
                      </Badge>
                    </div>
                    <Slider
                      value={[skills[skill.name] || 0]}
                      onValueChange={(value) => handleSkillChange(skill.name, value)}
                      max={10}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Very weak</span>
                      <span>Exceptional</span>
                    </div>
                    {index < getSkillsByCategory('mental').length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      {hasChanges && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Unsaved Changes</h4>
                <p className="text-sm text-muted-foreground">
                  You have modified your skill levels. Don't forget to save your changes.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillManagement;