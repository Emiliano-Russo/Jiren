import { Game } from "../Models/Game";
import { db } from "../Firebase/FirebaseConfig";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { copySync } from "fs-extra";
import { resolve } from "dns";

const gamesRef = collection(db, "Games");
const credentialsRef = collection(db, "Credentials");

export class FireStoreController {
  private static _instance: FireStoreController;
  private constructor() {
    //...
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private gameList: Game[] = [];

  async getAllGames(): Promise<any[]> {
    return new Promise(async function (resolve, reject) {
      const resList = await getDocs(collection(db, "Games"));
      const list = resList.docs.map((value) => {
        return value.data();
      });
      resolve(list);
    });
  }

  async getGame(title: string): Promise<any> {
    return new Promise(async function (resolve, reject) {
      const q = await query(gamesRef, where("title", "==", title));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        resolve(doc.data());
      });
      resolve(undefined);
    });
  }

  async tokenIsValid(token: string): Promise<boolean> {
    return new Promise(async function (resolve, reject) {
      console.log("TOKEN IS VALID ?? ");
      const q = await query(credentialsRef, where("token", "==", token));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) resolve(false);
      else resolve(true);
    });
  }

  async addGame(gameNameId: string, game: Game): Promise<void> {
    return new Promise(async function (resolve, reject) {
      const q = await setDoc(doc(gamesRef, gameNameId), game);
      resolve();
    });
  }
}
