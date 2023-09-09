import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  auth: false,
  admin: {
    group: 'Системные данные',
  },
  upload: {
    staticURL: '/media',
    staticDir: '/var/payload-admin/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  hooks: 
      {
        beforeOperation: [async ({ args }) => {
          const files = args.req?.files;
          if (files && files.file && files.file.name) {
            const parts = files.file.name.split('.');
            files.file.name = `${(Math.random() + 1).toString(36).substring(2)}.${parts[parts.length - 1]}`;
          }
        }]
      },
};

export default Media;