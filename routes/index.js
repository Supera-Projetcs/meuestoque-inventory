const { Router } = require('express');
const { getAllInventorys, createInventory, updateInventory, deleteInventory, getInventoryById } = require('../controllers/inventoryController');

const router = Router();

router.get('/inventorys', getAllInventorys);
router.get('/inventorys/:id', getInventoryById);
router.post('/inventorys', createInventory);
router.put('/inventorys/:id', updateInventory);
router.delete('/inventorys/:id', deleteInventory);

module.exports = router;
