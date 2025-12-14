import React, { useState } from 'react';
import { ConsumerView } from './components/ConsumerView';
import { FarmerView } from './components/FarmerView';
import { AdminView } from './components/AdminView';
import { UserRole, FarmerProfile } from './types';
import { MOCK_FARMERS } from './constants';
import { Store, Tractor, Shield } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState<UserRole>(UserRole.NONE);
  const [farmers, setFarmers] = useState<FarmerProfile[]>(MOCK_FARMERS);

  const handleRegisterFarmer = (data: Partial<FarmerProfile>) => {
    const newFarmer: FarmerProfile = {
      id: `f-${Date.now()}`,
      name: data.name || 'Unknown Farmer',
      location: data.location || 'Unknown',
      verified: false,
      rating: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      trustScore: 50,
      ...data
    };
    setFarmers(prev => [...prev, newFarmer]);
  };

  const handleApproveFarmer = (id: string) => {
    setFarmers(prev => prev.map(f => f.id === id ? { ...f, verified: true, trustScore: 80 } : f));
  };

  const handleRejectFarmer = (id: string) => {
    setFarmers(prev => prev.filter(f => f.id !== id));
  };

  if (role === UserRole.NONE) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <h1 className="font-serif text-5xl font-bold text-center text-agro-green mb-4">AgroTrust</h1>
          <p className="text-center text-stone-500 mb-12">Select your experience below</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => setRole(UserRole.CONSUMER)}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-agro-green group text-center"
            >
              <div className="w-16 h-16 bg-agro-green/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-agro-green group-hover:text-white transition-colors text-agro-green">
                <Store size={32} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">Consumer</h2>
              <p className="text-sm text-stone-500">Shop fresh, verified local produce with escrow protection.</p>
            </button>

            <button 
              onClick={() => setRole(UserRole.FARMER)}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-black group text-center"
            >
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-colors text-black">
                <Tractor size={32} />
              </div>
              <h2 className="text-2xl font-mono font-bold text-stone-800 mb-2">FARMER</h2>
              <p className="text-sm text-stone-500">Professional portal to manage your farm business.</p>
            </button>

            <button 
              onClick={() => setRole(UserRole.ADMIN)}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-blue-600 group text-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
                <Shield size={32} />
              </div>
              <h2 className="text-2xl font-sans font-bold text-stone-800 mb-2">Admin</h2>
              <p className="text-sm text-stone-500">Verify farms, resolve disputes, and oversee platform health.</p>
            </button>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xs text-stone-400 uppercase tracking-widest">Prototype v1.0 • Built with React & Gemini</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {role === UserRole.CONSUMER && <ConsumerView />}
      {role === UserRole.FARMER && <FarmerView onRegister={handleRegisterFarmer} />}
      {role === UserRole.ADMIN && <AdminView farmers={farmers} onApprove={handleApproveFarmer} onReject={handleRejectFarmer} />}
      
      {/* Dev Tool to switch back */}
      <div className="fixed bottom-4 left-4 z-50">
        <button 
          onClick={() => setRole(UserRole.NONE)}
          className="bg-stone-800 text-white text-xs px-3 py-1 rounded-full opacity-50 hover:opacity-100 transition-opacity"
        >
          Switch Role
        </button>
      </div>
    </div>
  );
}