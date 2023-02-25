import React from 'react';
import { useState } from 'react';

function Grid() {
    const [myArray, setMyArray] = useState([[{},{},{},{}],[{},{},{},{}],[{},{},{},{}],[{},{},{},{}]]);
  
    const handleCountUpdate = (id) => {
      const updatedArray = myArray.map(item => {
        if (item.id === id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      setMyArray(updatedArray);
    }
  return(
    <>
    <div class="game">
      <div class="grid">
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
        <div class="row">
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
          <div class="cell"></div>
        </div>
      </div>
      <div class="playground">
      </div>
    </div>
    
    </>
);  
}
export default Grid;