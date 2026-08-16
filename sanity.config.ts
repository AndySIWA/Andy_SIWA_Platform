import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'
import { projectId, dataset } from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  name: 'Portfolio_Andy_Siwa_Studio',
  title: 'Studio Andy SIWA',

  projectId: projectId || 'demo-project-id',
  dataset: dataset || 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
