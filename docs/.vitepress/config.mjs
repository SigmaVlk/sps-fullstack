export default {
  title: "SPS Fullstack Project",
  description: "Dokumentace fullstack aplikace pro SPS",
  themeConfig: {
    nav: [
      { text: "Domů", link: "/" },
      { text: "Struktura", link: "/structure" },
      { text: "API", link: "/api" },
      { text: "Databáze", link: "/database" }
    ],
    sidebar: [
      {
        text: "Obsah",
        items: [
          { text: "Struktura projektu", link: "/structure" },
          { text: "API", link: "/api" },
          { text: "Databáze", link: "/database" }
        ]
      }
    ]
  }
}
