export default {
  name: 'partenairePrivilegie',
  title: 'Partenaire Privilégié',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Catégorie (ex: INSTITUTIONNEL, STRATÉGIQUE)',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
    },
  ],
}
