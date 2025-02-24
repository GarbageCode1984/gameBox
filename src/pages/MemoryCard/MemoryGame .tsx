import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
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

    const updateScore = useCallback((isCorrect: boolean) => {
        setScore((prev) => (isCorrect ? prev + 300 : Math.max(prev - 50, 0)));
    }, []);

    const handleCardMatch = useCallback(
        (indices: number[]) => {
            const [firstIndex, secondIndex] = indices;
            const isCorrect = cards[firstIndex]?.id === cards[secondIndex]?.id;

            updateScore(isCorrect);

            if (isCorrect) {
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

    const resetGame = () => {
        updateHighScore();

        setCards(generateCards());
        setFlippedIndices([]);
        setMatchedIndices([]);
        setIsClickable(true);
        setScore(0);
    };

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

    const updateHighScore = useCallback(() => {
        if (score > highScore) {
            localStorage.setItem("highScore", String(score));
            setHighScore(score);
        }
    }, [score, highScore]);

    useEffect(() => {
        const storedHighScore = localStorage.getItem("highScore");
        if (storedHighScore) {
            setHighScore(Number(storedHighScore));
        }
    }, []);

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
                    />
                ))}
            </Board>
            <ResetButton onClick={resetGame}>다시하기</ResetButton>
        </Container>
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
`;

const HighScoreBoard = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
    display: flex;
`;

const ResetButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 35px;
    display: flex;
    justify-content: center;
`;

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`;

export default MemoryGame;
