
# BMI Calculator Web App

A clean, modern BMI calculator based on your Python notebook, with visual charts and personalized health recommendations.

## Features

### BMI Calculator Form
- Input fields for name, weight (pounds), and height (inches)
- Large, rounded input fields with smooth focus animations
- Calculate button with subtle hover effect
- Formula: BMI = (weight × 703) / (height²)

### Results Display
- Animated BMI score shown prominently
- Color-coded category badge (Underweight, Normal, Overweight, Obese, Severely Obese, Morbidly Obese)
- Personalized greeting using the entered name

### BMI Scale Chart
- A horizontal gauge/meter showing where the user's BMI falls on the spectrum
- Color gradient from green (normal) through yellow (overweight) to red (obese)
- Marker indicating the user's position

### Health Recommendations
- Tailored tips based on BMI category (diet, exercise, lifestyle suggestions)
- Health risk level indicator (Minimal, Increased, High, Very High, Extremely High)
- Gentle, encouraging tone throughout

### Design
- Minimal white/light background with soft shadows
- Rounded corners on all cards and inputs
- Clean typography, plenty of whitespace
- Fully responsive (mobile-friendly)
- Subtle entrance animations for results

## Technical Notes
- Single-page React app using existing Tailwind + shadcn/ui components
- Recharts library for the BMI scale visualization
- All logic runs client-side, no backend needed
