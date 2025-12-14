import React, { useState } from 'react';
import { Shield, Check, X, AlertCircle, FileText, User, MapPin } from 'lucide-react';
import { MOCK_ORDERS } from '../constants';
import { analyzeDispute } from '../services/geminiService';
import { FarmerProfile } from '../types';

interface AdminViewProps {
  farmers: FarmerProfile[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ farmers, onApprove, onReject }) => {
  const [activeTab, setActiveTab] = useState<'farmers' | 'escrow'>('farmers');
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [expandedFarmer, setExpandedFarmer] = useState<string | null>(null);
  
  const pendingFarmers = farmers.filter(f => !f.verified);
  const disputedOrders = MOCK_ORDERS.filter(o => true); 

  const handleRunAudit = async (orderId: string) => {
    setAiAnalysis('Analyzing...');
    const result = await analyzeDispute(orderId, "Standard quality check");
    setAiAnalysis(result);
  };

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-sm">
      <div className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center text-agro-green">
          <Shield className="mr-2" size={20} /> AgroTrust Admin
        </h1>
        <div className="space-x-4">
          <button 
            onClick={() => setActiveTab('farmers')} 
            className={`font-bold ${activeTab === 'farmers' ? 'text-black border-b-2 border-black' : 'text-stone-400'}`}
          >
            Verification Queue ({pendingFarmers.length})
          </button>
          <button 
            onClick={() => setActiveTab('escrow')} 
            className={`font-bold ${activeTab === 'escrow' ? 'text-black border-b-2 border-black' : 'text-stone-400'}`}
          >
            Escrow & Disputes
          </button>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        {activeTab === 'farmers' && (
          <div className="bg-white rounded shadow-sm border border-stone-200 overflow-hidden">
             <div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-500 flex justify-between">
                <span>Pending Applications</span>
                <span>{pendingFarmers.length} Requests</span>
             </div>
             
             {pendingFarmers.length === 0 ? (
               <div className="p-12 text-center text-stone-400">All caught up. No pending verifications.</div>
             ) : (
               <div className="divide-y divide-stone-100">
                 {pendingFarmers.map(f => (
                   <div key={f.id} className="hover:bg-stone-50 transition-colors">
                     {/* Summary Row */}
                     <div 
                       className="p-4 flex justify-between items-center cursor-pointer"
                       onClick={() => setExpandedFarmer(expandedFarmer === f.id ? null : f.id)}
                     >
                        <div className="flex items-center space-x-4">
                           {f.passportPhotoUrl ? (
                             <img src={f.passportPhotoUrl} alt="Passport" className="w-12 h-12 rounded-full object-cover border-2 border-stone-200" />
                           ) : (
                             <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center text-stone-400"><User size={20} /></div>
                           )}
                           <div>
                             <h3 className="font-bold text-lg">{f.name}</h3>
                             <div className="flex items-center text-xs text-stone-500">
                               <MapPin size={12} className="mr-1" /> {f.location} • Applied {f.joinedDate}
                             </div>
                           </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                           <div className="text-right mr-4">
                             <div className="font-bold text-sm">{f.farmName || 'No Farm Name'}</div>
                             <div className="text-xs text-stone-400">NIN: {f.nin || 'Pending'}</div>
                           </div>
                           <button onClick={(e) => { e.stopPropagation(); onReject(f.id); }} className="p-2 hover:bg-red-100 text-red-600 rounded">
                             <X size={20} />
                           </button>
                           <button onClick={(e) => { e.stopPropagation(); onApprove(f.id); }} className="p-2 hover:bg-green-100 text-green-600 rounded">
                             <Check size={20} />
                           </button>
                        </div>
                     </div>

                     {/* Expanded Detail View */}
                     {expandedFarmer === f.id && (
                       <div className="px-6 pb-6 bg-stone-50 border-t border-stone-100">
                          <div className="grid grid-cols-2 gap-8 mt-6">
                            {/* Personal & Farm Data */}
                            <div className="space-y-4">
                               <h4 className="font-bold text-agro-green text-xs uppercase tracking-wider">Applicant Details</h4>
                               <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div><span className="text-stone-400 block text-xs">Phone</span> <span className="font-mono">{f.phone}</span></div>
                                  <div><span className="text-stone-400 block text-xs">NIN</span> <span className="font-mono">{f.nin}</span></div>
                                  <div><span className="text-stone-400 block text-xs">Origin</span> {f.stateOfOrigin}</div>
                                  <div><span className="text-stone-400 block text-xs">Residence</span> {f.stateOfResidence}</div>
                                  <div><span className="text-stone-400 block text-xs">Farm Size</span> {f.farmSize}</div>
                                  <div><span className="text-stone-400 block text-xs">Method</span> {f.farmingMethod}</div>
                               </div>
                               <div>
                                 <span className="text-stone-400 block text-xs mb-1">Crops</span>
                                 <div className="flex flex-wrap gap-2">
                                   {f.mainCrops?.map(crop => (
                                     <span key={crop} className="bg-white border border-stone-200 px-2 py-1 rounded text-xs font-bold">{crop}</span>
                                   ))}
                                 </div>
                               </div>
                            </div>

                            {/* Documents */}
                            <div>
                               <h4 className="font-bold text-agro-green text-xs uppercase tracking-wider mb-4">Submitted Documents</h4>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="border border-stone-200 bg-white p-2 rounded">
                                     <div className="text-xs text-stone-400 mb-2 flex items-center"><FileText size={12} className="mr-1"/> NIN Slip</div>
                                     {f.ninImageUrl ? (
                                       <img src={f.ninImageUrl} alt="NIN" className="w-full h-32 object-cover rounded bg-stone-100" />
                                     ) : (
                                       <div className="w-full h-32 bg-stone-100 flex items-center justify-center text-xs text-stone-400">Missing</div>
                                     )}
                                  </div>
                                  <div className="border border-stone-200 bg-white p-2 rounded">
                                     <div className="text-xs text-stone-400 mb-2 flex items-center"><User size={12} className="mr-1"/> Valid ID</div>
                                     {f.idImageUrl ? (
                                       <img src={f.idImageUrl} alt="ID" className="w-full h-32 object-cover rounded bg-stone-100" />
                                     ) : (
                                       <div className="w-full h-32 bg-stone-100 flex items-center justify-center text-xs text-stone-400">Missing</div>
                                     )}
                                  </div>
                               </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex justify-end space-x-4 border-t border-stone-200 pt-4">
                             <button onClick={() => onReject(f.id)} className="px-6 py-2 border border-red-200 text-red-700 font-bold rounded hover:bg-red-50">
                               Reject Application
                             </button>
                             <button onClick={() => onApprove(f.id)} className="px-6 py-2 bg-agro-green text-white font-bold rounded hover:bg-green-800 shadow-sm">
                               Verify & Approve Farmer
                             </button>
                          </div>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

        {activeTab === 'escrow' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded shadow-sm border border-stone-200">
               <div className="p-4 border-b border-stone-200 font-bold">Active Orders</div>
               <table className="w-full text-left">
                 <thead className="bg-stone-50 text-xs uppercase">
                   <tr>
                     <th className="p-3">Order ID</th>
                     <th className="p-3">Amount</th>
                     <th className="p-3">Status</th>
                     <th className="p-3">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-stone-100 text-sm">
                   {disputedOrders.slice(0, 5).map(order => (
                     <tr key={order.id}>
                       <td className="p-3 font-mono">{order.id}</td>
                       <td className="p-3">₦{order.total.toLocaleString()}</td>
                       <td className="p-3">
                         <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold">
                           {order.status}
                         </span>
                       </td>
                       <td className="p-3">
                         <button onClick={() => handleRunAudit(order.id)} className="text-blue-600 hover:underline">Audit</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>

            <div className="col-span-1 bg-stone-50 border border-stone-200 p-4 rounded h-fit">
              <h3 className="font-bold mb-2 flex items-center text-stone-700"><AlertCircle size={16} className="mr-2"/> AI Audit Log</h3>
              <div className="bg-white border border-stone-200 p-3 rounded min-h-[100px] text-sm text-stone-600">
                {aiAnalysis || "Select an order to view AI risk analysis."}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};