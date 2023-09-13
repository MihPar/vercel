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
const utits_1 = require("./utits");
const PORT = process.env.PORT || 4000;
exports.app.use(express_1.default.json());
exports.app.get('/', function (req, res) {
    res.json(db_1.videos);
});
exports.app.post('/videos', function (req, res) {
    const newVideos = {
        id: Number(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: 5,
        createdAt: "2023-09-13T19:56:25.759Z",
        publicationDate: "2023-09-13T19:56:25.759Z",
        availableResolutions: ["P144"],
    };
    db_1.videos.push(newVideos);
    res.status(utits_1.HTTP_STATUS.CREATED_201).json(db_1.videos);
});
exports.app.listen(PORT, function () { console.log(`Server was started at port ${PORT}`); });
