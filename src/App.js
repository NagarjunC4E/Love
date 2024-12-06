// import React, { useState, useCallback, useMemo } from 'react';
// import styled, { keyframes, createGlobalStyle } from 'styled-components';
// import {
//   Heart as HeartIcon,
//   Lock
// } from 'lucide-react';

// const dreamyFloatAnimation = keyframes`
//   0%, 100% { 
//     transform: translateY(0) rotate(0deg);
//   }
//   50% { 
//     transform: translateY(-20px) rotate(5deg);
//   }
// `;

// const celestialGlowAnimation = keyframes`
//   0%, 100% { 
//     box-shadow: 0 0 10px rgba(255,255,255,0.3), 
//                 0 0 20px rgba(255,105,180,0.2);
//   }
//   50% { 
//     box-shadow: 0 0 20px rgba(255,255,255,0.5), 
//                 0 0 40px rgba(255,105,180,0.4);
//   }
// `;

// const etherealPulseAnimation = keyframes`
//   0%, 100% { opacity: 0.7; }
//   50% { opacity: 1; }
// `;

// const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&display=swap');
//   body {
//     margin: 0;
//     font-family: 'Cormorant Garamond', serif;
//     overflow: hidden;
//     background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
//   }
// `;

// const Container = styled.div`
//   position: relative;
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(
//     135deg, 
//     rgba(106,17,203,0.9) 0%, 
//     rgba(37,117,252,0.9) 100%
//   );
//   overflow: hidden;
// `;

// const StarfieldBackground = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
//   overflow: hidden;
//   background: radial-gradient(
//     ellipse at bottom, 
//     rgba(20,20,50,1) 0%, 
//     rgba(0,0,0,1) 100%
//   );
// `;

// const CelestialParticle = styled.div`
//   position: absolute;
//   background: white;
//   border-radius: 50%;
//   opacity: ${props => props.opacity};
//   animation: 
//     ${dreamyFloatAnimation} ${props => props.duration}s 
//     ease-in-out infinite alternate;
// `;

// const MagicalCard = styled.div`
//   position: relative;
//   background: rgba(255, 255, 255, 0.15);
//   backdrop-filter: blur(20px);
//   border-radius: 25px;
//   padding: 40px;
//   text-align: center;
//   max-width: 500px;
//   width: 90%;
//   z-index: 10;
//   box-shadow: 0 25px 45px rgba(0,0,0,0.2);
//   animation: ${celestialGlowAnimation} 3s infinite;
//   color: white;
//   opacity: ${props => props.visible ? 1 : 0};
//   transform: ${props => props.visible ? 'scale(1)' : 'scale(0.9)'};
//   transition: all 0.3s ease;
// `;

// const Button = styled.button`
//   background: linear-gradient(45deg, #ff6b6b, #ff4081);
//   color: white;
//   border: none;
//   padding: 15px 30px;
//   border-radius: 50px;
//   font-size: 18px;
//   cursor: pointer;
//   margin: 10px;
//   transition: transform 0.2s ease;
// `;

// const PoetricText = styled.p`
//   font-size: 1.3em;
//   line-height: 1.6;
//   opacity: 0.9;
//   font-style: italic;
// `;

// const ResponseDisplay = styled.div`
//   margin-top: 20px;
//   font-size: 28px;
//   font-weight: bold;
//   color: ${props => props.positive ? '#4caf50' : '#f44336'};
//   text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
//   animation: ${etherealPulseAnimation} 2s infinite alternate;
// `;

// const heartPopAnimation = keyframes`
//   0% { 
//     transform: scale(0);
//     opacity: 0;
//   }
//   70% {
//     transform: scale(1.2);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(1);
//     opacity: 1;
//   }
// `;

// const FloatingHeart = styled.div`
//   position: fixed;
//   color: #ff4081;
//   font-size: ${props => props.size}px;
//   top: ${props => props.top}%;
//   left: ${props => props.left}%;
//   z-index: 100;
//   animation: ${heartPopAnimation} 1s ease-out;
//   pointer-events: none;
// `;

// const ProposalApp = () => {
//   const [stage, setStage] = useState('initial');
//   const [password, setPassword] = useState('');
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState('');
//   const [hearts, setHearts] = useState([]);

//   // Unique identifier for this proposal - keep it constant
//   const PROPOSAL_ID = 'AMMU_LOVE_PROPOSAL_2024';
  
//   // Unique, personal password
//   const CORRECT_PASSWORD = 'ILOVEYOU_AMMU';

//   // Memoized celestial particles (previous implementation)
//   const celestialParticles = useMemo(() => {
//     return [...Array(100)].map((_, i) => (
//       <CelestialParticle
//         key={i}
//         style={{
//           top: `${Math.random() * 100}%`,
//           left: `${Math.random() * 100}%`,
//           width: `${Math.random() * 3}px`,
//           height: `${Math.random() * 3}px`
//         }}
//         opacity={Math.random()}
//         duration={Math.random() * 5 + 3}
//       />
//     ));
//   }, []);

//   // Function to check response across different devices
//   const checkRemoteResponse = useCallback(async () => {
//     try {
//       // First, check if a remote response exists
//       const remoteResponseKey = `${PROPOSAL_ID}_REMOTE_RESPONSE`;
//       const remoteResponse = localStorage.getItem(remoteResponseKey);

//       if (remoteResponse) {
//         const parsedResponse = JSON.parse(remoteResponse);
        
//         // Validate response
//         if (parsedResponse && parsedResponse.answer) {
//           setResponse(parsedResponse.answer);
//           setStage('responded');

//           // Trigger heart animation for 'Yes' response
//           if (parsedResponse.answer === 'Yes') {
//             const newHearts = [...Array(20)].map(() => ({
//               id: Math.random(),
//               top: Math.random() * 100,
//               left: Math.random() * 100,
//               size: Math.random() * 50 + 20
//             }));
//             setHearts(newHearts);

//             // Remove hearts after animation
//             setTimeout(() => {
//               setHearts([]);
//             }, 1500);
//           }

//           return true;
//         }
//       }

//       return false;
//     } catch (error) {
//       console.error('Error checking remote response', error);
//       return false;
//     }
//   }, [PROPOSAL_ID]);

//   const handlePasswordSubmit = async () => {
//     if (password === CORRECT_PASSWORD) {
//       // Check for remote response first
//       const remoteResponseExists = await checkRemoteResponse();

//       // If no remote response, proceed to proposal stage
//       if (!remoteResponseExists) {
//         setStage('proposal');
//       }
      
//       setError('');
//     } else {
//       setError('Only true love knows the secret...');
//     }
//   };

//   const handleProposalResponse = (answer) => {
//     const responseData = {
//       answer,
//       timestamp: new Date().toISOString(),
//       proposalId: PROPOSAL_ID
//     };

//     // Immediate UI update
//     setResponse(answer);
//     setStage('responded');

//     // Add heart animations if answer is Yes
//     if (answer === 'Yes') {
//       const newHearts = [...Array(20)].map(() => ({
//         id: Math.random(),
//         top: Math.random() * 100,
//         left: Math.random() * 100,
//         size: Math.random() * 50 + 20
//       }));
//       setHearts(newHearts);

//       // Remove hearts after animation
//       setTimeout(() => {
//         setHearts([]);
//       }, 1500);
//     }

//     // Store response with a remote-specific key
//     try {
//       const remoteResponseKey = `${PROPOSAL_ID}_REMOTE_RESPONSE`;
//       localStorage.setItem(remoteResponseKey, JSON.stringify(responseData));
      
//       // Trigger storage event manually
//       window.dispatchEvent(new Event('storage'));
//     } catch (error) {
//       console.error('Error storing response', error);
//     }
//   };

//   // Rest of the render methods remain the same as in previous implementation
//   const renderContent = () => {
//     // If response exists, always show the responded stage
//     if (response) {
//       return (
//         <MagicalCard visible={true}>
//           <ResponseDisplay positive={response === 'Yes'}>
//             {response === 'Yes'
//               ? "Thank you from the depths of my heart for accepting my love, my dearest Ammu. I love you more than words can ever express. You mean everything to me, and my heart belongs to you forever. 😘"
//               : "If you accept or not, you are my love forever it continues 💔"}
//           </ResponseDisplay>
//         </MagicalCard>
//       );
//     }

//     // Original stage rendering logic
//     switch (stage) {
//       case 'initial':
//         return (
//           <MagicalCard visible={true}>
//             <h1>A Moment of Eternal Connection</h1>
//             <PoetricText>
//               Where words fail, love speaks. Enter our secret passage...
//             </PoetricText>
//             <input
//               type="password"
//               placeholder="Enter secret password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{
//                 padding: '10px',
//                 margin: '15px 0',
//                 width: '100%',
//                 borderRadius: '10px',
//                 border: '2px solid rgba(255,255,255,0.3)',
//                 background: 'rgba(255,255,255,0.1)',
//                 color: 'white'
//               }}
//             />
//             <Button onClick={handlePasswordSubmit}>
//               <Lock /> Unlock Love
//             </Button>
//             {error && <p style={{ color: '#ff4081', marginTop: '10px' }}>{error}</p>}
//           </MagicalCard>
//         );

//       case 'proposal':
//         return (
//           <MagicalCard visible={true}>
//             <h2>My Love 💖</h2>
//             <PoetricText>
//               In the vast symphony of life, you are the most beautiful melody that my heart has ever known. Every breath I take, every beat of my heart, whispers your name as if the universe itself is singing a song just for us.
//               <br />
//               With you, time stands still. In your eyes, I find my forever. So I ask you, my love, will you join your soul with mine and create a love story that transcends time and space?
//               <br />
//               Will you be mine, now and always, forevermore?
//             </PoetricText>
//             <div>
//               <Button onClick={() => handleProposalResponse('Yes')}>
//                 <HeartIcon /> Yes 💖
//               </Button>
//               <Button onClick={() => handleProposalResponse('No')}>
//                 No 💔
//               </Button>
//             </div>
//           </MagicalCard>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Container>
//       <GlobalStyle />
//       <StarfieldBackground>
//         {celestialParticles}
//       </StarfieldBackground>
//       {/* Render floating hearts */}
//       {hearts.map(heart => (
//         <FloatingHeart
//           key={heart.id}
//           top={heart.top}
//           left={heart.left}
//           size={heart.size}
//         >
//           ❤️❤️❤️
//         </FloatingHeart>
//       ))}
//       {renderContent()}
//     </Container>
//   );
// };

// export default ProposalApp;


import React, { useState } from 'react';
import { Heart, Lock, MessageSquareHeart, Share2, Copy, CheckCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import { database } from './Firebase';
import { ref, set, get, child } from 'firebase/database';
import './App.css';

const ProposalWebsite = () => {
    const [stage, setStage] = useState('password');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [showError, setShowError] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [shareCode, setShareCode] = useState('');
    const [copiedCode, setCopiedCode] = useState(false);
    const [showRetrieveModal, setShowRetrieveModal] = useState(false);
    const [retrieveCode, setRetrieveCode] = useState('');
    const [retrievedAnswers, setRetrievedAnswers] = useState(null);
    const [retrieveError, setRetrieveError] = useState('');
    // const [notificationEmail, setNotificationEmail] = useState('');
    const [sorryAccepted, setSorryAccepted] = useState(null);
    const [biriyaniRideAnswer, setBiriyaniRideAnswer] = useState(null);

    const CORRECT_PASSWORD = 'loveyou2024';

    const questions = [
        "What was the moment you first realized you loved me?",
        "If we could travel anywhere together, where would you want to go and why?",
        "What's your biggest dream that you want us to achieve together?",
        "What makes our love unique and special?",
        "How do you see us supporting each other's growth?",
        "Can you describe a perfect day with me in your imagination?",
        "What does forever mean to you?",
        "Will you marry me and build our dreams together?",
        "Can you come tomorrow morning for a biriyani ride?"
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Generate a unique sharing code
    const generateShareCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    // Save responses to Firebase
    const saveResponsesToFirebase = async (code, responseData) => {
        try {
            await set(ref(database, 'proposals/' + code), {
                responses: responseData,
                sorryAccepted: sorryAccepted,
                biriyaniRideAnswer: biriyaniRideAnswer, // Add this line to save biriyani ride answer
                timestamp: Date.now()
            });
            return true;
        } catch (error) {
            console.error("Error saving responses:", error);
            return false;
        }
    };

    // Retrieve responses from Firebase
    const getResponsesFromFirebase = async (code) => {
        try {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, `proposals/${code}`));

            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error retrieving responses:", error);
            return null;
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setStage('sorry');
            setShowError(false);
        } else {
            setShowError(true);
        }
    };

    const handleSorryResponse = (accepted) => {
        setSorryAccepted(accepted);
        setStage('questions');
    };

    const handleQuestionResponse = async (e) => {
        e.preventDefault();
        const newAnswers = [...answers, {
            question: questions[currentQuestionIndex],
            answer: response
        }];
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setResponse('');
        } else {
            // For the last question (biriyani ride), set the biriyani ride answer
            setBiriyaniRideAnswer(response);

            // Generate share code when all questions are answered
            const code = generateShareCode();
            setShareCode(code);

            // Save to Firebase
            const saved = await saveResponsesToFirebase(code, newAnswers);
            if (saved) {
                setStage('share');
            } else {
                alert("Failed to save responses. Please try again.");
            }
        }
    };

    const RetrieveResponsesModal = () => (
        <AnimatePresence>
            {showRetrieveModal && (
                <motion.div
                    className="retrieve-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowRetrieveModal(false)}
                >
                    <motion.div
                        className="retrieve-modal-content"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-modal-btn"
                            onClick={() => setShowRetrieveModal(false)}
                        >
                            ×
                        </button>
                        <h2>Retrieve Love Story</h2>
                        <form onSubmit={handleRetrieveResponses}>
                            <input
                                type="text"
                                value={retrieveCode}
                                onChange={(e) => setRetrieveCode(e.target.value.toUpperCase())}
                                placeholder="Enter Sharing Code"
                                maxLength={6}
                            />
                            <button type="submit">Retrieve Responses</button>
                            {retrieveError && <p className="error-message">{retrieveError}</p>}
                        </form>

                        {retrievedAnswers && (
                            <div className="retrieved-answers">
                                <h3>Retrieved Love Story</h3>
                                {/* Add Sorry Response Section */}
                                <motion.div
                                    className="retrieved-answer-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <p className="question">Do you accept my apology?</p>
                                    <p className="answer">{sorryAccepted ? 'Yes, I accept' : 'No, I don\'t'}</p>
                                </motion.div>

                                {retrievedAnswers.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="retrieved-answer-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                    >
                                        <p className="question">{item.question}</p>
                                        <p className="answer">{item.answer}</p>
                                    </motion.div>
                                ))}

                                {/* Add Biriyani Ride Answer Section */}
                                <motion.div
                                    className="retrieved-answer-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <p className="question">Can you come tomorrow morning for a biriyani ride?</p>
                                    <p className="answer">{biriyaniRideAnswer || 'No response'}</p>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    const handleCopyCode = () => {
        navigator.clipboard.writeText(shareCode);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    // Retrieve Responses Component
    const handleRetrieveResponses = async (e) => {
        e.preventDefault();
        const storedData = await getResponsesFromFirebase(retrieveCode);

        if (storedData) {
            const storedResponses = storedData.responses;
            const retrievedSorryAccepted = storedData.sorryAccepted;
            const retrievedBiriyaniRideAnswer = storedData.biriyaniRideAnswer;

            setRetrievedAnswers(storedResponses);
            setSorryAccepted(retrievedSorryAccepted);
            // Add biriyani ride answer to the state
            setBiriyaniRideAnswer(retrievedBiriyaniRideAnswer);
            setRetrieveError('');
        } else {
            setRetrieveError('Invalid or expired sharing code');
            setRetrievedAnswers(null);
            setSorryAccepted(null);
            setBiriyaniRideAnswer(null);
        }
    };
    const renderBackgroundStars = () => (
        <div className="background-stars">
            {[...Array(50)].map((_, index) => (
                <motion.div
                    key={index}
                    className="star"
                    initial={{
                        opacity: 0,
                        scale: 0,
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 3
                    }}
                />
            ))}
        </div>
    );

    const renderPasswordStage = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="password-container"
        >
            <div className="password-card">
                <Lock className="icon lock-icon" />
                <h2>Private Love Invitation</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Secret Password"
                    />
                    {showError && (
                        <p className="error-message">Incorrect password. Try again!</p>
                    )}
                    <button type="submit">
                        Enter My Heart
                    </button>
                </form>
            </div>
        </motion.div>
    );

    const renderSorryStage = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sorry-container"
        >
            <div className="password-card">
                <Heart className="icon heart-icon" />
                <h2>I&apos;m Sorry</h2>
                <p>Do you accept my apology for what happened yesterday?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                    <button onClick={() => handleSorryResponse(true)}>
                        Yes, I accept
                    </button>
                    <button onClick={() => handleSorryResponse(false)}>
                        No, I don&apos;t
                    </button>
                </div>
            </div>
        </motion.div>
    );


    const renderShareStage = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="share-container"
        >
            <div className="share-card">
                <Share2 className="icon share-icon" />
                <h2>Share Your Love Story</h2>
                <div className="share-code-section">
                    <p>Your unique sharing code is:</p>
                    <div className="share-code">
                        <span>{shareCode}</span>
                        <button onClick={handleCopyCode}>
                            {copiedCode ? <CheckCircle color="green" /> : <Copy />}
                        </button>
                    </div>
                    <p className="share-instructions">
                        Share this code with your partner to view the responses later
                    </p>

                    {/* QR Code for easy sharing */}
                    <div className="qr-code-container">
                        <QRCode
                            value={`https://yourwebsite.com/retrieve?code=${shareCode}`}
                            size={128}
                        />
                        <p>Scan to retrieve responses</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
    // const handleNotificationSubmit = (e) => {
    //     e.preventDefault();
    //     // In a real app, you'd implement secure sharing mechanism
    //     // For now, we'll simulate sending responses
    //     console.log('Responses to be shared:', answers);
    //     setStage('complete');
    // };

    const renderQuestionStage = () => (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="question-container"
        >
            <div className="question-card">
                <MessageSquareHeart className="icon message-icon" />
                <h2 className="question-text">
                    {questions[currentQuestionIndex]}
                </h2>
                <form onSubmit={handleQuestionResponse}>
                    <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Speak from your heart..."
                        required
                    />
                    <button type="submit">
                        {currentQuestionIndex < questions.length - 1
                            ? 'Next Heartbeat'
                            : 'Complete My Story'}
                    </button>
                </form>
                <div className="progress-indicator">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </div>
            </div>
        </motion.div>
    );

    // const renderNotificationStage = () => (
    //     <motion.div
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         className="notification-container"
    //     >
    //         <div className="notification-card">
    //             <Send className="icon send-icon" />
    //             <h2>Share Your Love Story</h2>
    //             <p>Enter an email to receive notification when responses are viewed</p>
    //             <form onSubmit={handleNotificationSubmit}>
    //                 <input
    //                     type="email"
    //                     value={notificationEmail}
    //                     onChange={(e) => setNotificationEmail(e.target.value)}
    //                     placeholder="Your Email"
    //                     required
    //                 />
    //                 <button type="submit">Send Invitation</button>
    //             </form>
    //         </div>
    //     </motion.div>
    // );

    const renderCompletionStage = () => (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1,opacity: 1 }}
            className="completion-container"
        >
            <div className="completion-card">
                <Heart className="icon heart-icon" />
                <h2>Love Story Captured 💍</h2>
                <div className="answers-container">
                    {answers.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.3 }}
                            className="answer-item"
                        >
                            <p className="question">{item.question}</p>
                            <p className="answer">{item.answer}</p>
                        </motion.div>
                    ))}
                </div>
                <p className="final-message">
                    Your love story is now eternal ❤️
                </p>
            </div>
        </motion.div>
    );

    return (
        <div className="proposal-app">
            {renderBackgroundStars()}

            {stage === 'password' && renderPasswordStage()}
            {stage === 'sorry' && renderSorryStage()}
            {stage === 'questions' && renderQuestionStage()}
            {stage === 'share' && renderShareStage()}
            {stage === 'complete' && renderCompletionStage()}

            <button
                className="retrieve-button"
                onClick={() => setShowRetrieveModal(true)}
            >
                <Search /> Retrieve Love Story
            </button>

            <RetrieveResponsesModal />
        </div>
    );
};

export default ProposalWebsite;