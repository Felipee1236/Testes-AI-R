import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import wdio from 'eslint-plugin-wdio'
import prettier from 'eslint-config-prettier'

export default [
  { ignores: ['node_modules/', 'allure-results/', 'allure-report/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  wdio.configs['flat/recommended'],
  prettier,
]
