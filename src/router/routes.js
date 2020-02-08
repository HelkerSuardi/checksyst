const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/checks"
      },
      {
        path: "",
        redirect: "/checks"
      },
      //USERS
      {
        path: "users",
        name: "users",
        component: () => import("../pages/users/List.vue")
      },
      {
        path: "users/add",
        name: "users_add",
        component: () => import("../pages/users/Create.vue")
      },
      //VEHICLES
      {
        path: "vehicles",
        name: "vehicles",
        component: () => import("../pages/vehicles/List.vue")
      },
      {
        path: "vehicles/add",
        name: "vehicles_add",
        component: () => import("../pages/vehicles/Create.vue")
      },
      //ITEMS/EQUIPS
      {
        path: "items",
        name: "items",
        component: () => import("../pages/items/List.vue")
      },
      {
        path: "items/add",
        name: "items_add",
        component: () => import("../pages/items/Create.vue")
      },
      //CHECKS
      {
        path: "checks",
        name: "checks",
        component: () => import("../pages/checks/List.vue")
      },
      {
        path: "checks/add",
        name: "checks_add",
        component: () => import("../pages/checks/Create.vue")
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
