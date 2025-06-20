<template>
  <v-container class="home-container fill-height d-flex flex-column align-center justify-center text-center">
    <img
      alt="Logo Mais A Educação"
      height="200"
      max-width="300"
      src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg"
    >
    <h1 class="text-h4 font-weight-bold mb-2">+A Educação</h1>
    <p class="text-subtitle-1 mb-6">
      Matrícula de alunos na Turma de Programação Web da Edtech
    </p>

    <v-btn class="text-subtitle-1" color="green" @click="$router.push('/students')">
      Cadastrar Aluno
    </v-btn>
  </v-container>
</template>

<script>

</script>
