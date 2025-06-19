<template>
  <v-container>
    <h2>Editar Estudante</h2>
    <StudentForm :model-value="student" @submit="handleSubmit" />
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useToast } from 'vue-toastification'
  import StudentForm from '@/components/StudentForm.vue'
  import studentAPI from '@/lib/http/studentAPI'

  const toast = useToast()
  const route = useRoute()
  const router = useRouter()
  const student = ref({ name: '', email: '', ra: '', cpf: '' })

  onMounted(async () => {
    const id = route.params.id
    const res = await studentAPI.getById(id)
    student.value = res
  })

  async function handleSubmit (data: any) {
    const id = route.params.id
    const res = await studentAPI.update(id, data)
    toast.success(res.message)
    router.push('/students')
  }
</script>
