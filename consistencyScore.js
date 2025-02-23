import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function ConsistencyCalculator() {
  const [bestDayProfit, setBestDayProfit] = useState("");
  const [totalProfit, setTotalProfit] = useState("");
  const [targetScore, setTargetScore] = useState("");
  const [consistencyScore, setConsistencyScore] = useState(null);
  const [targetProfit, setTargetProfit] = useState(null);
  const [scalpTradesOne, setScalpTradesOne] = useState(null);
  const [scalpTradesTwo, setScalpTradesTwo] = useState([]);
  const [scalpTradesThree, setScalpTradesThree] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const calculateConsistency = () => {
    if (!bestDayProfit || !totalProfit || !targetScore || totalProfit == 0) return;
    const score = (parseFloat(bestDayProfit) / parseFloat(totalProfit)) * 100;
    setConsistencyScore(score.toFixed(2));
    calculateAdjustment(score);
  };

  const calculateAdjustment = () => {
    if (!targetScore || !bestDayProfit || !totalProfit) return;
    const parsedTargetScore = parseFloat(targetScore);
    const requiredTotalProfit = (parseFloat(bestDayProfit) * 100) / parsedTargetScore;
    const profitDifference = requiredTotalProfit - parseFloat(totalProfit);

    if (profitDifference <= 0) {
      setTargetProfit(null);
      setScalpTradesOne(null);
      setScalpTradesTwo([]);
      setScalpTradesThree([]);
      return;
    }
    
    setScalpTradesOne(Math.round(profitDifference));
    setScalpTradesTwo([Math.round(profitDifference / 2), Math.round(profitDifference / 2)]);
    setScalpTradesThree([Math.round(profitDifference / 3), Math.round(profitDifference / 3), Math.round(profitDifference / 3)]);
    setTargetProfit(Math.round(profitDifference));
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 min-h-screen transition-all ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className={`w-full max-w-md p-6 shadow-lg rounded-xl transition-all ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <CardContent className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Consistency Score</h2>
            <Button variant="ghost" onClick={toggleDarkMode} className="rounded-full p-2">
              {darkMode ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </Button>
          </div>
          <p className="text-sm text-gray-400">Calculate your consistency score and get tips to improve it.</p>
          {['Best trading day profit ($)', 'Total profit ($)', 'Target consistency score (%)'].map((placeholder, i) => (
            <Input key={i} className={`border p-3 rounded-md transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-200 border-gray-300 text-gray-900 focus:ring focus:ring-blue-400'}`} type="number" placeholder={placeholder} value={[bestDayProfit, totalProfit, targetScore][i]} onChange={(e) => [setBestDayProfit, setTotalProfit, setTargetScore][i](e.target.value)} />
          ))}
          <Button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-all" onClick={calculateConsistency}>Calculate</Button>
          {consistencyScore !== null && <p className="text-lg font-semibold">Consistency Score: {consistencyScore}%</p>}
          {targetScore && <p className="text-lg font-semibold">Target Consistency Score: {targetScore}%</p>}
          {targetProfit !== null && (
            <div className="text-lg font-semibold">Adjust Profit Per Trade:
              <p>In one Trade: <span class='text-green-400 font-bold'>${scalpTradesOne}</span></p>
              <p>OR</p>
              <p>In Two Trades: <span class='text-green-400 font-bold'>${scalpTradesTwo[0]}</span></p>
              <p>OR</p>
              <p>In Three Trades: <span class='text-green-400 font-bold'>${scalpTradesThree[0]}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
