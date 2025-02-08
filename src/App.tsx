import { Link } from "react-router-dom";
import styled from "styled-components";

function App() {
    return (
        <AppContainer>
            <Title>Game Box!</Title>
            <Link to="/memory-game">메모리 게임</Link>
        </AppContainer>
    );
}

const AppContainer = styled.div`
    height: 100vh;
`;
const Title = styled.h1`
    font-family: "CookieRun-Regular", sans-serif;
    font-size: 40px;
    font-weight: 700;
    color: #ff6767;
    flex-direction: column;
    display: flex;
    text-align: center;
    justify-content: center;
    height: 30vh;
`;

export default App;
