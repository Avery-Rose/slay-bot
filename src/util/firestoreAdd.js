const admin = require('firebase-admin');
const chalk = require('chalk');

const db = admin.firestore();
const firestoreAdd = (collection, doc, data) => {
  db.collection(collection)
    .doc(doc)
    .set(data)
    .then(() => {
      console.log(
        `🔥: ${chalk.green('Saved')} ${chalk.yellow(doc)} to ${chalk.yellow(
          collection
        )}`
      );
    })
    .catch((err) => {
      console.log(
        `🔥: ${chalk.red('Error saving')} ${chalk.yellow(
          doc
        )} to ${chalk.yellow(collection)}: ${err}`
      );
    });
};

module.exports = firestoreAdd;
