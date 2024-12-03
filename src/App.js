import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { 
  Heart as HeartIcon, 
  Star as StarIcon,  
  Lock, 
  Unlock 
} from 'lucide-react';

// Global Style for Background Font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800&display=swap');
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
  }
`;

// Animations
const starfallAnimation = keyframes`
  0% { transform: translateY(-100vh) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
`;

// const heartBurstAnimation = keyframes`
//   0% { transform: scale(1) rotate(0deg); }
//   50% { transform: scale(1.5) rotate(180deg); }
//   100% { transform: scale(1) rotate(360deg); }
// `;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const pulseHeart = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const sparkle = keyframes`
  0% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.5); }
  100% { opacity: 0; transform: scale(0.5); }
`;

// Styled Components
const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
`;

const StarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const FallingStar = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
  font-size: ${props => props.size}px;
  top: -50px;
  left: ${props => props.left}%;
  animation: ${starfallAnimation} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
`;

const Sparkle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: ${sparkle} 2s infinite ease-in-out;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
`;

const AnimatedHeartContainer = styled.div`
  position: relative;
  width: 150px;
  height: 130px;
  background: red;
  transform: rotate(-45deg);
  animation: ${pulseHeart} 1.5s infinite;
  box-shadow: 0 0 20px 5px rgba(255, 0, 0, 0.6);
  z-index: 10;
  &:before,
  &:after {
    content: "";
    width: 150px;
    height: 130px;
    background: red;
    border-radius: 50%;
    position: absolute;
  }
  &:before {
    top: -75px;
    left: 0;
  }
  &:after {
    left: 75px;
    top: 0;
  }
`;

const ProposalCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  z-index: 10;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  transform: ${props => props.visible ? 'scale(1)' : 'scale(0.5)'};
  opacity: ${props => props.visible ? 1 : 0};
  transition: all 0.5s ease;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
  color: black;
`;

const AnimatedButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #ff4081);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  margin: 10px;
  animation: ${floatAnimation} 2s ease-in-out infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  }
`;

const ResponseDisplay = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.positive ? '#4caf50' : '#f44336'};
`;

const Proposal = () => {
  const [stage, setStage] = useState('initial');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  // Secure password (change this to a unique, personal message)
  const CORRECT_PASSWORD = 'ILOVEYOU_AMMU'; // IMPORTANT: Change this to something meaningful to you both

  const renderStars = () => {
    return [...Array(50)].map((_, index) => (
      <FallingStar 
        key={index}
        left={Math.random() * 100}
        size={Math.random() * 20 + 10}
        duration={Math.random() * 10 + 5}
        delay={Math.random() * 5}
      >
        <StarIcon />
      </FallingStar>
    ));
  };

  const renderSparkles = () => {
    return [...Array(15)].map((_, i) => (
      <Sparkle
        key={i}
        top={Math.random() * 100}
        left={Math.random() * 100}
      />
    ));
  };

  const handlePasswordSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      setStage('proposal');
      setError('');
    } else {
      setError('Incorrect password. Only my love knows the secret.');
    }
  };

  const handleProposalResponse = (answer) => {
    setResponse(answer);
    setStage('responded');

    // Save proposal to localStorage
    const newProposal = {
      id: Date.now(),
      answer,
      timestamp: new Date().toLocaleString()
    };

    const savedProposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    const updatedProposals = [...savedProposals, newProposal];
    localStorage.setItem('proposals', JSON.stringify(updatedProposals));
  };

  const renderContent = () => {
    switch(stage) {
      case 'initial':
        return (
          <ProposalCard visible={true}>
            <AnimatedHeartContainer />
            <h1>A Magical Moment Awaits...</h1>
            <p>Enter our special password to unlock the proposal</p>
            <Input 
              type="password" 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AnimatedButton onClick={handlePasswordSubmit}>
              <Lock /> Unlock
            </AnimatedButton>
            {error && <p style={{color: 'red'}}>{error}</p>}
          </ProposalCard>
        );

      case 'proposal':
        return (
          <ProposalCard visible={true}>
            <h2>My Dearest Love</h2>
            <p>
              In this vast universe of infinite possibilities,
              you are my one true constellation. 
              Will you be the poetry to my heart's rhythm?
            </p>
            <div>
              <AnimatedButton onClick={() => handleProposalResponse('Yes')}>
                <HeartIcon /> Yes, Forever
              </AnimatedButton>
              <AnimatedButton onClick={() => handleProposalResponse('No')}>
                No
              </AnimatedButton>
            </div>
          </ProposalCard>
        );

      case 'responded':
        return (
          <ProposalCard visible={true}>
            <ResponseDisplay positive={response === 'Yes'}>
              {response === 'Yes' 
                ? "You said YES! Our love will be legendary! 💖" 
                : "Perhaps love's timing is yet to be perfect. 💔"}
            </ResponseDisplay>
            <AnimatedButton onClick={() => {
              const savedProposals = JSON.parse(localStorage.getItem('proposals') || '[]');
              console.log('Saved Proposals:', savedProposals);
              alert(JSON.stringify(savedProposals, null, 2));
            }}>
              <Unlock /> View Saved Responses
            </AnimatedButton>
          </ProposalCard>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <StarBackground>{renderStars()}</StarBackground>
      {renderSparkles()}
      {renderContent()}
    </Container>
  );
};

export default Proposal;