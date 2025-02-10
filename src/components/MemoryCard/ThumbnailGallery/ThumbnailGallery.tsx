import styled from "styled-components";

interface image {
    src: string;
    alt: string;
}

function ThumbnailGallery() {
    const images: image[] = [
        { src: "/Thumbnail/test1.png", alt: "test1" },
        { src: "/Thumbnail/test2.png", alt: "test2" },
        { src: "/Thumbnail/test3.png", alt: "test3" },
        { src: "/Thumbnail/test4.png", alt: "test4" },
        { src: "/Thumbnail/test5.png", alt: "test1" },
        { src: "/Thumbnail/test6.png", alt: "test2" },
        { src: "/Thumbnail/test7.png", alt: "test3" },
        { src: "/Thumbnail/test8.png", alt: "test4" },
    ];

    return (
        <Container>
            {images.map((image, index) => (
                <Thumbnail key={index} src={image.src} alt={image.alt} />
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
const Thumbnail = styled.img`
    width: 360px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

export default ThumbnailGallery;
