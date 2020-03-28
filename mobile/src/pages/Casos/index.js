import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Importa a Api do back-end criada com o axios.
import api from '../../services/api'

// Importação de estilo, ícones e imagens.
import {Feather} from '@expo/vector-icons'
import styles from './styles';
import logoImg from '../../assets/logo.png';

// Componente dos Casos.
function Casos() {
  // Cria um estado para armazenar cada caso do banco de dados.
  const [casos, setCasos] = useState([]);

  // Cria um estado para armazenar o número total de casos.
  const [total, setTotal] = useState(0);

  // Cria um estado para armazenar a página atual
  const [page, setPage] = useState(1);

  // Cria um estado para armazenar se o aplicativo estiver carregando.
  const [loading, setLoading] = useState(false);

  // Obtém a instância de navegação, usada para navegar pelas telas.
  const navigation = useNavigation();

  useEffect(() => {
    carregarCasos();
  }, []);

  // Função utilizada para carregar casos.
  async function carregarCasos() {
    // Se já estiver carregando incidentes, basta retornar.
    if (loading) {
      return;
    }

    // Se todos os incidentes do banco de dados já estiverem carregados, basta retornar.
    if (total > 0 && casos.length == total) {
      return;
    }

    // Atualiza o estado do carregamento.
    setLoading(true);

    // Tenta obter casos do banco de dados.
    const response = await api.get('/casos', {
      params: {page}
    });

    // Atualiza o estado dos casos.
    setCasos([...casos, ...response.data]);

    // Atualiza o contador de casos totais.
    setTotal(response.headers['x-total-count']);

    // Atualiza a página.
    setPage(page + 1);

    // Atualiza o estado de carregamento novamente.
    setLoading(false);
  }

  // Função utilizada para mostrar mais detalhes de um caso.
  function navigateToDetail(caso) {
    // Redireciona o usuário para a página de detalhes, informando qual incidente ele selecionou.
    navigation.navigate('Detail', {caso});
  }

  // Função utilizada ao chegar no final da lista fixa, ou caso a lista seja vazia.
  function renderFooter() {
    // Se já estiver carregando, basta retornar.
    if (!loading) return null;

    // Retorna um indicador de carregamento.
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='small' color='#e02041' />
      </View>
    );
  }

  // HTML que é retornado quando o componente é renderizado.  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        style={styles.incidentList}
        data={casos}
        keyExtractor={caso => String(caso.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={carregarCasos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        renderItem={({item: caso}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{caso.nome}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{caso.titulo}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat(
                'pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL'
                }
              ).format(caso.valor)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(caso)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name='arrow-right' size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Exporta o componente.
export default Casos;