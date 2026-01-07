import { userManager } from "../managers/user-manager.js";
import { createUsers } from "../utils/user-utils.js";

class UserControllers {
  constructor(manager) {
    this.manager = manager;
  }

  getAll = async (req, res) => {
    try {
      const response = await this.manager.getAll();
      res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await this.manager.getById(id);
      if (!response) throw new Error("Usuario no encontrado");
      return res.json(response);
    } catch (error) {
      console.log(error)
      res.status(400).json(error);
    }
  };

  getByName = async (req, res) => {
    try {
      const { name } = req.query;
      const response = await this.manager.getByName(name);
      if (!response) throw new Error("Usuario no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  create = async (req, res) => {
    try {
      const response = await this.manager.create(req.body);
      res.json(response);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await this.manager.update(id, req.body);
      if (!response) throw new Error("Usuario no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await this.manager.delete(id);
      if (!response) throw new Error("Usuario no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  createManyUsers = async (req, res) => {
    try {
      const data = createUsers();
      const response = await this.manager.create(data);
      res.json({ message: `${response.length} usuarios creados` });
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  addPetToUser = async (req, res) => {
    try {
      const { userId, petId } = req.params;
      const response = await this.manager.addPetToUser(userId, petId);
      if (!response) throw new Error("Usuario no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  aggregation = async (req, res) => {
    try {
      const response = await this.manager.aggregation();
      res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

export const userControllers = new UserControllers(userManager);
