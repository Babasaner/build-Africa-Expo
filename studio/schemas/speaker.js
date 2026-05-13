export default {
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role / Title',
      type: 'text',
      rows: 2,
    },
    {
      name: 'image',
      title: 'Speaker Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tag',
      title: 'Tag (Sector/Field)',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Featured (À l\'honneur)', value: 'featured' },
        ],
      },
      initialValue: 'standard',
    },
    {
      name: 'order',
      title: 'General Order',
      type: 'number',
    },
    {
      name: 'featuredOrder',
      title: 'Featured Section Order',
      type: 'number',
      description: 'Used only for the "Intervenants à l\'honneur" section.',
    },
  ],
}
