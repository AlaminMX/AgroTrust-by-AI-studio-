import React, { useState } from 'react';
import { ShieldCheck, MapPin, Search, ShoppingBag, CheckCircle, Info, Truck, Leaf } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS, STATES } from '../constants';
import { generateProductDescription } from '../services/geminiService';

export const ConsumerView: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'shop' | 'orders'>('shop');
  const [aiDescription, setAiDescription] = useState<Record<string, string>>({});
  const [loadingDesc, setLoadingDesc] = useState<string | null>(null);

  const filteredProducts = selectedState === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.state === selectedState);

  const handleLearnMore = async (product: Product) => {
    if (aiDescription[product.id]) return;
    
    setLoadingDesc(product.id);
    const desc = await generateProductDescription(product.name, product.farmerName, product.state);
    setAiDescription(prev => ({ ...prev, [product.id]: desc }));
    setLoadingDesc(null);
  };

  return (
    <div className="min-h-screen bg-agro-cream text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-3xl font-bold text-agro-green tracking-tight">AgroTrust</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-600">
              <button onClick={() => setActiveTab('shop')} className={`${activeTab === 'shop' ? 'text-agro-green font-bold' : 'hover:text-agro-green'}`}>Marketplace</button>
              <button onClick={() => setActiveTab('orders')} className={`${activeTab === 'orders' ? 'text-agro-green font-bold' : 'hover:text-agro-green'}`}>Tracking</button>
            </div>
            <div className="flex items-center space-x-4">
               <div className="relative p-2">
                 <ShoppingBag className="h-6 w-6 text-stone-600" />
                 <span className="absolute top-0 right-0 bg-agro-green text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
               </div>
            </div>
          </div>
        </div>
      </nav>

      {activeTab === 'shop' ? (
        <>
          {/* Hero Section */}
          <div className="bg-stone-100 py-16 border-b border-stone-200">
             <div className="max-w-7xl mx-auto px-4 text-center">
               <h1 className="font-serif text-4xl md:text-5xl text-agro-green font-bold mb-6">
                 Fresh. Verified. Direct.
               </h1>
               <p className="text-stone-600 max-w-2xl mx-auto text-lg mb-8 leading-relaxed">
                 Buy produce directly from Nigerian farmers. We hold your payment in secure escrow until you confirm delivery. No scams, no middlemen.
               </p>
               
               {/* Search & Filter */}
               <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-stone-200 p-2 flex flex-col md:flex-row items-center gap-2">
                 <div className="flex items-center w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-stone-100">
                    <MapPin className="h-5 w-5 text-agro-green mr-2" />
                    <select 
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="bg-transparent border-none focus:ring-0 text-stone-700 font-medium cursor-pointer outline-none w-full"
                    >
                      <option value="All">All States</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
                 <div className="flex-1 flex items-center w-full px-4 py-2">
                    <Search className="h-5 w-5 text-stone-400 mr-2" />
                    <input 
                      type="text" 
                      placeholder="Search yam, tomatoes, rice..." 
                      className="w-full border-none focus:ring-0 outline-none text-stone-700 placeholder-stone-400"
                    />
                 </div>
                 <button className="w-full md:w-auto bg-agro-green text-white px-8 py-3 rounded-md font-bold hover:bg-green-800 transition-colors">
                   Find Produce
                 </button>
               </div>
             </div>
          </div>

          {/* Product Grid */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-bold text-stone-800">Latest Harvests</h2>
               <span className="text-sm text-stone-500">Showing {filteredProducts.length} verified items</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-200 overflow-hidden group">
                  <div className="relative h-56 bg-stone-200">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {product.verified && (
                      <div className="absolute top-4 left-4 bg-agro-gold text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center shadow-sm">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified Source
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-stone-900">{product.name}</h3>
                        <span className="font-mono text-lg font-bold text-agro-green">₦{product.price.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-stone-500">per {product.unit}</p>
                    </div>

                    <div className="flex items-center text-sm text-stone-600 mb-4 pb-4 border-b border-stone-100">
                      <MapPin className="w-4 h-4 mr-1 text-stone-400" />
                      {product.state} State 
                      <span className="mx-2 text-stone-300">•</span>
                      <span className="font-medium text-agro-brown">{product.farmerName}</span>
                    </div>
                    
                    {/* Dynamic AI Description Area */}
                    <div className="min-h-[2.5rem] mb-4">
                      {aiDescription[product.id] ? (
                         <p className="text-sm text-stone-600 italic">
                           "{aiDescription[product.id]}"
                         </p>
                      ) : (
                        <button 
                          onClick={() => handleLearnMore(product)}
                          disabled={loadingDesc === product.id}
                          className="text-xs text-agro-brown font-semibold flex items-center hover:underline uppercase tracking-wide"
                        >
                          <Info className="w-3 h-3 mr-1" />
                          {loadingDesc === product.id ? 'Loading...' : 'Check Quality Info'}
                        </button>
                      )}
                    </div>

                    <button className="w-full bg-agro-green text-white py-4 rounded font-bold hover:bg-green-800 transition-colors flex justify-center items-center">
                       Secure Purchase
                    </button>
                    <p className="mt-2 text-[10px] text-center text-stone-400 uppercase tracking-wider">
                      Protected by AgroTrust Escrow
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Simple Orders View */
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8">Order Tracking</h2>
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8 text-center">
             <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Truck className="w-8 h-8 text-stone-400" />
             </div>
             <h3 className="text-lg font-bold text-stone-800 mb-2">No Active Orders</h3>
             <p className="text-stone-500 mb-6">You haven't purchased any produce yet.</p>
             <button onClick={() => setActiveTab('shop')} className="text-agro-green font-bold hover:underline">
               Browse Marketplace
             </button>
          </div>
        </div>
      )}
    </div>
  );
};