import * as categoryService from "../services/category.service.js";

export const createCategory = async (req, res) => {
  try {
    const response = await categoryService.createCategory(req.body.name);
    res.status(201).json(response);
  } catch (error) {
    res.json({ error });
  }
};

export const getCategories = async (req, res) => {
  try {
    const response = await categoryService.getCategories();
    res.status(200).json(response);
  } catch (error) {
    res.json({ error });
  }
};

export const deleteOneCategory = async (req, res) => {
  try {
    const response = await categoryService.deleteOneCategory(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.json({ error });
  }
};
