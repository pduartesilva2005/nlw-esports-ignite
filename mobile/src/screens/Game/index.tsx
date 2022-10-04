import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { Duo, DuoCard } from '../../components/DuoCard';
import { api } from '../../services/api';
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { THEME } from '../../theme';
import { DuoMatch } from '../../components/DuoMatch';

import logoImg from '../../assets/logo-nlw-esports.png';

export function Game() {
  const [duos, setDuos] = useState<Duo[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation();
  const router = useRoute();
  const game = router.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    api.get(`/games/${game.id}/ads`).then(response => setDuos(response.data));
  }, []);

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.100:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord));
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={24}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          ]}
          showsHorizontalScrollIndicator
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          }
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
