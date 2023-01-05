import React, { useEffect, useState } from "react";
import "./Level.css";
const Levellogic = ({
  row,
  col,
  randomNumbers,
  lifeLine,
  setLifeLine,
  currentLevel,
  setCurrentLevel
})=> {
  const rows = [...Array(row).keys()];
  const cols = [...Array(col).keys()];
  const [randomColor, setRandomColor] = useState();
  const [startGame, setStartGame] = useState(false);
  const [coloredBoxNumber, setColoredBoxNumber] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [selectedBox, setSelectedBox] = useState([])

  // Below function used to generated random number based on min and max number
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
 //Below function used for generating random color for box
  const generateRandomColor = () => {
    const newColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
    setRandomColor(newColor);
  };
 // Below useEffect is used for random selection of color box from All boxes.
 // here randomNumbers stand for total number of box that should be colored
  useEffect(() => {
    if(lifeLine > 0) {
      generateRandomColor()
      setStartGame(false);
      let allNumbers = [];
      const lastNumber = row * col;
      for (let i = 0; i < randomNumbers; i++) {
        let random = randomNumber(1, lastNumber);
        if (!allNumbers.includes(random)) {
          allNumbers.push(random);
        } else {
          i--;
        }
      }
      setColoredBoxNumber(allNumbers);
      setTimeout(() => {
        setStartGame(true);
      }, 5000);
    }
  }, [lifeLine, currentLevel]);

   // Below useEffect is used to set new level if user selected right color boxes.
  useEffect(() => {
    if(coloredBoxNumber.length > 0 && selectedBox.length>0 && (selectedBox.length === coloredBoxNumber.length) && !gameOver) {
      setCurrentLevel(prev=> prev + 1 )
      setSelectedBox([])
    }
  },[selectedBox])

  // Below function is logic to display color box among all the boxes.
  const colorMatrix = () => {
    let num = 1;
    return rows.map((row, rowIdx) => (
      // <>
        <tr key={rowIdx}>
          {cols.map((col, colIdx) => (
            <React.Fragment key={colIdx}>
              {coloredBoxNumber.includes(num) ? (
                <td
                  key={colIdx}
                  style={{ backgroundColor: `${randomColor}`, cursor: "none" }}
                >
                  <span style={{opacity:0}}>{num++}</span>
                </td>
              ) : (
                <td key={colIdx} style={{ cursor: "none" }}>
                <span style={{opacity:0}}>{num++}</span>
                </td>
              )}
            </React.Fragment>
          ))}
        </tr>
      // </>
    ));
  };

   // Below function is logic to check either user selected right color box.
  const selectBox = (e) => {
    e.preventDefault();
    if(lifeLine > 0) {
      let selectedNumber = e.target.innerText;
      if (!coloredBoxNumber.includes(+selectedNumber)) {
        setLifeLine((prev) => prev - 1);
        setSelectedBox([])
      } else {
        setSelectedBox(prev => [...prev, +selectedNumber])
      }
    }
  };
// Below function is logic to display the boxes for user to select color boxes.
  const drawBoxes = () => {
    let num = 1;
    return rows.map((row, rowIdx) => (
      // <>
        <tr key={rowIdx} >
          {!gameOver ? 
          cols.map((col, colIdx) => (
            <React.Fragment key={colIdx}>
              {(selectedBox.includes(num)) ? (
                <td key={colIdx} style={{ pointerEvents: "none", backgroundColor:`${randomColor}`}} >
                  <span style={{opacity:0}}>{num++}</span>
                </td>
              ):
              (<td onClick={(e) => selectBox(e)} key={colIdx}>
              <span style={{opacity:0}}>{num++}</span>
                </td>)
              }
            </React.Fragment>
          )):
          cols.map((col, colIdx) => (
            <td  key={colIdx} style={{ pointerEvents: "none", opacity: 0}} >
            <span style={{opacity:0}}>{num++}</span>
            </td>
          ))
          }
        </tr>
      // </>
    ));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setLifeLine(5);
    setCurrentLevel(1)
    setGameOver(false);
  };
  return (
    <>
      
      {(lifeLine !== 0 && currentLevel <= 8) &&
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}
      >
        <div>
          <table>
            <tbody>{startGame ? drawBoxes() : colorMatrix()}</tbody>
          </table>
        </div>
      </div>
      }
      {lifeLine === 0 && (
      <>
      <h1 style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          Game Over
      </h1>
      </>
      )}
      {currentLevel > 8 && (
        <h1 style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          congratulation! You Are Winner
      </h1>
      )

      }
      {(lifeLine === 0 || currentLevel > 8) && (
      <h3>
        <button onClick={(e)=>handleReset(e)}>Restart Again</button>
      </h3>
      )}
    </>
  );
}

export default Levellogic;
