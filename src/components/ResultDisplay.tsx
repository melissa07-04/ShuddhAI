import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, CheckCircle, AlertTriangle, RotateCcw, Home } from "lucide-react";

interface ResultDisplayProps {
  foodItem: {
    id: string;
    name: string;
    color: string;
  };
  result: {
    purityStatus: "pure" | "adulterated";
    confidence: number;
    colorAnalysis: string;
    adulterant?: string;
  };
  onBack: () => void;
  onRetake: () => void;
  onHome: () => void;
}

export function ResultDisplay({ foodItem, result, onBack, onRetake, onHome }: ResultDisplayProps) {
  const isPure = result.purityStatus === "pure";
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Test Results</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {isPure ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-500" />
              )}
              {foodItem.name} Analysis Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div 
                className={`inline-flex items-center px-6 py-3 rounded-full text-white font-medium text-lg mb-4 ${
                  isPure ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {isPure ? '✓ PURE' : '⚠ ADULTERATED'}
              </div>
              <p className="text-muted-foreground">
                Confidence: {result.confidence}%
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-accent/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">🔬 Color Analysis:</h3>
                <p className="text-sm">{result.colorAnalysis}</p>
              </div>

              {result.adulterant && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-red-800">⚠️ Adulterant Detected:</h3>
                  <p className="text-sm text-red-700">{result.adulterant}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-blue-800">📚 What this means:</h3>
                <p className="text-sm text-blue-700">
                  {isPure ? (
                    `Your ${foodItem.name.toLowerCase()} appears to be pure based on the chemical test performed. No adulterants were detected in this sample.`
                  ) : (
                    `The test indicates potential adulteration in your ${foodItem.name.toLowerCase()}. Consider purchasing from a different source and always buy from trusted vendors.`
                  )}
                </p>
              </div>

              {!isPure && (
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-orange-800">💡 Recommendations:</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Avoid consuming this batch</li>
                    <li>• Purchase from certified organic stores</li>
                    <li>• Look for FSSAI certification</li>
                    <li>• Test different brands regularly</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onRetake}
            className="flex-1"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Test Again
          </Button>
          <Button
            onClick={onHome}
            className="flex-1"
            style={{ backgroundColor: foodItem.color }}
          >
            <Home className="h-4 w-4 mr-2" />
            Test Another Item
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            This is an indicative test. For definitive results, consult a certified food testing laboratory.
          </p>
        </div>
      </div>
    </div>
  );
}