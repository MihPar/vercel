// import { app } from './settings'

// const port = process.env.PORT || 3999

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

import express, {Request, Response} from 'express'
export const app = express()

import {videos} from './db/db'
import { readSync } from 'fs'
import { HTTP_STATUS } from './utils'
const PORT = process.env.PORT || 4000

app.use(express.json())

/******************************* GET ****************************************/
app.get('/videos', function(req: Request, res: Response) {
	res.json(videos)
})

/******************************* POST ****************************************/

app.post('/videos', function(req: Request, res: Response) {
	type newVideosType = {
		id: number;
		title: string;
		author: string;
		canBeDownloaded: boolean;
		minAgeRestriction: number;
		createdAt: string;
		publicationDate: string;
		availableResolutions: Array<string>;
	  };

	  
	  
	if(!req.body.title || typeof req.body.title !== 'string' || req.body.title.length === 0) {
		let objError  = {
			errorsMessages: [
			  {
				message: "incorect iput value",
				field: "title"
			  }
			]
		  }
		res.status(HTTP_STATUS.BAD_REQUEST_400).json(objError)
		return 
	}
	if(!req.body.author || typeof req.body.author !== 'string' || req.body.author.length === 0) {
		let objError  = {
			errorsMessages: [
			  {
				message: "incorect iput value",
				field: "author"
			  }
			]
		  }
		res.status(HTTP_STATUS.BAD_REQUEST_400).json(objError)
		return 
	}
	if(Array.isArray(req.body.availableResolutions) && req.body.availableResolutions.length !==0) {
		let objError  = {
			errorsMessages: [
			  {
				message: "incorect iput value",
				field: "availableResolutions"
			  }
			]
		  }
		const availableResolutions  = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]
		for(let i = 0; i < req.body.availableResolutions.length; i++) {
			if(!availableResolutions.includes(req.body.availableResolutions[i])) {
				res.status(HTTP_STATUS.BAD_REQUEST_400).json(objError)
				return 
			}
		}
	}
	
	  if(req.body.title.length <= 40 && req.body.author.length <= 20) {
		const newVideos: newVideosType = {
			id: Number(new Date()),
			title: req.body.title,
			author: req.body.author,
			canBeDownloaded: true,
			minAgeRestriction: 5,
			createdAt: "2023-09-13T19:56:25.759Z",
			publicationDate: "2023-09-13T19:56:25.759Z",
			availableResolutions: req.body.availableResolutions,
	  }
		videos.push(newVideos)
		res.status(HTTP_STATUS.CREATED_201).json(videos)
	}
})

/******************************* GET{id} ****************************************/

app.get('/videos/:id/', function(req: Request, res: Response) {
	const foundVideos = videos.find(function(v) {
		return v.id === Number(req.params.id)
	})
	if(!foundVideos) {
		res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
		return
	}
	res.status(HTTP_STATUS.OK_200)
	res.json(foundVideos)
})

/******************************* PUT ****************************************/

app.put('/videos/:id/', function(req: Request, res: Response) {
	// if(!req.body.title) {
	// 	let result = {
	// 		errorsMessages: [
	// 		  {
	// 			message: 'If the inputModel has incorrect values',
	// 			field: "string"
	// 		  }
	// 		]
	// 	  }
	// 	res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	// 	res.json(result.errorsMessages[0].message)
	// 	return
	// }
	
	let foundVideos: any = videos.find(function(v) {
		return v.id === Number(req.params.id)
	})
	// if(!foundVideos) {
	// 	res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
	// 	return
	// }

	foundVideos.title = req.body.title
	foundVideos.author = req.body.author
	foundVideos.canBeDownloaded = req.body.canBeDownloaded
	foundVideos.minAgeRestriction = req.body.minAgeRestriction
	foundVideos.publicationDate = req.body.publicationDate

	res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})

/******************************* DELETE{id} ****************************************/

app.delete('/videos/:id/', function(req: Request, res: Response) {
	const video = videos.find(function(v) {
		return v.id === +req.params.id
	})
	if(!video) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		return
	}

	for(let i = 0; i < videos.length; i++) {
		if(videos[i].id === Number(req.params.id)) {
			videos.splice(i, 1)
			return;
		}
	}
	return res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})

app.listen(PORT, function() {console.log(`Server was started at port ${PORT}`)})