"use strict";
// import { app } from './settings'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const port = process.env.PORT || 3999
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.json('Hello samuray');
});
app.listen(PORT, function () { console.log(`Server was started at port ${PORT}`); });
