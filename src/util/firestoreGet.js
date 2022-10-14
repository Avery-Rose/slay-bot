const admin = require('firebase-admin');
const chalk = require('chalk');

const db = admin.firestore();
const firestoreGet = async (collection, doc) => {
  const docRef = db.collection(collection).doc(doc);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    console.log(chalk.green(`Document data: ${docSnap.data()}`));
    return docSnap.data();
  } else {
    console.log(chalk.red('No such document!'));
    return null;
  }
};

module.exports = firestoreGet;
