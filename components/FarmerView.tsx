import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Check, Upload, User, MapPin, Sprout } from 'lucide-react';
import { MOCK_ORDERS, MOCK_FARMERS } from '../constants';
import { FarmerProfile } from '../types';
import { FarmerVerificationForm } from './FarmerVerificationForm';

type FarmerScreen = 
  | 'WELCOME' 
  | 'REGISTER'
  | 'REG_SUCCESS'
  | 'HOME' 
  | 'ADD_CROP_SELECT' 
  | 'ADD_CROP_DETAILS' 
  | 'ADD_SUCCESS'
  | 'ORDERS' 
  | 'MONEY';

interface FarmerViewProps {
  onRegister: (data: Partial<FarmerProfile>) => void;
}

export const FarmerView: React.FC<FarmerViewProps> = ({ onRegister }) => {
  const [screen, setScreen] = useState<FarmerScreen>('WELCOME');
  
  // Stock State
  const [selectedCrop, setSelectedCrop] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  
  // Simulate logged-in farmer (using the first mock farmer)
  const currentFarmer = MOCK_FARMERS[0];

  const handleRegSubmit = (data: Partial<FarmerProfile>) => {
    onRegister(data);
    setScreen('REG_SUCCESS');
  };

  const handleStockSubmit = () => {
    // Logic to add stock would go here
    setScreen('ADD_SUCCESS');
  };

  // 1. WELCOME SCREEN
  if (screen === 'WELCOME') {
    return (
      <div className="min-h-screen bg-white flex flex-col p-6">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-agro-green mb-2">AgroTrust</h1>
          <p className="text-xl text-stone-600 mb-12">Farmer Portal</p>
          
          <button 
            onClick={() => setScreen('HOME')}
            className="w-full h-20 bg-agro-green text-white text-xl font-bold rounded-lg mb-6 active:scale-95 transition-transform shadow-lg"
          >
            Login
          </button>
          
          <button 
            onClick={() => setScreen('REGISTER')}
            className="w-full h-20 bg-white border-4 border-agro-green text-agro-green text-xl font-bold rounded-lg active:scale-95 transition-transform"
          >
            Register Farm
          </button>
        </div>
        <div className="text-center text-stone-400 text-sm font-bold mt-auto">
          Data-Free Mode Active
        </div>
      </div>
    );
  }

  // 2. REGISTRATION (New Component)
  if (screen === 'REGISTER') {
    return <FarmerVerificationForm onSubmit={handleRegSubmit} onCancel={() => setScreen('WELCOME')} />;
  }

  // 3. REGISTRATION SUCCESS
  if (screen === 'REG_SUCCESS') {
     return (
       <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check size={48} className="text-agro-green" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Pending Approval</h2>
          <p className="text-xl text-stone-600 mb-8">Admin will verify your details in 24 hours.</p>
          <button 
             onClick={() => setScreen('WELCOME')}
             className="w-full h-20 bg-black text-white text-xl font-bold rounded-lg"
          >
             Back to Home
          </button>
       </div>
     )
  }

  // 4. MAIN DASHBOARD (MENU)
  if (screen === 'HOME') {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col">
        <div className="bg-agro-green p-6 text-white pb-8 rounded-b-3xl shadow-md">
           <div className="flex justify-between items-start mb-4">
             <div>
                <h1 className="text-2xl font-bold leading-tight">{currentFarmer.name}</h1>
                <div className="flex items-center text-green-100 text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  {currentFarmer.stateOfResidence || currentFarmer.location} State
                </div>
             </div>
             {currentFarmer.verified && (
               <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold flex items-center border border-white/30 backdrop-blur-sm">
                 <Check size={12} className="mr-1"/> Verified
               </div>
             )}
           </div>

           <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="flex items-center mb-3">
                 <Sprout size={16} className="text-agro-gold mr-2" />
                 <span className="font-bold text-lg">{currentFarmer.farmName}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                 <div className="flex flex-col">
                   <span className="text-agro-gold text-xs uppercase font-bold tracking-wider opacity-80">Method</span>
                   <span className="font-medium">{currentFarmer.farmingMethod}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-agro-gold text-xs uppercase font-bold tracking-wider opacity-80">Size</span>
                   <span className="font-medium">{currentFarmer.farmSize}</span>
                 </div>
                 <div className="col-span-2 mt-2 pt-2 border-t border-white/10">
                   <span className="text-agro-gold text-xs uppercase font-bold tracking-wider opacity-80 block mb-1">Key Crops</span>
                   <div className="flex flex-wrap gap-2">
                      {currentFarmer.mainCrops?.map(crop => (
                        <span key={crop} className="bg-black/20 px-2 py-0.5 rounded text-xs font-medium border border-white/10">
                          {crop}
                        </span>
                      ))}
                   </div>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="flex-1 px-4 -mt-4 space-y-4 pt-4">
           {/* BIG BUTTONS */}
           <button 
             onClick={() => setScreen('ADD_CROP_SELECT')}
             className="w-full h-28 bg-white rounded-xl shadow-lg border-b-4 border-green-800 flex items-center px-6 active:border-b-0 active:translate-y-1 transition-all"
           >
             <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mr-5 shrink-0">
               <Upload size={28} className="text-agro-green"/>
             </div>
             <div className="text-left">
               <span className="block text-xl font-bold text-black">New Harvest</span>
               <span className="text-stone-500 text-sm">Add produce to sell</span>
             </div>
           </button>

           <button 
             onClick={() => setScreen('ORDERS')}
             className="w-full h-28 bg-white rounded-xl shadow-lg border-b-4 border-stone-300 flex items-center px-6 active:border-b-0 active:translate-y-1 transition-all relative"
           >
             <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mr-5 shrink-0">
               <ChevronRight size={28} className="text-orange-600"/>
             </div>
             <div className="text-left">
               <span className="block text-xl font-bold text-black">View Orders</span>
               <span className="text-stone-500 text-sm">2 items pending</span>
             </div>
             <div className="absolute top-4 right-4 bg-red-600 text-white font-bold w-6 h-6 text-sm rounded-full flex items-center justify-center">2</div>
           </button>

           <button 
             onClick={() => setScreen('MONEY')}
             className="w-full h-28 bg-white rounded-xl shadow-lg border-b-4 border-stone-300 flex items-center px-6 active:border-b-0 active:translate-y-1 transition-all"
           >
             <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-5 shrink-0">
               <Check size={28} className="text-blue-600"/>
             </div>
             <div className="text-left">
               <span className="block text-xl font-bold text-black">My Money</span>
               <span className="text-stone-500 text-sm">Check balance</span>
             </div>
           </button>

           <button 
             onClick={() => setScreen('WELCOME')}
             className="w-full py-4 text-stone-400 font-bold"
           >
             Log Out
           </button>
        </div>
      </div>
    );
  }

  // 5. ADD CROP FLOW
  if (screen === 'ADD_CROP_SELECT') {
    const crops = ['Yam', 'Cassava', 'Tomatoes', 'Corn', 'Rice', 'Beans'];
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="p-4 border-b flex items-center bg-stone-50">
           <button onClick={() => setScreen('HOME')} className="mr-4"><ArrowLeft size={32}/></button>
           <h2 className="text-2xl font-bold">What are you selling?</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
           {crops.map(crop => (
             <button 
               key={crop}
               onClick={() => { setSelectedCrop(crop); setScreen('ADD_CROP_DETAILS'); }}
               className="h-32 border-2 border-stone-200 rounded-lg text-xl font-bold hover:bg-green-50 hover:border-agro-green active:bg-agro-green active:text-white"
             >
               {crop}
             </button>
           ))}
        </div>
      </div>
    );
  }

  if (screen === 'ADD_CROP_DETAILS') {
    return (
      <div className="min-h-screen bg-white flex flex-col p-4">
        <div className="flex items-center mb-6">
           <button onClick={() => setScreen('ADD_CROP_SELECT')}><ArrowLeft size={32}/></button>
           <h2 className="text-2xl font-bold ml-4">Selling: {selectedCrop}</h2>
        </div>

        <div className="space-y-6">
           <div>
             <label className="block text-xl font-bold mb-2">Quantity Available</label>
             <div className="flex gap-2">
               <input 
                 type="number" 
                 className="flex-1 h-20 border-2 border-black rounded-lg px-4 text-3xl font-bold"
                 placeholder="0"
                 value={qty}
                 onChange={e => setQty(e.target.value)}
               />
               <div className="w-24 h-20 bg-stone-100 flex items-center justify-center font-bold border-2 border-stone-200 rounded-lg">
                 Bags
               </div>
             </div>
           </div>

           <div>
             <label className="block text-xl font-bold mb-2">Price Per Bag (₦)</label>
             <input 
               type="number" 
               className="w-full h-20 border-2 border-black rounded-lg px-4 text-3xl font-bold"
               placeholder="0"
               value={price}
               onChange={e => setPrice(e.target.value)}
             />
           </div>
        </div>

        <button 
          onClick={handleStockSubmit}
          className="mt-auto w-full h-24 bg-agro-green text-white text-2xl font-bold rounded-lg mb-4"
        >
          Confirm & Post
        </button>
      </div>
    );
  }

  if (screen === 'ADD_SUCCESS') {
    return (
       <div className="min-h-screen bg-agro-green flex flex-col items-center justify-center p-6 text-center text-white">
          <Check size={80} className="mb-6" />
          <h2 className="text-4xl font-bold mb-4">SUCCESS!</h2>
          <p className="text-2xl mb-12">{selectedCrop} added to market.</p>
          <button 
             onClick={() => { setSelectedCrop(''); setQty(''); setPrice(''); setScreen('HOME'); }}
             className="w-full h-20 bg-white text-agro-green text-xl font-bold rounded-lg"
          >
             Done
          </button>
       </div>
    );
  }

  // 6. ORDERS SCREEN
  if (screen === 'ORDERS') {
    return (
      <div className="min-h-screen bg-stone-100">
        <div className="p-4 bg-white shadow-sm flex items-center sticky top-0">
           <button onClick={() => setScreen('HOME')} className="mr-4"><ArrowLeft size={32}/></button>
           <h2 className="text-2xl font-bold">Incoming Orders</h2>
        </div>
        
        <div className="p-4 space-y-4">
           {MOCK_ORDERS.filter(o => o.farmerId === currentFarmer.id).map(order => (
             <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border-l-8 border-agro-green">
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-xl">Order #{order.id}</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 font-bold rounded">
                    {order.status === 'PAID_ESCROW' ? 'PAID - SHIP NOW' : order.status}
                  </span>
                </div>
                <div className="text-lg mb-6">
                   {order.products.map(p => (
                     <div key={p.productId}>{p.quantity} x {p.name}</div>
                   ))}
                   <div className="text-stone-500 mt-2">Total: ₦{order.total.toLocaleString()}</div>
                </div>
                
                {order.status === 'PAID_ESCROW' && (
                  <button className="w-full h-16 bg-black text-white text-lg font-bold rounded-lg">
                    I Have Sent It
                  </button>
                )}
             </div>
           ))}
        </div>
      </div>
    );
  }

  // 7. MONEY SCREEN
  if (screen === 'MONEY') {
    return (
      <div className="min-h-screen bg-stone-100">
        <div className="p-4 bg-white shadow-sm flex items-center">
           <button onClick={() => setScreen('HOME')} className="mr-4"><ArrowLeft size={32}/></button>
           <h2 className="text-2xl font-bold">My Money</h2>
        </div>

        <div className="p-4">
           <div className="bg-agro-green text-white p-6 rounded-xl shadow-lg mb-8">
              <p className="text-lg opacity-80 mb-1">Available to Withdraw</p>
              <p className="text-5xl font-bold">₦ 450,000</p>
              <button className="w-full bg-white text-agro-green font-bold py-4 mt-6 rounded-lg">
                Withdraw to Bank
              </button>
           </div>

           <h3 className="font-bold text-xl mb-4 text-stone-600">Locked in Escrow</h3>
           <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg flex justify-between items-center border border-stone-200">
                 <span className="font-bold">Order #8821</span>
                 <span className="font-mono">₦ 7,500</span>
              </div>
              <div className="bg-white p-4 rounded-lg flex justify-between items-center border border-stone-200 text-stone-400">
                 <span className="font-bold">Order #9932 (Released)</span>
                 <span className="font-mono">₦ 5,000</span>
              </div>
           </div>
           
           <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 text-sm font-bold rounded-lg">
              Note: Money is locked until customer receives the goods. This protects everyone.
           </div>
        </div>
      </div>
    );
  }

  return <div>Error</div>;
};