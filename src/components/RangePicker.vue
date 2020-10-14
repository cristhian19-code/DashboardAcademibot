<template>
    <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
            color="secondary"
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            color="secondary"
            v-model="date"
            range
        ></v-date-picker>
        
    </v-menu>
</template>

<script>
export default {
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu: false
        }
    },
}
</script>
