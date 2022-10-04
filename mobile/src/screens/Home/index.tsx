import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';

import { Game, GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { api } from '../../services/api';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<Game[]>([]);

  const navigation = useNavigation();

  function handleOpenGaming({ id, title, bannerUrl }: Game) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  useEffect(() => {
    api.get('/games').then(response => setGames(response.data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGaming(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
