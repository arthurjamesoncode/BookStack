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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUsers = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield models_1.User.findMany();
            res.status(200).send(users);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.getAllUsers = getAllUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const existingUser = yield models_1.User.findFirst({ where: { username } });
            if (existingUser)
                return res.status(400).send('User Exists');
            const salt = yield bcrypt_1.default.genSalt();
            const passwordHash = yield bcrypt_1.default.hash(password, salt);
            const newUser = yield models_1.User.create({
                data: {
                    username,
                    passwordHash,
                    stacks: {
                        createMany: {
                            data: [
                                { title: 'Currently Reading', type: 'current' },
                                { title: 'To Read', type: 'tbr' },
                                { title: 'Finished', type: 'finished' }
                            ],
                        },
                    },
                },
            });
            res.status(201).send(newUser);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
exports.createUser = createUser;
