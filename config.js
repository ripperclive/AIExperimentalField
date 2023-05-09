import fs from 'fs'

const template = fs.readFileSync('.env.example','utf-8')

fs.writeFileSync('.env',template)