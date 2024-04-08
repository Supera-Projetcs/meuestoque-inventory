const db = require("../db");

module.exports = {
  getAllInventorysModel: async () => {
    try {
      return await db("inventory").select("*").orderBy("id", "desc");
    } catch (error) {
      console.error("Erro ao obter inventário:", error);
      throw error;
    }
  },

  createInventoryModel: async (inventoryData) => {
    try {
      return await db("inventory").insert(inventoryData).returning("*");
    } catch (error) {
      console.error("Erro ao criar inventário:", error);
      throw error;
    }
  },

  updateInventoryModel: async (id, inventoryData) => {
    try {
      return await db("inventory").where({ id }).update(inventoryData);
    } catch (error) {
      console.error("Erro ao atualizar inventário:", error);
      throw error;
    }
  },

  deleteInventoryModel: async (id) => {
    try {
      return await db("inventory").where({ id }).del();
    } catch (error) {
      console.error("Erro ao excluir inventário:", error);
      throw error;
    }
  },

  getInventoryByIdModel: async (id) => {
    try {
      const [inventory] = await db("inventory").select("*").where({ id });
      return inventory;
    } catch (error) {
      throw error;
    }
  },

  updateInventoryQuantitiesModel: async (inventoryUpdates) => {
    try {
      await Promise.all(
        inventoryUpdates.map(async (update) => {
          const { id, quantity } = update;

          if (quantity < 0) {
            const currentQuantity = await db("inventory")
              .select("quantity")
              .where("id", id)
              .first();

            if (currentQuantity + quantity < 0)
              throw new Error(
                "Não é possível atualizar a quantidade para um valor negativo"
              );
          }

          await db("inventory").where("id", id).increment("quantity", quantity);
        })
      );
    } catch (error) {
      console.error("Erro ao atualizar quantidades de inventário:", error);
      throw error;
    }
  },
};
