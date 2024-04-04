import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_Url)
      .setProject(conf.appwrite_ProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //Direct Login
        return this.login({ email, password });
      } else return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    console.log(this.account);
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Login error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error fetching current user:", error);

      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Logout error", error);
    }
  }
}
const authService = new AuthService();
export default authService;
