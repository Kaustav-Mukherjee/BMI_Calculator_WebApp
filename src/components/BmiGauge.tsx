import { useMemo } from "react";

const categories = [
  { label: "Underweight", min: 10, max: 18.5, color: "#60A5FA" },
  { label: "Normal Weight", min: 18.5, max: 25, color: "#34D399" },
  { label: "Overweight", min: 25, max: 30, color: "#FBBF24" },
  { label: "Obese", min: 30, max: 35, color: "#FB923C" },
  { label: "Severely Obese", min: 35, max: 40, color: "#F87171" },
  { label: "Morbidly Obese", min: 40, max: 50, color: "#EF4444" },
];

interface BmiGaugeProps {
  bmi: number;
}

const BmiGauge = ({ bmi }: BmiGaugeProps) => {
  const clampedBmi = Math.min(Math.max(bmi, 10), 50);
  const percentage = ((clampedBmi - 10) / 40) * 100;

  const activeCategory = useMemo(() => {
    return categories.find((c) => bmi >= c.min && bmi < c.max) || categories[categories.length - 1];
  }, [bmi]);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>10</span>
        <span className="font-medium text-foreground">BMI Scale</span>
        <span>50</span>
      </div>
      <div className="relative h-4 rounded-full overflow-hidden flex">
        {categories.map((cat) => {
          const width = ((cat.max - cat.min) / 40) * 100;
          return (
            <div
              key={cat.label}
              style={{ width: `${width}%`, backgroundColor: cat.color }}
              className="h-full"
            />
          );
        })}
        {/* Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-[3px] border-foreground bg-background shadow-lg transition-all duration-700 ease-out"
          style={{ left: `${percentage}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center pt-1">
        {categories.map((cat) => (
          <div key={cat.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            <span className={cat.label === activeCategory.label ? "font-semibold text-foreground" : ""}>
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BmiGauge;
