import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface FoodItemCardProps {
  id: string;
  name: string;
  image: string;
  color: string;
  onClick: () => void;
}

export function FoodItemCard({ name, image, color, onClick }: FoodItemCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all duration-500 hover:shadow-2xl border-2 overflow-hidden backdrop-blur-sm bg-card/90 group relative"
      style={{ borderColor: color }}
      onClick={onClick}
    >
      {/* Magical sparkle effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="aspect-square relative overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Magical gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* Magical border glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, ${color}40, transparent, ${color}40)`,
            filter: 'blur(1px)'
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </motion.div>
            <h3 className="text-white font-semibold text-lg drop-shadow-lg">
              {name}
            </h3>
          </div>
          
          {/* Magical subtitle */}
          <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to test purity ✨
          </p>
        </div>

        {/* Corner sparkle */}
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-3 w-3 text-white" />
        </motion.div>
      </div>
    </Card>
  );
}