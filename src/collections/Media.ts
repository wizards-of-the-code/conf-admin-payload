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
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
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