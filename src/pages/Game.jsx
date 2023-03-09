import React from 'react';
import Bigbutton from '../components/Bigbutton';
import { useState, useEffect } from "react";

function Game() {
  var doc = document;
  var drawBox = function (value, x, y) {
    var elm = doc.createElement("div");
    elm.className = "box-" + value;
    elm.style = "transform: translate(" + x + "px," + y + "px)";
  
    var title = doc.createElement("div");
    title.className = "title";
    title.innerText = value;
  
    elm.appendChild(title);
    doc.getElementsByClassName("playground")[0].appendChild(elm);
  }


const [initialArray, setinitialArray] = useState(
  [[{val:0, x:0, y:0}, {val:0, x:109, y:0}, {val:0, x:219, y:0}, {val:0, x:328, y:0}],
  [{val:0, x:0, y:109}, {val:0, x:109, y:109}, {val:0, x:219, y:109}, {val:0, x:328, y:109}],
  [{val:0, x:0, y:219}, {val:0, x:109, y:219}, {val:0, x:219, y:219}, {val:0, x:328, y:219}],
  [{val:0, x:0, y:328}, {val:0, x:109, y:328}, {val:0, x:219, y:328}, {val:0, x:328, y:328}]
]);


function load() {
  document.getElementsByClassName("playground")[0].innerHTML="";
  initialArray.forEach(row => {
  row.forEach(element => {
    drawBox(element.val,element.x,element.y)
    });
  });
}


useEffect(() => {
  load();
},[initialArray]);


function genRandom(){
const randomNumber = Math.floor(Math.random() * 4);
return randomNumber;
}

function start(){
  setinitialArray(prevState => {
    const newArray = [...prevState];
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray[i].length; j++) {
        newArray[i][j].val=0;
      }
    }
    var ran1 = genRandom();
    var ran2 = genRandom();
    newArray[ran1][ran2].val=2;
    //newArray[0][1].val=2;
        
    return newArray;
    
  });
}


function handleLeftClick(){
  setinitialArray(prevState => {
    console.log("exec");
   const newArray = [...prevState];
    for(let i = 0; i<newArray.length; i++){
      for(let j = newArray.length-1; j>0; j--){
        if(newArray[i][j].val !== 0){
            if(newArray[i][j-1].val === 0){
              newArray[i][j-1].val = newArray[i][j].val;
              newArray[i][j].val = 0;
            }
            else if(newArray[i][j-1].val === newArray[i][j].val){
              newArray[i][j-1].val *= 2;
              newArray[i][j].val = 0; 
            }
            /*else if(newArray[i][j-1].val !== newArray[i][j].val){}*/
        }
      }
    }
    
    /*let checkArray = [];
    for(let i = 0; i < newArray.length; i++){
      if(newArray[i][newArray.length-1].val === 0){
        checkArray.push(i);
      }
    }
    var ran1 = Math.floor(Math.random() * checkArray.length);
    newArray[ran1][newArray.length-1].val=2;
    */newArray[2][newArray.length-1].val=4;
    return newArray;
  });
}


  
    return (
      <>
        <div className="main-page-heading-box">
          <h1>2048 Game</h1>
        </div>
        <div className="grid-box">
        <>
          <div className="game">
      <div className="grid">
        <div className="row">
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
        <div className="row">
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
        <div className="row">
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
        <div className="row">
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
      </div>
      <div className="playground">
      </div>
    </div> 
    </>
    </div>
    <div className="arrow-box">
    <Bigbutton buttonDisplay="↑" />
    <Bigbutton buttonDisplay="↓" />
    <button className="custom-btn btn-12" /*onClick={start}*/>→</button>
    <button className="custom-btn btn-12" onClick={handleLeftClick}>←</button>
    </div>
    <button className="custom-btn btn-12" onClick={start}>click</button>
      </>
    );
  }
  export default Game;
  