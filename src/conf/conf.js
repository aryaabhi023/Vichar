const conf = {
  appwrite_Url: String(import.meta.env.VITE_APPWRITE_URL),
  appwrite_ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwrite_databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwrite_collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
};

export default conf;
