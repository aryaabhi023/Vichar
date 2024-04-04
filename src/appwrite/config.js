import { Client, Databases, ID } from "appwrite";
import conf from "../conf/conf";

class Service {
  client = new Client();
  database;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_Url)
      .setProject(conf.appwrite_ProjectId);
    this.database = new Databases(this.client);
  }
  async createPost({ title, content, slug, userId, username }) {
    try {
      return await this.database.createDocument(
        conf.appwrite_databaseId,
        conf.appwrite_collectionId,
        slug,
        {
          title,
          content,
          userId,
          username,
        }
      );
    } catch (error) {
      console.log("Creating post Error: ", error);
    }
  }
  async updatePost(slug, { title, content, userId, username }) {
    try {
      return await this.database.updateDocument(
        conf.appwrite_databaseId,
        conf.appwrite_collectionId,
        slug,
        {
          title,
          content,
          userId,
          username,
        }
      );
    } catch (error) {
      console.log("Updating post error: ", error);
    }
  }
  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        conf.appwrite_databaseId,
        conf.appwrite_collectionId,
        slug
      );
    } catch (error) {
      console.log("Deleting post error: ", error);
    }
  }
  async getPosts(queries = []) {
    try {
      return await this.database.getDocument(
        conf.appwrite_databaseId,
        conf.appwrite_collectionId,
        queries
      );
    } catch (error) {
      console.log("Getting post error: ", error);
    }
  }
}

const service = new Service();
export default service;
