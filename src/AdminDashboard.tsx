import React, { useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [tokens] = useState([
    { _id: '1', tokenNumber: '1001', category: 'Health', inputValue: '42101-1234567-1', createdAt: new Date() },
  ]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-md">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ADMIN PANEL
          </h1>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
            Export Excel
          </button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Search CNIC..."
            className="bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <input type="date" className="bg-slate-900/50 border border-slate-700 p-3 rounded-xl text-slate-400 outline-none" />
          <input type="date" className="bg-slate-900/50 border border-slate-700 p-3 rounded-xl text-slate-400 outline-none" />
        </div>

        {/* Table Section */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-700/50 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Token #</th>
                <th className="p-4">Category</th>
                <th className="p-4">CNIC</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {tokens.map((t) => (
                <tr key={t._id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-slate-300">#{t.tokenNumber}</td>
                  <td className="p-4 font-medium text-slate-200">{t.category}</td>
                  <td className="p-4 text-slate-400">{t.inputValue}</td>
                  <td className="p-4 text-slate-500">{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;