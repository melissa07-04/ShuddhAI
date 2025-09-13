import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { FoodItemCard } from "./components/FoodItemCard";
import { TestInstructions } from "./components/TestInstructions";
import { CameraInterface } from "./components/CameraInterface";
import { ResultDisplay } from "./components/ResultDisplay";
import { GetStarted } from "./components/GetStarted";
import { Beaker, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";

type Screen = "getstarted" | "home" | "instructions" | "camera" | "results";

interface FoodItem {
  id: string;
  name: string;
  image: string;
  color: string;
  test: {
    name: string;
    duration: string;
    materials: string[];
    steps: string[];
    expectedResult: string;
    adulterantDetected: string;
  };
}

const foodItems: FoodItem[] = [
  {
    id: "turmeric",
    name: "Turmeric Powder",
    image: "https://images.unsplash.com/photo-1698556735172-1b5b3cd9d2ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMHBvd2RlciUyMHNwaWNlc3xlbnwxfHx8fDE3NTc2Nzc3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#FFD700",
    test: {
      name: "Metanil Yellow Test",
      duration: "5 minutes",
      materials: ["Small amount of turmeric powder", "Lemon juice or vinegar", "White plate", "Spoon"],
      steps: [
        "Take a pinch of turmeric powder on a clean white plate",
        "Add a few drops of lemon juice or vinegar to the powder",
        "Mix gently with a clean spoon",
        "Observe the color change immediately",
        "Wait for 2-3 minutes and observe again"
      ],
      expectedResult: "Pure turmeric will remain yellow/orange with lemon juice. No significant color change should occur.",
      adulterantDetected: "If the mixture turns pink, violet, or magenta, it indicates presence of Metanil Yellow (a harmful synthetic dye)."
    }
  },
  {
    id: "honey",
    name: "Honey",
    image: "https://images.unsplash.com/photo-1655169947079-5b2a38815147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leSUyMGphciUyMG5hdHVyYWx8ZW58MXx8fHwxNzU3Njk3NjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#DAA520",
    test: {
      name: "Water Absorption Test",
      duration: "3 minutes",
      materials: ["Honey sample", "Clean water", "White tissue paper", "Small bowl"],
      steps: [
        "Place a few drops of honey on tissue paper",
        "Wait for 2-3 minutes",
        "Observe if the honey gets absorbed by the paper",
        "Alternatively, add honey to a glass of water",
        "Check if honey dissolves immediately or settles at bottom"
      ],
      expectedResult: "Pure honey will not be readily absorbed by tissue paper and will settle at the bottom of water without dissolving immediately.",
      adulterantDetected: "If honey gets absorbed quickly by tissue or dissolves rapidly in water, it may be mixed with sugar syrup or other adulterants."
    }
  },
  {
    id: "black-pepper",
    name: "Black Pepper",
    image: "https://images.unsplash.com/photo-1649952052743-5e8f37c348c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHBlcHBlciUyMHNwaWNlfGVufDF8fHx8MTc1NzY2ODM2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#2F1B14",
    test: {
      name: "Float Test",
      duration: "5 minutes",
      materials: ["Black pepper sample", "Glass of water", "Small spoon"],
      steps: [
        "Fill a transparent glass with clean water",
        "Add a tablespoon of black pepper powder to the water",
        "Stir gently and let it settle",
        "Observe what floats and what sinks",
        "Look for unusual particles or different colored matter"
      ],
      expectedResult: "Pure black pepper will mostly float on water surface. Some particles may sink but should be uniform in color and texture.",
      adulterantDetected: "If you see lighter colored particles, papaya seeds, or artificial black particles sinking immediately, it indicates adulteration."
    }
  },
  {
    id: "chili-powder",
    name: "Red Chili Powder",
    image: "https://images.unsplash.com/photo-1700308234510-85bf5f51e135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjaGlsaSUyMHBvd2RlcnxlbnwxfHx8fDE3NTc2NzE4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#DC143C",
    test: {
      name: "Artificial Color Test",
      duration: "10 minutes",
      materials: ["Red chili powder", "Water", "White cloth", "Transparent glass"],
      steps: [
        "Take a pinch of red chili powder",
        "Add it to a glass of water",
        "Stir well and let it settle for 5 minutes",
        "Dip a white cloth in the colored water",
        "Check if the cloth gets stained with artificial color"
      ],
      expectedResult: "Natural chili powder will give a mild reddish tinge to water. The cloth should not get deeply stained.",
      adulterantDetected: "If the water becomes intensely red and stains the cloth deeply, it indicates presence of artificial colors like Sudan Red or Lead Chromate."
    }
  },
  {
    id: "milk",
    name: "Milk",
    image: "https://images.unsplash.com/photo-1658655933479-70fa2e0d6933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwZ2xhc3MlMjBmcmVzaHxlbnwxfHx8fDE3NTc2NzM0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#F8F9FA",
    test: {
      name: "Water Adulteration Test",
      duration: "2 minutes",
      materials: ["Milk sample", "Clean water", "Small spoon", "Transparent glass"],
      steps: [
        "Take a spoonful of milk",
        "Drop it slowly into a glass of clean water",
        "Observe how the milk behaves in water",
        "Notice if it mixes immediately or stays separate",
        "Look for any unusual settling patterns"
      ],
      expectedResult: "Pure milk will flow down slowly in water without mixing immediately and will leave a distinct white trail.",
      adulterantDetected: "If milk mixes readily with water or dissolves quickly, it indicates water adulteration or synthetic milk."
    }
  },
  {
    id: "ghee",
    name: "Ghee (Clarified Butter)",
    image: "https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGVlJTIwY2xhcmlmaWVkJTIwYnV0dGVyfGVufDF8fHx8MTc1Nzc0MDcyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#FFD700",
    test: {
      name: "Palm Melting Test",
      duration: "3 minutes",
      materials: ["Ghee sample", "Clean hands", "Tissue paper"],
      steps: [
        "Take a small amount of ghee on your palm",
        "Rub it gently between your palms",
        "Observe how quickly it melts",
        "Smell the aroma while rubbing",
        "Notice the texture and consistency"
      ],
      expectedResult: "Pure ghee will melt quickly with body heat, have a pleasant aroma, and feel smooth without any grittiness.",
      adulterantDetected: "If ghee doesn't melt easily, has no aroma, feels gritty, or leaves residue, it may contain adulterants like animal fat or vegetable oil."
    }
  },
  {
    id: "rice",
    name: "Rice (Basmati)",
    image: "https://images.unsplash.com/photo-1705147289789-6df2593f1b1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNtYXRpJTIwcmljZSUyMGdyYWluc3xlbnwxfHx8fDE3NTc3NDA3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#F5F5F5",
    test: {
      name: "Starch Powder Test",
      duration: "5 minutes",
      materials: ["Rice grains", "Iodine solution (from first aid kit)", "White plate", "Dropper"],
      steps: [
        "Take a few rice grains on a white plate",
        "Crush them slightly to expose inner parts",
        "Add 2-3 drops of iodine solution to the rice",
        "Wait for 2-3 minutes",
        "Observe any color changes"
      ],
      expectedResult: "Pure rice will show a mild yellow-brown color with iodine. No intense blue or black color should appear.",
      adulterantDetected: "If rice turns deep blue or black with iodine, it indicates artificial starch powder coating used to make rice look whiter and heavier."
    }
  },
  {
    id: "salt",
    name: "Salt",
    image: "https://images.unsplash.com/photo-1681886916229-d364e539fbf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjBzYWx0JTIwY3J5c3RhbHN8ZW58MXx8fHwxNTc3NDA3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#FFFFFF",
    test: {
      name: "Dissolution Test",
      duration: "3 minutes",
      materials: ["Salt sample", "Clean water", "Transparent glass", "Spoon"],
      steps: [
        "Fill a glass with clean water",
        "Add a teaspoon of salt to the water",
        "Stir well for 1-2 minutes",
        "Observe if all salt dissolves completely",
        "Check for any residue or particles at the bottom"
      ],
      expectedResult: "Pure salt will dissolve completely in water leaving no residue. The solution should be clear.",
      adulterantDetected: "If you see white residue, particles, or cloudiness that doesn't dissolve, it indicates presence of chalk powder, sand, or other adulterants."
    }
  },
  {
    id: "tea",
    name: "Tea Leaves",
    image: "https://images.unsplash.com/photo-1620676085773-ea551988af22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBsZWF2ZXMlMjBibGFja3xlbnwxfHx8fDE3NTc3NDA3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#8B4513",
    test: {
      name: "Magnet Test",
      duration: "2 minutes",
      materials: ["Tea leaves", "Small magnet (from speakers/fridge)", "White plate", "Spoon"],
      steps: [
        "Spread tea leaves on a white plate",
        "Move a small magnet slowly over the tea leaves",
        "Observe if any particles get attracted to the magnet",
        "Separate any attracted particles",
        "Examine the attracted particles closely"
      ],
      expectedResult: "Pure tea leaves will not be attracted to magnet. No metallic particles should be pulled out.",
      adulterantDetected: "If magnet attracts particles from tea, it indicates presence of iron fillings or other metallic adulterants used to increase weight."
    }
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("getstarted");
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [testResult, setTestResult] = useState<any>(null);

  const handleFoodItemSelect = (foodItem: FoodItem) => {
    setSelectedFoodItem(foodItem);
    setCurrentScreen("instructions");
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
    setSelectedFoodItem(null);
    setTestResult(null);
  };

  const handleStartCamera = () => {
    setCurrentScreen("camera");
  };

  const handleAnalysisComplete = (result: any) => {
    setTestResult(result);
    setCurrentScreen("results");
  };

  const handleRetakeTest = () => {
    setCurrentScreen("camera");
    setTestResult(null);
  };

  const handleGetStarted = () => {
    setCurrentScreen("home");
  };

  if (currentScreen === "getstarted") {
    return <GetStarted onGetStarted={handleGetStarted} />;
  }

  if (currentScreen === "instructions" && selectedFoodItem) {
    return (
      <TestInstructions
        foodItem={selectedFoodItem}
        onBack={handleBackToHome}
        onStartCamera={handleStartCamera}
      />
    );
  }

  if (currentScreen === "camera" && selectedFoodItem) {
    return (
      <CameraInterface
        foodItem={selectedFoodItem}
        onBack={() => setCurrentScreen("instructions")}
        onAnalysisComplete={handleAnalysisComplete}
      />
    );
  }

  if (currentScreen === "results" && selectedFoodItem && testResult) {
    return (
      <ResultDisplay
        foodItem={selectedFoodItem}
        result={testResult}
        onBack={() => setCurrentScreen("camera")}
        onRetake={handleRetakeTest}
        onHome={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Magical Header */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 via-yellow-200/30 to-purple-200/30" />
        <div className="relative px-4 py-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.div 
              className="flex items-center justify-center gap-3"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 animate-pulse" />
                <div className="relative z-10 bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 w-14 h-14 rounded-full flex items-center justify-center">
                  <Beaker className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-yellow-600 to-purple-600 bg-clip-text text-transparent">
                  Shuddh-AI
                </h1>
                <p className="text-xl text-primary/80 font-medium">शुद्ध-एआई</p>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground max-w-3xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Your magical AI-powered laboratory for testing food purity at home ✨
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { icon: Shield, text: "100% Safe Tests", color: "from-green-400 to-teal-400" },
                { icon: Sparkles, text: "AI Magic Results", color: "from-pink-400 to-purple-400" },
                { icon: Beaker, text: "Science-Based", color: "from-yellow-400 to-orange-400" }
              ].map((badge, index) => (
                <Badge key={index} variant="outline" className="px-4 py-2 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm border-pink-200 hover:scale-105 transition-all duration-200">
                  <badge.icon className="h-4 w-4 mr-1" />
                  {badge.text}
                </Badge>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8 backdrop-blur-md bg-card/90 border-2 border-pink-100/50 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                ✨ Choose Your Magical Test ✨
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FoodItemCard
                      id={item.id}
                      name={item.name}
                      image={item.image}
                      color={item.color}
                      onClick={() => handleFoodItemSelect(item)}
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How it Works - Magical Version */}
          <Card className="backdrop-blur-md bg-card/90 border-2 border-yellow-100/50 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                🪄 How the Magic Works 🪄
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "🧪",
                    title: "Enchanted Tests",
                    desc: "Follow our mystical guides for scientifically proven tests using everyday household treasures",
                    gradient: "from-pink-400 to-purple-400"
                  },
                  {
                    icon: "📱",
                    title: "AI Wizardry",
                    desc: "Capture your results and let our AI spirits analyze colors and magical transformations instantly",
                    gradient: "from-blue-400 to-teal-400"
                  },
                  {
                    icon: "⚡",
                    title: "Instant Prophecy",
                    desc: "Receive immediate revelations about food purity with confidence scores and mystical recommendations",
                    gradient: "from-yellow-400 to-orange-400"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="text-center space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <span className="text-3xl">{step.icon}</span>
                    </motion.div>
                    <h3 className={`font-semibold text-lg bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Magical Footer */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-50/80 to-purple-50/80 backdrop-blur-md rounded-full border border-pink-200/50">
              <span className="text-sm text-muted-foreground">
                ✨ Powered by AI Magic • 🔬 FSSAI Blessed Methods • 🏠 Safe for Every Home ✨
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}