export default {
  name: 'videoSection',
  title: 'Video Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo etc)',
      type: 'url',
    },
  ],
}
