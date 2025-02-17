import styled from "styled-components";

interface ResetButtonProps {
    onClick: () => void;
}

function ResetButton({ onClick }: ResetButtonProps) {
    return <Button onClick={onClick}>리셋 버튼</Button>;
}

const Button = styled.button`
    position: absolute;
    top: 15%;
    margin-bottom: 20px;
    padding: 10px 20px;
    font-size: 16px;
`;

export default ResetButton;
