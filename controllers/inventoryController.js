
const { createInventoryModel, deleteInventoryModel, getAllInventorysModel, updateInventoryModel, getInventoryByIdModel  } = require('../models/inventoryModel');

exports.getAllInventorys = async (req, res) => {
    try {
        const inventorys = await getAllInventorysModel();
        res.json(inventorys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createInventory = async (req, res) => {
    const inventoryData = req.body;
    try {
        const id = await createInventoryModel(inventoryData);
        const newInventory = { id: id || 0, ...inventoryData };
        res.json(newInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInventory = async (req, res) => {
    const id = parseInt(req.params.id);
    const inventoryData = req.body;
    try {
        await updateInventoryModel(id, inventoryData);
        const updatedInventory = { id: id, ...inventoryData };
        res.json(updatedInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteInventory = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const changes = await deleteInventoryModel(id);
        res.json({ message: 'Inventário excluído com sucesso.', rowsAffected: changes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getInventoryById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const inventory = await getInventoryByIdModel(id);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventário não encontrado' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};