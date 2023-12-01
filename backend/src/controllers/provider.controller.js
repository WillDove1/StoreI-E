import Provider from '../models/provider.models.js';

export const getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ['Error al obtener los proveedores'] });
    }
}

export const createProvider = async (req, res) => {
    try {
        const { productName, price, name } = req.body;
        const newProvider = new Provider({
            productName,
            price,
            name,
        });
        const savedProvider = await newProvider.save();
        res.json(savedProvider);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ['Error al crear un proveedor'] });
    }
}

export const getProvider = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider)
            return res.status(404).json({ error: ['Proveedor no encontrado'] });
        res.json(provider);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ['Error al obtener el proveedor'] });
    }
}

export const deleteProvider = async (req, res) => {
    try {
        const deletedProvider = await Provider.findByIdAndDelete(req.params.id);
        if (!deletedProvider)
            return res.status(404).json({ error: ['Error al eliminar el proveedor'] });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ['Error al eliminar el proveedor'] });
    }
}

export const editProvider = async (req, res) => {
    try {
        const updatedProvider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProvider)
            return res.status(404).json({ error: ['Proveedor no encontrado'] });
        res.json(updatedProvider);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: ['Error al actualizar el proveedor'] });
    }
}
