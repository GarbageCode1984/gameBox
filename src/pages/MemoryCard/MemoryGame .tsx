import { useCallback, useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Card from "../../components/MemoryCard/Card";
import card1 from "../../assets/MemoryCard/Card/card1.png";
import card2 from "../../assets/MemoryCard/Card/card2.png";
import card3 from "../../assets/MemoryCard/Card/card3.png";
import card4 from "../../assets/MemoryCard/Card/card4.png";
import card5 from "../../assets/MemoryCard/Card/card5.png";
import card6 from "../../assets/MemoryCard/Card/card6.png";
import card7 from "../../assets/MemoryCard/Card/card7.png";
import card8 from "../../assets/MemoryCard/Card/card8.png";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../../constants";

interface Image {
    id: number;
    src: string;
    uniqueKey: string;
}
const images: Image[] = [
    { id: 1, src: card1, uniqueKey: "" },
    { id: 2, src: card2, uniqueKey: "" },
    { id: 3, src: card3, uniqueKey: "" },
    { id: 4, src: card4, uniqueKey: "" },
    { id: 5, src: card5, uniqueKey: "" },
    { id: 6, src: card6, uniqueKey: "" },
    { id: 7, src: card7, uniqueKey: "" },
    { id: 8, src: card8, uniqueKey: "" },
];

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Cookie+Run&display=swap');

    body {
        font-family: "CookieRun-Regular", sans-serif;
    }
`;

const generateCards = (): Image[] => {
    const doubleImages = [...images, ...images];
    return doubleImages.map((image) => ({ ...image, uniqueKey: uuidv4() })).sort(() => Math.random() - 0.5);
};

function MemoryGame() {
    const [cards, setCards] = useState<Image[]>(generateCards());
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
    const [isClickable, setIsClickable] = useState(true);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [showFront, setShowFront] = useState(true);
    const [isResetting, setIsResetting] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateScore = useCallback((isMatch: boolean) => {
        setScore((prev) => (isMatch ? prev + 300 : Math.max(prev - 50, 0)));
    }, []);

    const handleCardMatch = useCallback(
        (indices: number[]) => {
            const [firstIndex, secondIndex] = indices;
            const isMatch = cards[firstIndex]?.id === cards[secondIndex]?.id;

            updateScore(isMatch);

            if (isMatch) {
                setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
            }

            const timeoutId = setTimeout(() => {
                setFlippedIndices([]);
                setIsClickable(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        },
        [cards, updateScore]
    );

    const updateHighScore = useCallback(() => {
        if (score > highScore) {
            localStorage.setItem("highScore", String(score));
            setHighScore(score);
        }
    }, [score, highScore]);

    const initializeGame = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setCards(generateCards());
        setFlippedIndices([]);
        setMatchedIndices([]);
        setIsClickable(true);
        setScore(0);
        setShowFront(true);

        timeoutRef.current = setTimeout(() => {
            setShowFront(false);
            setIsResetting(false);
        }, 2000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const resetGame = useCallback(() => {
        if (isResetting) return;
        setIsResetting(true);
        updateHighScore();
        initializeGame();
    }, [updateHighScore, initializeGame, isResetting]);

    const handleCardClick = (index: number) => {
        if (
            isClickable &&
            flippedIndices.length < 2 &&
            !flippedIndices.includes(index) &&
            !matchedIndices.includes(index)
        ) {
            setFlippedIndices((prev) => [...prev, index]);
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const storedHighScore = localStorage.getItem("highScore");
        if (storedHighScore) {
            setHighScore(Number(storedHighScore));
        }
        initializeGame();
    }, [initializeGame]);

    useEffect(() => {
        if (flippedIndices.length === 2) {
            setIsClickable(false);
            handleCardMatch(flippedIndices);
        }
    }, [flippedIndices, handleCardMatch]);

    useEffect(() => {
        if (matchedIndices.length === 16) {
            updateHighScore();
        }
    }, [matchedIndices, cards.length, updateHighScore]);

    return (
        <>
            <GlobalStyle />
            <Container>
                <ScoreBoardWrapper>
                    <ScoreBoard>점수: {score}</ScoreBoard>
                    <HighScoreBoard>최고 점수: {highScore}</HighScoreBoard>
                </ScoreBoardWrapper>
                <Board>
                    {cards.map((card, index) => (
                        <Card
                            key={card.uniqueKey}
                            id={index}
                            image={card.src}
                            isFlipped={flippedIndices.includes(index) || matchedIndices.includes(index)}
                            onClick={handleCardClick}
                            showFront={showFront}
                        />
                    ))}
                </Board>
                <ResetButton disabled={isResetting} onClick={resetGame}>
                    다시하기
                </ResetButton>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const ScoreBoardWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ScoreBoard = styled.div`
    margin-right: 20px;
    font-size: 24px;
    margin-bottom: 20px;
    color: ${colors.BLUE_500};
`;

const HighScoreBoard = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
    display: flex;
    color: ${colors.RED_500};
`;

const ResetButton = styled.button`
    padding: 10px 20px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 35px;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    background-color: ${colors.RED_300};
    border: none;
    transition: all 0.2s;
    color: ${colors.WHITE};

    &:disabled {
        background-color: ${colors.GRAY_300};
        cursor: not-allowed;
        opacity: 0.7;
    }
`;

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`;

export default MemoryGame;
