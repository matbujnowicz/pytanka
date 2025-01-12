import { useEffect, useState, useMemo } from 'react';
import './App.css';
import { Button, Typography, Grid, Paper } from '@mui/material';
import db from './db.json';

function App() {
  const [questions, setQuestions] = useState([]);
  const [randomElement, setRandomElement] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleNextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setRandomElement(questions[randomIndex]);
    setQuestions(prevQuestions => prevQuestions.filter((_, index) => index !== randomIndex));
    setShowCorrect(false);
  };

  const handleShowCorrect = () => {
    setShowCorrect(true);
  };

  useEffect(() => {
    setQuestions(db);
  }, []);

  const mappedAnswers = useMemo(() => {
    if (!randomElement) return [];

    return Object.entries(randomElement.answers).map(([key, answer]) => (
      <Grid item xs={6} key={key}>
        <Paper elevation={3} style={{ padding: '10px', backgroundColor: showCorrect && randomElement.correct === key ? 'lightgreen' : 'white' }}>
          <Typography variant="h6">{answer}</Typography>
        </Paper>
      </Grid>
    ));
  }, [randomElement, showCorrect]);

  return (
      <div className="App">
        <header className="App-header">
        <Typography variant="p" style={{position: 'fixed', top: '5px', right: '5px', color: 'red'}} > Pozostało: {questions.length} </Typography>
          <Typography variant="h6" gutterBottom>
            {randomElement ? randomElement.question : questions.length > 0 ? '': 'GAME OVER'}
          </Typography>
          <Grid container spacing={2}>
            {mappedAnswers}
          </Grid>
          <div style={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleNextQuestion}>
              Następne
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleShowCorrect}
              style={{ marginLeft: '10px' }}
            >
              odpowiedź
            </Button>
          </div>
        </header>
      </div>
  );
}

export default App;
