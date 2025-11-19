const http = require('http');

const products = [
    {
        name: 'prod1',
        price: 100
    },
    {
        name: 'prod2',
        price: 200
    },
    {
        name: 'prod3',
        price: 300
    }
]

const server = http.createServer((req, res)=>{
    // console.log(req.url);
    if(req.url === '/'){
        res.end('Mi primer servidor http')
    }
    if(req.url === '/products'){
        res.end(JSON.stringify(products))
    }
})

server.listen(8080, ()=>{
    console.log('Server ok, puerto 8080');
})