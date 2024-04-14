const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },

  {
    path: "/books",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "create",
        name: "books_create",
        component: () => import("pages/books/BooksCreate.vue"),
      },
      {
        path: "list",
        name: "books_list",
        component: () => import("pages/books/BooksList.vue"),
      },
      {
        path: "backup",
        name: "books_backup",
        component: () => import("pages/books/BooksBackup.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
