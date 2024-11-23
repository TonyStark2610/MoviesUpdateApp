import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface MovieCardProps {
  movie: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      style={styles.image}
    />
    <View style={styles.info}>
      <Text style={styles.title}>{movie.title}</Text>
      <TouchableOpacity onPress={onToggleFavorite}>
        <Text style={styles.favorite}>{isFavorite ? "★" : "☆"}</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { flexDirection: "row", marginBottom: 10, padding: 10, backgroundColor: "#f5f5f5" },
  image: { width: 100, height: 150, marginRight: 10 },
  info: { flex: 1, justifyContent: "space-between" },
  title: { fontSize: 18, fontWeight: "bold" },
  favorite: { fontSize: 18, color: "gold" },
});

export default MovieCard;
