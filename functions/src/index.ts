import * as functions from 'firebase-functions';
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin';
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    // Grab the text parameter.
    if (!request.body.From){
        response.status(500).send('Missing Required Data');
    }

    const phoneNumber: string = request.body.From;
    const lastCalled = new Date();

    admin.firestore().collection('lonelyPeople')
        .add({ phoneNumber, lastCalled })
        .then(result => {
            response.send("Successfully Added Person")
        }).catch(error => {
            response.status(500).send('Something bad happened');
        });
});
