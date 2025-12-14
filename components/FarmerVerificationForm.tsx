import React, { useState } from 'react';
import { ArrowLeft, Camera, Upload, Check, ChevronRight } from 'lucide-react';
import { NIGERIAN_STATES } from '../constants';
import { FarmerProfile } from '../types';

interface Props {
  onSubmit: (data: Partial<FarmerProfile>) => void;
  onCancel: () => void;
}

export const FarmerVerificationForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    stateOfOrigin: '',
    stateOfResidence: '',
    farmName: '',
    farmSize: '',
    farmingMethod: 'Conventional',
    mainCrops: '',
    nin: '',
    passportPhoto: null as File | null,
    ninImage: null as File | null,
    idImage: null as File | null,
  });

  const handleFileChange = (field: 'passportPhoto' | 'ninImage' | 'idImage') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    // In a real app, we would upload files to storage here.
    // For this prototype, we create object URLs.
    const passportPhotoUrl = formData.passportPhoto ? URL.createObjectURL(formData.passportPhoto) : undefined;
    const ninImageUrl = formData.ninImage ? URL.createObjectURL(formData.ninImage) : undefined;
    const idImageUrl = formData.idImage ? URL.createObjectURL(formData.idImage) : undefined;

    const profileData: Partial<FarmerProfile> = {
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      location: formData.stateOfResidence,
      stateOfOrigin: formData.stateOfOrigin,
      stateOfResidence: formData.stateOfResidence,
      farmName: formData.farmName,
      farmSize: formData.farmSize,
      farmingMethod: formData.farmingMethod,
      mainCrops: formData.mainCrops.split(',').map(s => s.trim()),
      nin: formData.nin,
      passportPhotoUrl,
      ninImageUrl,
      idImageUrl,
    };

    onSubmit(profileData);
  };

  const InputField = ({ label, value, onChange, placeholder, type = "text" }: any) => (
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2 text-stone-800">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-16 border-2 border-stone-300 rounded-lg px-4 text-xl focus:border-agro-green focus:ring-2 focus:ring-agro-green outline-none transition-all"
      />
    </div>
  );

  const SelectField = ({ label, value, onChange, options }: any) => (
    <div className="mb-4">
      <label className="block text-lg font-bold mb-2 text-stone-800">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-16 border-2 border-stone-300 rounded-lg px-4 text-xl bg-white focus:border-agro-green outline-none"
      >
        <option value="">Select...</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  const FileUpload = ({ label, field, file }: { label: string, field: 'passportPhoto' | 'ninImage' | 'idImage', file: File | null }) => (
    <div className="mb-6">
      <label className="block text-lg font-bold mb-2 text-stone-800">{label}</label>
      <label className={`flex flex-col items-center justify-center w-full h-32 border-4 border-dashed rounded-xl cursor-pointer transition-colors ${file ? 'border-agro-green bg-green-50' : 'border-stone-300 bg-stone-50 hover:bg-stone-100'}`}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {file ? (
             <>
               <Check className="w-10 h-10 text-agro-green mb-2" />
               <p className="text-sm font-bold text-agro-green">{file.name}</p>
             </>
          ) : (
            <>
              <Camera className="w-10 h-10 text-stone-400 mb-2" />
              <p className="text-sm font-bold text-stone-500">Tap to Upload / Take Photo</p>
            </>
          )}
        </div>
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange(field)} />
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-stone-100 p-4 border-b border-stone-200 sticky top-0 z-10 flex items-center justify-between">
         <div className="flex items-center">
            <button onClick={step === 1 ? onCancel : () => setStep(step - 1)} className="p-2 mr-2 bg-white rounded-full shadow-sm">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Verification ({step}/3)</h1>
         </div>
         <div className="text-xs font-bold text-agro-green bg-green-100 px-2 py-1 rounded">
           SECURE
         </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto pb-32">
        {step === 1 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-bold mb-6 text-agro-green">Identity Basics</h2>
            
            <FileUpload label="Passport Photo" field="passportPhoto" file={formData.passportPhoto} />
            
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" value={formData.firstName} onChange={(v: string) => setFormData({...formData, firstName: v})} />
              <InputField label="Last Name" value={formData.lastName} onChange={(v: string) => setFormData({...formData, lastName: v})} />
            </div>
            
            <InputField label="Phone Number" type="tel" placeholder="080..." value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} />
            
            <SelectField label="State of Origin" value={formData.stateOfOrigin} onChange={(v: string) => setFormData({...formData, stateOfOrigin: v})} options={NIGERIAN_STATES} />
            <SelectField label="State of Residence" value={formData.stateOfResidence} onChange={(v: string) => setFormData({...formData, stateOfResidence: v})} options={NIGERIAN_STATES} />
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-bold mb-6 text-agro-green">Farm Details</h2>
            
            <InputField label="Farm Name" placeholder="e.g. Green Acres" value={formData.farmName} onChange={(v: string) => setFormData({...formData, farmName: v})} />
            
            <div className="grid grid-cols-2 gap-4">
               <InputField label="Farm Size" placeholder="e.g. 5 Plots" value={formData.farmSize} onChange={(v: string) => setFormData({...formData, farmSize: v})} />
               <SelectField label="Method" value={formData.farmingMethod} onChange={(v: string) => setFormData({...formData, farmingMethod: v})} options={['Conventional', 'Organic', 'Hydroponic', 'Mixed', 'Livestock']} />
            </div>

            <InputField label="Main Crops (Comma Separated)" placeholder="Yam, Cassava, Maize" value={formData.mainCrops} onChange={(v: string) => setFormData({...formData, mainCrops: v})} />
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-bold mb-6 text-agro-green">Official Documents</h2>
            <p className="mb-6 text-stone-500">We need these to prevent fraud. Your data is secure.</p>
            
            <InputField label="NIN Number" placeholder="11-digit Number" value={formData.nin} onChange={(v: string) => setFormData({...formData, nin: v})} />
            
            <FileUpload label="Upload NIN Slip Image" field="ninImage" file={formData.ninImage} />
            <FileUpload label="Upload Valid ID Card" field="idImage" file={formData.idImage} />
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-200">
        {step < 3 ? (
          <button 
            onClick={() => setStep(step + 1)}
            disabled={
              (step === 1 && (!formData.firstName || !formData.phone || !formData.stateOfResidence)) ||
              (step === 2 && (!formData.farmName || !formData.mainCrops))
            }
            className="w-full h-16 bg-black text-white text-xl font-bold rounded-xl flex items-center justify-center disabled:opacity-50 disabled:bg-stone-300"
          >
            Next Step <ChevronRight className="ml-2" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={!formData.nin || !formData.ninImage}
            className="w-full h-16 bg-agro-green text-white text-xl font-bold rounded-xl flex items-center justify-center disabled:opacity-50"
          >
            Submit Application <Check className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};