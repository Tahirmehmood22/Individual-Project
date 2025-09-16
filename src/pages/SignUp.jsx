import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, User, Lock, Mail, UserPlus, Sparkles, Calendar, MapPin, Eye, EyeOff, Check, X, Zap } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/badminton-hero-enhanced.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    age: "",
    location: "",
    sport: "badminton" // Default sport
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Available sports with their details
  const sports = [
    { 
      id: 'badminton', 
      name: 'Badminton', 
      icon: '🏸',
      color: 'from-blue-500 to-purple-600',
      description: 'Fast-paced racket sport'
    },
    { 
      id: 'tennis', 
      name: 'Tennis', 
      icon: '🎾',
      color: 'from-green-500 to-blue-600',
      description: 'Classic court sport'
    },
    { 
      id: 'table-tennis', 
      name: 'Table Tennis', 
      icon: '🏓',
      color: 'from-orange-500 to-red-600',
      description: 'Quick indoor sport'
    },
    { 
      id: 'squash', 
      name: 'Squash', 
      icon: '🎯',
      color: 'from-purple-500 to-pink-600',
      description: 'High-intensity wall sport'
    },
    { 
      id: 'padel', 
      name: 'Padel', 
      icon: '🎪',
      color: 'from-teal-500 to-cyan-600',
      description: 'Social racket sport'
    }
  ];

  // Get selected sport details
  const selectedSport = sports.find(sport => sport.id === formData.sport) || sports[0];

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength calculation
  const getPasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    return {
      strength,
      checks,
      level: strength < 2 ? 'weak' : strength < 4 ? 'medium' : 'strong'
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    
    // Email validation
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Password validation
    if (passwordStrength.strength < 3) {
      setError("Password is too weak. Please make it stronger.");
      return;
    }
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!formData.username || !formData.email || !formData.fullName || !formData.sport) {
      setError("Please fill in all required fields");
      return;
    }

    // Save user data including sport preference
    console.log('SignUp - Saving sport:', formData.sport);
    console.log('SignUp - Form data:', formData);
    
    // Create complete user profile
    const userProfile = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      fullName: formData.fullName.trim(),
      age: formData.age,
      location: formData.location.trim(),
      sport: formData.sport,
      password: formData.password, // Don't trim password as it might be intentional
      createdAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username.trim()}`,
      level: "Beginner"
    };
    
    // Get existing users from localStorage or create empty array
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Check if username already exists (case insensitive)
    const userExists = existingUsers.some(user => 
      user.username.toLowerCase() === formData.username.trim().toLowerCase()
    );
    if (userExists) {
      setError("Username already exists. Please choose a different username.");
      return;
    }
    
    // Add new user to the list
    existingUsers.push(userProfile);
    
    // Store updated users list
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
    
    console.log('SignUp - Data saved to localStorage');
    console.log('SignUp - Total registered users:', existingUsers.length);
    console.log('SignUp - New user stored:', {
      username: userProfile.username,
      sport: userProfile.sport,
      hasPassword: !!userProfile.password
    });
    
    // Verify the data was stored correctly
    const verifyStorage = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    console.log('SignUp - Verification - users in storage:', verifyStorage.length);
    const justAdded = verifyStorage.find(u => u.username === userProfile.username);
    console.log('SignUp - Verification - just added user found:', !!justAdded);
    
    // Set current user data for immediate use
    localStorage.setItem("userSport", formData.sport);
    localStorage.setItem("userData", JSON.stringify(userProfile));

    // Mock sign up success
    setSuccess(`${selectedSport.name} tracker account created successfully! Redirecting to login...`);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-secondary gradient-shift opacity-20"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* Animated Background Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            <div className="w-1 h-1 bg-secondary rounded-full"></div>
          </motion.div>
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <Badge className="mb-4 bg-secondary/20 border-secondary/30 text-secondary hover:bg-secondary/30">
                <span className="text-lg mr-2">{selectedSport.icon}</span>
                {selectedSport.name} Skills Tracker
              </Badge>
            </motion.div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              Join {selectedSport.name} Champions
            </h1>
            <p className="text-muted-foreground">
              Start your {selectedSport.name.toLowerCase()} journey today
            </p>
          </div>

          {/* Sign Up Card */}
          <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5 text-secondary" />
                Sign Up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Sport Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">Choose Your Sport *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sports.map((sport) => (
                      <div
                        key={sport.id}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:scale-105 ${
                          formData.sport === sport.id
                            ? 'border-secondary bg-secondary/10 shadow-lg'
                            : 'border-border bg-card hover:border-secondary/50'
                        }`}
                        onClick={() => setFormData({ ...formData, sport: sport.id })}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${sport.color} flex items-center justify-center text-white text-xl font-bold`}>
                            {sport.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{sport.name}</h3>
                            <p className="text-xs text-muted-foreground">{sport.description}</p>
                          </div>
                          {formData.sport === sport.id && (
                            <Check className="w-5 h-5 text-secondary" />
                          )}
                        </div>
                        <input
                          type="radio"
                          name="sport"
                          value={sport.id}
                          checked={formData.sport === sport.id}
                          onChange={handleChange}
                          className="sr-only"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      name="fullName"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Username *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      name="username"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all ${
                        formData.email && !isValidEmail(formData.email) 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                          : formData.email && isValidEmail(formData.email)
                          ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                          : 'border-border focus:ring-secondary focus:border-secondary'
                      }`}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {formData.email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {isValidEmail(formData.email) ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {formData.email && !isValidEmail(formData.email) && (
                    <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                  )}
                </div>

                {/* Age and Location Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">Age</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="number"
                        name="age"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        min="5"
                        max="100"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        name="location"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                        placeholder="City"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded-full transition-colors ${
                              level <= passwordStrength.strength
                                ? passwordStrength.level === 'weak'
                                  ? 'bg-red-500'
                                  : passwordStrength.level === 'medium'
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="space-y-1">
                        <p className={`text-xs font-medium ${
                          passwordStrength.level === 'weak'
                            ? 'text-red-600'
                            : passwordStrength.level === 'medium'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}>
                          Password strength: {passwordStrength.level}
                        </p>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className={`flex items-center gap-1 ${passwordStrength.checks.length ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordStrength.checks.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            8+ characters
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordStrength.checks.lowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Lowercase
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordStrength.checks.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Uppercase
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.checks.number ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordStrength.checks.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Number
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.checks.special ? 'text-green-600' : 'text-gray-500'}`}>
                            {passwordStrength.checks.special ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Special char
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 transition-all ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : formData.confirmPassword && formData.password === formData.confirmPassword
                          ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                          : 'border-border focus:ring-secondary focus:border-secondary'
                      }`}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {formData.confirmPassword && formData.password && (
                        <div>
                          {formData.password === formData.confirmPassword ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <X className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      )}
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-sm text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    {success}
                  </motion.div>
                )}

                <Button 
                  type="submit" 
                  className={`w-full bg-gradient-to-r ${selectedSport.color} hover:opacity-90 text-white font-medium py-3 transition-all duration-200 hover:scale-105`}
                  disabled={success}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start {selectedSport.name} Journey
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-secondary hover:text-secondary-dark font-medium hover:underline transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}