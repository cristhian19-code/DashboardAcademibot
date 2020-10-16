<template>
    <div class="text-center">
    <v-dialog
        v-model="activated"
        hide-overlay
        persistent
        width="300"
    >
        <v-card
        color="secondary"
        dark
        >
        <v-card-text>
            Cargando Datos
            <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
            ></v-progress-linear>
        </v-card-text>
        </v-card>
    </v-dialog>
    </div>
</template>
<script>
export default {
    props: ['activated']
}
</script>