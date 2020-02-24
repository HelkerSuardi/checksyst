<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark">
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
      content-class="bg-dark text-white"
    >
      <h5 class="column items-center">
        {{ 'Bem-vindo ' + username }}
      </h5>
      <q-list>
        <q-item
          clickable
          v-for="menu in allowedMenus"
          :key="menu.name"
          :to="{ name: menu.route }"
        >
          <q-item-section avatar>
            <q-icon :name="menu.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label> {{ menu.name }} </q-item-label>
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
import authService from '../service/auth-service'

export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false,
      menu: [
        {
          name: authService.getRole() === 'superAdm' ? 'Usuários' : 'Meus dados',
          allowedRoles: ['superAdm', 'adm'],
          icon: authService.getRole() === 'superAdm' ? 'people' : 'person',
          route: 'users'
        },
        {
          name: 'Veículos',
          allowedRoles: ['superAdm'],
          icon: 'directions_car',
          route: 'vehicles'
        },
        {
          name: 'Itens/Equipamentos',
          allowedRoles: ['superAdm'],
          icon: 'build',
          route: 'items'
        },
        {
          name: 'Checagens',
          allowedRoles: ['superAdm', 'adm'],
          icon: 'check_circle_outline',
          route: 'checks'
        },
        {
          name: 'Sair',
          allowedRoles: ['superAdm', 'adm'],
          icon: 'input',
          route: 'logout'
        },
      ]
    };
  },

  methods: {
    canSeeMenu (roles) {
      for (const role of roles) {
        if (authService.hasRole(role)) {
          return true
        }
      }

      return false
    },
  },

  computed: {
    allowedMenus () {
      return this.menu.filter(itemMenu => this.canSeeMenu(itemMenu.allowedRoles))
    },

    username() {
      return authService.getUsername()
    }
  }
};
</script>
