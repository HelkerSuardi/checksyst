<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Checksyst
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item 
          clickable 
          :to="{name: 'users'}"
        >
          <q-item-section avatar>
            <q-icon name="people_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Menu Usuários</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{name: 'vehicles'}"
        >
          <q-item-section avatar>
            <q-icon name="directions_car" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Menu Veículos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{name: 'items'}"
        >
          <q-item-section avatar>
            <q-icon name="build" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Menu Itens/Equip.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{name: 'checks'}"
        >
          <q-item-section avatar>
            <q-icon name="check_circle_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Menu Checagens</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="input" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
