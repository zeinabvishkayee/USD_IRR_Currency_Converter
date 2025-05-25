 import React from 'react';

import CurrencyConverter from "./Components/Currency-Converter";
function App() {
  return (
   <div className="App" style={{margin:'100px 0'}}>
       <h1 style={{textAlign : 'center'}}>مبدل ارز USD=1 / IRR=830_000</h1> 
       <CurrencyConverter/>
   </div>
  );
}

export default App;
 