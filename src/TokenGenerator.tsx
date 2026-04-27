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
      const response = await axios.post('http://localhost:5000/api/generate-token', {
        type,
        reason: type === 'One Window' ? reason : 'N/A',
        cnicOrFile: type === 'Final' ? cnicOrFile : 'N/A',
      });
      setTokenInfo(response.data);
      setStep(3);
    } catch (error) {
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
              position: absolute;
              left: 0;
              top: 0;
              width: 300px;
              color: black !important;
              padding: 15px;
            }
            .no-print { display: none !important; }
          }
        `}
      </style>

      <div className="w-full max-w-lg bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 no-print">
        
        {/* STEP 1: CHOICE SCREEN */}
    {step === 1 && (
  <div className="min-h-screen bg-white flex flex-col items-center animate-in fade-in duration-500 overflow-hidden">
    
    {/* 1. Heading Div - Isay bilkul compact rakha hai */}
    <div className="w-full text-center pt-8 pb-4">
      <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
        SAYLANI WELFARE TRUST
      </h2>
      <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em]">
        Token Kiosk
      </p>
    </div>

    {/* 2. Buttons Container - Center mein lane ke liye flex-1 */}
    <div className="flex-1 flex flex-col justify-center items-center w-full">
      
      {/* w-1/2: Screen ki theek aadhi width
          gap-32: Dono buttons ke darmiyan kafi bari margin (space)
      */}
      <div className="flex flex-col gap-32 w-1/2 max-w-3xl px-4">
        
        <button 
          onClick={() => { setType('One Window'); setStep(2); }}
          /* py-52: Height ko aur barha diya hai */
          className="w-full py-52 bg-white border-[8px] border-blue-600 rounded-[4rem] hover:bg-blue-600 group transition-all duration-300 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] active:scale-95"
        >
          <span className="text-blue-600 group-hover:text-white text-7xl font-black block uppercase tracking-tighter">
            One Window
          </span>
        </button>

        <button 
          onClick={() => { setType('Final'); setStep(2); }}
          className="w-full py-52 bg-white border-[8px] border-emerald-600 rounded-[4rem] hover:bg-emerald-600 group transition-all duration-300 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] active:scale-95"
        >
          <span className="text-emerald-600 group-hover:text-white text-7xl font-black block uppercase tracking-tighter">
            Final Case
          </span>
        </button>

      </div>
    </div>
    
    {/* Footer spacing balance ke liye */}
    <div className="pb-16"></div>
  </div>
)}
        {/* STEP 2: INPUT FORM */}
{/* STEP 2: INPUT FORM */}
{step === 2 && (
  <div className="min-h-screen bg-white flex flex-col items-center animate-in slide-in-from-right-4 duration-300">
    
    {/* 1. Back Button - 'pt-20' se isay thora neechy kar diya hai */}
    <div className="w-full max-w-2xl px-6 pt-20 text-center">
      <button 
        onClick={() => setStep(1)} 
        className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black transition-colors text-lg uppercase tracking-widest"
      >
        ← Back to Main
      </button>
    </div>

    {/* 2. Form Container - Mukammal Center mein */}
    <div className="flex-1 flex flex-col justify-center items-center w-full px-4">
      
      {/* w-1/2: Screen ki aadhi width aur text-center */}
      <div className="w-full max-w-xl md:w-1/2 space-y-12 text-center">
        
        {/* Category Title - Isay bhi center kar diya */}
        <div className="flex flex-col items-center">
          <h2 className={`text-6xl font-black uppercase tracking-tighter ${type === 'One Window' ? 'text-blue-600' : 'text-emerald-600'}`}>
            {type}
          </h2>
          <div className={`h-2 w-24 mt-4 rounded-full ${type === 'One Window' ? 'bg-blue-600' : 'bg-emerald-600'}`}></div>
          <p className="text-slate-400 font-bold mt-4 text-xl">Please provide details below</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-10">
          {type === 'One Window' ? (
            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-500 uppercase tracking-[0.2em]">
                Select Service Reason
              </label>
              <select 
                value={reason}
                className="w-full bg-slate-50 border-4 border-slate-100 p-8 rounded-[3rem] outline-none focus:border-blue-600 transition-all text-3xl font-bold text-slate-700 shadow-inner text-center appearance-none"
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
              <label className="block text-sm font-black text-slate-500 uppercase tracking-[0.2em]">
                CNIC / File Number
              </label>
              <input 
                type="text" 
                placeholder="00000-0000000-0"
                className="w-full bg-slate-50 border-4 border-slate-100 p-8 rounded-[3rem] outline-none focus:border-emerald-600 transition-all text-3xl font-bold text-slate-700 shadow-inner text-center"
                onChange={(e) => setCnicOrFile(e.target.value)}
              />
            </div>
          )}

          {/* Generate Button - Height aur Font mazeed barha diya */}
          <button 
            disabled={loading}
            onClick={handleGenerate}
            className={`w-full py-10 rounded-[3rem] font-black text-4xl tracking-tighter transition-all shadow-2xl active:scale-95 mt-12 ${
              type === 'One Window' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {loading ? 'PROCESSING...' : 'CONFIRM & PRINT'}
          </button>
        </div>

      </div>
    </div>
    
    <div className="pb-20"></div>
  </div>
)}
      </div>

      {/* STEP 3: SUCCESS SLIP */}
      {step === 3 && tokenInfo && (
  <div className="min-h-screen bg-white flex flex-col mr-4 items-center justify-center animate-in zoom-in duration-300 p-4">
    
    {/* 1. Slip Design - Thermal Printer Friendly */}
    <div id="printable-slip" className="bg-white text-black p-8 border-2 border-black text-center w-[350px] font-sans">
      <h2 className="font-black text-2xl tracking-tighter uppercase mb-1">Saylani Welfare Trust</h2>
      <p className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">Official Token Slip</p>
      
      {/* Solid Line */}
      <div className="h-1 bg-black my-4"></div>
      
      <div className="py-2">
        <p className="text-sm font-bold text-gray-600 uppercase">Token Number</p>
        <h1 className="text-7xl font-black my-2">
          {tokenInfo.type === 'One Window' ? 'OW-' : 'F-'}
          {tokenInfo.tokenNumber}
        </h1>
      </div>
      
      {/* Dashed Line */}
      <div className="border-t-2 border-dashed border-black my-4"></div>
      
      {/* Details Section - Reason ko yahan wazay kiya hai */}
      <div className="text-left space-y-3 px-2">
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-bold">CATEGORY:</span>
          <span className="text-lg font-black uppercase">{tokenInfo.type}</span>
        </div>
        
        {/* REASON/CNIC Section */}
        <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
          <span className="text-[12px] font-bold">
            {tokenInfo.type === 'One Window' ? 'PURPOSE / REASON:' : 'CNIC / FILE:'}
          </span>
          <span className="text-sm font-black uppercase">
            {tokenInfo.type === 'One Window' ? tokenInfo.reason : tokenInfo.cnicOrFile}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] font-bold text-gray-500">DATE & TIME:</span>
          <span className="text-[10px] font-bold">
            {new Date(tokenInfo.createdAt).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })}
          </span>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-black my-4"></div>
      
      <p className="text-[12px] font-black uppercase tracking-widest italic">
        *** Please Wait For Your Turn ***
      </p>
    </div>
    
    {/* 2. Action Buttons - Inko bhi Step 1 jaisa "Tall" bana diya hai */}
    <div className="flex flex-col gap-6 w-full max-w-xl md:w-1/2 mt-12 no-print">
      <button 
        onClick={() => window.print()} 
        className="w-full py-20 bg-gray-900 text-white rounded-[2.5rem] font-black text-4xl shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-4"
      >
        <span>PRINT</span>
      </button>

      <button 
        onClick={() => { setStep(1); setTokenInfo(null); }} 
        className="text-gray-400 font-black hover:text-blue-600 transition text-center py-4 uppercase tracking-[0.2em]"
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