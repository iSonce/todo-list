<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface todo {
    text: string,
    id: number,
    completed: boolean
}

const input = ref<HTMLInputElement | null>(null)
const list = ref<Array<todo>>([])

onMounted(() => {
    input.value?.focus()
})

const handleAdd = () => {
    if (!input.value?.value) {
        alert('you haven\'t add any todo yet')
        return
    }
    list.value.push({
        text: input.value.value,
        id: new Date().getTime(),
        completed: false
    })
    input.value.value = ''
    input.value?.focus()
}

const handleClear = () => {
    list.value = []
}

const handleDelete = (todo: todo) => {
    list.value = list.value.filter((value: todo) =>
        value.id !== todo.id
    )
}
</script>

<template>
    <input ref="input" />
    <button @click="handleAdd">Add</button>
    <div v-for="todo in list" flex @key="todo.id">
        <h3>{{ todo.text }}</h3>
        <input type="checkbox" v-model="todo.completed">
        <button @click="() => handleDelete(todo)">delete</button>
    </div>
    <button @click="handleClear" block>Clear</button>
</template>

<style>
</style>