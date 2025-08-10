import { Button, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{mt:'15%', textAlign:'center', justifyItems:'center'}}>
      <Typography fontWeight={750} fontSize={36}>
        Boa tarde!
      </Typography>
      <Typography fontSize={18}>
        Seja bem vindo ao Sistema Consultor de Notas dos Trabalhos do Betão
      </Typography>
      <br />
      <div className="flex gap-6">
        <Button variant="contained" sx={{minWidth:300, fontWeight:750}}>Vamos lá!</Button>
      </div>
    </Container>
  );
}
