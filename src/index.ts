import warehouseRoute from './routes/warehouse';
import productRoute from './routes/product';
import server from './server';

// ATT:: to .evn
const PORT: number = 8080;

warehouseRoute.applyRoutes(server, '/warehouse');
productRoute.applyRoutes(server, '/product');

server.listen(PORT, () => console.log(`listening @ http://localhost:${PORT}`));
