import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '@/supabase/supabase';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router'; // Importando o useRouter

// Definindo interfaces adaptáveis
type Student = {
  id: string;
  nome: string;
  curso: string;
  data_apresentada: string;
};

type Avaliador = {
  id: string;
  avaliador: string;
  nota: number;
  comentario: string;
  data_avaliada: string;
};

type Group = {
  id: string;
  nome: string;
  desc_grupo: string;
  data_apresentacao: string;
};

export default function PDetalheGrupos() {
  const { id } = useLocalSearchParams(); // Obtém o ID do grupo da URL
  const [group, setGroup] = useState<Group | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [avaliadores, setAvaliadores] = useState<Avaliador[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Usando o useRouter para navegação

  useEffect(() => {
    const fetchGroupDetails = async () => {
      console.log("Buscando grupo com ID:", id);

      // Consulta para o grupo
      const { data: groupData, error: groupError } = await supabase
        .from('grupos')
        .select('*')
        .eq('id', id)
        .single();

      if (groupError) {
        console.error("Erro ao buscar grupo:", groupError.message);
      } else {
        console.log("Grupo encontrado:", groupData);
        setGroup(groupData || null);
      }

      // Consulta para alunos
      const { data: studentsData, error: studentsError } = await supabase
        .from('alunos')
        .select('id, nome, curso, data_apresentada')
        .eq('grupo_id', id);

      if (studentsError) {
        console.error("Erro ao buscar alunos:", studentsError.message);
      } else {
        console.log("Alunos encontrados:", studentsData);
        setStudents(studentsData || []);
      }

      // Consulta para avaliadores
      const { data: avaliadoresData, error: avaliadoresError } = await supabase
        .from('avaliacoes')
        .select('id, avaliador, nota, comentario, data_avaliada')
        .eq('grupo_id', id);

      if (avaliadoresError) {
        console.error("Erro ao buscar avaliadores:", avaliadoresError.message);
      } else {
        console.log("Avaliadores encontrados:", avaliadoresData);
        setAvaliadores(avaliadoresData || []);
      }

      setLoading(false); // Finaliza o carregamento
    };

    if (id) {
      fetchGroupDetails();
    }
  }, [id]);  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {group ? (
        <>
          <Text style={styles.title}>{group.nome}</Text>
          <Text style={styles.description}>{group.desc_grupo}</Text>
          <Text style={styles.date}>
            Apresentação: {new Date(group.data_apresentacao).toLocaleDateString('pt-BR')}
          </Text>
        </>
      ) : (
        <Text style={styles.noDataText}>Grupo não encontrado.</Text>
      )}

      <Text style={styles.subtitle}>Alunos do Grupo:</Text>
      {students.length > 0 ? (
        <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const formattedDate = new Date(item.data_apresentada).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          });
          return (
            <View style={styles.studentCard}>
              <Text style={styles.studentName}>{item.nome}</Text>
              <Text style={styles.studentCourse}>Curso: {item.curso}</Text>
              <Text style={styles.studentDate}>Data Apresentada: {formattedDate}</Text>
            </View>
          );
        }}
      />
      ) : (
        <Text style={styles.noDataText}>Nenhum aluno encontrado.</Text>
      )}

      <Text style={styles.subtitle}>Avaliadores:</Text>
      {avaliadores.length > 0 ? (
        <FlatList
        data={avaliadores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const formattedDate = new Date(item.data_avaliada).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          });
          return (
            <View style={styles.avaliadorCard}>
              <Text style={styles.avaliadorName}>Avaliador: {item.avaliador}</Text>
              <Text style={styles.avaliadorNota}>Nota: {item.nota}</Text>
              <Text style={styles.avaliadorComentario}>Comentário: {item.comentario}</Text>
              <Text style={styles.avaliadorDate}>Data Avaliada: {formattedDate}</Text>
            </View>
          );
        }}
      />
      ) : (
        <Text style={styles.noDataText}>Nenhum avaliador encontrado.</Text>
      )}

      {/* Botão de Voltar para PListaGrupos */}
      <TouchableOpacity
        onPress={() => router.push('/grupos/PListaGrupos')} // Redireciona para PListaGrupos
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Voltar para Grupos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#666', marginBottom: 10 },
  date: { fontSize: 14, color: '#999', marginBottom: 20 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  studentCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  studentName: { fontSize: 16, fontWeight: 'bold' },
  studentCourse: { fontSize: 14, color: '#666' },
  studentDate: { fontSize: 14, color: '#666' },
  avaliadorCard: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  avaliadorName: { fontSize: 16, fontWeight: 'bold' },
  avaliadorNota: { fontSize: 14, color: '#666' },
  avaliadorComentario: { fontSize: 14, color: '#888' },
  avaliadorDate: { fontSize: 14, color: '#666' },
  noDataText: { fontSize: 14, color: '#999', marginBottom: 10 },
  backButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
