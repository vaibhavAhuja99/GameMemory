import React,{useState} from 'react';
import Levellogic from "./Level";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const Main = () => {
  // Here you can add as many as level you want to add . here rows and cols define matrix box and random number are boxes to 
  // be shown in colored
  const allLevels = {
    1: { rows: 3, cols: 2, randomNumbers: 2 },
    2: { rows: 3, cols: 3, randomNumbers: 3 },
    3: { rows: 4, cols: 3, randomNumbers: 4 },
    4: { rows: 3, cols: 4, randomNumbers: 5 },
    5: { rows: 4, cols: 4, randomNumbers: 6 },
    6: { rows: 5, cols: 4, randomNumbers: 7 },
    7: { rows: 5, cols: 5, randomNumbers: 8 },
    8: { rows: 6, cols: 5, randomNumbers: 9 }
  };
  
  const [currentLevel, setCurrentLevel] = useState(1);
  const [lifeLine, setLifeLine] = useState(5);
  const { rows, cols, randomNumbers } = currentLevel > 8 ? allLevels[8] : allLevels[currentLevel];

  const renderLifeLine = () => {
    const starArray = [...Array(5).keys()].map(i => i + 1);
    return starArray.map((i)=>(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        color={lifeLine >= i ? "orange" : "lightgrey"}
    />
    ))
  }

  return (
    <>
    <h2 style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
      { currentLevel < 9 ? "Level:" +  currentLevel : "" }
    </h2>
    <Levellogic
      row={rows}
      col={cols}
      currentLevel={currentLevel}
      randomNumbers={randomNumbers}
      lifeLine={lifeLine}
      setLifeLine={setLifeLine}
      setCurrentLevel={setCurrentLevel}
    />
    {renderLifeLine()}
    </>
  );
}

export default Main;
