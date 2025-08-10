'use client';

import { Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    dataParaRealizar: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nome = formData.nome;
    const dataParaRealizar = formData.dataParaRealizar;

    // Valida os campos
    if (!nome || !dataParaRealizar) {
      setMessage('Nome e dataParaRealizar são obrigatórios.');
      return;
    }

    const response = await fetch('/api/atividades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, dataParaRealizar }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage(`Atividade criada: ${data.nome}`);
    } else {
      const errorData = await response.json();
      setMessage(`Erro: ${errorData.error}`);
    }
  };

  return (
    <Container sx={{ mt: '10%', textAlign: 'center', justifyItems: 'center' }}>
      <Typography fontWeight={750} fontSize={36}>
        Boa tarde!
      </Typography>
      <Typography fontSize={18}>
        Seja bem-vindo ao meu singelo Cronograma.
      </Typography>
      <br />
      <Typography fontSize={18}>
        Para consultar atividades, clique abaixo:
      </Typography>
      <br />
      <div className="flex gap-6">
        <Button variant="contained" sx={{ minWidth: 300, fontWeight: 750 }} onClick={() => { router.push('/consultar'); }}>
          CONSULTAR ATIVIDADES
        </Button>
      </div>
      <br />
      <br />
      <div className="gap-6" style={{ backgroundColor: '#FFFFFF', width: 400, height: 350, marginTop: 5 }}>
        <br />
        <Typography fontSize={18} color="#000000" fontWeight={750}>
          Cadastre uma atividade abaixo:
        </Typography>
        <br />
        <TextField
          label="Nome"
          variant="outlined"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          sx={{ width: '50%' }}
        />
        <br />
        <br />

        <TextField
          label="Data para Realizar"
          variant="outlined"
          type="date"
          name="dataParaRealizar"
          value={formData.dataParaRealizar}
          onChange={handleChange}
          sx={{ width: '50%' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        {message && (
          <Typography color={message.includes('Erro') ? 'error' : 'success'} mt={2}>
            {message}
          </Typography>
        )}
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ width: '50%' }}
          disabled={loading} // Desativa o botão enquanto a requisição está em andamento
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </Button>
        
        <br />
        <br />

        
      </div>
    </Container>
  );
}
