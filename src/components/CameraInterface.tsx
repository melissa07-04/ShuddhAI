import { useState, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Camera, RotateCcw, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

interface CameraInterfaceProps {
  foodItem: {
    id: string;
    name: string;
    color: string;
  };
  onBack: () => void;
  onAnalysisComplete: (result: any) => void;
}

export function CameraInterface({ foodItem, onBack, onAnalysisComplete }: CameraInterfaceProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        turmeric: {
          purityStatus: Math.random() > 0.3 ? "pure" : "adulterated",
          confidence: Math.floor(Math.random() * 20) + 80,
          colorAnalysis: Math.random() > 0.3 ? "No color change detected with lemon juice" : "Pink/violet color change detected",
          adulterant: Math.random() > 0.3 ? null : "Metanil Yellow"
        },
        honey: {
          purityStatus: Math.random() > 0.4 ? "pure" : "adulterated",
          confidence: Math.floor(Math.random() * 25) + 75,
          colorAnalysis: Math.random() > 0.4 ? "Honey did not absorb into tissue paper" : "Honey absorbed quickly into paper",
          adulterant: Math.random() > 0.4 ? null : "Sugar Syrup"
        },
        "black-pepper": {
          purityStatus: Math.random() > 0.5 ? "pure" : "adulterated",
          confidence: Math.floor(Math.random() * 30) + 70,
          colorAnalysis: Math.random() > 0.5 ? "Pure pepper powder floated properly" : "Foreign particles detected sinking",
          adulterant: Math.random() > 0.5 ? null : "Papaya Seeds"
        },
        "chili-powder": {
          purityStatus: Math.random() > 0.4 ? "pure" : "adulterated",
          confidence: Math.floor(Math.random() * 25) + 75,
          colorAnalysis: Math.random() > 0.4 ? "Natural reddish tinge in water" : "Intense artificial coloring detected",
          adulterant: Math.random() > 0.4 ? null : "Sudan Red Dye"
        },
        milk: {
          purityStatus: Math.random() > 0.6 ? "pure" : "adulterated",
          confidence: Math.floor(Math.random() * 20) + 80,
          colorAnalysis: Math.random() > 0.6 ? "Milk formed distinct white trail in water" : "Milk mixed too readily with water",
          adulterant: Math.random() > 0.6 ? null : "Water/Synthetic Milk"
        },
        ghee: {
          purityStatus: Math.random() > 0.5 ? "pure" : "adulterated",
          confidence: Math.floor(Math.random() * 25) + 75,
          colorAnalysis: Math.random() > 0.5 ? "Melted smoothly with pleasant aroma" : "Didn't melt properly, gritty texture detected",
          adulterant: Math.random() > 0.5 ? null : "Animal Fat/Vegetable Oil"
        },
        rice: {
          purityStatus: Math.random() > 0.4 ? "pure" : "adulterated",
          confidence: Math.floor(Math.random() * 30) + 70,
          colorAnalysis: Math.random() > 0.4 ? "Mild yellow-brown color with iodine" : "Deep blue/black color change detected",
          adulterant: Math.random() > 0.4 ? null : "Artificial Starch Powder"
        },
        salt: {
          purityStatus: Math.random() > 0.7 ? "pure" : "adulterated",
          confidence: Math.floor(Math.random() * 15) + 85,
          colorAnalysis: Math.random() > 0.7 ? "Completely dissolved with clear solution" : "White residue and particles detected",
          adulterant: Math.random() > 0.7 ? null : "Chalk Powder/Sand"
        },
        tea: {
          purityStatus: Math.random() > 0.5 ? "pure" : "adulterated",
          confidence: Math.floor(Math.random() * 25) + 75,
          colorAnalysis: Math.random() > 0.5 ? "No metallic particles attracted to magnet" : "Iron fillings detected and attracted",
          adulterant: Math.random() > 0.5 ? null : "Iron Fillings"
        }
      };

      const result = mockResults[foodItem.id as keyof typeof mockResults] || mockResults.turmeric;
      setIsAnalyzing(false);
      onAnalysisComplete(result);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative p-4">
      {/* Magical scanning animation when analyzing */}
      {isAnalyzing && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <motion.div
            className="w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
            animate={{ y: [0, window.innerHeight, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div 
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button variant="outline" size="icon" onClick={onBack} className="backdrop-blur-sm bg-card/80 hover:scale-105 transition-transform">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="h-6 w-6 text-yellow-500" />
            </motion.div>
            AI Magic Analysis
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="mb-6 backdrop-blur-md bg-card/90 border-2 border-pink-100/50 shadow-2xl">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div 
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                style={{ backgroundColor: `${foodItem.color}20` }}
              >
                <Camera className="h-8 w-8" style={{ color: foodItem.color }} />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Capture Test Result</h2>
                <p className="text-muted-foreground">
                  Take a photo of your {foodItem.name.toLowerCase()} test result for AI analysis
                </p>
              </div>

              {capturedImage ? (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border-2" style={{ borderColor: foodItem.color }}>
                    <img 
                      src={capturedImage} 
                      alt="Captured test result" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Badge variant="outline" className="animate-bounce bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300">
                          <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
                          🧠 AI Analyzing Magical Transformations...
                        </Badge>
                      </motion.div>
                      <div className="w-full bg-gradient-to-r from-pink-100 to-purple-100 rounded-full h-3 overflow-hidden">
                        <motion.div 
                          className="h-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500"
                          animate={{ width: ["0%", "100%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">✨ Detecting enchanted color patterns... ✨</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        onClick={analyzeImage}
                        className="w-full"
                        style={{ backgroundColor: foodItem.color }}
                      >
                        Analyze with AI
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCapturedImage(null)}
                        className="w-full"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Retake Photo
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div 
                    className="border-2 border-dashed rounded-lg p-8 cursor-pointer hover:bg-accent/10 transition-colors"
                    style={{ borderColor: foodItem.color }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Click to capture or upload image</p>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageCapture}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-pink-50/80 to-purple-50/80 backdrop-blur-md p-4 rounded-xl border border-pink-200/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-medium mb-2">💡 Tips for Best Results:</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Ensure good lighting</li>
            <li>• Keep the camera steady</li>
            <li>• Focus on the test area clearly</li>
            <li>• Include the entire test sample in frame</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}