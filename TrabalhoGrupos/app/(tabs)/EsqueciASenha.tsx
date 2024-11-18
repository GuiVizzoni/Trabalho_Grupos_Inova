import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/styles/global';

export default function EsqueciASenha() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    setErrorMessage('');
    if (!email) {
      setErrorMessage('Por favor, insira seu email.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      setErrorMessage('Erro ao enviar email de redefinição.');
    } else {
      alert('Email de redefinição enviado. Verifique sua caixa de entrada.');
      router.push('/PLogin');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Redefinir Senha</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleResetPassword} disabled={loading}>
        <Text style={globalStyles.buttonText}>{loading ? 'Enviando...' : 'Redefinir Senha'}</Text>
      </TouchableOpacity>
      {errorMessage !== '' && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <TouchableOpacity onPress={() => router.push('/PLogin')}>
        <Text style={globalStyles.footerLink}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}
