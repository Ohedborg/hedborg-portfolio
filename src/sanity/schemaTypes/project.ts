const project = {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'technologies',
        title: 'Technologies',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'githubUrl',
        title: 'GitHub URL',
        type: 'url',
      },
      {
        name: 'liveUrl',
        title: 'Live URL',
        type: 'url',
      },

      {
        name: 'Figma',
        title: 'Figma',
        type: 'url',
      },

      {
        name: 'image',
        title: 'Project Image',
        type: 'image',
        options: {
          hotspot: true
        }
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

export default project