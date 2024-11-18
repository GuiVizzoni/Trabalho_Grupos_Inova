import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/supabase/supabase'; // Importando o supabase

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Função para verificar a sessão de autenticação
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        // Se não estiver logado, redireciona para a tela de login
        router.push('/PLogin');
      } else {
        setLoading(false); // Caso esteja logado, permite o acesso
      }
    };

    // Verifica o status de autenticação assim que o componente for montado
    checkAuth();

    // Atualiza a sessão sempre que mudar o estado da autenticação
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      checkAuth(); // Reavalie a autenticação
    });

    // Casting para garantir que a subscription tenha o tipo correto
    const typedSubscription = subscription as unknown as { unsubscribe: () => void };

    // Limpa o listener de autenticação quando o componente for desmontado
    return () => {
      typedSubscription?.unsubscribe(); // Usa o unsubscribe corretamente
    };
  }, [router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <>{children}</>; // Renderiza o conteúdo protegido
};

export default RouteGuard;
