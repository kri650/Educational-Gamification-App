import './leaderboard.css'

function LeaderboardFilter({ subject, timeRange, onSubjectChange, onTimeRangeChange }) {
  return (
    <section className="filter-row" aria-label="Leaderboard filters">
      <label>
        Subject
        <select value={subject} onChange={(event) => onSubjectChange(event.target.value)}>
          <option value="All">All</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="Physics">Physics</option>
          <option value="History">History</option>
        </select>
      </label>

      <label>
        Time
        <select value={timeRange} onChange={(event) => onTimeRangeChange(event.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="all-time">All-Time</option>
        </select>
      </label>
    </section>
  )
}

export default LeaderboardFilter
