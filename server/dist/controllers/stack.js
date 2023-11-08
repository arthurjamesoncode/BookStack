"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStack = exports.getAllStacks = void 0;
const models_1 = require("../models");
function getAllStacks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stacks = yield models_1.Stack.findMany();
            res.status(200).send(stacks);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.getAllStacks = getAllStacks;
function addStack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stackData = req.body;
            const newStack = yield models_1.Stack.create({ data: stackData });
            res.status(201).send(newStack);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.addStack = addStack;
