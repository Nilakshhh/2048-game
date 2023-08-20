import React from 'react';
import { useState, useEffect } from "react";
import useEventListener from '@use-it/event-listener'


function Game2048() {
  var doc = document;
  const name = doc.getElementById("textToUpdate").textContent; 
  const [username, setUsername] = useState(name);
  var drawBox = function (value, x, y) {
    var elm = doc.createElement("div");
    elm.className = "box-" + value*10;
    elm.style = "transform: translate(" + x + "px," + y + "px)";
  
    var title = doc.createElement("div");
    title.className = "title";
    title.innerText = value;
  
    elm.appendChild(title);
    doc.getElementsByClassName("playground")[0].appendChild(elm);
  }
  const ESCAPE_KEYS = ['27', 'Escape'];
  const Left_Key = ['37', 'ArrowLeft'];
  const Up_Key = ['38', 'ArrowUp'];
  const Right_Key = ['39', 'ArrowRight'];
  const Down_Key = ['40', 'ArrowDown'];

  function handler({ key }) {
    if (ESCAPE_KEYS.includes(String(key))) {
      console.log('Escape key pressed!');
    }
    else if (Left_Key.includes(String(key))) {
      handleLeftClick();
    }
    else if (Up_Key.includes(String(key))) {
      handleUpClick();
    }
    else if (Right_Key.includes(String(key))) {
      handleRightClick();
    }
    else if (Down_Key.includes(String(key))) {
      handleDownClick();
    }
  }
  useEventListener('keydown', handler);

const [initialArray, setinitialArray] = useState(
  [[{val:0, x:0, y:0}, {val:0, x:109, y:0}, {val:0, x:219, y:0}, {val:0, x:328, y:0}],
  [{val:0, x:0, y:109}, {val:0, x:109, y:109}, {val:0, x:219, y:109}, {val:0, x:328, y:109}],
  [{val:0, x:0, y:219}, {val:0, x:109, y:219}, {val:0, x:219, y:219}, {val:0, x:328, y:219}],
  [{val:0, x:0, y:328}, {val:0, x:109, y:328}, {val:0, x:219, y:328}, {val:0, x:328, y:328}]
]);
const [score, setscore] = useState(0);
const [game, setgame] = useState([{display:"start", mode:"not-started", work:true}]);
//, {display:"reset",mode:"going-on"}, {display:"Won", mode:"game-won"}, {display:"Lost", mode:"Game-ended-lost"}

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


function genRandom(n){
const randomNumber = Math.floor(Math.random() * n);
return randomNumber;
}

function start(){
  
  let tempArray = [{display:"reset",mode:"going-on", work:false}];
  setgame(tempArray);
  const newArray = [...initialArray];
  for (let i = 0; i < newArray.length; i++) {
    for (let j = 0; j < newArray[i].length; j++) {
      newArray[i][j].val=0;
    }
  }
  var ran1 = genRandom(newArray.length);
  var ran2 = genRandom(newArray.length);
  newArray[ran1][ran2].val=2;
  setinitialArray(newArray);
}

function checkwin(){
  for(var i=0;i<initialArray.length;i++){
    for(var j=0;j<initialArray.length;j++){
      if(initialArray[i][j].val === 2048){
        let tempArray = [{display:"Won", mode:"game-won", work:false}];
        setgame(tempArray);
        return;
      }
    }
  }
  return;
}
function checkAdjacentElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      // Check the element to the right (if it exists)
      if (j < arr[i].length - 1 && arr[i][j].val === arr[i][j+1].val) {
        return false;
      }

      // Check the element below (if it exists)
      if (i < arr.length - 1 && arr[i][j].val === arr[i+1][j].val) {
        return false;
      }
    }
  }

  return true;
}
function gamelost(){
  for(var i=0;i<initialArray.length;i++){
    for(var j=0;j<initialArray.length;j++){
      if(initialArray[i][j].val === 0){
        return;
      }
    }
  }
  var lost = checkAdjacentElements(initialArray);
  if(lost === true){
    let tempArray = [{display:"Lost", mode:"Game-ended-lost", work:false}];
        setgame(tempArray);
  }  
  return;
}
function handleLeftClick(){
  let temp = 0;
  const newArray = [...initialArray];
  for (let i = 0; i < newArray.length; i++) {
    for (let j = 1; j < newArray.length; j++) {
      if (newArray[i][j].val !== 0) {
        let k = j;
        while (k > 0 && newArray[i][k-1].val === 0) {
          newArray[i][k-1].val = newArray[i][k].val;
          newArray[i][k].val = 0;
          k--;
        }
        if (k > 0 && newArray[i][k-1].val === newArray[i][k].val) {
          newArray[i][k-1].val *= 2;
          temp += newArray[i][k-1].val;
          newArray[i][k].val = 0;
        }
      }
    }
  }

  let checkArray = [];
  for(let i = 0; i < newArray.length; i++){
    if(newArray[i][newArray.length-1].val === 0){
      checkArray.push(i);
    }
  }
  var ran1 = genRandom(checkArray.length);
  var prob = genRandom(100);
  newArray[checkArray[ran1]][newArray.length-1].val = prob<92 ? 2 : 4;
  setscore(score + temp);
  setinitialArray(newArray);
  checkwin();
  gamelost();
  }

function handleRightClick(){
  let temp = 0;
  const newArray = [...initialArray];
  for (let i = 0; i < newArray.length; i++) {
    for (let j = newArray.length - 2; j >= 0; j--) {
      if (newArray[i][j].val !== 0) {
        let k = j;
        while (k < newArray.length - 1 && newArray[i][k+1].val === 0) {
          // Shift the tile to the right until it hits the edge or a non-empty tile
          newArray[i][k+1].val = newArray[i][k].val;
          newArray[i][k].val = 0;
          k++;
        }
        if (k < newArray.length - 1 && newArray[i][k+1].val === newArray[i][k].val) {
          // Merge the tile with the adjacent tile if they have the same value
          newArray[i][k+1].val *= 2;
          temp += newArray[i][k+1].val;
          newArray[i][k].val = 0;
        }
      }
    }
  }
  
  let checkArray = [];
  for(let i = 0; i < newArray.length; i++){
    if(newArray[i][0].val === 0){
      checkArray.push(i);
    }
  }
  var ran1 = genRandom(checkArray.length);
  var prob = genRandom(100);
  newArray[checkArray[ran1]][0].val = prob<93 ? 2 : 4;
  setinitialArray(newArray);
  setscore(score + temp);
  checkwin();
  gamelost();
}

function handleUpClick(){
  let temp = 0;
  const newArray = [...initialArray];
  for (let j = 0; j < newArray.length; j++) {
    for (let i = 1; i < newArray.length; i++) {
      if (newArray[i][j].val !== 0) {
        let k = i;
        while (k > 0 && newArray[k-1][j].val === 0) {
          newArray[k-1][j].val = newArray[k][j].val;
          newArray[k][j].val = 0;
          k--;
        }
        if (k > 0 && newArray[k-1][j].val === newArray[k][j].val) {
          newArray[k-1][j].val *= 2;
          temp += newArray[k-1][j].val;
          newArray[k][j].val = 0;
        }
      }
    }
  }
  let checkArray = [];
  for(let i = 0; i < newArray.length; i++){
    if(newArray[newArray.length-1][i].val === 0){
      checkArray.push(i);
    }
  }
  var ran1 = genRandom(checkArray.length);
  var prob = genRandom(100);
  newArray[newArray.length-1][checkArray[ran1]].val = prob<93 ? 2 : 4;
  setinitialArray(newArray);
  setscore(score + temp);
  checkwin();
  gamelost();
  }

function handleDownClick(){
 
  let temp = 0;
  const newArray = [...initialArray];
  for (let j = 0; j < newArray.length; j++) {
    for (let i = newArray.length - 2; i >= 0; i--) {
      if (newArray[i][j].val !== 0) {
        let k = i;
        while (k < newArray.length - 1 && newArray[k+1][j].val === 0) {
          // Shift the tile downwards until it hits the edge or a non-empty tile
          newArray[k+1][j].val = newArray[k][j].val;
          newArray[k][j].val = 0;
          k++;
        }
        if (k < newArray.length - 1 && newArray[k+1][j].val === newArray[k][j].val) {
          // Merge the tile with the adjacent tile if they have the same value
          newArray[k+1][j].val *= 2;
          temp += newArray[k+1][j].val;
          newArray[k][j].val = 0;
        }
      }
    }
  }
  let checkArray = [];
  for(let i = 0; i < newArray.length; i++){
    if(newArray[0][i].val === 0){
      checkArray.push(i);
    }
  }
  var ran1 = genRandom(checkArray.length);
  var prob = genRandom(100);
  newArray[0][checkArray[ran1]].val = prob<95 ? 2 : 4;
  setinitialArray(newArray);
  setscore(score + temp);
  checkwin();
  gamelost();
}
 
    return (
      <>
      <div className="header">
    <div><span className="logo">2048</span>
      <div className="scores-container">
        <div className="score-container" id="score">{score}</div>
      </div>
    </div>
    <div className="sub-header"><span>Join the numbers and get to the <b>2048</b> tile!</span>
    </div>
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
    <button className="custom-button" onClick={start}>{game[0].display}</button>
      
      <>
      {(game[0].work && <h1 className='hide'>game on</h1>) || (
        <>
          <div className='game-end-box'>
            <div className='end-screen'>
              <h1>hell</h1>
            </div>
          </div>
        </>
      )}
      </>
      </>
    );
}
  export default Game2048;
  