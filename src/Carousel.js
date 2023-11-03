import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";

function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);
  const total = photos.length;

  const currCard = photos[currCardIdx];

  // Function to increment currCardIdx
  function goForward() {
    setCurrCardIdx((currCardIdx + 1) % total);
  }

  // Function to decrement currCardIdx
  function goBackward() {
    setCurrCardIdx((currCardIdx - 1 + total) % total);
  }

  const isAtFirstImage = currCardIdx === 0;
  const isAtLastImage = currCardIdx === total - 1;

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        <i
          className="bi bi-arrow-left-circle"
          onClick={goBackward}
          style={{ visibility: isAtFirstImage ? "hidden" : "visible" }}
        />
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        <i
          className="bi bi-arrow-right-circle"
          onClick={goForward}
          style={{ visibility: isAtLastImage ? "hidden" : "visible" }}
        />
      </div>
    </div>
  );
}

export default Carousel;
