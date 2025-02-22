import { type SchemaTypeDefinition } from 'sanity'
import bookImage from './bookImage'
import terminalThought from './terminalThought'
import project from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bookImage, terminalThought, project],
}