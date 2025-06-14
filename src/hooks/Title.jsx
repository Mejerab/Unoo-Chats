import { useRef, useState } from "react";
import { motion } from "motion/react"

const Title = ({ title }) => {
    const [animate, setAnimate] = useState(false);

    const TARGET_TEXT = title;
    const CYCLES_PER_LETTER = 2;
    const SHUFFLE_TIME = 50;

    const CHARS = "!@#$%^&*():{};|,.<>/?";

    const intervalRef = useRef(null);

    const [text, setText] = useState(TARGET_TEXT);
    const scramble = () => {

        if (!animate) {
            let pos = 0;
            intervalRef.current = setInterval(() => {
                const scrambled = TARGET_TEXT.split("")
                    .map((char, index) => {
                        if (pos / CYCLES_PER_LETTER > index) {
                            return char;
                        }

                        const randomCharIndex = Math.floor(Math.random() * CHARS.length);
                        const randomChar = CHARS[randomCharIndex];

                        return randomChar;
                    })
                    .join("");

                setText(scrambled);
                pos++;

                if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
                    stopScramble();
                }
            }, SHUFFLE_TIME);
            setAnimate(true);
        }
    };

    const stopScramble = () => {
        clearInterval(intervalRef.current || undefined);

        setText(TARGET_TEXT);
    };
    return (
        <div className="grid min-h-[200px] place-content-center p-4">
            <motion.h4
                onViewportEnter={scramble}
                onViewportLeave={stopScramble}
                className="text-3xl font-medium"
            >
                <div className="relative z-10 flex items-center gap-2">
                    <span>{text}</span>
                </div>
            </motion.h4>
        </div>
    );
};

export default Title;