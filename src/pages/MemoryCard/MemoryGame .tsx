import { useState } from "react";
import styled from "styled-components";

interface Image {
    id: number;
    src: string;
}
const images: Image[] = [
    { id: 1, src: "/assets/MemoryCard/card1.png" },
    { id: 2, src: "/assets/MemoryCard/card2.png" },
    { id: 3, src: "/assets/MemoryCard/card3.png" },
    { id: 4, src: "/assets/MemoryCard/card4.png" },
];

const generateCards = (): Image[] => {
    const doubleImages = [...images, ...images];
    return doubleImages.sort(() => Math.random() - 0.5);
};

function MemoryGame() {
    const [cards, setCards] = useState<Image[]>(generateCards());
    console.log(cards);
    return <Board></Board>;
}

const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

export default MemoryGame;
