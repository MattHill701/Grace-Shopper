import React, { useState, useEffect } from "react";
import man from "./imgs/manholdboard.jpg";
import meat from "./imgs/meatTable.jpg";
import homeOne from "./imgs/jagandmeat.jpg";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import "./myStyles.css";

const IndicatorWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  bottom: 58px;
  right: 15px;
`;

const Dot = styled.div`
  width: 28px;
  height: 12px;
  border-radius: 6px;
  background-color: white;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  margin: 5px;
  transition: 10s all ease-in-out;
`;

const Indicator = ({ currentSlide, amountSlides, nextSlide }) => {
  return (
    <IndicatorWrapper>
      {Array(amountSlides)
        .fill(1)
        .map((_, i) => (
          <Dot
            key={i}
            isActive={currentSlide === i}
            onClick={() => nextSlide(i)}
          />
        ))}
    </IndicatorWrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;

  flex-wrap: nowrap;
  overflow-x: hidden;
  position: center;
`;

const Slide = styled.div`
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  padding: 18%;
  background-position: center;
  background-size: cover;

  transition: 2250ms all ease-in-out;
`;

const ChildrenWrapper = styled.div`
  position: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageSlider = ({
  images = [homeOne, man, meat],
  autoPlay = true,
  autoPlayTime = 8000,
  children,
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide(slideIndex = currentSlide + 1) {
    const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;

    setCurrentSlide(newSlideIndex);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, autoPlayTime);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <Wrapper {...props}>
      {images.map((imageUrl, index) => (
        <Slide
          key={index}
          style={{
            backgroundImage: `url(${imageUrl})`,

            marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
          }}
        >
          {index === 2 ? (
            <h1 className="headingThree">
              Join Us And Start Receiving The #1 Best Tasting Meats In The USA!
            </h1>
          ) : null}

          {index === 2 ? (
            <Button className="thisIsButton ">
              <a className="thisLink" href="Login">
                Create Account
              </a>
            </Button>
          ) : null}

          {index === 1 ? (
            <Button className="thisIsButton ">
              <a className="thisLink" href="Login">
                My Account
              </a>
            </Button>
          ) : null}

          {index === 1 ? (
            <h1 className="headingTwo">
              Or If Your Returning Thanks For Coming Back To Visit Us!
            </h1>
          ) : null}

          {index === 0 ? (
            <h1 className="heading">
              Bring The Taste of the Savannah Into Your Home Today
            </h1>
          ) : null}

          {index === 0 ? (
            <Button className="thisIsButton">
              <a className="thisLink" href="Login">
                Shop Now!
              </a>
            </Button>
          ) : null}
        </Slide>
      ))}

      <Indicator
        currentSlide={currentSlide}
        amountSlides={images.length}
        nextSlide={nextSlide}
      />
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  );
};

export default ImageSlider;
