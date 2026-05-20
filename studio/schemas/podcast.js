export default {
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fields: [
    {
      name: 'episode',
      title: 'Episode (ex: EP. 12)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'guests',
      title: 'Invités (Sous-titre)',
      type: 'string',
      description: 'Ex: Diébédo Francis Kéré · Pierre Goudiaby Atepa',
    },
    {
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Ex: 48 min',
    },
    {
      name: 'image',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    },
  ],
}
