import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EntryPage from './Screens/EntryPage/EntryPage';
import QuestionScreen from './Screens/QuestionScreens/QuestionsScreen';
import './App.css';
import FinishedScreen from './Screens/FinishedScreen/FinishedScreen';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/question" element={<QuestionScreen />} />
          <Route path='/question/finished' element={<FinishedScreen />}/>
        </Routes>
     
    </Router>
  );
}

export default App;
