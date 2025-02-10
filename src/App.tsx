import styled from "styled-components";
import ThumbnailGallery from "./components/MemoryCard/ThumbnailGallery/ThumbnailGallery";

function App() {
    return (
        <AppContainer>
            <Title>Game Box!</Title>
            <ThumbnailGallery />
        </AppContainer>
    );
}

const AppContainer = styled.div`
    height: 100vh;
`;
const Title = styled.h1`
    font-family: "CookieRun-Regular", sans-serif;
    font-size: 82px;
    font-weight: 700;
    color: #ff6767;
    flex-direction: column;
    display: flex;
    text-align: center;
    justify-content: center;
    height: 30vh;
`;

export default App;
