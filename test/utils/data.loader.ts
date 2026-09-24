import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function loadTestData<T>(fileName: string): T {
  const filePath = join(process.cwd(), 'test', 'data', fileName)
  return JSON.parse(readFileSync(filePath, 'utf-8')) as T
}