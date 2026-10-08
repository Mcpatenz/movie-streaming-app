"use client";

import { useMemo, useState } from "react";
import { categories, initialProfile, movies } from "@/data/movies";
import useDebounce from "@/hooks/useDebounce";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import MovieGrid from "@/components/MovieGrid";
import ContinueWatching from "@/components/ContinueWatching";
import DetailModal from "@/components/DetailModal";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [profile, setProfile] = useState(initialProfile);

  const debouncedSearch = useDebounce(search, 300);

  const filteredMovies = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return movies.filter((movie) => {
      const matchesText =
        movie.title.toLowerCase().includes(term) || movie.genre.toLowerCase().includes(term);
      const matchesCategory =
        selectedCategory === "Trending" ||
        movie.genre.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesText && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory]);

  const continueWatching = useMemo(() => movies.slice(0, 4), []);

  const openDetails = (movie) => {
    setSelectedMovie(movie);
    setDetailOpen(true);
  };

  const handleAuthSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || profile.name;
    const email = formData.get("email")?.toString() || profile.email;

    setProfile({
      name,
      email,
      plan: "Premium",
    });
    setAuthOpen(false);
  };

  return (
    <main className="streaming-app">
      <Header
        profile={profile}
        search={search}
        setSearch={setSearch}
        onOpenAuth={() => setAuthOpen(true)}
      />

      <HeroSection
        movie={selectedMovie}
        onPlay={() => setDetailOpen(true)}
        onMoreInfo={() => openDetails(selectedMovie)}
      />

      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <MovieGrid
        movies={filteredMovies}
        selectedMovieId={selectedMovie.id}
        onSelect={openDetails}
      />

      <ContinueWatching movies={continueWatching} />

      <section className="player-panel">
        <div className="player-header">
          <div>
            <p className="player-label">Now watching</p>
            <h3>{selectedMovie.title}</h3>
          </div>
          <div className="player-tags">
            <span>{selectedMovie.genre}</span>
            <span>{selectedMovie.duration}</span>
          </div>
        </div>

        <video
          key={selectedMovie.video}
          controls
          autoPlay
          className="movie-player"
          poster={selectedMovie.poster}
        >
          <source src={selectedMovie.video} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </section>

      {detailOpen && <DetailModal movie={selectedMovie} onClose={() => setDetailOpen(false)} />}

      {authOpen && (
        <AuthModal
          mode={mode}
          profile={profile}
          onClose={() => setAuthOpen(false)}
          onModeChange={setMode}
          onSubmit={handleAuthSubmit}
        />
      )}
    </main>
  );
}
