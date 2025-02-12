import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../../components/MemoryCard/Card";
import card1 from "../../assets/MemoryCard/Card/card1.png";
import card2 from "../../assets/MemoryCard/Card/card2.png";
import card3 from "../../assets/MemoryCard/Card/card3.png";
import card4 from "../../assets/MemoryCard/Card/card4.png";

interface Image {
    id: number;
    src: string;
}
const images: Image[] = [
    { id: 1, src: card1 },
    { id: 2, src: card2 },
    { id: 3, src: card3 },
    { id: 4, src: card4 },
];

const generateCards = (): Image[] => {
    const doubleImages = [...images, ...images];
    return doubleImages.sort(() => Math.random() - 0.5);
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

    const handleCardClick = (index: number) => {
        if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedIndices.includes(index)) {
            setFlippedIndices((prev) => [...prev, index]);
        }
    };

    return (
        <Board>
            {cards.map((card, index) => (
                <Card
                    key={card.id}
                    id={index}
                    image={card.src}
                    isFlipped={flippedIndices.includes(index) || matchedIndices.includes(index)}
                    onClick={handleCardClick}
                />
            ))}
        </Board>
    );
}

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

export default MemoryGame;
