import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { projectId, dataset } from './src/sanity/env'

export default defineConfig({
  name: 'Portfolio_Andy_Siwa_Studio',
  title: 'Studio Andy SIWA',

  projectId: projectId || 'demo-project-id',
  dataset: dataset || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
