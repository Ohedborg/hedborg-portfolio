export default {
    name: 'terminalThought',
    title: 'Terminal Thought',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'text',
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