import React from 'react';
import {View, Image, Text, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

// Importa um compositor de e-mail do Expo.
import * as MailComposer from 'expo-mail-composer';

// Importação de estilo, ícones e imagens.
import {Feather} from '@expo/vector-icons';
import styles from './styles';
import logoImg from '../../assets/logo.png';

// Componente dos Detalhes.
function Detalhes() {
  // Obtém a instância da navegação, usada para navegar pelas telas.
  const navigation = useNavigation();

  // Obtém a instância das rotas.
  const route = useRoute();

  // Obtém o caso, através dos parâmetros passados na última página.
  const caso = route.params.caso;

  // Mensagem padrão.
  const message = `Olá ${caso.nome}, estou entrando em contato pois gostaria de ajudar no caso "${caso.titulo}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}.`

  // Função usada para voltar para a tela anterior.
  function navigateBack() {
    navigation.goBack();
  }

  // Função usada para enviar mensagem por e-mail.
  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${caso.titulo}`,
      recipients: [caso.email],
      body: message
    });
  }

  // Função usada para enviar mensagem pelo WhatsApp.
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+55${caso.whatsapp}&text=${message}`);
  }

  // HTML que é retornado quando o componente é renderizado.  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color='#e82041' />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.incident}>
          <View style={styles.incidentGroups}>
            <View style={styles.incidentGroup}>
              <Text style={[styles.incidentProperty, {marginTop: 0}]}>CASO:</Text>
              <Text style={[styles.incidentValue, {textAlign: 'left'}]}>{caso.titulo}</Text>
            </View>

            <View style={styles.incidentGroup}>
              <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
              <Text style={styles.incidentValue}>{caso.nome} de {caso.cidade}/{caso.uf}</Text>
            </View>
          </View>

          <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
          <Text style={styles.incidentValue}>{caso.descricao}</Text>

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
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
          <Text styles={styles.heroDescription}>Entre em contato:</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
              <Text style={styles.actionText}>Whatsapp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Exporta o componente.
export default Detalhes;