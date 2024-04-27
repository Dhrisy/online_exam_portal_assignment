import React, { useEffect, useState } from 'react';
import questions from "../../questions.json"
import { useLocation, useNavigate } from 'react-router-dom';
import Congrats from "../../assets/congrats.gif"
import Floating from "../../assets/floating.gif"
import Done from "../../assets/done.gif"
import Oops from "../../assets/oops.gif"
import Right from "../../assets/right.jpg"
import Wrong from "../../assets/wrong.jpg"
import ItsOk from "../../assets/itsOk.gif"



function FinishedScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    // const { selectedAnswer = [], unAnswers = [] } = location.state || {};
    const searchParams = new URLSearchParams(location.search);
    const selectedAnswersParam = searchParams.get('selectedAnswers');
    const unAnsweredParams = searchParams.get('unAnswered');

    // Parse the selectedAnswersParam back to an array if needed
    const selectedAnswers = JSON.parse(selectedAnswersParam);
    const unAnswered = JSON.parse(unAnsweredParams);

    // Now you have access to the selectedAnswers array
    // console.log(selectedAnswer);
    // console.log(unAnswers);

    // console.log(selectedAnswers);
    // console.log(unAnswered);



    const [score, setScore] = useState(0);
    const [wrong, setWrong] = useState(0);
    // const history = useNavigation();





    // const calculateResults = () => {
    //     let correct = 0;

    //     // Loop through each question
    //     questions.forEach((question, index) => {
    //         let option = question.answer;
    //         console.log(`option ${question[option]}`);
    //         if (selectedAnswers[index] === question[option]) {
    //             setScore(correct++);


    //         } else {
    //             console.log(`wrong`);

    //         }


    //     });

    //     setWrong((questions.length) - score);

    //     return correct;
    // };

    const calculateResults = () => {
        let correct = 0;

        // Loop through each question
        questions.forEach((question, index) => {
            let option = question.answer;
            if (selectedAnswers !== null) {
                if (selectedAnswers[index] === question[option]) {
                    setScore(correct++);


                } else {
                    console.log(`wrong`);

                }
            } else {
                console.log(`EMPTYYYYYYYYYYYYYYYYY`);
            }


        });

        setWrong((questions.length) - score);

        return correct;
    };




    useEffect(() => {
        // Calculate the score when the component mounts
        const correctAnswers = calculateResults();
        setScore(correctAnswers);

        // Add event listener for browser's back button
        const handleBackButton = () => {
            // Navigate to the home page
            navigate('/');

        };
        window.addEventListener('popstate', handleBackButton);

        // Cleanup the event listener when component unmounts
        return () => {
            console.log(`bbbbbb`);

            window.removeEventListener('popstate', handleBackButton);
        };
    }, [selectedAnswers, navigate]);

    // let _score = 5;
    return (
        <div className='finish-container'>
            <div className="content">


                {score > 4 ? <img src={Done} alt="Congratulations" />
                    : score >= 4 ? <img src={ItsOk} alt="Congratulations" />
                        : <img src={Oops} alt="Congratulations" />

                }

                <div className="heading">
                    {score > 4 ? <p>Congratulations</p>
                        : score >= 4 ? <p>Congratulations</p>
                            : <p className='oops'>Oops</p>

                    }
                    {score > 4 ? <p>!</p>
                        : score >= 4 ? <p>!</p>
                            : <p className='oops'>!</p>

                    }

                </div>


                <div className="results">
                    <div className='correct-div'>
                        <div className="correct-content">
                            <h3>Correct</h3>
                            <img src={Right} alt="Congratulations" />
                        </div>

                        <h1>{score}</h1>
                    </div>
                    <div className="wrong-div">
                        <div className="wrong-content">
                            <h3>Wrong</h3>
                            <img src={Wrong} alt="Congratulations" />
                        </div>
                        <h1>{wrong}</h1>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinishedScreen;