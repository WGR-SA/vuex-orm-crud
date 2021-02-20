const sidebars = {
  guide: [
    {
      title: 'Prologue',
      collapsable: false,
      children: [
        '/guide/prologue/installation',
        '/guide/prologue/getting-started'
      ]
    },
    {
      title: 'CRUD',
      collapsable: false,
      children: [
        '/guide/crud/client',
        '/guide/crud/read',
        '/guide/crud/create',
        '/guide/crud/update',
        '/guide/crud/delete'
      ]
    },
  ],

  api: [
    {
      title: 'Model',
      collapsable: false,
      children: [
        '/api/model'
      ]
    }
  ]
}

module.exports = {
  title: 'Vuex ORM CRUD',
  description: 'A Vuex ORM plugin to deal CRUD stuff.',

  base: '/vuex-orm-crud/',

  themeConfig: {
    repo: 'wgr-sa/vuex-orm-crud',
    docsDir: 'docs',
    sidebarDepth: 2,

    nav: [{
        text: 'Guide',
        link: '/guide/prologue/installation'
      },
      {
        text: 'API Reference',
        link: '/api/model'
      }
    ],

    sidebar: {
      '/guide/': sidebars.guide,
      '/api/': sidebars.api,
      '/': sidebars.guide
    }
  }
}
