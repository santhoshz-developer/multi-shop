import styled from "styled-components";
import { Typography, Divider} from "@mui/material";
import { motion } from "framer-motion";
import { authTheme } from "@/styles/theme"; // Adjust path if needed

export const AuthContainer = styled(motion.div)`
  position: relative;
  width: 95%;
  max-width: 420px;
  padding: 40px 32px;
  background: rgba(18, 20, 28, 0.7);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border-radius: 24px;
  color: #fff;
  box-shadow: 0 16px 70px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);

  /* Add a subtle gradient border for a high-tech feel */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.05)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const FormHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  text-align: center;
`;

export const LogoWrapper = styled(motion.div)`
  background: linear-gradient(145deg, #5c67c7, #8f75da);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin-bottom: 20px;
  box-shadow: 0 5px 20px rgba(92, 103, 199, 0.4);
`;

export const StyledDivider = styled(motion(Divider))`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin: 24px 0;
  &::before,
  &::after {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ToggleText = styled(motion(Typography))`
  text-align: center;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

export const ToggleLink = styled.span`
  color: ${authTheme.palette.primary.main};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    filter: brightness(1.2);
    text-decoration: underline;
  }
`;

export const AuthPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  position: relative;

  // The ::before pseudo-element creates the animated gradient background
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0c0d14; /* Deep, dark space blue base */
    background-image: radial-gradient(
        at 20% 25%,
        hsla(212, 90%, 50%, 0.3) 0px,
        transparent 50%
      ),
      radial-gradient(
        at 80% 20%,
        hsla(280, 85%, 60%, 0.25) 0px,
        transparent 50%
      ),
      radial-gradient(
        at 75% 85%,
        hsla(320, 90%, 55%, 0.28) 0px,
        transparent 50%
      ),
      radial-gradient(at 10% 90%, hsla(190, 95%, 50%, 0.3) 0px, transparent 50%);
    background-size: 200% 200%;
    z-index: -1;
    animation: aurora 20s ease-in-out infinite;
  }

  @keyframes aurora {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;