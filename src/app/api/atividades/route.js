import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// Configuração da conexão com o banco
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // nome do serviço no Docker Compose
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Função POST para inserir a atividade
export async function POST(req) {
  try {
    // Lê o corpo da requisição e converte para JSON
    const { nome, dataParaRealizar } = await req.json();
    console.log({ nome, dataParaRealizar });  // Verificando os dados recebidos

    if (!nome || !dataParaRealizar) {
      return NextResponse.json(
        { error: 'Nome e dataParaRealizar são obrigatórios' },
        { status: 400 }
      );
    }

    // Consulta SQL para inserir a nova atividade
    const query = 'INSERT INTO Atividades(nome, dataParaRealizar) VALUES($1, $2) RETURNING *';
    const values = [nome, dataParaRealizar];
    const result = await pool.query(query, values);

    // Retorna a nova atividade inserida com o status 201
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error('Erro ao criar atividade:', err);
    return NextResponse.json(
      { error: 'Erro ao criar a atividade' },
      { status: 500 }
    );
  }
}

// Função GET para obter todas as atividades
export async function GET() {
  try {
    // Consulta SQL para obter todas as atividades
    const query = 'SELECT * FROM Atividades';
    const result = await pool.query(query);

    // Retorna todas as atividades com status 200
    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error('Erro ao obter atividades:', err);
    return NextResponse.json(
      { error: 'Erro ao obter atividades' },
      { status: 500 }
    );
  }
}
