const db = require('../database/db-config.js')

function find() {
  return db('user').select('id', 'username', 'password')
}

function findBy(filter) {
  return db('user').where(filter)
}

async function add(user) {
  const [id] = await db('user').insert(user)
  return findById(id)
}

function findById(id) {
  return db('user')
    .where({ id })
    .first()
}

function update(changes, id){
  return db('user')
  .where({ id: id })
  .update(changes, id)
}

function remove(id){
  return db('user')
  .where('id', id)
  .del()
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
}