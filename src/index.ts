// import { app } from './settings'

// const port = process.env.PORT || 3999

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

import express, {Request, Response} from 'express'
export const app = express()

import {videos} from './db/db'
import { readSync } from 'fs'
import { HTTP_STATUS } from './utits'
const PORT = process.env.PORT || 4000

app.use(express.json())

app.get('/', function(req: Request, res: Response) {
	res.json(videos)
})
app.post('/videos', function(req: Request, res: Response) {
	const newVideos = {
			id: Number(new Date()),
			title: req.body.title,
			author: req.body.author,
			canBeDownloaded: true,
			minAgeRestriction: 5,
			createdAt: "2023-09-13T19:56:25.759Z",
			publicationDate: "2023-09-13T19:56:25.759Z",
			availableResolutions: ["P144"],
	  }
	  videos.push(newVideos)
	  res.status(HTTP_STATUS.CREATED_201).json(videos)
})

app.listen(PORT, function() {console.log(`Server was started at port ${PORT}`)})