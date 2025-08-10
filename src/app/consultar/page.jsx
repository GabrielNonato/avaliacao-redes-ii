'use client'

import { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography } from "@mui/material";

export default function Atividades() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);  // Para mostrar um loading enquanto os dados estão sendo carregados
  const [error, setError] = useState(null);      // Para lidar com erros

  useEffect(() => {
    async function fetchAtividades() {
      try {
        const response = await fetch('/api/atividades');
        
        // Verifica se a resposta foi bem-sucedida (status 200-299)
        if (!response.ok) {
          throw new Error('Erro ao carregar atividades');
        }

        const data = await response.json();
        setAtividades(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  // Marca como carregamento completo, independentemente de sucesso ou falha
      }
    }

    fetchAtividades();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  return (
    <Container sx={{ mt: '10%', textAlign: 'center', justifyItems: 'center' }}>
      <Typography fontWeight={750}>
        ATIVIDADES CADASTRADAS
      </Typography>
      <br />
      <ul>
        {atividades.length > 0 ? (
          atividades.map((atividade) => (
            <li key={atividade.id}>
              {atividade.nome} - {atividade.datapararealizar}
            </li>
          ))
        ) : (
          <li>Nenhuma atividade encontrada.</li>
        )}
      </ul>
    </Container>
  );
}
