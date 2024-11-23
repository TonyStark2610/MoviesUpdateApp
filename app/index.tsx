import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getMovies } from "./api/tmdbApi";
import MovieCard from "./components/MovieCard";
import { favorites$, toggleFavorite, loadFavorites } from "./store/favoritesStore";


interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MoviesListScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [upcoming, popular] = await Promise.all([getMovies("upcoming"), getMovies("popular")]);
        setMovies([...upcoming, ...popular]);
      } catch (error) {
        Alert.alert("Error", "Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    loadFavorites();

    const subscription = favorites$.subscribe(setFavorites);
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard
          movie={item}
          isFavorite={favorites.includes(item.id.toString())}
          onToggleFavorite={() => toggleFavorite(item.id.toString())}
          onPress={() =>
            router.push({
              pathname: "/details", // Corrected route path
              params: { movieId: item.id.toString() },
            })
          }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default MoviesListScreen;
