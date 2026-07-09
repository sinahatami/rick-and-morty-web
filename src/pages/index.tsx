import { SEO } from '~/components/shared/SEO';
import { CharacterList } from '~/components/character/CharacterList';

export default function Home() {
  return (
    <>
      <SEO
        title="Characters"
        description="Explore all characters from the Rick and Morty universe"
      />
      <CharacterList />
    </>
  );
}
