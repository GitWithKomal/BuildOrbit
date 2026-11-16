# BuildOrbit

**Build. Orchestrate. Observe.**

BuildOrbit is a React + Vite portfolio dashboard presenting an AWS EKS and Kubernetes capstone as an evidence-led cloud engineering console.

## Technology
- React
- Vite
- JavaScript / JSX
- CSS
- Recharts
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Interactive features
- Sidebar navigation scrolls to each dashboard section.
- Click the overview metrics, architecture panel, worker nodes, application workloads, pipeline steps, monitoring components, configuration cards, or evidence tiles to open a detail panel.
- Detail panels can be closed using the close button or backdrop.
- The dashboard is responsive for desktop and mobile layouts.

## Accuracy note
The AWS EKS environment was destroyed after the lab to avoid ongoing charges. BuildOrbit is a historical project showcase, not a live AWS console. The resource chart contains illustrative sample values and is labelled as demo data. Replace the evidence placeholders with original screenshots before publishing.

## Project structure

```text
BuildOrbit/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    └── style.css
```
