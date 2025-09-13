import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Camera, Clock, Beaker, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface TestInstructionsProps {
  foodItem: {
    id: string;
    name: string;
    color: string;
    test: {
      name: string;
      duration: string;
      materials: string[];
      steps: string[];
      expectedResult: string;
      adulterantDetected: string;
    };
  };
  onBack: () => void;
  onStartCamera: () => void;
}

export function TestInstructions({ foodItem, onBack, onStartCamera }: TestInstructionsProps) {
  return (
    <div className="min-h-screen relative p-4">
      {/* Magical background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full"
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
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div 
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button variant="outline" size="icon" onClick={onBack} className="backdrop-blur-sm bg-card/80 hover:scale-105 transition-transform">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ✨ Testing {foodItem.name} ✨
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="mb-6 backdrop-blur-md bg-card/90 border-2 border-pink-100/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${foodItem.color}, ${foodItem.color}80)` }}
              >
                <Beaker className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {foodItem.test.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="h-3 w-3" />
                  <span>{foodItem.test.duration}</span>
                  <Sparkles className="h-3 w-3 text-yellow-500 ml-2" />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Materials Needed:</h3>
                <div className="flex flex-wrap gap-2">
                  {foodItem.test.materials.map((material, index) => (
                    <Badge key={index} variant="outline">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Step-by-Step Instructions:</h3>
                <div className="space-y-3">
                  {foodItem.test.steps.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                        style={{ backgroundColor: foodItem.color }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Expected Result:</h4>
                <p className="text-sm mb-2">{foodItem.test.expectedResult}</p>
                <p className="text-sm text-destructive">
                  <strong>If adulterated:</strong> {foodItem.test.adulterantDetected}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button 
            onClick={onStartCamera}
            className="w-full text-lg py-6 rounded-xl bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 hover:from-pink-600 hover:via-yellow-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 mr-2" />
            </motion.div>
            <Camera className="h-5 w-5 mr-2" />
            Begin Magical AI Analysis ✨
          </Button>
        </motion.div>
      </div>
    </div>
  );
}