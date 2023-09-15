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
let objError = {
    errorsMessages: [
        {
            message: "incorect iput value",
            field: "author"
        }
    ]
};
/****************************** DELETE **************************************/
exports.app.delete('/', function (req, res) {
    let result = db_1.videos.splice(0, db_1.videos.length - 1);
    res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
});
/******************************* GET ****************************************/
exports.app.get('/', function (req, res) {
    res.json(db_1.videos);
});
/******************************* POST ****************************************/
exports.app.post('/videos', function (req, res) {
    const titleList = req.body.title;
    if (!titleList || typeof titleList !== 'string' || titleList.length === 0 || !titleList.trim()) {
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json({
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "title"
                }
            ]
        });
        return;
    }
    const authorList = req.body.author;
    if (!authorList || typeof authorList !== 'string' || authorList.length === 0 || !authorList.trim()) {
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json({
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "author"
                }
            ]
        });
        return;
    }
    const avalilabeRes = req.body.availableResolutions;
    if (Array.isArray(avalilabeRes) && avalilabeRes.length !== 0) {
        const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
        for (let i = 0; i < avalilabeRes.length; i++) {
            if (!availableResolutions.includes(avalilabeRes[i])) {
                res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json({
                    errorsMessages: [
                        {
                            message: "incorect iput value",
                            field: "titavailableResolutionsle"
                        }
                    ]
                });
                return;
            }
        }
    }
    if (titleList.length <= 40 && authorList.length <= 20) {
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
    if (!req.body.title || typeof req.body.title !== 'string' || req.body.title === 0 || !req.body.title.trim()) {
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json({
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "title"
                }
            ]
        });
        return;
    }
    if (!req.body.author || typeof req.body.author !== 'string' || req.body.author.length !== 0 || !req.body.author.trim()) {
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json({
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "author"
                }
            ]
        });
        return;
    }
    if (Array.isArray(req.body.availableResolutions) && req.body.availableResolutions !== 0) {
        const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
        for (let i = 0; i < req.body.availableResolutions; i++) {
            if (!availableResolutions.includes(req.body.availableResolutions[i])) {
                res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json({
                    errorsMessages: [
                        {
                            message: "incorect iput value",
                            field: "availableResolutions"
                        }
                    ]
                });
                return;
            }
        }
    }
    if (!req.body.canBeDownloaded || typeof req.body.canBeDownloaded !== 'boolean') {
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json({
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "canBeDownloaded"
                }
            ]
        });
        return;
    }
    if (!req.body.minAgeRestriction || typeof req.body.minAgeRestriction !== 'number' || req.body.minAgeRestriction !== 18) {
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json({
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "minAgeRestriction"
                }
            ]
        });
        return;
    }
    if (!req.body.publicationDate || typeof req.body.publicationDate !== 'string' || req.body.publicationDate.length === 0 || req.body.publicationDate !== "2023-09-15T06:42:08.275Z" || !req.body.publicationDate.trim()) {
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).json({
            errorsMessages: [
                {
                    message: "incorect iput value",
                    field: "publicationDate"
                }
            ]
        });
        return;
    }
    let foundVideos = db_1.videos.find(function (v) {
        return v.id === Number(req.params.id);
    });
    if (!foundVideos) {
        res.status(utils_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    foundVideos.title = req.body.title;
    foundVideos.author = req.body.author;
    foundVideos.canBeDownloaded = req.body.canBeDownloaded;
    foundVideos.minAgeRestriction = req.body.minAgeRestriction;
    foundVideos.publicationDate = req.body.publicationDate;
    res.status(utils_1.HTTP_STATUS.NO_CONTENT_204);
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
