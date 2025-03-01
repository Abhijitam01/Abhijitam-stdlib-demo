import React, { useState, useEffect } from 'react'; // Imports React and hooks


interface BuildLog {
  id: number;
  repo: string;
  status: 'success' | 'pending' | 'error'; 
  duration: number;
  date: string;
}

interface Stats {
  successRate: string;
  avgDuration: string;
}

const App: React.FC = () => {
  const [logs, setLogs] = useState<BuildLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'success' | 'pending' | 'error'>('all'); 
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [buildsRes, statsRes] = await Promise.all([
          fetch('/api/builds'),
          fetch('/api/stats'),
        ]);
        if (!buildsRes.ok || !statsRes.ok) throw new Error('Network response was not ok');
        const logsData = await buildsRes.json();
        const statsData = await statsRes.json();
        setLogs(logsData);
        setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };
    fetchData();
  }, []); 

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.status === filter);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Mini Build Status Dashboard</h1>
      {error ? (
        <div className="mb-4 text-lg text-red-600">Error: {error}</div>
      ) : stats ? (
        <div className="mb-4 text-lg">
          <p>Success Rate: <span className="font-bold">{stats.successRate}%</span></p>
          <p>Average Duration (s): <span className="font-bold">{stats.avgDuration}s</span></p>
          <p>(See chart in server console)</p>
        </div>
      ) : (
        <div className="mb-4 text-lg">Loading...</div>
      )}

      <div className="mb-4">
        <label className="mr-2 text-lg">Filter:</label>
        <select
          className="border p-2 rounded bg-gray-100"
          value={filter}
          onChange={e => setFilter(e.target.value as typeof filter)}
        >
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="error">Error</option> 
        </select>
      </div>
      <table className="w-full border-collapse ">
        <thead>
          <tr>
            <th className="border p-2">Repo</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Duration (s)</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map(log => (
            <tr key={log.id} className="hover:bg-gray-50" >
              <td className="border p-2">{log.repo}</td>
              <td className="border p-2">{log.status}</td>
              <td className="border p-2">{log.duration}</td>
              <td className="border p-2">{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;