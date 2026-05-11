import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'main.py',
      'forms.py',
      'sweetie_classes.py',
      'sweetie_info.py',
      'templates/**',
      'static/**',
      'instance/**',
      'sanity.types.ts',
    ],
  },
]

export default eslintConfig
