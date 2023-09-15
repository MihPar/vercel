import express, {  Request, Response} from 'express'
import {videos, videosType} from './db/db'
import { readSync } from 'fs'
import { HTTP_STATUS } from './utils'

type ValidationErrorType = {
	message: string,
	field: string
}
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

// type newObj = {
// 	message: string,
// 	field: string
// }
// type obj = {
// 	// errorsMessages: Array<newObj>
// 	errorsMessages: newObj[]
// }
// let objError: obj = {
// 	errorsMessages: [
// 	  {
// 		message: "incorect iput value",
// 		field: "author"
// 	  }
// 	]
//   }

/****************************** DELETE **************************************/

app.delete('/testing/all-data', function(req: Request, res: Response) {
	let deleteVidios = videos.splice(0, videos.length);
	return res.status(HTTP_STATUS.NO_CONTENT_204).send(deleteVidios)
})

/******************************* GET ****************************************/
app.get('/videos', function(req: Request, res: Response) {
	return res.status(HTTP_STATUS.OK_200).send(videos)
})

/******************************* POST ****************************************/

app.post('/videos', function(req: Request, res: Response) {
	const errorsMessages: ValidationErrorType[] = []
	const titleList: string = req.body.title
	if(!titleList || typeof titleList !== 'string' || titleList.length === 0 || !titleList.trim() || titleList.length > 40) {
		errorsMessages.push({
			message: "incorect iput value",
			field: "title"
		  })
	}

	const authorList: string = req.body.author
	if(!authorList || typeof authorList !== 'string' || authorList.length === 0 || !authorList.trim() || authorList.length > 20) {
		errorsMessages.push({
			message: "incorect iput value",
			field: "author"
		  })
	}

	const avalilabeRes: Array<string> = req.body.availableResolutions
	if(Array.isArray(avalilabeRes) && avalilabeRes.length !== 0) {
		
		const availableResolutions  = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]
		for(let i = 0; i < avalilabeRes.length; i++) {
			if(!availableResolutions.includes(avalilabeRes[i])) {
				errorsMessages.push({
					message: "incorect iput value",
					field: "availableResolutions"
				  })
			}
		}
	}
	
	  const date = new Date()
		const newVideos: videosType = {
			id: Number(date),
			title: req.body.title,
			author: req.body.author,
			canBeDownloaded: false,
			minAgeRestriction: null,
			createdAt: date.toISOString(),
			publicationDate: new Date((date.setDate(date.getDate() + 1))).toISOString(),
			availableResolutions: req.body.availableResolutions,
	  }
		videos.push(newVideos)
	return res.status(HTTP_STATUS.CREATED_201).send(newVideos);
})

/******************************* GET{id} ****************************************/

app.get('/videos/:id/', function(req: Request, res: Response) {
	const foundVideos = videos.find(function(v) {
		return v.id === Number(req.params.id)
	})
	if(!foundVideos) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		return
	}
	//res.sendStatus(505) только статус
	return res.status(HTTP_STATUS.OK_200).send(foundVideos) // статус + {}
})

/******************************* PUT{id} ****************************************/

app.put('/videos/:id/', function(req: Request, res: Response) {
	const title = req.body.title
	const author = req.body.author
	const errorsMessages: ValidationErrorType[] = []
	if(!title || typeof title !== 'string' || (title.length === 0 || title.length > 40) || !title.trim()) {
		errorsMessages.push({
			message: "incorect iput value",
			field: "title"
		  })
	}
	
	
	if(!req.body.author || typeof req.body.author !== 'string' || req.body.author.length === 0 || req.body.author.length > 20 || !req.body.author.trim()) {
		errorsMessages.push({
			message: "incorect iput value",
			field: "author"
		  })
	}

	if(Array.isArray(req.body.availableResolutions) && req.body.availableResolutions !== 0) {
		const availableResolutions  = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]
		for(let i = 0; i < req.body.availableResolutions; i++) {
			if(!availableResolutions.includes(req.body.availableResolutions[i])) {
				errorsMessages.push({
					message: "incorect iput value",
					field: "availableResolutions"
				  })
			}
		}
	}
	
	if(!req.body.canBeDownloaded || typeof req.body.canBeDownloaded !== 'boolean') {
		errorsMessages.push({
			message: "incorect iput value",
			field: "canBeDownloaded"
		  })
	}

	if(!req.body.minAgeRestriction || typeof req.body.minAgeRestriction !== 'number' || req.body.minAgeRestriction > 18 || req.body.minAgeRestriction < 1) {
		errorsMessages.push({
			message: "incorect iput value",
			field: "minAgeRestriction"
		  })
	}

	if(!req.body.publicationDate || typeof req.body.publicationDate !== 'string' || req.body.publicationDate.length === 0 || !req.body.publicationDate.trim()) {
		errorsMessages.push({
			message: "incorect iput value",
			field: "publicationDate"
		  })
	}

	if(errorsMessages.length) return res.status(HTTP_STATUS.BAD_REQUEST_400).json({errorsMessages})
	
	
	let foundVideos: videosType | undefined = videos.find(function(v) {
		return v.id === Number(req.params.id)
	})
	if(!foundVideos) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		return
	}

	foundVideos.title = req.body.title
	foundVideos.author = req.body.author
	foundVideos.canBeDownloaded = req.body.canBeDownloaded
	foundVideos.availableResolutions = req.body.availableResolutions
	foundVideos.minAgeRestriction = req.body.minAgeRestriction
	foundVideos.publicationDate = req.body.publicationDate

	return res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
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