import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

describe("Carousel Component", () => {
  it("should render without errors", () => {
    const { container } = render(
      <Carousel photos={TEST_IMAGES} title="images for testing" />
    );
    expect(container).toMatchSnapshot();
  });

  it("works when you click on the right arrow", () => {
    const { container } = render(
      <Carousel photos={TEST_IMAGES} title="images for testing" />
    );
    // expect the first image to show, but not the second
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
  });

  it("left arrow moves to the previous image (BUGGY)", () => {
    const { container } = render(
      <Carousel photos={TEST_IMAGES} title="images for testing" />
    );

    // Click right arrow to go to the second image
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();

    // Click left arrow to go back to the first image (BUGGY - Expected behavior is to go back to the first image)
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow);

    // This assertion is expected to fail due to the bug
    // When the bug is fixed, the following expectations should pass
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();
  });
});