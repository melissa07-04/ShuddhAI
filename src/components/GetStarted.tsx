import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, Zap, Shield, Beaker, ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";

interface GetStartedProps {
  onGetStarted: () => void;
}

export function GetStarted({ onGetStarted }: GetStartedProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo and Title */}
            <div className="space-y-4">
              <motion.div
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #fd79a8, #fdcb6e, #a29bfe)",
                }}
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Beaker className="h-12 w-12 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #fd79a8, #fdcb6e, #a29bfe)",
                    filter: "blur(10px)",
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <div>
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Shuddh-AI
                </motion.h1>
                <motion.p
                  className="text-2xl md:text-3xl text-primary/80 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  शुद्ध-एआई
                </motion.p>
              </div>
            </div>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Transform your kitchen into a <span className="text-pink-500 font-semibold">magical laboratory</span> ✨
              <br />
              Detect food adulterants with AI-powered precision and enchanting simplicity
            </motion.p>

            {/* Feature Cards */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Card className="backdrop-blur-md bg-card/80 border-2 border-pink-200/50 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    AI Magic
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced color analysis and pattern recognition to detect adulterants instantly
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-card/80 border-2 border-yellow-200/50 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Zap className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Lightning Fast
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get results in seconds with simple household ingredients and your phone camera
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-card/80 border-2 border-green-200/50 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Shield className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    Family Safe
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Scientifically validated tests using safe, common household materials
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Magical Features */}
            <motion.div
              className="mt-12 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Your Magical Testing Toolkit
              </h2>
              
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "🧪 Turmeric Purity Test",
                  "🍯 Honey Authentication", 
                  "🌶️ Spice Verification",
                  "🥛 Milk Quality Check",
                  "🧈 Ghee Purity Scan",
                  "🍚 Rice Adulteration Test",
                  "🧂 Salt Purity Check",
                  "🍃 Tea Leaf Analysis",
                  "🌿 And More Coming!"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.1 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-4 py-2 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 hover:scale-105 transition-all duration-200"
                    >
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {feature}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="px-12 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 hover:from-pink-600 hover:via-yellow-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Begin Your Magic Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>

            {/* Footer */}
            <motion.div
              className="mt-8 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <p>✨ Powered by AI • 🔬 FSSAI Approved Methods • 🏠 Safe for Home Use</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}