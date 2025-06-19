<template>
  <v-container>
    <h2>Novo Estudante</h2>
    <StudentForm :model-value="student" @submit="handleSubmit" />
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useToast } from 'vue-toastification'
  import StudentForm from '@/components/StudentForm.vue'
  import studentAPI from '@/lib/http/studentAPI'

  const toast = useToast()
  const router = useRouter()
  const student = ref({ name: '', email: '', ra: '', cpf: '' })

  async function handleSubmit (data: any) {
    try {
      const res = await studentAPI.create(data)
      toast.success(res.message)
      router.push('/students')
    } catch (error) {
      toast.error('Erro ao cadastrar estudante')
      console.error(error)
    }
  }
</script>
