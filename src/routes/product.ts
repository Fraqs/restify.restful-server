import { Router } from 'restify-router';
import { hypermedia } from '../utils/hypermedia';
const router = new Router();

// ATT:: get from database
const products: object = {
	product_a: {
		name: 'super product',
		price: 13,
		warehouse: 'main_id',
	},

	product_b: {
		name: 'Coffee',
		price: 24,
		warehouse: 'main_id',
	},

	product_c: {
		name: 'toilet paper',
		price: 100,
		warehouse: 'remote_id',
	},
};

router.get({ name: 'products', path: '/all' }, (req, res) => {
	const productsList = Object.entries(products).map(([key, product]) => {
		return {
			name: product.name,
			price: product.price,
			_links: {
				product: hypermedia('product', { id: key }),
				warehouse: hypermedia('warehouse', { id: product.warehouse }),
			},
		};
	});

	res.send(productsList);
});

router.get({ name: 'product', path: '/:id' }, (req, res) => {
	const id: string = req.params?.id;
	const product: any = products[id];

	res.send({
		name: product.name,
		price: product.price,
		_links: {
			warehouse: hypermedia('warehouse', { id: product.warehouse }),
			products: hypermedia('products', { id: product.warehouse }),
		},
	});
});

router.get({ name: 'warehouse-products', path: '/warehouse/:warehouse' }, (req, res) => {
	const warehouse: string = req.params?.warehouse;

	const filteredProducts: any[] = Object.entries(products).filter(([key, product]) => product.warehouse == warehouse);

	const productsList = Object.entries(filteredProducts).map(([_, [key, product]]) => {
		console.log('key', key);
		console.log('product', product);

		return {
			name: product.name,
			price: product.price,
			_links: {
				product: hypermedia('product', { id: key }),
				warehouse: hypermedia('warehouse', { id: product.warehouse }),
			},
		};
	});

	res.send(productsList);
});

export default router;
