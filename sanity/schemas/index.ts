import type { SchemaTypeDefinition } from 'sanity'

import { category } from './category'
import { siteSettings } from './siteSettings'
import { sweet } from './sweet'

export const schemaTypes: SchemaTypeDefinition[] = [category, sweet, siteSettings]
