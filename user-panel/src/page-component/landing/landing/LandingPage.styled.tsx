// src/page-component/landing/LandingPage.styled.tsx
import styled, { keyframes } from "styled-components";
import { Box, Paper } from "@mui/material";
import { motion, Variants } from "framer-motion";

export const GlassCard = styled(Box)<{ $ismobile: boolean }>`
  width: 95vw;
  max-width: 450px;
  padding: ${({ $ismobile }) => ($ismobile ? "24px" : "32px")};
  border-radius: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  transition: border 0.3s ease;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

export const ItemWrapper = styled(motion.div)<{ $ismobile: boolean }>`
  display: flex;
  justify-content: space-between;
  alignitems: center;
  padding: ${({ $ismobile }) => ($ismobile ? "10px 12px" : "12px 16px")};
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  will-change: transform;

  .arrow-icon {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    background-color: var(--accent-glow);
    border-color: var(--accent-color);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);

    .arrow-icon {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const scanAnimation = keyframes`
  0% { top: 0%; }
  100% { top: 100%; }
`;

export const ScannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
    border: 2px solid var(--text-secondary);
    border-radius: 16px;
    box-sizing: border-box;
  }

  &::after {
    content: "";
    position: absolute;
    left: 5%;
    width: 90%;
    height: 3px;
    background: var(--accent-color);
    box-shadow: 0 0 10px var(--accent-glow);
    animation: ${scanAnimation} 2.5s infinite ease-in-out;
    border-radius: 3px;
  }
`;

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export const LandingCard = styled(Paper)`
  width: 95vw;
  max-width: 450px;
  padding: 32px;
  border-radius: 24px !important;
  background-color: var(--background-end) !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08) !important;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    padding: 24px;
  }
`;

export const QuickAccessItemWrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  alignitems: center;
  padding: 12px 16px;
  background-color: var(--background-start);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow: hidden;

  .arrow-icon {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    border-color: var(--accent-color);
    background-color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px var(--accent-glow);

    .arrow-icon {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 600px) {
    padding: 10px 12px;
  }
`;
