import AsyncStorage from "@react-native-async-storage/async-storage";
import { BehaviorSubject } from "rxjs";

const FAVORITES_KEY = "favorites";


export const favorites$ = new BehaviorSubject<string[]>([]);

export const toggleFavorite = async (movieId: string) => {
  const currentFavorites = favorites$.getValue();
  const updatedFavorites = currentFavorites.includes(movieId)
    ? currentFavorites.filter((id) => id !== movieId)
    : [...currentFavorites, movieId];

  favorites$.next(updatedFavorites);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

export const loadFavorites = async () => {
  const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
  if (storedFavorites) {
    favorites$.next(JSON.parse(storedFavorites));
  }
};
