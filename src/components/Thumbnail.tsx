import styled from "styled-components";

interface image {
    src: string;
    alt: string;
}

function Thumbnail() {
    const images: image[] = [
        { src: "/assets/images/test1.jpg", alt: "test1" },
        { src: "/assets/images/test2.jpg", alt: "test2" },
        { src: "/assets/images/test3.jpg", alt: "test3" },
        { src: "/assets/images/test4.jpg", alt: "test4" },
    ];

    return <Container></Container>;
}

const Container = styled.div`
    display: grid;
`;

export default Thumbnail;
