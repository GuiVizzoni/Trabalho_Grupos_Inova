import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Image, View, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: () => (
          <View style={styles.header}>
            <Image
              source={require('@/assets/images/inova.png')}
              style={styles.logo}
            />
          </View>
        ),
      }}
    >
      {/* Aba Home */}
      <Tabs.Screen
        name="index" // Página inicial
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />

      {/* Aba Grupos */}
      <Tabs.Screen
        name="grupos/PListaGrupos" // Página de grupos
        options={{
          tabBarLabel: 'Grupos',
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }}
      />

      {/* Ocultando as outras rotas do Tabs */}
      <Tabs.Screen
        name="PLogin" // Página de Login
        options={{
          href: null, // Esconde essa rota das abas
        }}
      />

      <Tabs.Screen
        name="PRegistro" // Página de Registro
        options={{
          href: null, // Esconde essa rota das abas
        }}
      />

      <Tabs.Screen
        name="EsqueciASenha" // Página de Esqueci a Senha
        options={{
          href: null, // Esconde essa rota das abas
        }}
      />

      <Tabs.Screen
        name="grupos/PDetalheGrupos" // Página de Detalhes do Grupo
        options={{
          href: null, // Esconde essa rota das abas
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
});
