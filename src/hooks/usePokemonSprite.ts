import { useState, useEffect } from 'react';

interface PokemonSpriteData {
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
}

interface UsePokemonSpriteReturn {
  spriteUrl: string | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonSprite(pokemonIdentifier: string | number | null): UsePokemonSpriteReturn {
  const [spriteUrl, setSpriteUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!pokemonIdentifier) {
      setSpriteUrl(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchSprite = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${String(pokemonIdentifier).toLowerCase()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch sprite for ${pokemonIdentifier}: ${response.status}`);
        }
        const data: PokemonSpriteData = await response.json();
        const officialArtwork = data.sprites.other?.['official-artwork']?.front_default;
        const defaultSprite = data.sprites.front_default;
        setSpriteUrl(officialArtwork || defaultSprite);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setSpriteUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSprite();
  }, [pokemonIdentifier]);

  return { spriteUrl, isLoading, error };
}
