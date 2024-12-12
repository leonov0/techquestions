import { Variants } from "motion/react";

export const getAppearingMotionVariants = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay },
  },
});
