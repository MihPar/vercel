import express from 'express'
import { Request, Response } from 'express'
const PORT = process.env.PORT || 4000

const app = express()

app.get('/', function(req: Request, res: Response) {
	res.send('Hello samuray')
})

app.listen(PORT, function() {console.log(`Server was started at port ${PORT}`)})