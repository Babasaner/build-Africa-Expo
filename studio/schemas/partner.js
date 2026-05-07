export default {
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Co-organisateurs', value: 'co-organisateurs' },
          { title: 'Media', value: 'media' },
          { title: 'Platinum', value: 'platinum' },
          { title: 'Gold', value: 'gold' },
          { title: 'Silver', value: 'silver' },
          { title: 'Bronze', value: 'bronze' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}
