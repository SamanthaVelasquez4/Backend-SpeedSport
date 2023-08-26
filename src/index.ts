import express, {Request, Response, Express} from 'express'
import cors from 'cors'
import { Database } from './utils/database';
import empresasRouter from './routers/empresas.router';
import productosRouter from './routers/productos.routers';
import motoristasRouter from './routers/motoristas.router';
import clientesRouter from './routers/clientes.router';
import pedidosRouter from './routers/pedidos.router';
import facturasRouter from './routers/facturas.router'

const app: Express = express();
const db: Database = new Database();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

//rutas
app.use("/empresas", empresasRouter);
app.use('/productos', productosRouter);
app.use('/motoristas', motoristasRouter);
app.use('/clientes', clientesRouter);
app.use('/pedidos', pedidosRouter);
app.use('/facturas', facturasRouter);


app.get("/", (req:Request, res: Response) => {
    res.send("Servidor de prueba para Sport Spot");
    res.end();
});
  
app.listen(5555, () => {
    console.log("Servidor levantado en el puerto 5555");
})