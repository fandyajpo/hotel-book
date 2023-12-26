import { Database, aql } from "arangojs";

// let database: Database;

const getConnection = () => {
  try {
    const conn = new Database({
      loadBalancingStrategy: "ONE_RANDOM",

      url: process.env.ARANGO_ENPOINT!,
      databaseName: process.env.ARANGO_DATABASE!,
      auth: {
        username: process.env.ARANGO_USERNAME!,
        password: process.env.ARANGO_PASSWORD!,
      },
    });
    return conn;
  } catch (error) {
    throw error;
  }
};

const cacheConnection = (): Database => {
  // if (!database)
  return getConnection();
  // return database;
};

const getCollection = async (cName: string, db: Database) => {
  try {
    const collections = await db.collections();
    if (collections.find((c: any) => c._name === cName)) {
      return db.collection(cName);
    }
    return db.createCollection(cName);
  } catch (error) {
    throw error;
  }
};

const getView = async (cName: string, db: Database) => {
  try {
    const view = await db.views();
    if (view.find((c: any) => c._name === cName)) {
      return db.view(cName);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const createPing = async (message: string) => {
  const db = cacheConnection();
  try {
    await getCollection("ping", db);
    const resx = await db.query({
      query: 'INSERT { "ping": @message } in ping RETURN NEW',
      bindVars: { message },
    });

    const result = await resx.all();

    return result;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

// const cacheConnectionStatus = async () => {
//   try {
//     return database.listCollections();
//   } catch (error) {
//     throw error;
//   }
// };

export {
  getView,
  getCollection,
  cacheConnection,
  aql,
  createPing,
  // cacheConnectionStatus,
};
