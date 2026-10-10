import { useEffect, useState } from "react";
import "./App.css";
import JobTable from "./JobTable";

const API_URL = "https://jobtrack-backend-t7zg.onrender.com/api/jobs";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [editingJob, setEditingJob] = useState(null);

  // Navigation state
  const [activePage, setActivePage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "APPLIED",
  });

  async function fetchJobs() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      setJobs(data.sort((a, b) => b.id - a.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const appliedCount = jobs.filter((job) => job.status === "APPLIED").length;
  const interviewCount = jobs.filter(
    (job) => job.status === "INTERVIEW",
  ).length;
  const selectedCount = jobs.filter((job) => job.status === "SELECTED").length;
  const rejectedCount = jobs.filter((job) => job.status === "REJECTED").length;
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleEdit(job) {
    setEditingJob(job);
    setForm({
      company: job.company,
      role: job.role,
      status: job.status,
    });
    setFormError("");
    setShowForm(true);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job application?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      await fetchJobs();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      const isEditing = editingJob !== null;

      const response = await fetch(
        isEditing ? `${API_URL}/${editingJob.id}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || `Request failed: ${response.status}`);
      }

      setForm({ company: "", role: "", status: "APPLIED" });
      setEditingJob(null);
      setShowForm(false);
      await fetchJobs();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>JobTrack</h2>

        <button
          type="button"
          className={`nav ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </button>

        <button
          type="button"
          className={`nav ${activePage === "applications" ? "active" : ""}`}
          onClick={() => setActivePage("applications")}
        >
          My Applications
        </button>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>
              {activePage === "dashboard" ? "Dashboard" : "My Applications"}
            </h1>
            <p>
              {activePage === "dashboard"
                ? "Your job search at a glance."
                : "Manage and track every application."}
            </p>
          </div>

          <button
            onClick={() => {
              setEditingJob(null);
              setForm({ company: "", role: "", status: "APPLIED" });
              setFormError("");
              setShowForm(true);
            }}
          >
            + Add Application
          </button>
        </header>

        {error && <p className="error">Unable to load jobs: {error}</p>}

        {activePage === "dashboard" && (
          <>
            <section className="stats">
              <div className="stat-card">
                <p>Total Applications</p>
                <h2>{loading ? "..." : jobs.length}</h2>
              </div>
              <div className="stat-card">
                <p>Applied</p>
                <h2>{loading ? "..." : appliedCount}</h2>
              </div>
              <div className="stat-card">
                <p>Interviews</p>
                <h2>{loading ? "..." : interviewCount}</h2>
              </div>
              <div className="stat-card">
                <p>Selected</p>
                <h2>{loading ? "..." : selectedCount}</h2>
              </div>
              <div className="stat-card">
                <p>Rejected</p>
                <h2>{loading ? "..." : rejectedCount}</h2>
              </div>
            </section>


            <section className="table-card">
              <h2>Recent Applications</h2>

              {loading ? (
                <p className="empty">Loading applications...</p>
              ) : jobs.length === 0 ? (
                <p className="empty">
                  No applications yet. Add your first job!
                </p>
              ) : (
                <JobTable jobs={jobs.slice(0, 5)} showActions={false} />
              )}
            </section>

            
          </>
        )}

        {activePage === "applications" && (
          <section className="table-card">
            <h2>All Job Applications</h2>

            <div className="filters">
              <input
                type="text"
                placeholder="Search company or role..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="SELECTED">Selected</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {loading ? (
              <p className="empty">Loading applications...</p>
            ) : filteredJobs.length === 0 ? (
              <p className="empty">No matching applications found.</p>
            ) : (
              <JobTable
                jobs={filteredJobs}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </section>
        )}
      </main>

      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="modal-title">
                {editingJob ? "Edit Job Application" : "Add Job Application"}
              </h2>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="company">Company name</label>
              <input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Amazon"
                required
              />

              <label htmlFor="role">Job role</label>
              <input
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Java Developer"
                required
              />

              <label htmlFor="status">Application status</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="SELECTED">Selected</option>
                <option value="REJECTED">Rejected</option>
              </select>

              {formError && <p className="error">{formError}</p>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : editingJob
                      ? "Update Application"
                      : "Save Application"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
