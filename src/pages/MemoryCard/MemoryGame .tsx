import { useEffect, useState } from "react";
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
import ResetButton from "../../components/MemoryCard/ResetButton";

interface Image {
    id: number;
    src: string;
    uniqueKey: number;
}
const images: Image[] = [
    { id: 1, src: card1, uniqueKey: 0 },
    { id: 2, src: card2, uniqueKey: 0 },
    { id: 3, src: card3, uniqueKey: 0 },
    { id: 4, src: card4, uniqueKey: 0 },
    { id: 5, src: card5, uniqueKey: 0 },
    { id: 6, src: card6, uniqueKey: 0 },
    { id: 7, src: card7, uniqueKey: 0 },
    { id: 8, src: card8, uniqueKey: 0 },
];

const generateCards = (): Image[] => {
    const doubleImages = [...images, ...images];
    return doubleImages.map((image, index) => ({ ...image, uniqueKey: index })).sort(() => Math.random() - 0.5);
};

function MemoryGame() {
    const [cards, setCards] = useState<Image[]>(generateCards());
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
    const [isClickable, setIsClickable] = useState(true);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const storedHighScore = localStorage.getItem("highScore");
        if (storedHighScore) {
            setHighScore(Number(storedHighScore));
        }

        if (flippedIndices.length === 2) {
            setIsClickable(false);
            const [firstIndex, secondIndex] = flippedIndices;
            if (cards[firstIndex].id === cards[secondIndex].id) {
                setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
                setScore((prev) => prev + 300);
            } else {
                setScore((prev) => prev - 50);
            }
            const timeoutId = setTimeout(() => {
                setFlippedIndices([]);
                setIsClickable(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [flippedIndices, cards]);

    const resetGame = () => {
        if (score > highScore) {
            localStorage.setItem("highScore", String(score));
        }

        setCards(generateCards());
        setFlippedIndices([]);
        setMatchedIndices([]);
        setIsClickable(true);
        setScore(0);
    };

    useEffect(() => {
        if (matchedIndices.length === cards.length) {
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem("highScore", String(score));
            }
        }
    }, [matchedIndices, cards, score, highScore]);

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

    return (
        <Container>
            <ScoreBoard>점수: {score}</ScoreBoard>
            <HighScoreBoard>최고 점수: {highScore}</HighScoreBoard>
            <ResetButton onClick={resetGame} />
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
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const ScoreBoard = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
    background-color: #fff;
`;

const HighScoreBoard = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`;

export default MemoryGame;
