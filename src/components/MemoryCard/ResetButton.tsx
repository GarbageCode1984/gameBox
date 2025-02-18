import styled from "styled-components";

interface ResetButtonProps {
    onClick: () => void;
}

function ResetButton({ onClick }: ResetButtonProps) {
    return <Button onClick={onClick}>다시하기</Button>;
}

const Button = styled.button`
    position: absolute;
    bottom: 10%;
    margin-bottom: 20px;
    padding: 10px 20px;
    font-size: 16px;
`;

export default ResetButton;
