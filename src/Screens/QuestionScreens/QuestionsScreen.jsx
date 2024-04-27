import React, { useCallback, useEffect, useState } from 'react';
import questions from "../../questions.json"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function QuestionScreen() {

    const navigate = useNavigate();

    const [questionIndices, setQuestionIndices] = useState([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});


    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [answer, setAnswer] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({});
    const [unAnswered, setUnAnswered] = useState([]);
    const [reviewLater, setReviewLater] = useState([]);
    const [answered, setAnswered] = useState([]);

    const [timer, setTimer] = useState(null); // State variable to hold the timer value
    const [currentTime, setCurrentTime] = useState(2 * 60); // Initial time in seconds (10 hours)
    const [timerColor, setTimerColor] = useState('black'); // State variable to hold the timer color



    useEffect(() => {
        const indices = questions.map((_, index) => index);
        setQuestionIndices(indices);
        console.log(questionIndices);
        setCurrentQuestion(questions[currentQuestionIndex]);
        selectedAnswers[currentQuestionIndex];
        // console.log(`answrr: ${JSON.stringify(selectedAnswers)},`);
        // const parsed = JSON.parse(JSON.stringify(selectedAnswers)); // Parse the string back to an array
        // selectedAnswers.forEach(answer => {
        //     console.log(`ID: ${answer.id}, Selected Option: ${answer.selectedOption}`);
        // });
         // Add event listener for browser's back button
         window.onpopstate = () => {
            // Navigate to the home page
            navigate('/');
        };
        // Cleanup the event listener when component unmounts
        


        startTimer();
        return () => {
            clearInterval(timer);
            window.onpopstate = "";
        };

        

    }, [currentQuestionIndex, selectedOptions, selectedAnswers, unAnswered, answer]);

    const handleRemoveIndex = (indexToRemove) => {
        setQuestionIndices(prevIndices => prevIndices.filter(index => index !== indexToRemove));
    };



    const handleNavigation = () => {
        const params = { selectedAnswers,unAnswered };

        // Convert the params object to a URL query string
        const queryString = new URLSearchParams(params).toString();
        console.log(queryString);
        console.log(`eeeee`);
        
        // Pass the unAnswered state value to the navigate function
        navigate("/question/finished", { state: params });
    };


    const startTimer = () => {
        setTimer(setInterval(() => {
            setCurrentTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer); // Stop the timer when it reaches zero
                    setTimerColor('red');
                    handleNavigation();
                    return 0;
                } else if (prevTime <= 60) { // Less than 1 minute remaining
                    setTimerColor('red'); // Change the timer color to red
                }
                return prevTime - 1;// Decrease the current time by 1 second
            });
        }, 1000));
    };

    // Function to format the time in HH:MM:SS
    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };




    const handleOptionSelect = (ans) => {
        setAnswer(ans);
        setSelectedOptions({
            ...selectedOptions,
            [currentQuestionIndex]: ans
        });

        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = ans;
        setSelectedAnswers(updatedSelectedAnswers);


        // const newSelectedAnswer = { id: currentQuestionIndex, selectedOption: ans };
        // setSelectedAnswers(prevSelectedAnswers => {
        //     const updatedAnswers = [...prevSelectedAnswers];
        //     updatedAnswers[currentQuestionIndex] = newSelectedAnswer;
        //     return updatedAnswers;
        // });
        // console.log(`new : ${JSON.stringify(selectedAnswers)}`);

        // console.log(`set: ${selectedAnswers.length > 0 ? selectedAnswers[0].id : "No selected answers"}`);


    };


    // function to hanlde the unanswered and answered questions
    const handleUnAnsweredQuestion = () => {

        if (selectedAnswers[currentQuestionIndex] === undefined ||
            selectedAnswers[currentQuestionIndex] === 0) {
            if (selectedOptions[currentQuestionIndex] === undefined ||
                selectedOptions[currentQuestionIndex] === "") {

                if (!unAnswered.includes(currentQuestionIndex)) {
                    // If the current question index is not already in the unAnswered array, add it
                    setUnAnswered(prevUnAnswered =>
                        [...prevUnAnswered, currentQuestionIndex]);
                }

            } else {
                if (unAnswered.includes(currentQuestionIndex)) {

                    setUnAnswered(prevUnAnswered => prevUnAnswered.filter(index => index !== currentQuestionIndex));
                }

            }
        } else if (selectedAnswers[currentQuestionIndex] === undefined &&
            currentQuestionIndex !== 0) {

            if (!unAnswered.includes(currentQuestionIndex)) {
                // If the current question index is not already in the unAnswered array, add it
                setUnAnswered(prevUnAnswered => [...prevUnAnswered, currentQuestionIndex]);
            }

        } else if (selectedAnswers[currentQuestionIndex] !== undefined && selectedAnswers[currentQuestionIndex] !== "") {

            if (unAnswered.includes(currentQuestionIndex)) {
                setUnAnswered(prevUnAnswered =>
                    prevUnAnswered.filter(index => index !== currentQuestionIndex)
                );
            }
            if (reviewLater.includes(currentQuestionIndex)) {
                setReviewLater(prevReviewLater =>
                    prevReviewLater.filter(index => index !== currentQuestionIndex)
                );
            }
        }


        if (reviewLater.includes(currentQuestionIndex)) {
            setReviewLater(prevReviewLater => prevReviewLater.filter(index => index !== currentQuestionIndex));

        }
        handleNextQuestion();


    }

    const handleReviewLaterQuestion = () => {

        if (selectedOptions[currentQuestionIndex] !== undefined &&
            selectedOptions[currentQuestionIndex] !== "") {
            // If the current question has a selected option
            if (!reviewLater.includes(currentQuestionIndex)) {

                // If the current question index is not already in the reviewLater array, add it
                if (unAnswered.includes(currentQuestionIndex)) {
                    setUnAnswered(prevUnAnswered => prevUnAnswered.filter(index => index !== currentQuestionIndex));

                    setReviewLater(prevReviewLater => {
                        const updatedReviewLater = [...prevReviewLater, currentQuestionIndex];
                        console.log(`Updated reviewLater array:`, updatedReviewLater);
                        return updatedReviewLater;
                    });
                }
                setReviewLater(prevReviewLater => {
                    const updatedReviewLater = [...prevReviewLater, currentQuestionIndex];
                    console.log(`Updated reviewLater array:`, updatedReviewLater);
                    return updatedReviewLater;
                });
                console.log(`4${reviewLater}`);
            }
        } else {
            // If the current question has no selected option
            if (reviewLater.includes(currentQuestionIndex)) {
                if (selectedOptions[currentQuestionIndex] !== undefined || selectedOptions[currentQuestionIndex] !== "") {
                    setReviewLater(prevReviewLater => [...prevReviewLater, currentQuestionIndex]);

                } else {
                    setReviewLater(prevReviewLater => prevReviewLater.filter(index => index !== currentQuestionIndex));

                }
                // Remove the current question index from the reviewLater array
            }
        }

        // Move to the next question
        handleNextQuestion();
    }


    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            handleRemoveIndex(currentQuestionIndex);
            if (!reviewLater.includes(currentQuestionIndex) && !unAnswered.includes(currentQuestionIndex)) {
                setAnswered(prevAnswered => [...prevAnswered, currentQuestionIndex]);


            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            clearSelectedOption();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {

            setCurrentQuestionIndex(currentQuestionIndex - 1);

        }
    };


    const clearSelectedOption = () => {
        const updatedSelectedOptions = { ...selectedOptions };
        delete updatedSelectedOptions[currentQuestionIndex];
        setSelectedOptions(updatedSelectedOptions);
    };

    return (
        <div className='question-main-container'>
        

            {/* <div className="start-timer" style={{ color: timerColor }}>
                {formatTime(currentTime)}
            </div> */}

            <div className="questions">
                <div className="start-timer" style={{ color: timerColor }}>
                    {formatTime(currentTime)}
                </div>
                <div className="timer-heading">
                    <h3>Question no: {currentQuestionIndex + 1}</h3>
                </div>

                <h5>{questions[currentQuestionIndex].question}</h5>

                <div className="options">

                    {/* option A */}
                    <button
                        // style={{
                        //     backgroundColor:
                        //         (selectedAnswers[currentQuestionIndex] === currentQuestion.A ||
                        //             selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].B)
                        //             ? 'green'
                        //             : 'white'
                        // }}
                        style={{
                            backgroundColor:
                                (selectedOptions[currentQuestionIndex] === currentQuestion.A ||
                                    selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].A)
                                    ? 'green'
                                    : 'white'
                        }}
                        onClick={() => handleOptionSelect(questions[currentQuestionIndex].A)}
                    >{questions[currentQuestionIndex].A}</button>

                    {/* option B */}
                    <button
                        style={{
                            backgroundColor:
                                (selectedOptions[currentQuestionIndex] === currentQuestion.B ||
                                    selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].B)
                                    ? 'green'
                                    : 'white'
                        }}
                        onClick={() => handleOptionSelect(questions[currentQuestionIndex].B)}

                    >{questions[currentQuestionIndex].B}</button>

                    {/* option C */}
                    <button
                        style={{
                            backgroundColor:
                                (selectedOptions[currentQuestionIndex] === currentQuestion.C ||
                                    selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].C)
                                    ? 'green'
                                    : 'white'
                        }}
                        onClick={() => handleOptionSelect(questions[currentQuestionIndex].C)}
                    >{questions[currentQuestionIndex].C}</button>

                    {/* option D */}
                    <button
                        style={{
                            backgroundColor:
                                (selectedOptions[currentQuestionIndex] === currentQuestion.D ||
                                    selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].D)
                                    ? 'green'
                                    : 'white'
                        }}
                        onClick={() => handleOptionSelect(questions[currentQuestionIndex].D)}
                    >{questions[currentQuestionIndex].D}</button>
                </div>

                <div className="previous-next-btn">
                    <button
                        className='previous-btn'
                        onClick={() => {
                            console.log(`index   ${currentQuestionIndex}`);
                            console.log(`prious btn : ${selectedAnswers[currentQuestionIndex]},    ${selectedOptions[currentQuestionIndex]}`);
                            handlePreviousQuestion();

                        }}
                    >Previous</button>
                    <button
                        className='next-btn'
                        onClick={() => {
                            // handleNextQuestion();
                            handleUnAnsweredQuestion(currentQuestionIndex);
                        }}
                    >Next</button>

                    {/* {selectedOptions[currentQuestionIndex] && */}
                    <button
                        className='review-btn'

                        onClick={handleReviewLaterQuestion}
                    >Review later</button>

                    <Link
                        className="finished-btn"
                        to={{
                            pathname: "/question/finished",

                            search: `?selectedAnswers=${JSON.stringify(selectedAnswers)}&unAnswered=${JSON.stringify(unAnswered)}`
                        }}

                    >
                        {/* {questions.length}{currentQuestionIndex +1} */}
                        {currentQuestionIndex + 1 < questions.length
                            ? "Quit" : "Finished"}
                    </Link>

                </div>
            </div>

            <div className="buttons"></div>

            <div className="section-container">
                <h2>Instructions</h2>

                <div style={{
                    margin: 30,
                    borderBottom: "1px solid rgb(213, 212, 212)"
                }}>
                    {/* answered */}
                    <div
                        style={{ display: "flex", marginBottom: 10 }}
                    ><p style={{
                        flex: 1
                    }}>Questions which are answered</p>
                        <button style={{

                            backgroundColor: "green",
                            height: 55,
                            width: 55
                        }}></button>
                    </div>
                    {/* Unanswered */}
                    <div
                        style={{ display: "flex", marginBottom: 10 }}
                    ><p style={{
                        flex: 1
                    }} >Questions which are not answered</p>
                        <button style={{
                            backgroundColor: "red",
                            height: 55,
                            width: 55,
                            marginLeft: 10
                        }}></button>
                    </div>

                    {/* Review later */}
                    <div
                        style={{ display: "flex", marginBottom: 10 }}
                    ><p style={{
                        flex: 1
                    }}>Questions which are selected for review later</p>
                        <button style={{
                            backgroundColor: "purple",
                            height: 55,
                            width: 55,
                            marginLeft: 10
                        }}></button>
                    </div>

                    {/* Question not viewed later */}
                    <div
                        style={{ display: "flex", marginBottom: 10 }}
                    ><p style={{
                        flex: 1
                    }}>Questions which are not visited</p>
                        <button style={{
                            backgroundColor: "greenyellow",
                            height: 55,
                            width: 55,
                            marginLeft: 10
                        }}></button>
                    </div>
                </div>
                <div className='question-numbers'>

                    {questions.map((item, index) => {
                        const value = index;

                        return (
                            <button
                                style={{
                                    backgroundColor: unAnswered.includes(index)
                                        ? "red" : reviewLater.includes(index) ? "purple"
                                            : answered.includes(index) ? "green" : "greenyellow"



                                }}
                                onClick={() => {
                                    console.log(`options : ${selectedAnswers},    ${selectedOptions[index]}`);
                                    console.log(`color :  ${selectedAnswers[value]},  ${reviewLater},  ${selectedOptions[index]}, ${selectedAnswers[index]}`);

                                    setCurrentQuestionIndex(index);
                                }}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default QuestionScreen;