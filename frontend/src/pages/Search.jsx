import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/location') return null;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    navigate(`/location?place=${encodeURIComponent(input.trim())}`);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="flex gap-4 mb-1">
        <label className="text-stone-200 font-bold p-2">Search for a location</label>
      </div>
      <div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Gold Coast" className="px-4 py-2 rounded-md"/>
        <button type="submit" className="text-stone-200 font-bold bg-stone-900 rounded-md ml-6 px-6 py-2 hover:bg-slate-800 cursor-pointer">Submit</button>
      </div>
    </form>
    
  )
};

export default Search;