import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import {
  Heart as HeartIcon,
  Lock
} from 'lucide-react';

const dreamyFloatAnimation = keyframes`
  0%, 100% { 
    transform: translateY(0) rotate(0deg);
  }
  50% { 
    transform: translateY(-20px) rotate(5deg);
  }
`;

const celestialGlowAnimation = keyframes`
  0%, 100% { 
    box-shadow: 0 0 10px rgba(255,255,255,0.3), 
                0 0 20px rgba(255,105,180,0.2);
  }
  50% { 
    box-shadow: 0 0 20px rgba(255,255,255,0.5), 
                0 0 40px rgba(255,105,180,0.4);
  }
`;

const etherealPulseAnimation = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&display=swap');
  body {
    margin: 0;
    font-family: 'Cormorant Garamond', serif;
    overflow: hidden;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  }
`;

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg, 
    rgba(106,17,203,0.9) 0%, 
    rgba(37,117,252,0.9) 100%
  );
  overflow: hidden;
`;

const StarfieldBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: radial-gradient(
    ellipse at bottom, 
    rgba(20,20,50,1) 0%, 
    rgba(0,0,0,1) 100%
  );
`;

const CelestialParticle = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: ${props => props.opacity};
  animation: 
    ${dreamyFloatAnimation} ${props => props.duration}s 
    ease-in-out infinite alternate;
`;

const MagicalCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  z-index: 10;
  box-shadow: 0 25px 45px rgba(0,0,0,0.2);
  animation: ${celestialGlowAnimation} 3s infinite;
  color: white;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'scale(1)' : 'scale(0.9)'};
  transition: all 0.3s ease;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #ff4081);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  margin: 10px;
  transition: transform 0.2s ease;
`;

const PoetricText = styled.p`
  font-size: 1.3em;
  line-height: 1.6;
  opacity: 0.9;
  font-style: italic;
`;

const ResponseDisplay = styled.div`
  margin-top: 20px;
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.positive ? '#4caf50' : '#f44336'};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: ${etherealPulseAnimation} 2s infinite alternate;
`;

const heartPopAnimation = keyframes`
  0% { 
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const FloatingHeart = styled.div`
  position: fixed;
  color: #ff4081;
  font-size: ${props => props.size}px;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  z-index: 100;
  animation: ${heartPopAnimation} 1s ease-out;
  pointer-events: none;
`;

const ProposalApp = () => {
  const [stage, setStage] = useState('initial');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [hearts, setHearts] = useState([]);

  // Unique, personal password
  const CORRECT_PASSWORD = 'ILOVEYOU_AMMU';

  // Memoized renderCelestialParticles to prevent unnecessary re-renders
  const celestialParticles = useMemo(() => {
    return [...Array(100)].map((_, i) => (
      <CelestialParticle
        key={i}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3}px`,
          height: `${Math.random() * 3}px`
        }}
        opacity={Math.random()}
        duration={Math.random() * 5 + 3}
      />
    ));
  }, []);

  // Memoized handler to prevent unnecessary re-renders
  const handleStorageChange = useCallback((e) => {
    if (e.key === 'proposal_response') {
      const storedResponse = JSON.parse(e.newValue);
      setResponse(storedResponse.answer);
      setStage('responded');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [handleStorageChange]);

  const handlePasswordSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      setStage('proposal');
      setError('');
    } else {
      setError('Only true love knows the secret...');
    }
  };

  const handleProposalResponse = (answer) => {
    const responseData = {
      answer,
      timestamp: new Date().toISOString()
    };

    // Immediate UI update
    setResponse(answer);

    // Add heart animations if answer is Yes
    if (answer === 'Yes') {
      const newHearts = [...Array(20)].map(() => ({
        id: Math.random(),
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 50 + 20
      }));
      setHearts(newHearts);

      // Remove hearts after animation
      setTimeout(() => {
        setHearts([]);
        setStage('responded');
      }, 1500);
    } else {
      setStage('responded');
    }

    // Async storage update to prevent blocking
    setTimeout(() => {
      localStorage.setItem('proposal_response', JSON.stringify(responseData));
      window.dispatchEvent(new Event('storage'));
    }, 0);
  };

  const renderContent = () => {
    // Existing renderContent logic remains the same
    switch (stage) {
      case 'initial':
        return (
          <MagicalCard visible={true}>
            <h1>A Moment of Eternal Connection</h1>
            <PoetricText>
              Where words fail, love speaks. Enter our secret passage...
            </PoetricText>
            <input
              type="password"
              placeholder="Enter secret password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '10px',
                margin: '15px 0',
                width: '100%',
                borderRadius: '10px',
                border: '2px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white'
              }}
            />
            <Button onClick={handlePasswordSubmit}>
              <Lock /> Unlock Love
            </Button>
            {error && <p style={{ color: '#ff4081', marginTop: '10px' }}>{error}</p>}
          </MagicalCard>
        );

      case 'proposal':
        return (
          <MagicalCard visible={true}>
            <h2>My Love 💖</h2>
            <PoetricText>
              In the vast symphony of life, you are the most beautiful melody that my heart has ever known. Every breath I take, every beat of my heart, whispers your name as if the universe itself is singing a song just for us.
              <br />
              With you, time stands still. In your eyes, I find my forever. So I ask you, my love, will you join your soul with mine and create a love story that transcends time and space?
              <br />
              Will you be mine, now and always, forevermore?
            </PoetricText>
            <div>
              <Button onClick={() => handleProposalResponse('Yes')}>
                <HeartIcon /> Yes 💖
              </Button>
              <Button onClick={() => handleProposalResponse('No')}>
                No 💔
              </Button>
            </div>
          </MagicalCard>
        );

      case 'responded':
        return (
          <MagicalCard visible={true}>
            <ResponseDisplay positive={response === 'Yes'}>
              {response === 'Yes'
                ? "Thank you from the depths of my heart for accepting my love, my dearest Ammu. I love you more than words can ever express. You mean everything to me, and my heart belongs to you forever. 😘"
                : "if you accept or not, you are my love forever it continues 💔"}
            </ResponseDisplay>
          </MagicalCard>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <GlobalStyle />
      <StarfieldBackground>
        {celestialParticles}
      </StarfieldBackground>
      {/* Render floating hearts */}
      {hearts.map(heart => (
        <FloatingHeart
          key={heart.id}
          top={heart.top}
          left={heart.left}
          size={heart.size}
        >
          ❤️❤️❤️
        </FloatingHeart>
      ))}
      {renderContent()}
    </Container>
  );
};

export default ProposalApp;