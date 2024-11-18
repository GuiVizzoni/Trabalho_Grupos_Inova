import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'expo-router';
import RouteGuard from '@/components/RouteGuard'; // Importando o RouteGuard

interface Grupo {
  id: string;
  nome: string;
  desc_grupo: string;
  data_apresentacao: string;
}

export default function PListaGrupos() {
  const [groups, setGroups] = useState<Grupo[]>([]); // Tipar os dados corretamente
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true); // Ativar o spinner antes de buscar os dados

      // Query para buscar os grupos
      const { data, error } = await supabase
        .from('grupos')
        .select('id, nome, desc_grupo, data_apresentacao') // Selecionar apenas os campos necessários
        .order('nome', { ascending: true });

      if (error) {
        console.error('Erro ao buscar grupos:', error.message); // Log de erro
      } else {
        console.log('Dados recebidos dos grupos:', data); // Log dos dados recebidos
        setGroups(data || []); // Atualizar o estado com os dados recebidos
      }

      setLoading(false); // Desativar o spinner após a busca
    };

    fetchGroups();
  }, []);

  // Função para deslogar o usuário e redirecioná-lo para a página inicial
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao deslogar:", error.message);
    } else {
      // Redireciona o usuário para a página inicial após o logout
      router.push('/'); // Ou 'PHome' dependendo de como você nomeou a página inicial
    }
  };

  const renderGroup = ({ item }: { item: Grupo }) => (
    <View style={styles.groupCard}>
      <Text style={styles.groupName}>{item.nome}</Text>
      <Text style={styles.groupDescription}>{item.desc_grupo}</Text>
      <Text style={styles.groupDate}>
        Apresentação: {new Date(item.data_apresentacao).toLocaleDateString('pt-BR')}
      </Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => router.push(`/grupos/PDetalheGrupos?id=${item.id}`)}
      >
        <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <RouteGuard> {/* Protege a página com RouteGuard */}
      <View style={styles.container}>
        <Text style={styles.title}>Grupos do Inova Week</Text>
        {/* Botão de Logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={groups}
            keyExtractor={(item) => item.id}
            renderItem={renderGroup}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={() => (
              <Text style={styles.emptyMessage}>Nenhum grupo encontrado.</Text>
            )}
          />
        )}
      </View>
    </RouteGuard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  listContainer: { paddingBottom: 20 },
  groupCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  groupName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  groupDescription: { fontSize: 14, color: '#666', marginBottom: 5 },
  groupDate: { fontSize: 12, color: '#999', marginBottom: 10 },
  detailsButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  detailsButtonText: { color: '#fff', fontWeight: 'bold' },
  emptyMessage: { textAlign: 'center', color: '#999', marginTop: 20 },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
