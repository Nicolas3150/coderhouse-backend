class BaseService {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    return await this.dao.getAll();
  };

  getById = async (id) => {
    return await this.dao.getById(id);
  };

  update = async (id, item) => {
    return await this.dao.update(id, item);
  };

  delete = async (id) => {
    return await this.dao.delete(id);
  };
}

export default BaseService;
