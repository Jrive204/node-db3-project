const db = require('../data/db.config');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  findById,
  addStep,
  update,
  remove
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id });
}

function findSteps(id) {
  return db('steps')
    .join('schemes', 'schemes.id', 'steps.scheme_id')
    .select(
      'schemes.id',
      'schemes.scheme_name',
      'steps.step_number',
      'steps.instructions'
    )
    .orderBy('steps.step_number')
    .where('scheme_id', id);
}

function add(scheme) {
  return db('schemes').insert(scheme);
}

function addStep(step, id) {
  return db('steps').insert({ ...step, scheme_id: id });
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('schemes')
    .where({ id })
    .del();
}
