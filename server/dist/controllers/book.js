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
exports.editBook = exports.getBooksInStack = exports.addBookToStack = exports.getAllBooks = void 0;
const models_1 = require("../models");
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield models_1.Book.findMany();
            res.status(200).send(books);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.getAllBooks = getAllBooks;
function addBookToStack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stackId = Number(req.params.stackId);
            const bookData = req.body;
            const newBook = yield models_1.Book.create({
                data: Object.assign(Object.assign({}, bookData), { stacks: { create: { stackId } } }),
            });
            res.status(201).send(newBook);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.addBookToStack = addBookToStack;
function getBooksInStack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stackId = Number(req.params.stackId);
            const books = yield models_1.Book.findMany({
                where: {
                    stacks: {
                        some: {
                            stackId,
                        },
                    },
                },
            });
            res.status(200).send(books);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.getBooksInStack = getBooksInStack;
function editBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = Number(req.params.bookId);
            console.log(bookId);
            const bookData = req.body;
            const book = yield models_1.Book.update({ where: { id: bookId }, data: bookData });
            res.status(200).send(book);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.editBook = editBook;
