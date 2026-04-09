import React, { useState } from 'react';
import { Users, UserPlus, Trash2 } from 'lucide-react';

export default function PeopleManager({ people, setPeople }) {
  const [newPerson, setNewPerson] = useState('');

  const addPerson = () => {
    if (newPerson.trim()) {
      setPeople([...people, { id: crypto.randomUUID(), name: newPerson.trim() }]);
      setNewPerson('');
    }
  };

  const removePerson = (id) => {
    setPeople(people.filter(p => p.id !== id));
  };

  return (
    <div className="glass-card">
      <div className="card-title">
        <Users size={20} /> Daftar Orang
      </div>
      
      <div className="form-row mb-2">
        <input 
          type="text" 
          placeholder="Nama orang..." 
          value={newPerson} 
          onChange={e => setNewPerson(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addPerson()}
        />
        <button className="btn btn-primary" onClick={addPerson}>
          <UserPlus size={18} /> Tambah
        </button>
      </div>

      <div className="list-group mt-2">
        {people.length === 0 && (
          <div className="empty-state">Belum ada orang. Tambahkan beberapa orang yang ikut makan.</div>
        )}
        {people.map(person => (
          <div key={person.id} className="list-item">
            <span>{person.name}</span>
            <button className="btn-icon" onClick={() => removePerson(person.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
