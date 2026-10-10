
function JobTable({ jobs, showActions = false, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.company}</td>
              <td>{job.role}</td>
              <td>
                <span className="status">{job.status}</span>
              </td>

              {showActions && (
                <td>
                  <button
                    type="button"
                    onClick={() => onEdit(job)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(job.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobTable
