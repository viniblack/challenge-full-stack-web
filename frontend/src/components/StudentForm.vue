<template>
  <v-form ref="formRef" v-model="valid" @submit.prevent="onSubmit">
    <v-text-field
      v-model="form.name"
      :error-messages="errors.name"
      label="Nome"
      required
    />
    <v-text-field
      v-model="form.email"
      :error-messages="errors.email"
      label="Email"
      required
    />

    <v-text-field
      v-model="form.ra"
      :disabled="isEditing"
      :error-messages="errors.ra"
      label="RA"
      required
      type="number"
    />

    <v-text-field
      v-model="form.cpf"
      :disabled="isEditing"
      :error-messages="errors.cpf"
      label="CPF"
      required
      type="number"
    />

    <v-row class="mt-4" justify="space-between">
      <v-btn color="secondary" @click="router.back()">Cancelar</v-btn>
      <v-btn color="primary" type="submit">Salvar</v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
  import type { Student } from '@/lib/http/studentAPI'
  import { computed, reactive, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useToast } from 'vue-toastification'
  import { studentSchema } from '@/validators/studentSchema'

  const toast = useToast()
  const router = useRouter()

  const props = defineProps<{ modelValue: Partial<Student> }>()
  const emit = defineEmits(['submit'])

  const form = reactive({ ...props.modelValue })
  const formRef = ref()
  const valid = ref(false)
  const errors = ref<Record<string, string[]>>({})

  const isEditing = computed(() => !!form.id)

  watch(
    () => props.modelValue,
    val => {
      Object.assign(form, val)
    },
  )

  function onSubmit () {
    const parsed = studentSchema.safeParse(form)
    if (!parsed.success) {
      errors.value = parsed.error.flatten().fieldErrors
      toast.error('Por favor, verifique os campos')
      return
    }
    errors.value = {}
    emit('submit', { ...form })
  }
</script>
