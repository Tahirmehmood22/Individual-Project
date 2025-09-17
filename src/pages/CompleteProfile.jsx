import { useState, useEffect, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSport } from '@/context/SportContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Dumbbell, Brain, Target, Calendar } from 'lucide-react';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { getSportConfig, currentSport } = useSport();
  const sportConfig = getSportConfig();
  
  // Initialize formData with current user data
  const [formData, setFormData] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Parse fullName into firstName and lastName if available
    let firstName = currentUser.firstName || '';
    let lastName = currentUser.lastName || '';
    
    if (!firstName && !lastName && currentUser.fullName) {
      const nameParts = currentUser.fullName.trim().split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }
    
    console.log('CompleteProfile - Initializing with user data:', currentUser);
    console.log('CompleteProfile - Parsed name:', { firstName, lastName });
    
    return {
      firstName,
      lastName,
      height: currentUser.height || '',
      weight: currentUser.weight || '',
      dateOfBirth: currentUser.dateOfBirth || '',
      skillLevel: currentUser.skillLevel || 'beginner',
      experienceYears: currentUser.experienceYears || 0,
      units: currentUser.units || 'metric', // metric (cm, kg) or imperial (ft/in, lbs)
    };
  });

  const [skills, setSkills] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('CompleteProfile - Initializing skills:', currentUser.skills);
    return currentUser.skills || {};
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Initialize skills with 0 values
  useEffect(() => {
    if (sportConfig?.skills) {
      const initialSkills = {};
      sportConfig.skills.forEach(skill => {
        initialSkills[skill.name] = 0;
      });
      setSkills(initialSkills);
    }
  }, [sportConfig]);

  // Calculate completion percentage
  const calculateProgress = () => {
    const requiredFields = ['height', 'weight', 'dateOfBirth', 'skillLevel'];
    const completedFields = requiredFields.filter(field => formData[field]).length;
    const skillsCompleted = Object.values(skills).filter(value => value > 0).length;
    const totalItems = requiredFields.length + (sportConfig?.skills?.length || 0);
    const completedItems = completedFields + skillsCompleted;
    return Math.round((completedItems / totalItems) * 100);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillChange = (skillName, value) => {
    setSkills(prev => ({ ...prev, [skillName]: value[0] }));
  };

  const getSkillsByCategory = (category) => {
    return sportConfig?.skills?.filter(skill => skill.category === category) || [];
  };

  const handleSave = () => {
    console.log('CompleteProfile - handleSave called');
    
    // Get current user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    console.log('CompleteProfile - Current user:', currentUser);
    console.log('CompleteProfile - Form data:', formData);
    console.log('CompleteProfile - Skills:', skills);

    // Update user profile with new data
    const updatedProfile = {
      ...currentUser,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`.trim(), // Update fullName for consistency
      height: formData.units === 'metric' ? `${formData.height} cm` : `${formData.height} ft`,
      weight: formData.units === 'metric' ? `${formData.weight} kg` : `${formData.weight} lbs`,
      dateOfBirth: formData.dateOfBirth,
      skillLevel: formData.skillLevel,
      experienceYears: formData.experienceYears,
      units: formData.units,
      skills: skills,
      profileCompleted: true,
      profileCompletedAt: new Date().toISOString(),
    };

    console.log('CompleteProfile - Updated profile:', updatedProfile);

    try {
      // Update localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedProfile));
      console.log('CompleteProfile - Updated currentUser in localStorage');
      
      // Update userData for the specific user
      if (userData[currentUser.username]) {
        userData[currentUser.username] = updatedProfile;
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('CompleteProfile - Updated userData in localStorage');
      }

      // Set profile completion flag
      localStorage.setItem('profileCompleted', 'true');
      console.log('CompleteProfile - Set profileCompleted flag');

      // Trigger profile completion event to update App.jsx state
      window.dispatchEvent(new Event('profileCompleted'));
      console.log('CompleteProfile - Dispatched profileCompleted event');

      // Navigate to dashboard
      console.log('CompleteProfile - About to navigate to dashboard');
      startTransition(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('CompleteProfile - Error saving profile:', error);
    }
  };

  const handleSkipForNow = () => {
    // Set a flag that profile was skipped but allow access to dashboard
    localStorage.setItem('profileSkipped', 'true');
    navigate('/');
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Physical Metrics';
      case 3: return 'Skill Assessment';
      case 4: return 'Review & Complete';
      default: return 'Profile Setup';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl">{sportConfig?.icon}</div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Let's set up your {sportConfig?.name} profile to get started
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{calculateProgress()}% Complete</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && <User className="h-5 w-5" />}
              {currentStep === 2 && <Dumbbell className="h-5 w-5" />}
              {currentStep === 3 && <Brain className="h-5 w-5" />}
              {currentStep === 4 && <Target className="h-5 w-5" />}
              {getStepTitle()}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us a bit about yourself"}
              {currentStep === 2 && "Your physical measurements and experience"}
              {currentStep === 3 && "Rate your current skill levels (0-10 scale)"}
              {currentStep === 4 && "Review your information before saving"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="skillLevel">Current Skill Level</Label>
                  <Select value={formData.skillLevel} onValueChange={(value) => handleInputChange('skillLevel', value)}>
                    <SelectTrigger id="skillLevel">
                      <SelectValue placeholder="Select your skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="experienceYears">Years of Experience</Label>
                  <div className="mt-2">
                    <Slider
                      id="experienceYears"
                      value={[formData.experienceYears]}
                      onValueChange={(value) => handleInputChange('experienceYears', value[0])}
                      max={20}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>0 years</span>
                      <span className="font-medium">{formData.experienceYears} years</span>
                      <span>20+ years</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Physical Metrics */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="units">Measurement Units</Label>
                  <Select value={formData.units} onValueChange={(value) => handleInputChange('units', value)}>
                    <SelectTrigger id="units">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                      <SelectItem value="imperial">Imperial (ft, lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="height">
                    Height {formData.units === 'metric' ? '(cm)' : '(ft)'}
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder={formData.units === 'metric' ? '170' : '5.7'}
                    step={formData.units === 'metric' ? '1' : '0.1'}
                  />
                </div>

                <div>
                  <Label htmlFor="weight">
                    Weight {formData.units === 'metric' ? '(kg)' : '(lbs)'}
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder={formData.units === 'metric' ? '70' : '154'}
                    step={formData.units === 'metric' ? '0.1' : '1'}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Skill Assessment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Rate your current skills on a scale of 0-10 (0 = Never tried, 10 = Expert level)
                  </p>
                </div>

                {/* Technique Skills */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4" />
                    Technique Skills
                  </h3>
                  <div className="space-y-4">
                    {getSkillsByCategory('technique').map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}>{skill.name}</Label>
                          <Badge variant="outline">{skills[skill.name] || 0}/10</Badge>
                        </div>
                        <Slider
                          id={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
                          value={[skills[skill.name] || 0]}
                          onValueChange={(value) => handleSkillChange(skill.name, value)}
                          max={10}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Physical Skills */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Dumbbell className="h-4 w-4" />
                    Physical Skills
                  </h3>
                  <div className="space-y-4">
                    {getSkillsByCategory('physical').map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}>{skill.name}</Label>
                          <Badge variant="outline">{skills[skill.name] || 0}/10</Badge>
                        </div>
                        <Slider
                          id={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
                          value={[skills[skill.name] || 0]}
                          onValueChange={(value) => handleSkillChange(skill.name, value)}
                          max={10}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Mental Skills */}
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Brain className="h-4 w-4" />
                    Mental Skills
                  </h3>
                  <div className="space-y-4">
                    {getSkillsByCategory('mental').map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}>{skill.name}</Label>
                          <Badge variant="outline">{skills[skill.name] || 0}/10</Badge>
                        </div>
                        <Slider
                          id={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
                          value={[skills[skill.name] || 0]}
                          onValueChange={(value) => handleSkillChange(skill.name, value)}
                          max={10}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p>{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date of Birth</Label>
                    <p>{formData.dateOfBirth}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Skill Level</Label>
                    <p className="capitalize">{formData.skillLevel}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Experience</Label>
                    <p>{formData.experienceYears} years</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Height</Label>
                    <p>{formData.height} {formData.units === 'metric' ? 'cm' : 'ft'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Weight</Label>
                    <p>{formData.weight} {formData.units === 'metric' ? 'kg' : 'lbs'}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium mb-3 block">Skills Overview</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {sportConfig?.skills?.map((skill) => (
                      <div key={skill.name} className="flex justify-between items-center">
                        <span className="text-sm">{skill.name}</span>
                        <Badge variant="outline">{skills[skill.name] || 0}/10</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Profile Completion</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {calculateProgress()}% complete - You can always update this information later in your profile settings.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleSkipForNow}>
                  Skip for now
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('CompleteProfile - Button clicked!');
                      handleSave();
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Complete Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompleteProfile;