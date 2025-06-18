import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const csvPath = path.join(__dirname, '../data/themes.csv')
const jsonPath = path.join(__dirname, '../data/themes.json')

const csv = fs.readFileSync(csvPath, 'utf-8')
const lines = csv.trim().split('\n')
const headers = lines[0].split(',')
const data = lines.slice(1).map(line => {
  const cols = line.split(',')
  return {
    japanese: cols[0],
    chinese: cols[1]
  }
})
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8')
console.log('themes.json generated from themes.csv')