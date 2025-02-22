'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Your Project Name',
  
  projectId: 'fmjdzgyi',
  dataset: 'production',
  apiVersion: '2025-02-16',
  
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2025-02-16'}),
  ],
})
