import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  Archive,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  GitBranch,
  Gauge,
  HardDrive,
  LayoutDashboard,
  Menu,
  Network,
  Search,
  Server,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./style.css";
import SourceExplorer from "./SourceExplorer";

const history = [
  { t: "09:00", cpu: 31, mem: 46 },
  { t: "09:10", cpu: 38, mem: 49 },
  { t: "09:20", cpu: 34, mem: 52 },
  { t: "09:30", cpu: 47, mem: 55 },
  { t: "09:40", cpu: 41, mem: 53 },
  { t: "09:50", cpu: 36, mem: 50 },
  { t: "10:00", cpu: 43, mem: 57 },
];

const nav = [
  ["Overview", LayoutDashboard],
  ["Architecture", Network],
  ["Cluster health", Activity],
  ["Delivery pipeline", Workflow],
  ["Observability", Gauge],
  ["Configuration", Code2],
  ["Evidence library", Archive],
];

const evidenceItems = [
  {
    n: "01",
    name: "Kubernetes deployments",
    description: "kubectl · deployments across namespaces",
    image: "evidence/kubernetes/kubernetes-deployments.png",
  },
  {
    n: "02",
    name: "Deployment details",
    description: "kubectl · deployment status and wide output",
    image: "evidence/kubernetes/kubernetes-deployments-wide.png",
  },
  {
    n: "03",
    name: "Kubernetes networking",
    description: "Kubernetes · networking resources",
    image: "evidence/kubernetes/kubernetes-networking.png",
  },
  {
    n: "04",
    name: "Prometheus graph",
    description: "Prometheus · monitoring graph",
    image: "evidence/prometheus/prometheus-graph.png",
  },
  {
    n: "05",
    name: "Prometheus health",
    description: "Prometheus · health verification",
    image: "evidence/prometheus/prometheus-health.png",
  },
  {
    n: "06",
    name: "Grafana dashboard",
    description: "Grafana · Kubernetes monitoring view",
    image: "evidence/grafana/grafana-dashboard.png",
  },
];

const detailCopy = {
  "EKS cluster": {
    title: "Amazon EKS · mycluster",
    eyebrow: "CLUSTER SUMMARY",
    body: "The managed Kubernetes control plane ran in ap-south-1. The cluster has since been intentionally destroyed as part of AWS cost cleanup.",
    facts: [
      "Region: ap-south-1",
      "Kubernetes version: 1.34.12",
      "Current state: Archived / offline",
    ],
  },
  "Worker nodes": {
    title: "Worker node history",
    eyebrow: "KUBERNETES COMPUTE",
    body: "Two managed worker nodes were verified Ready during the lab session. These are historical records; no EC2 instances are currently running for this capstone.",
    facts: ["ip-10-0-1-10", "ip-10-0-2-131", "Node group: standard"],
  },
  "App services": {
    title: "Application services",
    eyebrow: "WORKLOAD TOPOLOGY",
    body: "The application was organised into frontend, backend and MongoDB services. The backend exposed a /metrics endpoint for Prometheus scraping.",
    facts: [
      "Frontend: web interface",
      "Backend: REST API + /metrics",
      "MongoDB: persistence service",
    ],
  },
  "Prometheus targets": {
    title: "Prometheus target verification",
    eyebrow: "OBSERVABILITY",
    body: "Prometheus targets were observed in the UP state during the completed lab session. This is not a live connection now that the EKS environment has been removed.",
    facts: [
      "Prometheus",
      "kube-state-metrics",
      "Node Exporter",
      "Application backend",
    ],
  },
  Architecture: {
    title: "Platform architecture",
    eyebrow: "REFERENCE DESIGN",
    body: "The application ran inside an Amazon EKS cluster in a VPC, with two worker nodes hosting frontend, backend and database workloads. Monitoring was provided by the kube-prometheus-stack.",
    facts: [
      "AWS VPC → Amazon EKS",
      "Two worker nodes",
      "Frontend → Backend → MongoDB",
      "Prometheus + Grafana",
    ],
  },
  "Observability layer": {
    title: "Observability layer",
    eyebrow: "MONITORING",
    body: "The monitoring stack included Prometheus, Grafana, Alertmanager, Node Exporter and kube-state-metrics. Dashboards and target status were verified before teardown.",
    facts: [
      "Metrics collection: Prometheus",
      "Visualisation: Grafana",
      "Alert routing: Alertmanager",
    ],
  },
  "Data layer": {
    title: "Application data layer",
    eyebrow: "PERSISTENCE",
    body: "MongoDB was deployed as the application persistence service. The diagram represents the historical lab architecture, not a running database.",
    facts: [
      "Service: MongoDB",
      "Workload: database tier",
      "Current state: offline",
    ],
  },
  "Worker node 01": {
    title: "Worker node 01",
    eyebrow: "NODE DETAIL",
    body: "First worker node observed Ready in the EKS cluster during the lab.",
    facts: [
      "Node: ip-10-0-1-10",
      "Availability zone: ap-south-1a",
      "Kubernetes: v1.34.12",
      "Current state: terminated with cluster",
    ],
  },
  "Worker node 02": {
    title: "Worker node 02",
    eyebrow: "NODE DETAIL",
    body: "Second worker node observed Ready in the EKS cluster during the lab.",
    facts: [
      "Node: ip-10-0-2-131",
      "Availability zone: ap-south-1b",
      "Kubernetes: v1.34.12",
      "Current state: terminated with cluster",
    ],
  },
  Frontend: {
    title: "Frontend service",
    eyebrow: "APPLICATION WORKLOAD",
    body: "The frontend served the application interface from a Kubernetes deployment.",
    facts: [
      "Resource type: Deployment",
      "Role: Web interface",
      "Historical state: deployed during lab",
    ],
  },
  Backend: {
    title: "Backend service",
    eyebrow: "APPLICATION WORKLOAD",
    body: "The backend exposed REST API functionality and a Prometheus metrics endpoint.",
    facts: [
      "Resource type: Deployment",
      "Metrics endpoint: /metrics",
      "Historical state: deployed during lab",
    ],
  },
  MongoDB: {
    title: "MongoDB service",
    eyebrow: "APPLICATION WORKLOAD",
    body: "MongoDB provided the persistence layer for the multi-service application.",
    facts: ["Role: Database", "Historical state: deployed during lab"],
  },
  GitHub: {
    title: "GitHub source repository",
    eyebrow: "DELIVERY PIPELINE",
    body: "Source control for the application and infrastructure configuration.",
    facts: [
      "Source: GitHub repository",
      "Workflow files are retained in the archive",
    ],
  },
  "GitHub Actions": {
    title: "GitHub Actions workflows",
    eyebrow: "DELIVERY PIPELINE",
    body: "Workflow YAML files are retained under workflow-archive/ for review. They were moved out of .github/workflows and are not active.",
    facts: [
      "Frontend and backend deployment workflow definitions",
      "Monitoring workflow definition",
      "Terraform workflow definition",
      "Not currently running",
    ],
  },
  Terraform: {
    title: "Terraform infrastructure",
    eyebrow: "INFRASTRUCTURE AS CODE",
    body: "Terraform was used to provision the AWS EKS lab environment. The infrastructure was later destroyed to avoid ongoing charges.",
    facts: [
      "Directory: terraform-eks/",
      "Cluster: mycluster",
      "Region: ap-south-1",
    ],
  },
  "Amazon ECR": {
    title: "Amazon ECR registry",
    eyebrow: "CONTAINER REGISTRY",
    body: "ECR was part of the container delivery design. The repositories for this capstone were removed during cleanup.",
    facts: [
      "Registry: Amazon ECR",
      "Current state: repositories removed",
      "Images are not available in the AWS account",
    ],
  },
  "Amazon EKS": {
    title: "Amazon EKS deployment",
    eyebrow: "KUBERNETES PLATFORM",
    body: "The EKS cluster hosted the application workloads during the capstone. The cluster is now archived and offline.",
    facts: [
      "Cluster: mycluster",
      "Region: ap-south-1",
      "Current state: destroyed",
    ],
  },
  Prometheus: {
    title: "Prometheus",
    eyebrow: "MONITORING COMPONENT",
    body: "Collected metrics from Kubernetes components and the application backend during the lab.",
    facts: [
      "Targets were verified UP during the lab",
      "No live Prometheus server remains",
    ],
  },
  Grafana: {
    title: "Grafana",
    eyebrow: "MONITORING COMPONENT",
    body: "Provided Kubernetes dashboards for nodes, workloads, networking and Prometheus overview.",
    facts: [
      "Dashboards were viewed during the lab",
      "No live Grafana server remains",
    ],
  },
  Alertmanager: {
    title: "Alertmanager",
    eyebrow: "MONITORING COMPONENT",
    body: "Handled alert routing as part of the kube-prometheus-stack installation.",
    facts: [
      "Installed with kube-prometheus-stack",
      "Current state: removed during cleanup",
    ],
  },
  "Node Exporter": {
    title: "Node Exporter",
    eyebrow: "MONITORING COMPONENT",
    body: "Exposed host-level metrics from Kubernetes worker nodes during the lab.",
    facts: ["Part of kube-prometheus-stack", "Historical component only"],
  },
  "kube-state-metrics": {
    title: "kube-state-metrics",
    eyebrow: "MONITORING COMPONENT",
    body: "Exposed metrics about Kubernetes object state, including workloads and cluster resources.",
    facts: ["Part of kube-prometheus-stack", "Historical component only"],
  },
  "Terraform configuration": {
    title: "Terraform configuration",
    eyebrow: "SOURCE INVENTORY",
    body: "Open the terraform-eks folder in the project repository to inspect the infrastructure configuration.",
    facts: [
      "Folder: terraform-eks/",
      "Contains EKS infrastructure definitions",
    ],
  },
  "Kubernetes manifests": {
    title: "Kubernetes manifests",
    eyebrow: "SOURCE INVENTORY",
    body: "Application manifests define the frontend, backend and database resources.",
    facts: [
      "Folder: kubernetes-deployment/",
      "Deployment and service definitions",
    ],
  },
  "Helm values": {
    title: "Helm values",
    eyebrow: "SOURCE INVENTORY",
    body: "Monitoring configuration for the kube-prometheus-stack Helm deployment.",
    facts: ["Folder: kubernetes-monitoring/", "Prometheus and Grafana values"],
  },
  "Workflow archive": {
    title: "Workflow archive",
    eyebrow: "SOURCE INVENTORY",
    body: "Archived GitHub Actions workflow definitions retained as project reference material.",
    facts: ["Folder: workflow-archive/", "Not active in GitHub Actions"],
  },
};

function App() {
  const [active, setActive] = useState("Overview");
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState(null);
  const [activeEvidence, setActiveEvidence] = useState(null);

  React.useEffect(() => {
    if (!activeEvidence) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveEvidence(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeEvidence]);

  const openDetail = (key) =>
    setDetail(
      detailCopy[key] || {
        title: key,
        eyebrow: "PROJECT DETAIL",
        body: "This component is part of the BuildOrbit capstone dashboard.",
        facts: [
          "Historical project information",
          "Environment is archived and offline",
        ],
      },
    );

  const handleContentClick = (e) => {
    const item = e.target.closest("[data-detail]");
    if (item) openDetail(item.dataset.detail);
  };

  const handleContentKey = (e) => {
    if (
      (e.key === "Enter" || e.key === " ") &&
      e.target.matches("[data-detail]")
    ) {
      e.preventDefault();
      openDetail(e.target.dataset.detail);
    }
  };

  const jump = (s) => {
    setActive(s);
    setMobile(false);
    document
      .getElementById(s.toLowerCase().replaceAll(" ", "-"))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="shell">
      <aside className={`sidebar ${mobile ? "show" : ""}`}>
        <div className="brand">
          <div className="brandmark">
            <Cloud size={21} />
          </div>
          <div>
            <b>
              Build<span>Orbit</span>
            </b>
            <small>ENGINEERING CONSOLE</small>
          </div>
          <button className="close" onClick={() => setMobile(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="workspace">
          <div className="workspace-icon">K</div>
          <div>
            <b>Komal's Lab</b>
            <small>CAPSTONE ENVIRONMENT</small>
          </div>
          <span className="dots">•••</span>
        </div>

        <div className="nav-label">WORKSPACE</div>

        <nav>
          {nav.map(([n, I]) => (
            <button
              key={n}
              className={active === n ? "selected" : ""}
              onClick={() => jump(n)}
            >
              <I size={17} />
              {n}
              {n === "Evidence library" && <span className="nav-count">6</span>}
            </button>
          ))}
        </nav>

        <div className="side-bottom">
          <div className="offline-card">
            <div className="offline-icon">
              <Archive size={16} />
            </div>
            <div>
              <b>Environment archived</b>
              <small>Infrastructure safely torn down</small>
            </div>
          </div>

          <div className="profile">
            <div className="avatar">KN</div>
            <div>
              <b>Komal Nimje</b>
              <small>Software Engineer · DevOps</small>
            </div>
            <span className="dots">•••</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="hamb" onClick={() => setMobile(true)}>
            <Menu />
          </button>

          <div className="crumb">
            Projects <ChevronRight size={14} /> <b>BuildOrbit</b>
          </div>

          <div className="top-actions">
            <div className="search">
              <Search size={15} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search console"
              />
            </div>
            <span className="top-pill">
              <span className="dot gray" /> HISTORICAL VIEW
            </span>
            <div className="avatar small">KN</div>
          </div>
        </header>

        <div
          className="content"
          onClick={handleContentClick}
          onKeyDown={handleContentKey}
        >
          <section className="hero" id="overview">
            <div>
              <div className="eyebrow">
                <span className="live-dot" /> CLOUD-NATIVE CAPSTONE
                <span className="slash">/</span> PROJECT OVERVIEW
              </div>
              <h1>
                BuildOrbit<span>.</span>
              </h1>
              <p className="sub">
                A full-stack application platform on Amazon EKS, provisioned
                with Terraform and observed with Prometheus + Grafana.
              </p>
              <div className="hero-tags">
                <span>
                  <Cloud size={14} /> AWS · ap-south-1
                </span>
                <span>
                  <Boxes size={14} /> Kubernetes 1.34
                </span>
                <span>
                  <GitBranch size={14} /> Terraform
                </span>
              </div>
            </div>

            <div
              className="hero-status interactive"
              data-detail="EKS cluster"
              role="button"
              tabIndex="0"
              title="Open cluster details"
            >
              <div className="status-ring">
                <Archive size={23} />
              </div>
              <div>
                <span className="status-label">CURRENT STATE</span>
                <b>Archived</b>
                <small>Cluster destroyed · resources cleaned</small>
              </div>
            </div>
          </section>

          <div className="notice">
            <div className="notice-icon">
              <AlertTriangle size={17} />
            </div>
            <div>
              <b>Historical project view — not a live AWS connection</b>
              <p>
                The EKS cluster and supporting cloud resources have been
                destroyed to avoid ongoing charges. Metrics and health
                indicators below describe the verified lab session, not current
                telemetry.
              </p>
            </div>
            <span className="notice-tag">SAFE · OFFLINE</span>
          </div>

          <section className="metrics">
            <Metric
              icon={Server}
              label="EKS CLUSTER"
              value="mycluster"
              detail="Amazon EKS · ap-south-1"
            />
            <Metric
              icon={Cpu}
              label="WORKER NODES"
              value="2"
              detail="Both nodes reached Ready"
            />
            <Metric
              icon={Container}
              label="APP SERVICES"
              value="3"
              detail="Frontend · Backend · MongoDB"
            />
            <Metric
              icon={Activity}
              label="PROMETHEUS TARGETS"
              value="UP"
              detail="Targets verified during lab"
              good
            />
          </section>

          <section className="section" id="architecture">
            <div className="section-head">
              <div>
                <div className="eyebrow">01 / PLATFORM DESIGN</div>
                <h2>Architecture overview</h2>
                <p>
                  How application traffic moved through the Kubernetes platform.
                </p>
              </div>
              <span className="section-chip">REFERENCE ARCHITECTURE</span>
            </div>

            <div
              className="architecture"
              data-detail="Architecture"
              role="button"
              tabIndex="0"
              title="Open architecture details"
            >
              <div className="arch-cloud">
                <div className="arch-title">
                  <Cloud size={17} /> AWS CLOUD <span>ap-south-1</span>
                </div>

                <div className="vpc">
                  <div className="vpc-title">
                    <Network size={15} /> VPC · 10.0.0.0/16
                    <span>PRIVATE NETWORK</span>
                  </div>

                  <div className="eks">
                    <div className="eks-head">
                      <div className="eks-icon">
                        <Boxes size={19} />
                      </div>
                      <div>
                        <b>Amazon EKS · mycluster</b>
                        <small>Kubernetes control plane</small>
                      </div>
                      <span className="mini-state">ARCHIVED</span>
                    </div>

                    <div className="nodes">
                      <div className="node">
                        <div className="node-top">
                          <Server size={16} />
                          <b>Worker node 01</b>
                        </div>
                        <small>EC2 · ap-south-1a</small>
                        <div className="node-pods">
                          <span>Frontend</span>
                          <span>Backend</span>
                        </div>
                      </div>

                      <div className="node">
                        <div className="node-top">
                          <Server size={16} />
                          <b>Worker node 02</b>
                        </div>
                        <small>EC2 · ap-south-1b</small>
                        <div className="node-pods">
                          <span>MongoDB</span>
                          <span>App pods</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="arch-foot">
                    <span>
                      <ShieldCheck size={14} /> IAM / access control
                    </span>
                    <span>
                      <HardDrive size={14} /> ECR image registry
                    </span>
                    <span>
                      <Workflow size={14} /> GitHub Actions config
                    </span>
                  </div>
                </div>
              </div>

              <div className="arch-side">
                <div
                  className="side-box interactive"
                  data-detail="Observability layer"
                  role="button"
                  tabIndex="0"
                >
                  <div className="side-icon cyan">
                    <Gauge />
                  </div>
                  <b>Observability layer</b>
                  <p>Prometheus · Grafana · Alertmanager</p>
                  <span>Metrics & dashboards verified</span>
                </div>

                <div
                  className="side-box interactive"
                  data-detail="Data layer"
                  role="button"
                  tabIndex="0"
                >
                  <div className="side-icon purple">
                    <Database />
                  </div>
                  <b>Data layer</b>
                  <p>MongoDB service</p>
                  <span>Application persistence tier</span>
                </div>

                <div className="arch-legend">
                  <span>
                    <i className="legend-dot" /> Verified component
                  </span>
                  <span>
                    <i className="legend-dot muted" /> Archived infrastructure
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="cluster-health">
            <div className="section-head">
              <div>
                <div className="eyebrow">02 / KUBERNETES OPERATIONS</div>
                <h2>Cluster health snapshot</h2>
                <p>Last verified state captured before teardown.</p>
              </div>
              <span className="section-chip">HISTORICAL SNAPSHOT</span>
            </div>

            <div className="health-grid">
              <div className="panel node-panel">
                <div className="panel-title">
                  <div>
                    <b>Worker nodes</b>
                    <small>Amazon EKS managed node group</small>
                  </div>
                  <span className="tiny-tag">2 / 2 READY</span>
                </div>

                {["ip-10-0-1-10", "ip-10-0-2-131"].map((n) => (
                  <div
                    className="node-row interactive"
                    data-detail="Worker nodes"
                    role="button"
                    tabIndex="0"
                    key={n}
                  >
                    <div className="node-badge">
                      <Server size={16} />
                    </div>
                    <div className="node-info">
                      <b>{n}</b>
                      <small>EC2 · Kubernetes v1.34.12</small>
                    </div>
                    <span className="ready">
                      <CheckCircle2 size={14} /> Ready
                    </span>
                  </div>
                ))}

                <div className="panel-foot">
                  Node group <b>standard</b>
                  <span>2 worker nodes</span>
                </div>
              </div>

              <div className="panel workload-panel">
                <div className="panel-title">
                  <div>
                    <b>Application workloads</b>
                    <small>Service topology</small>
                  </div>
                  <Boxes size={18} />
                </div>

                {[
                  ["Frontend", "Deployment", "Web interface"],
                  ["Backend", "Deployment", "REST API + /metrics"],
                  ["MongoDB", "Stateful service", "Database layer"],
                ].map(([a, b, c]) => (
                  <div
                    className="work-row interactive"
                    data-detail={a}
                    role="button"
                    tabIndex="0"
                    key={a}
                  >
                    <div className="work-icon">
                      <Container size={15} />
                    </div>
                    <div>
                      <b>{a}</b>
                      <small>{c}</small>
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="delivery-pipeline">
            <div className="section-head">
              <div>
                <div className="eyebrow">03 / AUTOMATION</div>
                <h2>Delivery pipeline</h2>
                <p>
                  Infrastructure and application delivery components included in
                  the capstone.
                </p>
              </div>
              <span className="section-chip">CONFIGURATION ARCHIVED</span>
            </div>

            <div className="pipeline panel">
              {[
                ["GitHub", "Source code"],
                ["GitHub Actions", "Workflow definitions"],
                ["Terraform", "EKS infrastructure"],
                ["Amazon ECR", "Container images"],
                ["Amazon EKS", "Workload deployment"],
              ].map(([a, b], i) => (
                <React.Fragment key={a}>
                  <div
                    className="pipe-step interactive"
                    data-detail={a}
                    role="button"
                    tabIndex="0"
                  >
                    <div className="pipe-icon">
                      {
                        [
                          <GitBranch />,
                          <Workflow />,
                          <Code2 />,
                          <Container />,
                          <Boxes />,
                        ][i]
                      }
                    </div>
                    <b>{a}</b>
                    <small>{b}</small>
                    <span className="pipe-state">ARCHIVED</span>
                  </div>
                  {i !== 4 && <div className="pipe-arrow">→</div>}
                </React.Fragment>
              ))}
            </div>

            <div className="pipeline-note">
              <AlertTriangle size={15} />
              Workflow YAML files are retained in
              <code>workflow-archive/</code> for reference. They are not active
              GitHub Actions workflows.
            </div>
          </section>

          <section className="section" id="observability">
            <div className="section-head">
              <div>
                <div className="eyebrow">04 / TELEMETRY & INSIGHTS</div>
                <h2>Observability center</h2>
                <p>Monitoring stack and sample historical telemetry view.</p>
              </div>
              <span className="section-chip">LAB SESSION DATA</span>
            </div>

            <div className="obs-grid">
              <div className="panel chart-panel">
                <div className="panel-title">
                  <div>
                    <b>Resource utilisation · sample</b>
                    <small>
                      Illustrative chart layout — not exported cluster
                      measurements
                    </small>
                  </div>
                  <span className="tiny-tag">DEMO DATA</span>
                </div>

                <div className="chart-legend">
                  <span>
                    <i className="cpu-dot" /> CPU
                  </span>
                  <span>
                    <i className="mem-dot" /> Memory
                  </span>
                </div>

                <div className="chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={history}
                      margin={{ top: 10, right: 8, left: -22, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="cpuFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#29c5d8"
                            stopOpacity={0.25}
                          />
                          <stop
                            offset="95%"
                            stopColor="#29c5d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="memFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#8b7cf6"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b7cf6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        stroke="#202b3c"
                        strokeDasharray="3 5"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="t"
                        tick={{ fill: "#718096", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#718096", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        unit="%"
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#101a2a",
                          border: "1px solid #26354b",
                          borderRadius: 8,
                          color: "#eaf1fb",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="cpu"
                        name="CPU"
                        stroke="#29c5d8"
                        fill="url(#cpuFill)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="mem"
                        name="Memory"
                        stroke="#8b7cf6"
                        fill="url(#memFill)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-disclaimer">
                  Chart uses illustrative sample values to demonstrate the
                  dashboard component. Replace with exported Prometheus data or
                  remove before presenting as measured telemetry.
                </div>
              </div>

              <div className="panel stack-panel">
                <div className="panel-title">
                  <div>
                    <b>Monitoring stack</b>
                    <small>kube-prometheus-stack</small>
                  </div>
                  <Activity size={18} />
                </div>

                {[
                  ["Prometheus", "Metrics collection"],
                  ["Grafana", "Dashboards & visualisation"],
                  ["Alertmanager", "Alert routing"],
                  ["Node Exporter", "Host metrics"],
                  ["kube-state-metrics", "Kubernetes object state"],
                ].map(([a, b]) => (
                  <div
                    className="stack-row interactive"
                    data-detail={a}
                    role="button"
                    tabIndex="0"
                    key={a}
                  >
                    <div className="stack-check">
                      <CheckCircle2 size={15} />
                    </div>
                    <div>
                      <b>{a}</b>
                      <small>{b}</small>
                    </div>
                    <span>Verified</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="configuration">
            <div className="section-head">
              <div>
                <div className="eyebrow">05 / INFRASTRUCTURE AS CODE</div>
                <h2>Configuration inventory</h2>
                <p>
                  Project components retained locally for review and
                  reproducibility.
                </p>
              </div>
              <span className="section-chip">SOURCE RETAINED</span>
            </div>

            <div className="config-grid">
              {[
                [
                  "Terraform",
                  "terraform-eks/",
                  "EKS cluster and node group provisioning",
                  Code2,
                ],
                [
                  "Kubernetes manifests",
                  "kubernetes-deployment/",
                  "Frontend, backend and database resources",
                  Boxes,
                ],
                [
                  "Helm values",
                  "kubernetes-monitoring/",
                  "Prometheus and Grafana configuration",
                  Gauge,
                ],
                [
                  "Workflow archive",
                  "workflow-archive/",
                  "Archived deployment workflow definitions",
                  Workflow,
                ],
              ].map(([a, b, c, I]) => (
                <div
                  className="config-card interactive"
                  data-detail={a}
                  role="button"
                  tabIndex="0"
                  key={a}
                >
                  <div className="config-icon">
                    <I size={18} />
                  </div>
                  <div>
                    <b>{a}</b>
                    <code>{b}</code>
                    <p>{c}</p>
                  </div>
                  <ChevronRight size={16} />
                </div>
              ))}
            </div>

            <SourceExplorer />
          </section>

          <section className="section" id="evidence-library">
            <div className="section-head">
              <div>
                <div className="eyebrow">06 / PROJECT PROOF</div>
                <h2>Evidence library</h2>
                <p>
                  Original screenshots captured during the BuildOrbit Kubernetes
                  and monitoring lab.
                </p>
              </div>
              <span className="section-chip">6 SCREENSHOTS</span>
            </div>

            <div className="evidence-grid">
              {evidenceItems.map((item) => (
                <div
                  className="evidence-card"
                  key={item.n}
                  role="button"
                  tabIndex="0"
                  onClick={() => setActiveEvidence(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveEvidence(item);
                    }
                  }}
                  title="Click to view full screenshot"
                >
                  <div className="evidence-preview evidence-image">
                    <img
                      src={`${import.meta.env.BASE_URL}${item.image}`}
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="evidence-meta">
                    <div>
                      <small>EXHIBIT {item.n}</small>
                      <b>{item.name}</b>
                      <p>{item.description}</p>
                    </div>
                    <span className="verified">ADDED</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="evidence-hint">
              <Archive size={16} />
              Screenshots are historical evidence from the completed lab
              session. The AWS environment is currently archived.
            </div>
          </section>

          {activeEvidence && (
            <div
              className="evidence-lightbox"
              onClick={() => setActiveEvidence(null)}
            >
              <div
                className="evidence-lightbox-content"
                role="dialog"
                aria-modal="true"
                aria-label={activeEvidence.name}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="evidence-lightbox-header">
                  <div>
                    <small>EXHIBIT {activeEvidence.n}</small>
                    <h3>{activeEvidence.name}</h3>
                    <p>{activeEvidence.description}</p>
                  </div>

                  <button
                    className="evidence-close"
                    onClick={() => setActiveEvidence(null)}
                    aria-label="Close screenshot"
                  >
                    ×
                  </button>
                </div>

                <div className="evidence-lightbox-image">
                  <img
                    src={`${import.meta.env.BASE_URL}${activeEvidence.image}`}
                    alt={activeEvidence.name}
                  />
                </div>
              </div>
            </div>
          )}

          {detail && (
            <div
              className="modal-backdrop"
              role="presentation"
              onClick={() => setDetail(null)}
            >
              <section
                className="detail-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="detail-title"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-top">
                  <span>{detail.eyebrow}</span>
                  <button
                    className="modal-close"
                    onClick={() => setDetail(null)}
                    aria-label="Close details"
                  >
                    <X size={18} />
                  </button>
                </div>

                <h2 id="detail-title">{detail.title}</h2>
                <p>{detail.body}</p>

                <div className="modal-facts">
                  {detail.facts.map((fact, i) => (
                    <div key={i}>
                      <CheckCircle2 size={15} />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>

                <div className="modal-bottom">
                  <span>
                    <Archive size={14} /> Historical project record
                  </span>
                  <button onClick={() => setDetail(null)}>Close details</button>
                </div>
              </section>
            </div>
          )}

          <footer>
            <div className="footer-brand">
              <div className="brandmark">
                <Cloud size={17} />
              </div>
              <b>BuildOrbit</b>
            </div>
            <span>Built as a DevOps engineering portfolio · React + Vite</span>
            <span>© 2026 Komal Nimje</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function Metric({ icon: Icon, label, value, detail, good }) {
  return (
    <div
      className="metric interactive"
      data-detail={label}
      role="button"
      tabIndex="0"
    >
      <div className="metric-top">
        <span>{label}</span>
        <Icon size={17} />
      </div>
      <div className="metric-value">
        {good ? <span className="good-dot" /> : null}
        {value}
      </div>
      <small>{detail}</small>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
