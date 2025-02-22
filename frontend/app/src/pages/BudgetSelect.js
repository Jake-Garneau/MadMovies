import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shared.css';

const BudgetSelect = () => {
 const navigate = useNavigate();
 const [selectedBudgets, setSelectedBudgets] = useState([]);

 const budgets = [
   'Small (<$20M)', 'Medium ($20M-$100M)', 'Large (>$100M)'
 ];

 const toggleBudget = (budget) => {
   setSelectedBudgets(prevBudgets => {
     if (prevBudgets.includes(budget)) {
       return prevBudgets.filter(b => b !== budget);
     } else {
       return [...prevBudgets, budget];
     }
   });
 };

 return (
   <div className="container">
     <div className="card">
       <div className="content">
         <h1 className="title">Select Budget</h1>
         <p className="description">Select all budget ranges you are interested in</p>          
         <div className="options-container">
           {budgets.map((budget) => (
             <button 
               key={budget}
               className={`option-button ${selectedBudgets.includes(budget) ? 'selected' : ''}`}
               onClick={() => toggleBudget(budget)}
             >
               {budget}
             </button>
           ))}
         </div>
         
         <div className="nav-buttons">
           <button className="back-button" onClick={() => navigate('/era')}>
             Back
           </button>
           <button 
             className="next-button"
             onClick={() => navigate('/result')}
             disabled={selectedBudgets.length === 0}
           >
             Next
           </button>
         </div>
       </div>
     </div>
   </div>
 );
};

export default BudgetSelect;