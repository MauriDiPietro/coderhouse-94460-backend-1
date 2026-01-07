import { UserModel } from "../models/user-model.js";

class UserManager {
  constructor(model) {
    this.model = model;
  }

  getAll = async () => {
    try {
      await this.model.find({});
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      // const { executionStats } = await this.model.findById(id).explain();
      // return executionStats;
      return await this.model.findById(id).populate("mascotas");  //.populate("nombre de la propiedad a rellenar")
    } catch (error) {
      throw new Error(error);
    }
  };

  getByName = async (name) => {
    try {
      const response = await this.model.findOne({ first_name: name }).explain();
      return response.executionStats;
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (body) => {
    try {
      return await this.model.create(body);
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, body) => {
    try {
      return await this.model.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  addPetToUser = async (userId, petId) => {
    try {
      return await this.model.findByIdAndUpdate(
        userId,
        { $push: { mascotas: petId } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  aggregation = async () => {
    try {
      return await this.model.aggregate([
        // {
        //   $match: {
        //     age: { $gte: 18 }
        //   }
        // },
        {
          $group: {
            _id: "$gender",
            // promedio_edad: { $avg: "$age" },
            cantidad: { $sum: 1 }
          }
        },
        {
          $sort: { cantidad: -1 }
        }
      ]) 
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const userManager = new UserManager(UserModel);
