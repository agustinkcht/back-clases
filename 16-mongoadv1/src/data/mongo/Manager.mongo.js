
class Manager {
    constructor(Model) {
        this.Model = Model
        // le digo a mi instancia de clase que cree la prop model en base al model que le paso.
    }
    async create(data) {
        try {
            const one = await this.Model.create(data);
            return one;
        } catch(error) {
            throw error;
        };
    };
    async read(cat) {
        try {
            const all = await this.Model.find()
            //.populate('user_id', '-_id email photo');
            return all;
        } catch(error) {
            throw error;
        };
    };
    async readOne(id) {
        try {
            const one = await this.Model.findOne({ _id: id});
            return one;
        } catch(error) {
            throw error;
        };
    };
    async update(id, data) {
        try {
            const one = await this.Model.findByIdAndUpdate(id, data, { new: true });
            return one;
        } catch(error) {
            throw error;
        };
    };
    async destroy(id) {
        try {
            const one = await this.Model.findByIdAndDelete(id);
            return one;
        } catch(error) {
            throw error;
        };
    };
};

export default Manager;

// en este archivo construyo/genero un manager genérico que depende de un Model para funcionar