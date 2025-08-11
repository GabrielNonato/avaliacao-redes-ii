import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// Configuração da conexão com o banco
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, 
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export async function POST(req) {
  try {

    const { nome, dataParaRealizar } = await req.json();
    console.log({ nome, dataParaRealizar });  

    if (!nome || !dataParaRealizar) {
      return NextResponse.json(
        { error: 'Nome e dataParaRealizar são obrigatórios' },
        { status: 400 }
      );
    }


    const query = 'INSERT INTO Atividades(nome, dataParaRealizar) VALUES($1, $2) RETURNING *';
    const values = [nome, dataParaRealizar];
    const result = await pool.query(query, values);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error('Erro ao criar atividade:', err);
    return NextResponse.json(
      { error: 'Erro ao criar a atividade' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {

    const query = 'SELECT * FROM Atividades';
    const result = await pool.query(query);


    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error('Erro ao obter atividades:', err);
    return NextResponse.json(
      { error: 'Erro ao obter atividades' },
      { status: 500 }
    );
  }
}
