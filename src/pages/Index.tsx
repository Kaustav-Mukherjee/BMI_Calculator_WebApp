import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import BmiGauge from "@/components/BmiGauge";
import HealthRecommendations from "@/components/HealthRecommendations";
import { Calculator, RotateCcw } from "lucide-react";

const Index = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; name: string } | null>(null);
  const [phase, setPhase] = useState<"form" | "morphing" | "results">("form");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!name.trim() || isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;
    const bmi = (w * 703) / (h * h);
    setResult({ bmi, name: name.trim() });
    setPhase("morphing");
    // Allow the form to fade out, then show results
    timeoutRef.current = setTimeout(() => setPhase("results"), 400);
  };

  const handleReset = () => {
    setPhase("morphing");
    timeoutRef.current = setTimeout(() => {
      setResult(null);
      setName("");
      setWeight("");
      setHeight("");
      setPhase("form");
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const showForm = phase === "form" || (phase === "morphing" && !result);
  const showResults = phase === "results" || (phase === "morphing" && !!result);

  const bmiCategory = result
    ? result.bmi < 18.5 ? "Underweight" : result.bmi < 25 ? "Normal Weight" : result.bmi < 30 ? "Overweight" : result.bmi < 35 ? "Obese" : result.bmi < 40 ? "Severely Obese" : "Morbidly Obese"
    : "";
  const bmiColor = result
    ? result.bmi < 18.5 ? "text-blue-500" : result.bmi < 25 ? "text-emerald-500" : result.bmi < 30 ? "text-yellow-500" : result.bmi < 35 ? "text-orange-500" : result.bmi < 40 ? "text-red-400" : "text-red-600"
    : "";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full flex items-center justify-center">

        {/* Form */}
        <div
          className="w-full max-w-md space-y-6 transition-all duration-500 ease-in-out"
          style={{
            opacity: showForm && phase !== "morphing" ? 1 : 0,
            transform: showForm && phase !== "morphing" ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
            pointerEvents: showForm && phase !== "morphing" ? "auto" : "none",
            position: showResults || (phase === "morphing" && !!result) ? "absolute" : "relative",
          }}
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-2">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">BMI Calculator</h1>
            <p className="text-sm text-muted-foreground">
              Calculate your Body Mass Index and get personalized health tips.
            </p>
          </div>
          <Card className="rounded-2xl shadow-sm border">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl h-11" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-sm font-medium">Weight (lbs)</Label>
                  <Input id="weight" type="number" placeholder="e.g. 154" value={weight} onChange={(e) => setWeight(e.target.value)} className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm font-medium">Height (in)</Label>
                  <Input id="height" type="number" placeholder="e.g. 69" value={height} onChange={(e) => setHeight(e.target.value)} className="rounded-xl h-11" />
                </div>
              </div>
              <Button onClick={handleCalculate} className="w-full rounded-xl h-11 text-sm font-medium">
                Calculate BMI
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Bento Grid */}
        <div
          className="w-full max-w-4xl transition-all duration-700 ease-out"
          style={{
            opacity: showResults && phase !== "morphing" ? 1 : 0,
            transform: showResults && phase !== "morphing" ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
            pointerEvents: showResults && phase !== "morphing" ? "auto" : "none",
            position: showForm && phase !== "morphing" ? "absolute" : "relative",
          }}
        >
          {result && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-min">
              {/* BMI Score */}
              <Card
                className="rounded-2xl shadow-sm border md:row-span-2 flex flex-col justify-center transition-all duration-700 ease-out"
                style={{
                  opacity: phase === "results" ? 1 : 0,
                  transform: phase === "results" ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "100ms",
                }}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Your BMI</p>
                  <p className="text-6xl font-bold tracking-tight text-foreground">
                    {result.bmi.toFixed(1)}
                  </p>
                  <p className={`text-lg font-semibold ${bmiColor}`}>{bmiCategory}</p>
                  <p className="text-xs text-muted-foreground">
                    {result.name} · {weight} lbs · {height} in
                  </p>
                  <Button variant="outline" size="sm" onClick={handleReset} className="rounded-xl mt-2 gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    Recalculate
                  </Button>
                </CardContent>
              </Card>

              {/* Gauge */}
              <Card
                className="rounded-2xl shadow-sm border md:col-span-2 transition-all duration-700 ease-out"
                style={{
                  opacity: phase === "results" ? 1 : 0,
                  transform: phase === "results" ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "200ms",
                }}
              >
                <CardContent className="p-5">
                  <BmiGauge bmi={result.bmi} />
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card
                className="rounded-2xl shadow-sm border md:col-span-2 transition-all duration-700 ease-out"
                style={{
                  opacity: phase === "results" ? 1 : 0,
                  transform: phase === "results" ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: "300ms",
                }}
              >
                <CardContent className="p-5">
                  <HealthRecommendations bmi={result.bmi} name={result.name} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Index;
