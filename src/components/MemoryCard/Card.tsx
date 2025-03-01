import styled from "styled-components";
import { colors } from "../../constants";

interface CardProps {
    id: number;
    image: string;
    isFlipped: boolean;
    onClick: (id: number) => void;
    showFront: boolean;
}

function Card({ id, image, isFlipped, onClick, showFront }: CardProps) {
    return (
        <CardContainer onClick={() => onClick(id)}>
            <CardInner isFlipped={isFlipped || showFront}>
                <CardFront>
                    <CardImage src={image} alt={`Card ${id}`} />
                </CardFront>
                <CardBack>?</CardBack>
            </CardInner>
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

const CardInner = styled.div<{ isFlipped: boolean }>`
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    transform: ${({ isFlipped }) => (isFlipped ? "rotateY(180deg)" : "rotateY(0deg)")};
`;

const CardFace = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardFront = styled(CardFace)`
    background: ${colors.WHITE};
    transform: rotateY(180deg);
    padding: 10px;
`;

const CardBack = styled(CardFace)`
    background: ${colors.BLUE_300};
    font-size: 32px;
    color: ${colors.WHITE};
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 8px;
`;

export default Card;
