const { Router } = require('express');
const { getAllInventorys, createInventory, updateInventory, deleteInventory, getInventoryById,updateInventoryQuantities,getInventoryByIds } = require('../controllers/inventoryController');

const router = Router();

router.get('/inventorys', getAllInventorys);
router.post('/inventorys', createInventory);
router.delete('/inventorys/:id', deleteInventory);
router.get('/inventorys/by-ids/', getInventoryByIds);
router.get('/inventorys/:id', getInventoryById);
router.put('/inventorys/update-quantities', updateInventoryQuantities);
router.put('/inventorys/:id', updateInventory);

module.exports = router;
