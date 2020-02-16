const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/checks",
        meta: { requiresAuth: true }
      },
      {
        path: "",
        redirect: "/checks",
        meta: { requiresAuth: true }
      },
      //USERS
      {
        path: "users",
        name: "users",
        meta: { requiresAuth: true },
        component: () => import("../pages/users/List.vue")
      },
      {
        path: "users/add",
        name: "users_add",
        meta: { requiresAuth: true },
        component: () => import("../pages/users/Create.vue")
      },
      {
        path: "users/update",
        name: "users_update",
        meta: { requiresAuth: true },
        component: () => import("../pages/users/Update.vue")
      },
      //VEHICLES
      {
        path: "vehicles",
        name: "vehicles",
        meta: { requiresAuth: true },
        component: () => import("../pages/vehicles/List.vue")
      },
      {
        path: "vehicles/add",
        name: "vehicles_add",
        meta: { requiresAuth: true },
        component: () => import("../pages/vehicles/Create.vue")
      },
      {
        path: "vehicles/update",
        name: "vehicles_update",
        meta: { requiresAuth: true },
        component: () => import("../pages/vehicles/Update.vue")
      },
      //ITEMS/EQUIPS
      {
        path: "items",
        name: "items",
        meta: { requiresAuth: true },
        component: () => import("../pages/items/List.vue")
      },
      {
        path: "items/add",
        name: "items_add",
        meta: { requiresAuth: true },
        component: () => import("../pages/items/Create.vue")
      },
      {
        path: "items/update",
        name: "items_update",
        meta: { requiresAuth: true },
        component: () => import("../pages/items/Update.vue")
      },
      //CHECKS
      {
        path: "checks",
        name: "checks",
        meta: { requiresAuth: true },
        component: () => import("../pages/checks/List.vue")
      },
      {
        path: "checks/add",
        name: "checks_add",
        meta: { requiresAuth: true },
        component: () => import("../pages/checks/Create.vue")
      },
      {
        path: "checks/update",
        name: "checks_update",
        meta: { requiresAuth: true },
        component: () => import("../pages/checks/Update.vue")
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: { requiresAuth: false },
    component: () => import("../pages/session/Login.vue")
  },
  {
    path: "/logout",
    name: "logout",
    meta: { requiresAuth: false },
    component: () => import("../pages/session/Logout.vue")
  },

];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
