export default {
  name: 'bookImage',
  title: 'Book Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'review',
      title: 'Review',
      type: 'text',
    },
    {
      name: 'bannerPosition',
      title: 'Banner Position',
      type: 'string',
      options: {
        list: [
          {title: 'Upper Banner', value: 'upper'},
          {title: 'Bottom Banner', value: 'bottom'}
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      initialValue: () => new Date().toISOString(),
    }
  ],
  orderings: [
    {
      title: 'Created At',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }]
    }
  ]
} 
