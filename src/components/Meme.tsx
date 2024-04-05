import { ChangeEvent, useEffect, useState } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function fetchMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    fetchMemes();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const { name, value } = e.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    setMeme((prevState) => ({
      ...prevState,
      randomImage: `${allMemes[randomNumber].url}`,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          id="top-text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          placeholder="Shut up"
          className="form--input"
        />

        <input
          id="bottom-text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          placeholder="and take my money"
          className="form--input"
        />
        <button onClick={getMemeImage} className="form--button">
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
