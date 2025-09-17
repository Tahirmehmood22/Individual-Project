import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, User, Lock, Sparkles, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/badminton-hero-enhanced.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Get all registered users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    console.log('Login - Registered users:', registeredUsers);
    console.log('Login - Number of registered users:', registeredUsers.length);
    console.log('Login - Entered username:', username);
    console.log('Login - Entered password:', password);
    
    // Find user with matching credentials
    const authenticatedUser = registeredUsers.find(user => {
      const usernameMatch = user.username.trim().toLowerCase() === username.trim().toLowerCase();
      const passwordMatch = user.password === password;
      
      console.log(`Checking user "${user.username}":`, {
        storedUsername: user.username,
        enteredUsername: username,
        usernameMatch,
        passwordMatch,
        storedPassword: user.password.substring(0, 3) + '***' // Show only first 3 chars for security
      });
      
      return usernameMatch && passwordMatch;
    });
    
    console.log('Login - Authenticated user found:', authenticatedUser);
    
    if (authenticatedUser) {
      console.log('Login - User found! Logging in user:', authenticatedUser.username);
      console.log('Login - User sport:', authenticatedUser.sport);
      
      // Set login status
      localStorage.setItem("isLoggedIn", "true");
      
      // Set current user data (without password for security)
      const userDataWithoutPassword = {
        username: authenticatedUser.username,
        email: authenticatedUser.email,
        fullName: authenticatedUser.fullName,
        age: authenticatedUser.age,
        location: authenticatedUser.location,
        sport: authenticatedUser.sport,
        avatar: authenticatedUser.avatar,
        level: authenticatedUser.level,
        createdAt: authenticatedUser.createdAt,
        // Include all profile fields from the authenticated user
        height: authenticatedUser.height,
        weight: authenticatedUser.weight,
        dateOfBirth: authenticatedUser.dateOfBirth,
        skillLevel: authenticatedUser.skillLevel,
        experienceYears: authenticatedUser.experienceYears,
        units: authenticatedUser.units,
        skills: authenticatedUser.skills,
        profileCompleted: authenticatedUser.profileCompleted
      };
      
      localStorage.setItem("currentUser", JSON.stringify(userDataWithoutPassword));
      
      // Update userData structure for multiple users
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData[authenticatedUser.username] = userDataWithoutPassword;
      localStorage.setItem("userData", JSON.stringify(userData));
      
      // Set the user's sport preference
      console.log('Login - Setting sport to:', authenticatedUser.sport);
      localStorage.setItem("userSport", authenticatedUser.sport);
      
      // Trigger authentication change event for App.jsx to react
      window.dispatchEvent(new Event('authChange'));
      
      navigate("/");
      return;
    } else {
      console.log('Login - No matching user found in registered users');
      
      // Check each user individually for debugging
      registeredUsers.forEach((user, index) => {
        console.log(`User ${index}:`, {
          username: user.username,
          passwordMatch: user.password === password,
          usernameMatch: user.username === username
        });
      });
    }
    
    // Fallback to demo credentials for testing
    console.log('Login - Checking demo credentials');
    console.log('Login - Username matches "player":', username === "player");
    console.log('Login - Password matches "badminton":', password === "badminton");
    
    if (username === "player" && password === "badminton") {
      console.log('Login - Demo login successful!');
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userSport", "badminton"); // Set default sport
      
      // Create mock user data for demo (using Ram Charan's profile)
      const demoUserData = {
        username: "player",
        fullName: "Ram Charan Teja",
        email: "ramcharan@example.com",
        age: "9",
        dateOfBirth: "2015-03-15",
        height: "130 cm",
        weight: "28 kg",
        location: "Stockholm, Sweden",
        sport: "badminton",
        level: "Rising Star",
        avatar: "https://content.tournamentsoftware.com/images/profile/3C3E88CA-FA0B-43B0-81E3-C5A8BC84F0EF/xlarge/9FB22704-6740-4049-A08B-D394C186C987.jpg?v=20250504153119"
      };
      
      localStorage.setItem("currentUser", JSON.stringify(demoUserData));
      
      // Update userData structure for demo user
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData["player"] = demoUserData;
      localStorage.setItem("userData", JSON.stringify(userData));
      
      // Trigger authentication change event for App.jsx to react
      window.dispatchEvent(new Event('authChange'));
      
      navigate("/");
    } else {
      console.log('Login - Demo credentials failed, showing error');
      setError("Invalid username or password");
    }
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
        {[...Array(20)].map((_, i) => (
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
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <div className="w-1 h-1 bg-primary rounded-full"></div>
          </motion.div>
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <Badge className="mb-4 bg-primary/20 border-primary/30 text-primary hover:bg-primary/30">
                <Trophy className="w-4 h-4 mr-2" />
                Sports Skills Tracker
              </Badge>
            </motion.div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Continue your sports journey
            </p>
          </div>

          {/* Login Card */}
          <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Log In
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Enter your username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
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

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium py-3 transition-all duration-200 hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Log In
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground text-center mb-2">Demo Credentials or Create Account:</p>
                <p className="text-xs text-center">
                  <span className="font-medium">Username:</span> player • 
                  <span className="font-medium"> Password:</span> badminton
                </p>
                <p className="text-xs text-center mt-1 text-muted-foreground">
                  Or sign up below to create your own account
                </p>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link 
                    to="/signup" 
                    className="text-primary hover:text-primary-dark font-medium hover:underline transition-colors"
                  >
                    Sign up here
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
