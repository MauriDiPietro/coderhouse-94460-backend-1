const fs = require('node:fs')

const path = './file.txt'

if(fs.existsSync(path)) {
    // console.log(fs.readFileSync(path, 'utf-8'))
    fs.appendFileSync(path, ', como estan?')
}
fs.writeFileSync(path, 'hola mundo')