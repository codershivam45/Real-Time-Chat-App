import { chat } from "./appwrite";
import { ID } from "appwrite";

const db = {};

const collections = [
    {
        dbId: import.meta.env.VITE_DB_ID,
        id: import.meta.env.VITE_CHATUSER_ID,
        name: "ChatUser",
    },
    {
        dbId: import.meta.env.VITE_DB_ID,
        id: import.meta.env.VITE_USERS_ID,
        name: "User",
    },
    {
        dbId: import.meta.env.VITE_DB_ID,
        id: import.meta.env.VITE_MESSAGE_ID,
        name: "Message",
    },

];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload, permissions, id = ID.unique()) =>
            chat.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            chat.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        delete: (id) => chat.deleteDocument(col.dbId, col.id, id),
        list: (queries = []) =>
            chat.listDocuments(col.dbId, col.id, queries),
        get: (id) => chat.getDocument(col.dbId, col.id, id),
    };
});

export default db;