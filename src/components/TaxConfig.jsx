import React from 'react';
import { Percent } from 'lucide-react';

export default function TaxConfig({ tax, setTax, serviceTax, setServiceTax }) {
  return (
    <div className="glass-card">
      <div className="card-title">
        <Percent size={20} className="text-primary" /> Tax & Service
      </div>
      <div className="form-row">
        <div className="input-group">
          <label>Tax PPN (%)</label>
          <input 
            type="number" 
            value={tax} 
            onChange={e => setTax(parseFloat(e.target.value) || 0)} 
            min="0" 
            step="0.1" 
          />
        </div>
        <div className="input-group">
          <label>Service Charge (%)</label>
          <input 
            type="number" 
            value={serviceTax} 
            onChange={e => setServiceTax(parseFloat(e.target.value) || 0)} 
            min="0" 
            step="0.1" 
          />
        </div>
      </div>
    </div>
  );
}
