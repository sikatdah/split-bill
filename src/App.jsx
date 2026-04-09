import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import TaxConfig from './components/TaxConfig';
import PeopleManager from './components/PeopleManager';
import ItemManager from './components/ItemManager';
import Summary from './components/Summary';
import { RotateCcw } from 'lucide-react';

function App() {
  const [tax, setTax] = useLocalStorage('splitbill_tax', 11);
  const [serviceTax, setServiceTax] = useLocalStorage('splitbill_service', 5);
  const [people, setPeople] = useLocalStorage('splitbill_people', []);
  const [items, setItems] = useLocalStorage('splitbill_items', []);

  const handleReset = () => {
    if (window.confirm("Yakin ingin menghapus semua data pesanan dan daftar orang?")) {
      setPeople([]);
      setItems([]);
      setTax(11);
      setServiceTax(5);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>FairShare Bill</h1>
        <p>Hitung tagihan secara adil, mudah, dan transparan.</p>
      </div>

      <div className="left-panel">
        <TaxConfig 
          tax={tax} setTax={setTax} 
          serviceTax={serviceTax} setServiceTax={setServiceTax} 
        />
        <PeopleManager 
          people={people} 
          setPeople={setPeople} 
        />
        <ItemManager 
          items={items} setItems={setItems} 
          people={people} 
        />
        
        {people.length > 0 && (
          <div style={{marginTop: '2rem'}}>
            <button className="btn btn-secondary" onClick={handleReset} style={{color: '#6b7280', fontSize: '0.85rem'}}>
              <RotateCcw size={14} /> Reset Semua Data
            </button>
          </div>
        )}
      </div>

      <div className="right-panel">
        <div style={{position: 'sticky', top: '2rem'}}>
          <Summary 
            people={people} 
            items={items} 
            tax={tax} 
            serviceTax={serviceTax} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
