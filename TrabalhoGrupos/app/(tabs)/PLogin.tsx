import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/styles/global';

export default function PLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setErrorMessage('Erro ao entrar. Verifique suas credenciais.');
    } else {
      router.push('/grupos/PListaGrupos');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Entrar</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin} disabled={loading}>
        <Text style={globalStyles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
      {errorMessage !== '' && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <TouchableOpacity onPress={() => router.push('/EsqueciASenha')}>
        <Text style={globalStyles.footerLink}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/PRegistro')}>
        <Text style={globalStyles.footerLink}>Registrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}
