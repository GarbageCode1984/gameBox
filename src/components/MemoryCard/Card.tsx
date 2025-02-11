import styled from "styled-components";

interface CardProps {
    id: number;
    image: string;
    isFlipped: boolean;
    onClick: (id: number) => void;
}

function Card({ id, image, isFlipped, onClick }: CardProps) {
    return (
        <CardContainer onClick={() => onClick(id)}>
            {isFlipped ? <CardImage src={image} alt={`Card ${id}`} /> : <CardBack />}
        </CardContainer>
    );
}

const CardContainer = styled.div`
    width: 100px;
    height: 100px;
    margin: 5px;
    cursor: pointer;
    perspective: 1000px;
`;

const CardBack = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 8px;
`;

export default Card;
