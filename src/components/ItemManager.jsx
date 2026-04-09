import React, { useState } from 'react';
import { ListPlus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

export default function ItemManager({ items, setItems, people }) {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);

  const togglePerson = (personId) => {
    setSelectedPeople(prev => 
      prev.includes(personId) ? prev.filter(id => id !== personId) : [...prev, personId]
    );
  };

  const selectAll = () => {
    if (selectedPeople.length === people.length) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(people.map(p => p.id));
    }
  };

  const addItem = () => {
    if (newItemName.trim() && newItemPrice && selectedPeople.length > 0) {
      setItems([...items, {
        id: crypto.randomUUID(),
        name: newItemName.trim(),
        price: parseFloat(newItemPrice),
        assignedTo: selectedPeople
      }]);
      setNewItemName('');
      setNewItemPrice('');
      setSelectedPeople([]);
    } else if (selectedPeople.length === 0) {
      alert("Pilih setidaknya 1 orang untuk item ini.");
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="glass-card">
      <div className="card-title">
        <ListPlus size={20} /> Daftar Pesanan
      </div>

      {people.length === 0 ? (
        <div className="empty-state">Tambahkan orang terlebih dahulu sebelum memasukkan pesanan.</div>
      ) : (
        <div className="form-container">
          <div className="form-row mb-2">
            <input 
              type="text" 
              placeholder="Nama pesanan (Cth: Nasi Goreng)" 
              value={newItemName} 
              onChange={e => setNewItemName(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Harga (Rp)" 
              value={newItemPrice} 
              onChange={e => setNewItemPrice(e.target.value)}
              min="0"
            />
          </div>
          
          <div className="input-group">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <label>Siapa yang memesan/membagi ini?</label>
              <button 
                type="button" 
                onClick={selectAll} 
                style={{background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600}}
              >
                Pilih Semua
              </button>
            </div>
            <div className="checkbox-group">
              {people.map(p => (
                <label key={p.id} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedPeople.includes(p.id)}
                    onChange={() => togglePerson(p.id)}
                  />
                  <span>{p.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button className="btn btn-primary mt-2" onClick={addItem} style={{width: '100%'}}>
            Tambah Pesanan
          </button>
        </div>
      )}

      <div className="list-group mt-2" style={{marginTop: '1.5rem'}}>
        {items.length === 0 && people.length > 0 && (
          <div className="empty-state">Belum ada pesanan.</div>
        )}
        {items.map(item => (
          <div key={item.id} className="list-item" style={{flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
              <div>
                <strong>{item.name}</strong> - {formatCurrency(item.price)}
              </div>
              <button className="btn-icon" onClick={() => removeItem(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div>
              <span style={{fontSize: '0.8rem', color: '#6b7280'}}>Dibagi oleh: </span>
              {item.assignedTo.map(id => {
                const p = people.find(x => x.id === id);
                return p ? <span key={id} className="badge" style={{marginRight: '0.25rem'}}>{p.name}</span> : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
