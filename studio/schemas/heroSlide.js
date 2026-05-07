export default {
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    {
      name: 'title1',
      title: 'Title Line 1',
      type: 'string',
    },
    {
      name: 'title2',
      title: 'Title Line 2',
      type: 'string',
    },
    {
      name: 'highlight',
      title: 'Highlight Text',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'location',
      title: 'Location/Date Info',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
    {
      name: 'buttons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'linkType', title: 'Link Type', type: 'string', options: { list: ['url', 'file'] } },
            { name: 'url', title: 'URL', type: 'url', hidden: ({ parent }) => parent?.linkType !== 'url' },
            { name: 'file', title: 'File (PDF/Brochure)', type: 'file', hidden: ({ parent }) => parent?.linkType !== 'file' },
          ]
        }
      ]
    }
  ],
}
