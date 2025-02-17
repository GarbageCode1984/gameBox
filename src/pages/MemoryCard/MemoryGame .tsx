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
import ResetButton from "../../components/ResetButton";

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

    useEffect(() => {
        if (flippedIndices.length === 2) {
            setIsClickable(false);
            const [firstIndex, secondIndex] = flippedIndices;
            if (cards[firstIndex].id === cards[secondIndex].id) {
                setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
            }
            const timeoutId = setTimeout(() => {
                setFlippedIndices([]);
                setIsClickable(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [flippedIndices, cards]);

    const resetGame = () => {
        setCards(generateCards());
        setFlippedIndices([]);
        setMatchedIndices([]);
        setIsClickable(true);
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

    return (
        <Container>
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

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`;

export default MemoryGame;
