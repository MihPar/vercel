"use strict";
// import { app } from './settings'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// const port = process.env.PORT || 3999
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const db_1 = require("./db/db");
const utils_1 = require("./utils");
const PORT = process.env.PORT || 4000;
exports.app.use(express_1.default.json());
/******************************* GET ****************************************/
exports.app.get('/videos', function (req, res) {
    res.json(db_1.videos);
});
/******************************* POST ****************************************/
exports.app.post('/videos', function (req, res) {
    if (!req.body.title || typeof req.body.title !== 'string' || req.body.title.length === 0) {
        let objError = {
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "title"
                }
            ]
        };
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json(objError);
        return;
    }
    if (!req.body.author || typeof req.body.author !== 'string' || req.body.author.length === 0) {
        let objError = {
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "author"
                }
            ]
        };
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json(objError);
        return;
    }
    if (Array.isArray(req.body.availableResolutions) && req.body.availableResolutions.length !== 0) {
        let objError = {
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "availableResolutions"
                }
            ]
        };
        const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
        for (let i = 0; i < req.body.availableResolutions.length; i++) {
            if (!availableResolutions.includes(req.body.availableResolutions[i])) {
                res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json(objError);
                return;
            }
        }
    }
    if (req.body.title.length <= 40 && req.body.author.length <= 20) {
        const newVideos = {
            id: Number(new Date()),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: true,
            minAgeRestriction: 5,
            createdAt: "2023-09-13T19:56:25.759Z",
            publicationDate: "2023-09-13T19:56:25.759Z",
            availableResolutions: req.body.availableResolutions,
        };
        db_1.videos.push(newVideos);
        res.status(utils_1.HTTP_STATUS.CREATED_201).json(db_1.videos);
    }
});
/******************************* GET{id} ****************************************/
exports.app.get('/videos/:id/', function (req, res) {
    const foundVideos = db_1.videos.find(function (v) {
        return v.id === Number(req.params.id);
    });
    if (!foundVideos) {
        res.sendStatus(utils_1.HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    res.status(utils_1.HTTP_STATUS.OK_200);
    res.json(foundVideos);
});
/******************************* PUT ****************************************/
exports.app.put('/videos/:id/', function (req, res) {
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
    let foundVideos = db_1.videos.find(function (v) {
        return v.id === Number(req.params.id);
    });
    // if(!foundVideos) {
    // 	res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
    // 	return
    // }
    foundVideos.title = req.body.title;
    foundVideos.author = req.body.author;
    foundVideos.canBeDownloaded = req.body.canBeDownloaded;
    foundVideos.minAgeRestriction = req.body.minAgeRestriction;
    foundVideos.publicationDate = req.body.publicationDate;
    res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
});
/******************************* DELETE{id} ****************************************/
exports.app.delete('/videos/:id/', function (req, res) {
    const video = db_1.videos.find(function (v) {
        return v.id === +req.params.id;
    });
    if (!video) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    for (let i = 0; i < db_1.videos.length; i++) {
        if (db_1.videos[i].id === Number(req.params.id)) {
            db_1.videos.splice(i, 1);
            return;
        }
    }
    return res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
});
exports.app.listen(PORT, function () { console.log(`Server was started at port ${PORT}`); });
