import * as categoryDao from "../daos/category.dao.js";

export const createCategory = async (name) => {
  return await categoryDao.createCategory(name);
};

export const getCategories = async () => {
  return await categoryDao.getCategories();
};

export const deleteOneCategory = async (id) => {
  return await categoryDao.deleteOneCategory(id);
};
