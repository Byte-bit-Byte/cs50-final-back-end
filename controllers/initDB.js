const initializeDatabase = (db, weeks) => {
  db.schema.dropTableIfExists('weeksData');
  db.schema.createTable('weeksData', function (table) {
    // table.increments();
    table.string('id');
    table.string('name');
    table.string('binary');
    table.string('english');
    table.string('comment');
  });
  db.insert({
    id: "1",
    name: "test name",
    binary: "test binary",
    english: "test english",
    comment: "test comment"
  })
  .into('weeksData');  
  // db.select('*').from('weeksData')
  //   .then(user => {
  //     console.log(user);
  //   })
  //   .catch(err => console.log(err))
}

module.exports = {
  initializeDatabase
}