import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, LogIn, UserPlus } from 'lucide-react';

interface LoginFormData {
  username: string;
  password: string;
}

interface RegisterFormData {
  username: string;
  phone: string;
  password: string;
}

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loginUrl = "https://fanclash-api.onrender.com/api/auth";
  const registerUrl = "https://fanclash-api.onrender.com/api/auth/register";

  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${loginUrl}/login`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (result.token) {
        localStorage.setItem("usertoken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success('Login successful!');
        console.log("success")
      } else {
        
        console.log("success")
        console.log(result)
     
        toast.error(result.error || 'Login failed');
      }
    } catch (err) {
      console.log(err);
      toast.error("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result);
      
      if (result.success) {
        localStorage.setItem("usertoken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success('Registration successful!');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (err) {
      console.log(err);
      toast.error("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  const formVariants = {
    hidden: { 
      x: isLogin ? -50 : 50, 
      opacity: 0,
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        damping: 20,
        stiffness: 250
      }
    },
    exit: { 
      x: isLogin ? 50 : -50, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50/50 via-white to-cyan-100/30 p-4"
    >
      <div className="relative w-full max-w-md">
        {/* Card Background */}
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/10 to-cyan-600/10 rounded-3xl blur-2xl opacity-70"></div>
        
        {/* Main Card */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-cyan-200/50 overflow-hidden">
          {/* Decorative Top Bar */}
          <div className="h-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600"></div>
          
          <div className="p-6">
            {/* Header with Toggle */}
            <div className="text-center mb-6">
              <motion.div 
                key={isLogin ? 'login-header' : 'register-header'}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent mb-1">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-cyan-600/70 text-sm">
                  {isLogin ? 'Sign in to continue' : 'Register and enjoy'}
                </p>
              </motion.div>
            </div>

            {/* Toggle Switch */}
            <div className="mb-6">
              <div className="relative bg-cyan-100/50 rounded-xl p-1 flex">
                <div className="absolute top-1 left-1 w-1/2 h-[calc(100%-0.5rem)] bg-white rounded-lg shadow-md transition-all duration-500"
                  style={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}
                ></div>
                <button
                  onClick={() => setIsLogin(true)}
                  className={`relative z-10 flex-1 py-2 text-center rounded-lg transition-all duration-300 ${isLogin ? 'text-cyan-700 font-semibold' : 'text-cyan-600'}`}
                >
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <LogIn className="h-3.5 w-3.5" />
                    Sign In
                  </div>
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`relative z-10 flex-1 py-2 text-center rounded-lg transition-all duration-300 ${!isLogin ? 'text-cyan-700 font-semibold' : 'text-cyan-600'}`}
                >
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <UserPlus className="h-3.5 w-3.5" />
                    Register
                  </div>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form
                  key="login-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={loginForm.handleSubmit(handleLogin)}
                  className="space-y-4"
                >
                  {/* Username */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-cyan-500" />
                      <label className="text-sm font-medium text-cyan-800">Username</label>
                    </div>
                    <input
                      {...loginForm.register("username", { required: "Username is required" })}
                      type="text"
                      className="w-full p-2.5 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all bg-white/50 text-sm"
                      placeholder="e.g. tesla"
                      disabled={isLoading}
                    />
                    {loginForm.formState.errors.username && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-rose-500"
                      >
                        {loginForm.formState.errors.username.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-cyan-500" />
                      <label className="text-sm font-medium text-cyan-800">Password</label>
                    </div>
                    <input
                      {...loginForm.register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "At least 6 characters"
                        }
                      })}
                      type="password"
                      className="w-full p-2.5 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all bg-white/50 text-sm"
                      placeholder="e.g. @tesla"
                      disabled={isLoading}
                    />
                    {loginForm.formState.errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-rose-500"
                      >
                        {loginForm.formState.errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 group text-sm"
                    >
                      <div className="flex items-center justify-center gap-2">
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.form
                  key="register-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={registerForm.handleSubmit(handleRegister)}
                  className="space-y-4"
                >
                  {/* Username */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-cyan-500" />
                      <label className="text-sm font-medium text-cyan-800">Username</label>
                    </div>
                    <input
                      {...registerForm.register("username", { 
                        required: "Username is required"
                      })}
                      type="text"
                      className="w-full p-2.5 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all bg-white/50 text-sm"
                      placeholder="e.g. tesla"
                      disabled={isLoading}
                    />
                    {registerForm.formState.errors.username && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-rose-500"
                      >
                        {registerForm.formState.errors.username.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-cyan-500" />
                      <label className="text-sm font-medium text-cyan-800">Phone Number</label>
                    </div>
                    <input
                      {...registerForm.register("phone", { 
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter a valid 10-digit phone number"
                        }
                      })}
                      type="tel"
                      className="w-full p-2.5 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all bg-white/50 text-sm"
                      placeholder="e.g 0712345679"
                      disabled={isLoading}
                    />
                    {registerForm.formState.errors.phone && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-rose-500"
                      >
                        {registerForm.formState.errors.phone.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-cyan-500" />
                      <label className="text-sm font-medium text-cyan-800">Password</label>
                    </div>
                    <input
                      {...registerForm.register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "At least 6 characters"
                        }
                      })}
                      type="password"
                      className="w-full p-2.5 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all bg-white/50 text-sm"
                      placeholder="e.g @tesla"
                      disabled={isLoading}
                    />
                    {registerForm.formState.errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-rose-500"
                      >
                        {registerForm.formState.errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 group text-sm"
                    >
                      <div className="flex items-center justify-center gap-2">
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Register
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Bottom Text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-cyan-600/70">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
                >
                  {isLogin ? 'Register' : 'Sign in'}
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
