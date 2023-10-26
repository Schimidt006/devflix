import { useEffect, useState } from "react";

import logo from "../assets/devflix2.png";
import searchIcon from "../assets/search.svg";

import "./App.css";
import MovieCard from "../components/MovieCard/movieCard";
import Footer from "../components/footer/footer";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const apiKey = "4987db59";
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    console.log(data.Search);
    setMovies(data.Search);
  };

  const handlekeyPress = (e) => {
    e.key === "Enter" && searchMovies(searchTerm);
  };

  // JEITO MAIS COMPLEXO DE FAZER A API

  // fetch(apiUrl)
  // .then((response) => response.json())
  // .then((data) => console.log(data));

  return (
    <div id="app">
       <div className="logo">
        <img src={logo} alt="logo devflix" />
      </div>
      <div className="trending">
        <a>
          Trending Now
          <img className="fire" src="src/assets/fire.png" alt="fogo vermelho" />
        </a>
        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handlekeyPress}
            placeholder="Search Movies..."
          />
          <img
            src={searchIcon}
            alt="Icone de pesquisa"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard  key={movie.imdbID} movies={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nenhum filme encontrado 😢</h2>
        </div>
      )}

<div className="recomendado">
        <p>
          <a>
            Recomended
            <img
              className="play"
              src="src/assets/play.png"
              alt="Imagem de um play"
              />
              </a>
            </p>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movies={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2></h2>
        </div>
      )}

      <Footer link={"https://github.com/B4g4rini"}>B4g4rini</Footer>
    </div>
  );
};

export default App;
