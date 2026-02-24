import React, { useState, useMemo } from 'react';

const BRANCHES = [
  'Akkaraipattu','Akuressa','Aluthgama','Ambalangoda','Ambalantota','Ampara','Anuradhapura','Aralaganwila',
  'Athurugiriya','Attidiya','Avissawella','Badulla','Baduruliya','Balangoda','Bambalapitiya','Bandaragama',
  'Bandarawela','Battaramulla','Batticaloa','Beliatta','Beruwala','Bogawanthalawa','Boralesgamuwa','Borella',
  'Bowatte','Chankanai','Chavakachcheri','Chenkaladi','Chilaw','Chunnakam','Cinnamon Gardens','Colombo Fort Branch',
  'Pettah 02','Dam Street Branch','Dambulla','Dankotuwa','Dehiattakandiya','Dehiwela','Dummalasuriya','Eheliyagoda',
  'Embilipitiya','Eppawala','Galenbindunuwewa','Galle','Gampaha','Gampola','Ganemulla','Giriulla','Godagama',
  'Godakawela','Gothatuwa','Grandpass','Hambantota','Hatton','Havelock Town','Hettipola','Hikkaduwa','Hingurakgoda',
  'Homagama','Horana','Ingiriya','Ja-ela','Jaffna','Kadawatha','Kaduruwela','Kalmunei','Kalpitiya','Kalubowila',
  'Kalutara','Kaluwanchikudy','Kamburupitiya','Kandana','Kandy','Kantale','Karapitiya','Kataragama','Kattankudy',
  'Katugastota','Katunayake','Katuneriya','Kegalle','Kekirawa','Kelaniya','Kilinochchi','Kiribathgoda','Kirindiwela',
  'Kirulapone','Kochchikade','Koggala','Kollupitiya','Kotahena','Kottawa','Kuliyapitiya','Kurunegala','Kurunegala 02',
  'Maharagama','Mahiyanganaya','Malabe','Manampitiya','Manipay','Mannar','Maradagahamula','Maradana','Matale',
  'Matara','Matara Bazzar','Mathugama','Mawanella','Mawathagama','Medawachchiya','Millennium','Minuwangoda',
  'Mirigama','Monaragala','Moratuwa','Motatumulla','Mount Lavinia','Mulativu','Mutwal','Narammala','Nawala',
  'Nawalapitiya','Negombo','Nelliyadi','Nittambuwa','Nochchiyagama','Nugegoda','Nuwara Eliya','Old Moor Street',
  'Padaviya','Padukka','Pallekele','Panadura','Pannala','Pelmadulla','Peradeniya','Pettah','Pilimathalawa',
  'Piliyandala','Pitakotte','Pottuvil','Pussallawa','Puttlam','Raddolugama','Ranpokunugama','Ratnapura',
  'Ruwanwella','Sammanthurai','Sarikkamulla','Siyambalanduwa','Soysapura','Thalawakele','Tissamaharamaya',
  'Trincomalee','Udappuwa','Union Place','Vavuniya','Veyangoda','Wadduwa','Warakapola','Wariyapola','Wattala',
  'Welimada','Weliveriya','Wellawatte','Wennappuwa','Wijerama','Yakkala','Yatiyanthota','Rajagiriya','Thalawathugoda',
];

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchableBranchSelect({ value, onChange, placeholder }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return BRANCHES;
    const q = query.toLowerCase();
    return BRANCHES.filter((b) => b.toLowerCase().includes(q));
  }, [query]);

  const handleSelect = (branch: string) => {
    onChange(branch);
    setQuery(branch);
    setOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query || value}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder || 'Select branch'}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
      />
      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-56 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          {filtered.length === 0 && (
            <div className="px-3 py-2 text-xs text-gray-500">No branches match your search.</div>
          )}
          {filtered.map((branch) => (
            <button
              key={branch}
              type="button"
              onClick={() => handleSelect(branch)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-red-50 ${
                branch === value ? 'bg-red-50 font-medium text-[#C8102E]' : 'text-gray-700'
              }`}
            >
              {branch}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

