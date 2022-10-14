const admin = require('firebase-admin');
const chalk = require('chalk');

const db = admin.firestore();
const firestoreDelete = (collection, document) => {
  db.collection(collection)
    .doc(document)
    .delete()
    .then(() => {
      console.log(
        `🔥: ${chalk.green('Deleted')} ${chalk.yellow(
          document
        )} from ${chalk.yellow(collection)}`
      );
    })
    .catch((err) => {
      console.log(
        `🔥: ${chalk.red('Error deleting')} ${chalk.yellow(
          document
        )} from ${chalk.yellow(collection)}: ${err}`
      );
    });
};

module.exports = firestoreDelete;
