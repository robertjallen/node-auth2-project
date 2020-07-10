const server = require('./api/server')

require('dotenv').config()

const PORT = process.env.PORT || 6000

server.listen(PORT, () => console.log(`\n ** No Errors on Port ${PORT} **`))