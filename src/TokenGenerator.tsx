import React, { useState } from 'react';
import axios from 'axios';

const TokenGenerator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState('');
  const [reason, setReason] = useState('Shadi');
  const [cnicOrFile, setCnicOrFile] = useState('');
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (type === 'Final' && !cnicOrFile.trim()) {
      alert("Please enter details");
      return;
    }
    setLoading(true);
    try {
      // FIX: Added 'const response =' to capture data from backend
      const response = await axios.post("https://saylai-token.vercel.app/api/tokens", {
        type,
        reason: type === 'One Window' ? reason : 'N/A',
        cnicOrFile: type === 'Final' ? cnicOrFile : 'N/A',
      });
      
      setTokenInfo(response.data);
      setStep(3);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Database Error! Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
      {/* THERMAL PRINT STYLE */}
      <style>
        {`
          @media print {
            @page { margin: 0; }
            body * { visibility: hidden; }
            #printable-slip, #printable-slip * { visibility: visible; }
            #printable-slip {
              position: fixed;
              left: 50%;
              top: 0;
              transform: translateX(-50%);
              width: 350px;
              color: black !important;
              padding: 20px;
              border: none !important;
            }
            .no-print { display: none !important; }
          }
        `}
      </style>

      {/* STEP 1: CHOICE SCREEN */}
      {step === 1 && (
        <div className="w-full max-w-4xl animate-in fade-in duration-500 flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">
              SAYLANI WELFARE TRUST
            </h2>
            <p className="text-gray-400 text-lg font-bold uppercase tracking-[0.4em]">
              Token Kiosk System
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full px-4">
            <button 
              onClick={() => { setType('One Window'); setStep(2); }}
              className="group bg-white border-[6px] border-blue-600 rounded-[3rem] py-32 hover:bg-blue-600 transition-all duration-300 shadow-2xl active:scale-95"
            >
              <span className="text-blue-600 group-hover:text-white text-6xl font-black uppercase tracking-tighter">
                One Window
              </span>
            </button>

            <button 
              onClick={() => { setType('Final'); setStep(2); }}
              className="group bg-white border-[6px] border-emerald-600 rounded-[3rem] py-32 hover:bg-emerald-600 transition-all duration-300 shadow-2xl active:scale-95"
            >
              <span className="text-emerald-600 group-hover:text-white text-6xl font-black uppercase tracking-tighter">
                Final Case
              </span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: INPUT FORM */}
      {step === 2 && (
        <div className="w-full max-w-2xl bg-white p-12 rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
          <button onClick={() => setStep(1)} className="text-slate-400 hover:text-blue-600 font-bold mb-8 flex items-center gap-2">
            ← BACK TO SELECTION
          </button>

          <div className="text-center mb-12">
            <h2 className={`text-5xl font-black uppercase ${type === 'One Window' ? 'text-blue-600' : 'text-emerald-600'}`}>
              {type}
            </h2>
            <p className="text-slate-500 font-bold mt-2">Enter Required Information</p>
          </div>

          <div className="space-y-8">
            {type === 'One Window' ? (
              <div className="space-y-4">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Select Purpose</label>
                <select 
                  value={reason}
                  className="w-full bg-slate-50 border-4 border-slate-100 p-6 rounded-2xl outline-none focus:border-blue-600 text-2xl font-bold appearance-none text-center"
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="Shadi">Shadi Help</option>
                  <option value="School Fee">School Fee</option>
                  <option value="Kafala">Kafala Program</option>
                  <option value="Rashan">Rashan Help</option>
                </select>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">CNIC or File Number</label>
                <input 
                  type="text" 
                  placeholder="00000-0000000-0"
                  className="w-full bg-slate-50 border-4 border-slate-100 p-6 rounded-2xl outline-none focus:border-emerald-600 text-2xl font-bold text-center"
                  onChange={(e) => setCnicOrFile(e.target.value)}
                />
              </div>
            )}

            <button 
              disabled={loading}
              onClick={handleGenerate}
              className={`w-full py-8 rounded-2xl font-black text-3xl transition-all shadow-xl active:scale-95 ${
                type === 'One Window' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {loading ? 'GENERATING...' : 'PRINT TOKEN'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SUCCESS SLIP */}
      {step === 3 && tokenInfo && (
        <div className="flex flex-col items-center animate-in zoom-in duration-300 w-full max-w-lg">
          <div id="printable-slip" className="bg-white text-black p-10 border-2 border-black text-center w-[350px]">
            <h2 className="font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4">Saylani Welfare</h2>
            <p className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">Token Number</p>
            <h1 className="text-8xl font-black my-4">
              {tokenInfo.type === 'One Window' ? 'OW-' : 'F-'}
              {tokenInfo.tokenNumber}
            </h1>
            
            <div className="border-t-2 border-dashed border-black my-6"></div>
            
            <div className="text-left space-y-4 px-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold">CATEGORY:</span>
                <span className="text-lg font-black uppercase">{tokenInfo.type}</span>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                  {tokenInfo.type === 'One Window' ? 'Service Purpose' : 'CNIC / File ID'}
                </p>
                <p className="text-sm font-black uppercase">
                  {tokenInfo.type === 'One Window' ? tokenInfo.reason : tokenInfo.cnicOrFile}
                </p>
              </div>

              <p className="text-[9px] text-center text-gray-400 font-bold mt-4">
                {new Date(tokenInfo.createdAt).toLocaleString('en-PK')}
              </p>
            </div>

            <div className="border-t-2 border-dashed border-black my-6"></div>
            <p className="text-[12px] font-black uppercase italic tracking-tighter">
              Keep this slip for your turn
            </p>
          </div>
          
          <div className="flex flex-col gap-4 w-full mt-12 no-print">
            <button 
              onClick={() => window.print()} 
              className="w-full py-8 bg-gray-900 text-white rounded-[2rem] font-black text-3xl shadow-2xl hover:bg-black transition-all active:scale-95"
            >
              PRINT RECEIPT
            </button>

            <button 
              onClick={() => { setStep(1); setTokenInfo(null); }} 
              className="text-slate-400 font-black hover:text-blue-600 py-4 uppercase tracking-widest"
            >
              Issue New Token
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenGenerator;