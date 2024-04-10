// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default [
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended
  ),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
  eslintPluginPrettierRecommended,
]
