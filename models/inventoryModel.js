const db = require('../db');

module.exports = {
    getAllInventorysModel: async () => {
        try {
            return await db('inventory').select('*');
        } catch (error) {
            console.error('Erro ao obter inventário:', error);
            throw error;
        }
    },

    createInventoryModel: async (inventoryData) => {
        try {
            return await db('inventory').insert(inventoryData).returning('id');
        } catch (error) {
            console.error('Erro ao criar inventário:', error);
            throw error;
        }
    },

    updateInventoryModel: async (id, inventoryData) => {
        try {
            return await db('inventory').where({ id }).update(inventoryData);
        } catch (error) {
            console.error('Erro ao atualizar inventário:', error);
            throw error;
        }
    },

    deleteInventoryModel: async (id) => {
        try {
            return await db('inventory').where({ id }).del();
        } catch (error) {
            console.error('Erro ao excluir inventário:', error);
            throw error;
        }
    },
    
    getInventoryByIdModel: async (id) => {
        try {
            const [inventory] = await db('inventory').select('*').where({ id });
            return inventory;
        } catch (error) {
            throw error;
        }
    }
};
