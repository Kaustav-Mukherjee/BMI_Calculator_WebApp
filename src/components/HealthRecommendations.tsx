import { Heart, Utensils, Activity, AlertTriangle } from "lucide-react";

interface HealthRecommendationsProps {
  bmi: number;
  name: string;
}

const getCategory = (bmi: number) => {
  if (bmi < 18.5) return { label: "Underweight", risk: "Minimal", color: "text-blue-500" };
  if (bmi < 25) return { label: "Normal Weight", risk: "Minimal", color: "text-emerald-500" };
  if (bmi < 30) return { label: "Overweight", risk: "Increased", color: "text-yellow-500" };
  if (bmi < 35) return { label: "Obese", risk: "High", color: "text-orange-500" };
  if (bmi < 40) return { label: "Severely Obese", risk: "Very High", color: "text-red-400" };
  return { label: "Morbidly Obese", risk: "Extremely High", color: "text-red-600" };
};

const recommendations: Record<string, { icon: typeof Heart; tips: string[] }[]> = {
  Underweight: [
    { icon: Utensils, tips: ["Increase calorie intake with nutrient-dense foods", "Add healthy fats like avocados, nuts, and olive oil"] },
    { icon: Activity, tips: ["Focus on strength training to build muscle mass", "Avoid excessive cardio that burns too many calories"] },
    { icon: Heart, tips: ["Consult a healthcare provider to rule out underlying conditions", "Consider vitamin and mineral supplements"] },
  ],
  "Normal Weight": [
    { icon: Utensils, tips: ["Maintain a balanced diet rich in fruits, vegetables, and lean protein", "Stay hydrated — aim for 8 glasses of water daily"] },
    { icon: Activity, tips: ["Stay active with at least 150 minutes of moderate exercise per week", "Mix cardio with strength training for optimal health"] },
    { icon: Heart, tips: ["Keep up regular health check-ups", "Prioritize sleep and stress management"] },
  ],
  Overweight: [
    { icon: Utensils, tips: ["Reduce portion sizes and limit processed foods", "Increase fiber intake to feel fuller longer"] },
    { icon: Activity, tips: ["Aim for 200–300 minutes of moderate activity per week", "Try walking, swimming, or cycling to start"] },
    { icon: Heart, tips: ["Monitor blood pressure and cholesterol regularly", "Set realistic, gradual weight loss goals (1–2 lbs/week)"] },
  ],
  Obese: [
    { icon: Utensils, tips: ["Work with a dietitian to create a sustainable meal plan", "Cut sugary drinks and replace with water or herbal tea"] },
    { icon: Activity, tips: ["Start with low-impact exercises like walking or water aerobics", "Gradually increase duration and intensity"] },
    { icon: AlertTriangle, tips: ["Consult your doctor about a comprehensive weight management plan", "Screen for diabetes, sleep apnea, and heart disease"] },
  ],
  "Severely Obese": [
    { icon: Utensils, tips: ["Seek professional dietary guidance for safe, structured meal planning", "Focus on whole foods and eliminate ultra-processed items"] },
    { icon: Activity, tips: ["Begin with gentle daily movement — even 10 minutes helps", "Work with a physical therapist if mobility is limited"] },
    { icon: AlertTriangle, tips: ["Medical supervision is strongly recommended", "Discuss all options with your healthcare team including behavioral therapy"] },
  ],
  "Morbidly Obese": [
    { icon: Utensils, tips: ["A medically supervised diet program is recommended", "Small, consistent dietary changes lead to lasting results"] },
    { icon: Activity, tips: ["Chair exercises or aquatic therapy can be gentle starting points", "Any movement counts — focus on what feels manageable"] },
    { icon: AlertTriangle, tips: ["Please consult a healthcare professional as soon as possible", "Discuss surgical and medical intervention options with your doctor"] },
  ],
};

const HealthRecommendations = ({ bmi, name }: HealthRecommendationsProps) => {
  const category = getCategory(bmi);
  const tips = recommendations[category.label] || recommendations["Normal Weight"];

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <p className="text-muted-foreground text-sm">
          {name}, your BMI category is
        </p>
        <p className={`text-xl font-bold ${category.color}`}>{category.label}</p>
        <p className="text-xs text-muted-foreground">
          Health Risk: <span className="font-medium">{category.risk}</span>
        </p>
      </div>

      <div className="space-y-3">
        {tips.map((section, i) => {
          const Icon = section.icon;
          return (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-muted/50">
              <div className="mt-0.5">
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {section.tips.map((tip, j) => (
                  <li key={j}>• {tip}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HealthRecommendations;
