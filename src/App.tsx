import React , {useEffect , useState }  from 'react';
import ReactDOM from 'react-dom';

interface BuildLog {
    id:number;
    repo : string;
    status : string;
    duration : number ;
    date : string;
}

interface Stats {
    successRate : string ;
    avgDuration : string ;
}

const App: React.FC = () => {
    const [logs , setLogs] = useState<BuildLog[]>([]);
    const [filter , setFilter] = useState<'all' | 'success' | 'failure'>('all');
    const [stats , setStats] = useState<Stats | null>(null);

    useEffect(() => {
        fetch('/api/builds').then(res => res.json()).then(setLogs);
        fetch('/api/stats').then(res => res.json()).then(setStats);
            
    },[]);

    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.status === filter);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Mini Build Status Dashboard</h1>
            { stats && (
                <div className="mb-4 text-lg">
                    <p>Success Rate: <span className = "font-bold">{stats.successRate}</span></p>
                    <p>Success Rate: <span className = "font-bold">{stats.avgDuration}</span></p>
                    <p>( See chart in server console)</p>
                </div>
            )}

            <div className="mb-4">
                <label className="mr-2 text-lg">Filter:</label>
                <select 
                className = "border p-2 rounded bg-gray-100"
                value = {filter}
                onChange ={e => setFilter(e.target.value as typeof filter)}
                >
                    <option value="all">All</option>
                    <option value="success">Success</option>
                    <option value="failure">Failure</option>
                </select>
            </div>
            <table className = "w-full border-collapse ">
                <thead>
                    <tr>
                        <th className = "border p-2">Repo</th>
                        <th className = "border p-2">Status</th>
                        <th className = "border p-2">Duration (s)</th>
                        <th className = "border p-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map(log => (
                        <tr key={log.id} className = "hover:bg-gray-50" >
                            <td className = "border p-2">{log.repo}</td>
                            <td className = "border p-2">{log.status}</td>
                            <td className = "border p-2">{log.duration}</td>
                            <td className = "border p-2">{log.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )};

    export default App;