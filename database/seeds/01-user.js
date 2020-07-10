
exports.seed = function(knex) {
  return knex('user').insert([
    {username: 'random', password: 'random', department: 'IT'},
    {username: 'jimmy', password: 'john', department: 'HR'}
  ])
}
