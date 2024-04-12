const {
  createInventoryModel,
  deleteInventoryModel,
  getAllInventorysModel,
  updateInventoryModel,
  getInventoryByIdModel,
  updateInventoryQuantitiesModel,
  getTotalInventoryCountModel
} = require("../models/inventoryModel");

module.exports = {
  getAllInventorys: async (req, res) => {
    try {
      const inventorys = await getAllInventorysModel();
      res.json(inventorys);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createInventory: async (req, res) => {
    const inventoryData = req.body;
    try {
      const db = await createInventoryModel(inventoryData);
      res.json(db[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateInventory: async (req, res) => {
    const id = parseInt(req.params.id);
    const inventoryData = req.body;
    try {
      await updateInventoryModel(id, inventoryData);
      const updatedInventory = { id: id, ...inventoryData };
      res.json(updatedInventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteInventory: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const changes = await deleteInventoryModel(id);
      res.json({
        message: "Inventário excluído com sucesso.",
        rowsAffected: changes,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getInventoryById: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const inventory = await getInventoryByIdModel(id);
      if (!inventory) {
        return res.status(404).json({ message: "Inventário não encontrado" });
      }
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateInventoryQuantities: async (req, res) => {
    try {
      await updateInventoryQuantitiesModel(req.body);
      res
        .status(200)
        .json({ message: "Quantidades de inventário atualizadas com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar quantidades de inventário:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  getInventoryByIds: async (req, res) => {
    try {
      const ids = req.query.ids.split(",").map((id) => parseInt(id.trim()));
      const inventories = await Promise.all(
        ids.map(async (id) => {
          const inventory = await getInventoryByIdModel(id);
          return inventory;
        })
      );

      res.json(inventories);
    } catch (error) {
      console.error("Erro ao obter inventários por IDs:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  getTotalInventoryCount: async (req, res) => {
    try {
      const totalInventoryCount = await getTotalInventoryCountModel();
      res.json({ totalInventoryCount });
    } catch (error) {
      console.error('Erro ao obter o total de inventários:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};
