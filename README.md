# BuildOrbit

### Build. Orchestrate. Observe.

**BuildOrbit** is an interactive DevOps engineering dashboard that presents a cloud-native application deployment project through a centralized, evidence-oriented interface. It brings together infrastructure architecture, CI/CD workflows, Kubernetes workloads, monitoring components, configuration files, and source code exploration.

<p align="center">
  <a href="https://gitwithkomal.github.io/BuildOrbit/">Live Application</a> ·
  <a href="https://github.com/GitWithKomal/BuildOrbit">Source Code</a> ·
  <a href="https://github.com/GitWithKomal/BuildOrbit/actions">GitHub Actions</a>
</p>

---

## Project Overview

BuildOrbit provides a visual walkthrough of a DevOps project, helping developers and reviewers understand how application code, containerization, infrastructure automation, deployment pipelines, Kubernetes, and monitoring fit together.

Instead of navigating through multiple folders and configuration files, users can explore the project through an interactive dashboard.

## Architecture

### 1. BuildOrbit Application Architecture

This diagram represents the dashboard's application structure and its source-code exploration functionality.

```mermaid
flowchart TD
    A["User / Recruiter"] --> B["BuildOrbit Dashboard"]
    B --> C["React + Vite Application"]

    C --> D["Overview"]
    C --> E["Infrastructure Architecture"]
    C --> F["CI/CD Pipeline"]
    C --> G["Kubernetes Workloads"]
    C --> H["Monitoring"]
    C --> I["Configuration"]
    C --> J["Evidence Library"]

    I --> K["Source Explorer"]
    K --> L["Manifest JSON"]
    L --> M["Source File Archive"]

    K --> N["Search and Filters"]
    K --> O["Expandable Folder Tree"]
    K --> P["Syntax Highlighting"]
    K --> Q["Code Viewer and Copy"]
```

### 2. BuildOrbit Deployment Architecture

This diagram shows how the BuildOrbit frontend is built and published.

```mermaid
flowchart TD
    A["Developer"] --> B["Git Repository"]
    B --> C["GitHub Actions Workflow"]

    C --> D["Checkout Source Code"]
    D --> E["Setup Node.js"]
    E --> F["Install Dependencies"]
    F --> G["Vite Production Build"]

    G --> H["dist/ Build Artifact"]
    H --> I["GitHub Pages Deployment"]
    I --> J["Public BuildOrbit Website"]
    J --> K["Recruiters and Visitors"]
```

### 3. DevOps Project Delivery Architecture

The following conceptual diagram represents the technologies and deployment workflow documented in the archived capstone source.

```mermaid
flowchart TD
    A["Developer"] --> B["Git Repository"]
    B --> C["GitHub Actions"]
    B --> D["AWS CodePipeline"]

    C --> E["Build and Deployment Workflows"]
    D --> F["Buildspec Files"]

    E --> G["Container Image Build"]
    F --> G

    G --> H["Amazon ECR"]
    H --> I["Kubernetes Deployment"]

    T["Terraform"] --> J["Amazon EKS"]
    I --> J

    J --> K["Frontend Service"]
    J --> L["Backend Service"]
    J --> M["Database Service"]

    J --> N["Monitoring Stack"]
    N --> O["Prometheus"]
    N --> P["Grafana"]
    N --> Q["Blackbox Exporter"]
    N --> R["Alertmanager"]

    S["Helm"] --> J
    U["Ansible"] --> V["Configuration Automation"]
```

*The DevOps architecture represents the documented capstone workflow, not infrastructure currently running in AWS.*

---

## Key Features

- **Interactive Dashboard:** Centralized view of the project's DevOps components.
- **Architecture Visualization:** Understand application delivery and infrastructure workflows.
- **CI/CD Pipeline View:** Explore build, containerization, and deployment stages.
- **Kubernetes Overview:** Review cluster components, workloads, and deployment configuration.
- **Monitoring Overview:** Explore Prometheus, Grafana, Blackbox Exporter, and Alertmanager.
- **Configuration Explorer:** Navigate infrastructure and deployment configuration sections.
- **Source Explorer:** Browse archived source code through an expandable nested folder structure.
- **Code Viewer:** Search files, filter by category, view syntax-highlighted code, and copy file contents.
- **Responsive Interface:** Designed for desktop and mobile viewing.

## Technology Stack

### BuildOrbit Application

<p align="center">
  <img src="https://img.shields.io/badge/React-UI-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-Styling-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Highlight.js-Syntax%20Highlighting-222222" alt="Highlight.js">
  <img src="https://img.shields.io/badge/Recharts-Data%20Visualization-22B5BF" alt="Recharts">
  <img src="https://img.shields.io/badge/Lucide-Icons-F56565" alt="Lucide">
</p>

### Development and Deployment

<p align="center">
  <img src="https://img.shields.io/badge/Linux-Development%20Environment-FCC624?logo=linux&logoColor=black" alt="Linux">
  <img src="https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white" alt="GitHub">
  <img src="https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions">
  <img src="https://img.shields.io/badge/GitHub%20Pages-Deployment-222222?logo=githubpages&logoColor=white" alt="GitHub Pages">
  <img src="https://img.shields.io/badge/npm-Package%20Management-CB3837?logo=npm&logoColor=white" alt="npm">
</p>

### DevOps Technologies Demonstrated in the Archived Capstone

<p align="center">
  <img src="https://img.shields.io/badge/Linux-Ubuntu-orange?logo=linux&logoColor=white" alt="Linux">
  <img src="https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white" alt="GitHub">
  <img src="https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions">
  <img src="https://img.shields.io/badge/AWS-Cloud-FF9900?logo=amazonaws&logoColor=white" alt="AWS">
  <img src="https://img.shields.io/badge/AWS%20CodePipeline-CI%2FCD-FF9900?logo=amazonaws&logoColor=white" alt="AWS CodePipeline">
  <img src="https://img.shields.io/badge/Amazon%20ECR-Container%20Registry-FF9900?logo=amazonaws&logoColor=white" alt="Amazon ECR">
  <img src="https://img.shields.io/badge/Amazon%20EKS-Kubernetes-FF9900?logo=amazonaws&logoColor=white" alt="Amazon EKS">
  <img src="https://img.shields.io/badge/Terraform-Infrastructure%20as%20Code-7B42BC?logo=terraform&logoColor=white" alt="Terraform">
  <img src="https://img.shields.io/badge/Docker-Containers-2496ED?logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Docker%20Compose-Multi--Container-2496ED?logo=docker&logoColor=white" alt="Docker Compose">
  <img src="https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?logo=kubernetes&logoColor=white" alt="Kubernetes">
  <img src="https://img.shields.io/badge/Helm-Kubernetes%20Packages-0F1689?logo=helm&logoColor=white" alt="Helm">
  <img src="https://img.shields.io/badge/Ansible-Automation-EE0000?logo=ansible&logoColor=white" alt="Ansible">
  <img src="https://img.shields.io/badge/NGINX-Web%20Server-009639?logo=nginx&logoColor=white" alt="NGINX">
  <img src="https://img.shields.io/badge/Prometheus-Monitoring-E6522C?logo=prometheus&logoColor=white" alt="Prometheus">
  <img src="https://img.shields.io/badge/Grafana-Observability-F46800?logo=grafana&logoColor=white" alt="Grafana">
  <img src="https://img.shields.io/badge/Blackbox%20Exporter-Probing-CC3333" alt="Blackbox Exporter">
  <img src="https://img.shields.io/badge/Alertmanager-Alerting-E6522C?logo=prometheus&logoColor=white" alt="Alertmanager">
  <img src="https://img.shields.io/badge/Bash-Scripting-4EAA25?logo=gnubash&logoColor=white" alt="Bash">
  <img src="https://img.shields.io/badge/YAML-Configuration-CB171E?logo=yaml&logoColor=white" alt="YAML">
</p>

## Source Code Explorer

The dashboard includes a dedicated Source Explorer for browsing the archived capstone project files.

It supports:

- Nested directory navigation.
- Expandable and collapsible folders.
- File search and category filters.
- Syntax-highlighted source code.
- File selection and code viewing.
- Copying file contents.

### Source Archive Structure

```text
public/
└── source-full/
    ├── manifest.json
    ├── codepipeline/
    ├── kubernetes-deployment/
    ├── kubernetes-monitoring/
    ├── multi-service-app/
    ├── terraform-codepipeline/
    ├── terraform-eks/
    └── workflow-archive/
```

## Run Locally

### Prerequisites

- Node.js
- npm
- Git

### Installation

```bash
git clone https://github.com/GitWithKomal/BuildOrbit.git
cd BuildOrbit
npm install
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

The production output is generated in the `dist/` directory.

## Project Structure

```text
BuildOrbit/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── source-full/
│       ├── manifest.json
│       ├── codepipeline/
│       ├── kubernetes-deployment/
│       ├── kubernetes-monitoring/
│       ├── multi-service-app/
│       ├── terraform-codepipeline/
│       ├── terraform-eks/
│       └── workflow-archive/
├── src/
│   ├── SourceExplorer.jsx
│   ├── main.jsx
│   ├── sourceExplorer.css
│   └── style.css
├── index.html
├── vite.config.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Deployment

BuildOrbit is deployed using **GitHub Pages** with an automated GitHub Actions workflow.

On every push to the `main` branch:

1. GitHub Actions checks out the repository.
2. Node.js dependencies are installed.
3. Vite builds the production application.
4. The generated `dist/` directory is uploaded as a Pages artifact.
5. GitHub Pages publishes the application.

**Live URL:** https://gitwithkomal.github.io/BuildOrbit/

**Deployment Workflow:** https://github.com/GitWithKomal/BuildOrbit/actions

## Important Project Notes

- The AWS EKS environment used during the capstone lab was destroyed after the exercise to avoid ongoing cloud charges.
- BuildOrbit is a project showcase, not a live AWS management console.
- Dashboard resource metrics that use illustrative sample values are demo data, not real-time cluster telemetry.
- Archived source files are provided for exploration and learning. Sensitive credentials and environment-specific state files should not be committed.
- The architecture diagrams explain the documented project workflow; they should not be interpreted as proof of currently running infrastructure.

## Author

**Komal Nimje**

Software Engineer | DevOps

- GitHub: https://github.com/GitWithKomal
- Portfolio: https://komal-portfolio-nine-alpha.vercel.app

---

<p align="center">
  <strong>Build. Orchestrate. Observe.</strong><br/>
  Exploring the engineering behind cloud-native applications and DevOps automation.
</p>