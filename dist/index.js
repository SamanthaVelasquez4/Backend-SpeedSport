"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./utils/database");
const empresas_router_1 = __importDefault(require("./routers/empresas.router"));
const productos_routers_1 = __importDefault(require("./routers/productos.routers"));
const motoristas_router_1 = __importDefault(require("./routers/motoristas.router"));
const clientes_router_1 = __importDefault(require("./routers/clientes.router"));
const app = (0, express_1.default)();
const db = new database_1.Database();
app.use(express_1.default.json({ limit: '10mb' }));
app.use((0, cors_1.default)());
//rutas
app.use("/empresas", empresas_router_1.default);
app.use('/productos', productos_routers_1.default);
app.use('/motoristas', motoristas_router_1.default);
app.use('/clientes', clientes_router_1.default);
app.get("/", (req, res) => {
    res.send("Servidor de prueba para Sport Spot");
    res.end();
});
app.listen(5555, () => {
    console.log("Servidor levantado en el puerto 5555");
});
