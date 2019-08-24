import firebase from "firebase/app";
// eslint-disable-next-line
import "firebase/auth";
// eslint-disable-next-line
import "firebase/firestore";
import FirebaseCollections from "../../config/firebaseCollections";
import * as firebaseConfig from '../../config/firebase.config.json'

class Firebase {
    public firebase : any;
    public auth: any;
    public googleProvider:any;
    public facebookProvider:any;
    public db:any;

    constructor() {
      this.firebase.initializeApp(firebaseConfig);
      this.auth = firebase.auth();
      this.auth.useDeviceLanguage();
  
      this.googleProvider = new firebase.auth.GoogleAuthProvider();
      this.facebookProvider = new firebase.auth.FacebookAuthProvider();
  
      this.db = firebase.firestore();
    }
  
    handleLoggedUser = async (user: any) => {
      await this.db
        .collection("users")
        .doc(user.email)
        .set(
          {
            displayName: user.displayName
          },
          { merge: true }
        );
    };
  
    getuserRef = () => {
      if (!this.auth.currentUser) return null;
      return this.db.collection("users").doc(this.auth.currentUser.email);
    };
  
    getAgendamentosCollection = () => {
      if (!this.auth.currentUser) return null;
      return this.db
        .collection("users")
        .doc(this.auth.currentUser.email)
        .collection(FirebaseCollections.AGENDAMENTOS);
    };
  
    doPasswordReset = (email:string) => this.auth.sendPasswordResetEmail(email);
  
    doPasswordUpdate = (password:string) => this.auth.currentUser.updatePassword(password);
  
    users = () => this.db.collection("users");
  
    user = (uid:string) => this.db.doc(`users/${uid}`);
  }
  
  export default Firebase;
  