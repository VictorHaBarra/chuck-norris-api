import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [joke, setJoke] = useState("");
  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos")) || []
  );

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => res.json())
      .then((resultado) => {
        setJoke(resultado.value);
      });
  }, []);

  function adicionarFavorito() {
    const novaLista = [...favoritos, joke];
    setFavoritos(novaLista);
    localStorage.setItem("favoritos", JSON.stringify(novaLista));
  }

  function removerFavorito(index) {
    if (window.confirm("Tem certeza que quer deletar?")) {
      const novaLista = favoritos.filter((_, i) => i !== index);
      setFavoritos(novaLista);
      localStorage.setItem("favoritos", JSON.stringify(novaLista));
    }
  }

  function mudarPiada() {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => res.json())
      .then((resultado) => {
        setJoke(resultado.value);
      });
  }

  return (
    <div className="container">
      <h1>Chuck Norris Jokes</h1>
      <button onClick={mudarPiada}>Mudar Piada</button>
      <div className="joke">
        <p>{joke}</p>
        <button onClick={adicionarFavorito}>Adicionar aos Favoritos</button>
      </div>
      <h2>Favoritos</h2>
      <ul>
        {favoritos.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removerFavorito(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
