import { Router } from 'restify-router';
import { hypermedia } from '../utils/hypermedia';
const router = new Router();

// ATT:: get from database
const warehouses: object = {
	main_id: {
		name: 'Main Webshop Warehouse',
		location: 'main',
	},
	remote_id: {
		name: 'Remote Webshop Warehouse',
		location: 'remote',
	},
};

router.get({ name: 'warehouses', path: '/all' }, (req, res) => {
	res.send({
		main: hypermedia('warehouse', { id: 'main_id' }),
		remote: hypermedia('warehouse', { id: 'remote_id' }),
	});
});

router.get({ name: 'warehouse', path: '/:id' }, (req, res) => {
	const id: string = req.params?.id;

	// logic based on query params

	res.send({
		...warehouses[id],
		_links: {
			warehouses: hypermedia('warehouses'),
			products: hypermedia('warehouse-products', { warehouse: id }),
		},
	});
});

export default router;
