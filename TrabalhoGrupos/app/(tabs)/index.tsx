import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/styles/global';

export default function PInicial() {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bem-vindo ao Inova Week!</Text>
      <TouchableOpacity style={globalStyles.button} onPress={() => router.push('/PLogin')}>
        <Text style={globalStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.button} onPress={() => router.push('/PRegistro')}>
        <Text style={globalStyles.buttonText}>Registrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}
