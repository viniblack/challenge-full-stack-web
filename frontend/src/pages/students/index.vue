<template>
  <v-container>
    <v-row class="my-4" justify="space-between">
      <h2>Estudantes</h2>
      <v-btn color="success" @click="router.push('/students/create')">
        Novo
      </v-btn>
    </v-row>

    <v-text-field
      v-model="search"
      class="mb-4"
      clearable
      label="Buscar estudante"
      prepend-inner-icon="mdi-magnify"
    />

    <v-data-table
      class="elevation-1"
      :headers="headers"
      item-value="id"
      :items="students"
      :loading="loading"
      loading-text="Carregando estudantes..."
      :search="search"
    >
      <template #item.cpf="{ item }">
        {{ formatCPF(item.cpf) }}
      </template>

      <template #item.actions="{ item }">
        <v-btn icon @click="edit(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="askToDelete(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirmar remoção</v-card-title>
        <v-card-text>Você tem certeza que deseja remover este estudante?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            @click="deleteDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn color="red" @click="confirmDelete">Remover</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
  import type { Student } from '@/lib/http/studentAPI'
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useToast } from 'vue-toastification'
  import studentAPI from '@/lib/http/studentAPI'

  const toast = useToast()
  const students = ref<Student[]>([])
  const loading = ref(false)
  const router = useRouter()
  const search = ref('')

  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Nome', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'RA', key: 'ra' },
    { title: 'CPF', key: 'cpf' },
    { title: 'Ações', key: 'actions', sortable: false },
  ]

  const deleteDialog = ref(false)
  const selectedStudentId = ref<string | null>(null)

  async function loadStudents () {
    loading.value = true
    try {
      students.value = await studentAPI.getAll()
    } finally {
      loading.value = false
    }
  }

  function edit (id: string) {
    router.push(`/students/${id}/edit`)
  }

  function formatCPF (cpf: string) {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
  }

  function askToDelete (id: string) {
    selectedStudentId.value = id
    deleteDialog.value = true
  }

  async function confirmDelete () {
    if (selectedStudentId.value) {
      try {
        const res = await studentAPI.delete(selectedStudentId.value)
        toast.success(res.message)
        await loadStudents()
      } catch {
        toast.error('Erro ao apagar estudante')
      } finally {
        deleteDialog.value = false
        selectedStudentId.value = null
      }
    }
  }

  onMounted(loadStudents)
</script>
