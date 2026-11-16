import React, { useEffect, useMemo, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "./sourceExplorer.css";

const languageMap = {
  tf: "hcl",
  hcl: "hcl",
  yml: "yaml",
  yaml: "yaml",
  js: "javascript",
  jsx: "javascript",
  json: "json",
  md: "markdown",
  css: "css",
  html: "xml",
  conf: "nginx",
  sh: "bash",
  txt: "plaintext",
};

const groupNames = {
  codepipeline: "CodePipeline",
  "kubernetes-deployment": "Kubernetes",
  "kubernetes-monitoring": "Monitoring",
  "multi-service-app": "Application",
  "terraform-eks": "Terraform — EKS",
  "terraform-codepipeline": "Terraform — CodePipeline",
  "workflow-archive": "Workflow archive",
};

function getGroup(path) {
  const root = path.split("/")[0];
  return groupNames[root] || "Project files";
}

function SourceExplorer() {
  const [sourceFiles, setSourceFiles] = useState([]);
  const [selectedPath, setSelectedPath] = useState("");
  const [activeGroup, setActiveGroup] = useState("All files");
  const [search, setSearch] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [manifestError, setManifestError] = useState("");
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [expandedFolders, setExpandedFolders] = useState({});

  // Load the generated source manifest
  useEffect(() => {
    const controller = new AbortController();

    async function loadManifest() {
      try {
        setLoading(true);
        setManifestError("");

        const base = import.meta.env.BASE_URL;
        const response = await fetch(`${base}source-full/manifest.json`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Manifest could not load (HTTP ${response.status}).`);
        }

        const files = await response.json();

        if (!Array.isArray(files) || files.length === 0) {
          throw new Error("The source manifest is empty or invalid.");
        }

        const normalizedFiles = files.map((file) => ({
          ...file,
          group: getGroup(file.path),
          language: languageMap[file.extension] || "plaintext",
        }));

        setSourceFiles(normalizedFiles);
        setSelectedPath(normalizedFiles[0].path);
      } catch (err) {
        if (err.name !== "AbortError") {
          setManifestError(err.message || "Unable to load source manifest.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadManifest();

    return () => controller.abort();
  }, []);

  const selectedFile = sourceFiles.find((file) => file.path === selectedPath);

  const groups = [
    "All files",
    ...new Set(sourceFiles.map((file) => file.group)),
  ];

  const filteredFiles = sourceFiles.filter((file) => {
    const matchesGroup =
      activeGroup === "All files" || file.group === activeGroup;

    const matchesSearch = file.path
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesGroup && matchesSearch;
  });

  const fileTree = useMemo(() => buildFileTree(filteredFiles), [filteredFiles]);

  function toggleFolder(path) {
    setExpandedFolders((previous) => ({
      ...previous,
      [path]: !previous[path],
    }));
  }

  function renderTree(nodes, depth = 0) {
    return Object.values(nodes)
      .sort((a, b) => {
        if (a.isFile !== b.isFile) return a.isFile ? 1 : -1;
        return a.name.localeCompare(b.name);
      })
      .map((node) => {
        if (node.isFile) {
          return (
            <button
              type="button"
              key={node.path}
              className={`source-file-button ${
                selectedPath === node.path ? "selected" : ""
              }`}
              style={{ paddingLeft: `${12 + depth * 16}px` }}
              onClick={() => setSelectedPath(node.path)}
              title={node.path}
            >
              <span className="source-file-icon">{"</>"}</span>
              <span className="source-file-name">{node.name}</span>
            </button>
          );
        }

        const expanded = search.trim() ? true : !!expandedFolders[node.path];

        return (
          <div className="source-tree-folder" key={node.path}>
            <button
              type="button"
              className="source-folder-button"
              style={{ paddingLeft: `${12 + depth * 16}px` }}
              onClick={() => toggleFolder(node.path)}
              aria-expanded={expanded}
            >
              <span className="source-folder-arrow">
                {expanded ? "▾" : "▸"}
              </span>
              <span className="source-folder-icon">📁</span>
              <span>{node.name}</span>
            </button>

            {expanded && (
              <div className="source-tree-children">
                {renderTree(node.children, depth + 1)}
              </div>
            )}
          </div>
        );
      });
  }

  // Load the selected source file
  useEffect(() => {
    if (!selectedFile) return;

    const controller = new AbortController();

    async function loadFile() {
      setLoading(true);
      setError("");
      setContent("");
      setCopyMessage("");

      try {
        const base = import.meta.env.BASE_URL;
        const fileUrl = `${base}source-full/${selectedFile.path}`;

        const response = await fetch(fileUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Could not load this file (HTTP ${response.status}).`,
          );
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load this source file.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadFile();

    return () => controller.abort();
  }, [selectedPath, selectedFile]);

  const highlightedCode = useMemo(() => {
    if (!content || !selectedFile) return "";

    try {
      if (hljs.getLanguage(selectedFile.language)) {
        return hljs.highlight(content, {
          language: selectedFile.language,
        }).value;
      }

      return hljs.highlightAuto(content).value;
    } catch {
      return hljs.highlightAuto(content).value;
    }
  }, [content, selectedFile]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(content);
      setCopyMessage("Copied!");
    } catch {
      setCopyMessage("Copy unavailable");
    }
  }

  function buildFileTree(files) {
    const root = {};

    files.forEach((file) => {
      const parts = file.path.split("/");
      let current = root;

      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;
        const key = parts.slice(0, index + 1).join("/");

        if (!current[part]) {
          current[part] = {
            name: part,
            path: key,
            isFile,
            file: isFile ? file : null,
            children: {},
          };
        }

        current = current[part].children;
      });
    });

    return root;
  }

  return (
    <div className="source-explorer">
      <div className="source-explorer-heading">
        <div>
          <div className="source-eyebrow">PROJECT SOURCE BROWSER</div>
          <h3>Source Explorer</h3>
          <p>
            Browse the retained application, infrastructure and deployment
            files.
          </p>
        </div>

        <span className="source-count">{sourceFiles.length} FILES</span>
      </div>

      {manifestError ? (
        <div className="source-error">
          <strong>Unable to load project files</strong>
          <p>{manifestError}</p>
          <small>Check that public/source-full/manifest.json exists.</small>
        </div>
      ) : (
        <div className="source-workspace">
          <aside className="source-sidebar">
            <div className="source-sidebar-title">PROJECT FILES</div>

            <input
              className="source-search"
              type="search"
              placeholder="Search files..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search source files"
            />

            <div className="source-groups">
              {groups.map((group) => (
                <button
                  type="button"
                  key={group}
                  className={`source-group-button ${
                    activeGroup === group ? "active" : ""
                  }`}
                  onClick={() => setActiveGroup(group)}
                >
                  {group}
                  <span>
                    {group === "All files"
                      ? sourceFiles.length
                      : sourceFiles.filter((file) => file.group === group)
                          .length}
                  </span>
                </button>
              ))}
            </div>

            <div className="source-file-list source-tree">
              {renderTree(fileTree)}

              {filteredFiles.length === 0 && (
                <div className="source-no-files">No matching files found.</div>
              )}
            </div>
          </aside>

          <section className="source-viewer">
            <div className="source-toolbar">
              <div className="source-file-location">
                <span>source-full /</span>
                <strong>{selectedFile?.path || "Select a file"}</strong>
              </div>

              <button
                type="button"
                className="source-copy-button"
                onClick={copyCode}
                disabled={loading || !!error || !content}
              >
                {copyMessage || "Copy code"}
              </button>
            </div>

            <div className="source-code-area">
              {loading && (
                <div className="source-status">Loading source file...</div>
              )}

              {error && (
                <div className="source-error">
                  <strong>Unable to display file</strong>
                  <p>{error}</p>
                  <small>
                    Check that the file exists under public/source-full/.
                  </small>
                </div>
              )}

              {!loading && !error && content && (
                <pre className="source-code">
                  <code
                    className={`language-${selectedFile.language}`}
                    dangerouslySetInnerHTML={{
                      __html: highlightedCode,
                    }}
                  />
                </pre>
              )}
            </div>

            <div className="source-viewer-footer">
              <span>{selectedFile?.language?.toUpperCase() || "SOURCE"}</span>
              <span>READ-ONLY ARCHIVE</span>
            </div>
          </section>
        </div>
      )}

      <div className="source-disclaimer">
        <span>i</span>
        These are retained project files for inspection. Editing here does not
        change the original project or deploy anything to AWS.
      </div>
    </div>
  );
}

export default SourceExplorer;
