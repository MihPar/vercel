// import { app } from './settings'

// const port = process.env.PORT || 3999

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

import express from 'express'
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.get('/', function(req, res) {
	res.json('Hello samuray')
})

app.listen(PORT, function() {console.log(`Server was started at port ${PORT}`)})