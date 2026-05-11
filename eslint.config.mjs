import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  prettier,
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
      '.next/**',
      'node_modules/**',
      'venv/**',
      '__pycache__/**',
      'out/**',
      '.vercel/**',
    ],
  },
]

export default eslintConfig
