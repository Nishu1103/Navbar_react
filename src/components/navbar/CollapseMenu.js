import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { GoogleLogin } from 'react-google-login';

const CollapseMenu = (props) => {
  const { open } = useSpring({
    open: props.navbarState ? 1 : 0,
    config: { duration: 900 },
  });

  const toggleShape = () => {
    if (props.navbarState) {
      return '100%';
    } else {
      return '0% 0% 0% 0%';
    }
  };
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleFailure = (result) => {
    
  };

  const handleLogin = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  }; 

  return (
    <CollapseWrapper
      style={{
        borderRadius: open.interpolate({
          range: [0, 1],
          output: [toggleShape(), '0% 0% 100% 50%'],
        }),
        transform: open.interpolate({
          range: [0, 1],
          output: ['translateX(100%)', 'translateX(0%)'],
        }),
        width: open.interpolate({
          range: [0, 1],
          output: ['33%', '55%'],
        }),
      }}
    >
      <NavLinks>
        <li>
          <a href="/" onClick={props.handleNavbar}>
            Home
          </a>
        </li>
        <li>
          <a href="/" onClick={props.handleNavbar}>
            Event
          </a>
        </li>
        <li>
          <a href="/" onClick={props.handleNavbar}>
            Gallery
          </a>
        </li>
        <li>
          <a href="/" onClick={props.handleNavbar}>
            Contact US
          </a>
        </li>
        <GoogleLogin
              clientId="318734125066-llqs3j6nif62mma54jv83adscda8e7kv.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'multiple_host_origin'}
            />
      </NavLinks>
    </CollapseWrapper>
  );
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(100%);
`;

const NavLinks = styled(animated.ul)`
  list-style-type: none;
  padding: 1rem; // Adjusted the padding for better centering
  text-align: center;

  li {
    margin-bottom: 0.5em;
    transition: all 300ms linear 1s;

    a {
      font-size: 2rem;
      line-height: 2;
      color: #222;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      font-weight: bold;
      font-family: 'Montserrat', sans-serif;

      &:hover {
        color: #fdcb6e;
        border-bottom: 1px solid #fdcb6e;
      }
      @media (max-width: 600px) {
        font-size: 1.5rem
      }
    }
  }
`;