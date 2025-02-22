import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shared.css';

const ReleaseDateSelect = () => {
 const navigate = useNavigate();
 const [selectedDecades, setSelectedDecades] = useState([]);

 const decades = [
   '2020s', '2010s', '2000s', '1990s', '1980s', 'Older'
 ];

 const toggleDecade = (decade) => {
   setSelectedDecades(prevDecades => {
     if (prevDecades.includes(decade)) {
       return prevDecades.filter(d => d !== decade);
     } else {
       return [...prevDecades, decade];
     }
   });
 };

 return (
   <div className="container">
     <div className="card">
       <div className="content">
         <h1 className="title">Select Era</h1>
         <p className="description">Select all decades you are interested in</p>          
         <div className="languages-grid">
           {decades.map((decade) => (
             <button 
               key={decade}
               className={`option-button ${selectedDecades.includes(decade) ? 'selected' : ''}`}
               onClick={() => toggleDecade(decade)}
             >
               {decade}
             </button>
           ))}
         </div>
         
         <div className="nav-buttons">
           <button className="back-button" onClick={() => navigate('/genre')}>
             Back
           </button>
           <button 
             className="next-button"
             onClick={() => navigate('/budget')}
             disabled={selectedDecades.length === 0}
           >
             Next
           </button>
         </div>
       </div>
     </div>
   </div>
 );
};

export default ReleaseDateSelect;