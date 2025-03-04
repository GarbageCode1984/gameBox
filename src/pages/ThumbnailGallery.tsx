import styled from "styled-components";
import { Link } from "react-router-dom";

interface image {
    src: string;
    alt: string;
    path: string;
}

function ThumbnailGallery() {
    const images: image[] = [
        { src: "/Thumbnail/MemoryGame.png", alt: "MemoryGame", path: "/memory-game" },
        { src: "/Thumbnail/test2.png", alt: "test2", path: "/page1" },
        { src: "/Thumbnail/test3.png", alt: "test3", path: "/page1" },
        { src: "/Thumbnail/test4.png", alt: "test4", path: "/page1" },
        { src: "/Thumbnail/test5.png", alt: "test1", path: "/page1" },
        { src: "/Thumbnail/test6.png", alt: "test2", path: "/page1" },
        { src: "/Thumbnail/test7.png", alt: "test3", path: "/page1" },
        { src: "/Thumbnail/test8.png", alt: "test4", path: "/page1" },
    ];

    return (
        <Container>
            {images.map((image, index) => (
                <ThumbnailLink key={index} to={image.path}>
                    <ThumbnailWrapper>
                        <Thumbnail src={image.src} alt={image.alt} />
                    </ThumbnailWrapper>
                </ThumbnailLink>
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    padding: 30px;
`;
const ThumbnailLink = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: center;
`;
const ThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Thumbnail = styled.img`
    width: 280px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    justify-content: center;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
    }
`;

export default ThumbnailGallery;
