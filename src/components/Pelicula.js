import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function Pelicula() {
  const { id } = useParams();
  const uid = useSelector((state) => state.user.id);
  const [like, setLike] = useState(false);
  const [movie, setMovie] = useState([]);

  //buscar detalles de pelicula
  useEffect(() => {
    axios
      .get(`/api/movies/search/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setMovie(data);
      })
      .catch(() => {});
  }, [id]);

  //buscar si esta likeada
  useEffect(() => {
    axios
      .get("/api/favorites/find", { params: { mid: movie.id, uid } })
      .then((fav) => {
        if (fav.data.movieId) setLike(true);
        else setLike(false);
      })
      .catch((err) => console.log(err));
  }, [uid, movie]);

  function handleLike(mid) {
    axios
      .post("/api/favorites/register", { data: { mid, uid } })
      .then((add) => {
        if (!uid) alert("Ojo!", "Necesitas estar logueado 💻", "warning");
        else if (add.data) {
          alert("likeado!");
          setLike(true);
        } else alert("La propiedad ya esta en favoritos. 🤧");
      });
  }

  //dislikea
  function handleDislike(mid) {
    axios
      .delete("/api/favorites/delete", { data: { mid, uid } })
      .then((del) => {
        if (del.data === "OK") {
          alert("dislikeado!");
          setLike(false);
        }
      })
      .catch((del) => {
        if (del.code === "ERR_BAD_REQUEST") {
          return alert(
            "Guarda campeon!",
            "La propiedad no esta en favoritos. 😡",
            "danger"
          );
        }
      });
  }

  if (!movie.id) return <h3>No hay datos</h3>;

  return (
    <div className="container" style={{ marginTop: "1rem" }}>
      <div className="columns">
        <div className="column is-one-quarter">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="column">
          <p className="title is-4">{movie.title}</p>
          <p className="content">{movie.overview}</p>
          <p className="subtitle is-6">
            Genre: {movie.genres[0]?.name || "unspecified"}
          </p>
          <p className="subtitle is-6">Duration: {movie.runtime}min</p>
          <p className="subtitle is-6">Release Data: {movie.release_date}</p>

          {movie.homepage ? (
            <p className="subtitle is-6">
              Webpage: {` `}
              <a target="_blank" rel="noreferrer" href={`${movie.homepage}`}>
                {movie.homepage}
              </a>
            </p>
          ) : (
            <></>
          )}
          {uid ? (
            like ? (
              <button
                onClick={() => {
                  handleDislike(movie.id);
                }}
                className="button is-info"
              >
                Disike!
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLike(movie.id);
                }}
                className="button is-primary"
              >
                Like!
              </button>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pelicula;
