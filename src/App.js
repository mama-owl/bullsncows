import "./App.css";
import { useState } from "react";

const ExactMatch = "exact-match";
const PartialMatch = "partial-match";
const NoMatch = "no-match";

class Result {
  matchType = NoMatch;
  number = "-";

  constructor(matchType, number) {
    this.matchType = matchType;
    this.number = number;
  }
}

const generateAnswer = () => {
  // TODO: make this 4 unique digits
  const answer = Math.floor(Math.random() * 10000);

  return answer.toString().split("");
};

function App() {
  const [answer, setAnswer] = useState(generateAnswer());
  const [guess, setGuess] = useState("");
  const [guessResults, setGuessResults] = useState([
    new Result(NoMatch, "-"),
    new Result(NoMatch, "-"),
    new Result(NoMatch, "-"),
    new Result(NoMatch, "-"),
  ]);

  const [firstGuessDone, setFirstGuessDone] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);

  /**
   * Handle the guess button click
   * @returns 
   */
  const handleGuess = () => {
    if (guess.length !== 4) {
      alert("Please enter a 4 digit number");
      return;
    }

    //
    // Don't add the first and default value to the history
    //
    if (firstGuessDone === true) {
      setGuessHistory([...guessHistory, guessResults]);
    } else {
      setFirstGuessDone(true);
    }

    const guessArray = guess.split("");
    const newGuessResults = [...guessResults];

    //
    // Update the match results. Iterate through the guess and answer values.
    //
    for (let i = 0; i < guessArray.length; i++) {
      const guessNumber = guessArray[i];
      const answerNumber = answer[i];

      if (guessNumber === answerNumber) {
        newGuessResults[i] = new Result(ExactMatch, guessNumber);
      } else if (answer.includes(guessNumber)) {
        newGuessResults[i] = new Result(PartialMatch, guessNumber);
      } else {
        newGuessResults[i] = new Result(NoMatch, guessNumber);
      }
    }

    setGuessResults(newGuessResults);
  };

  return (
    <div className="App">
      <div className="guessResults">
        {guessResults.map((result, index) => (
          <div key={index} className={result.matchType}>
            {result.number}
          </div>
        ))}
      </div>

      <div className="guessResults">
        {answer.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>

      <p>Guess the 4 digit number</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleGuess}>Guess</button>

      <p>History</p>
      <div>
        {guessHistory.map((history) => (
          <div className="guessResults">
            {history.map((result, index) => (
              <div key={index} className={result.matchType}>
                {result.number}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
