"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        // Cadena de conexión
        mongoose_1.default.connect(`mongodb+srv://samvel200355:samvel200355@cluster0.tmaxqwh.mongodb.net/SpeedSport`)
            .then(() => {
            console.log('Se conectó a Mongo');
        }).catch((error) => {
            console.error('Ocurrió un error al conectarse', error);
        });
    }
}
exports.Database = Database;
