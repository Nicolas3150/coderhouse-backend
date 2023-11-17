class BaseRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async (req, res) => {
    res.json(await this.dao.getAll());
  };

  // create = async (newItem) => {
  //   return await this.dao.create(newItem);
  // };

  getById = async (req, res) => {
    res.json(await this.dao.getById(req.params.id));
  };

  update = async (req, res) => {
    await this.dao.update(req.params.id, req.body);
    res.sendStatus(200);
  };

  delete = async (req, res) => {
    await this.dao.delete(req.params.id);
    res.sendStatus(200);
  };
}

export default BaseRepository;
