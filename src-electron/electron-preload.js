import { contextBridge } from "electron";
import { booksApi, mainApi } from "./apis";

contextBridge.exposeInMainWorld("booksApi", booksApi);
contextBridge.exposeInMainWorld("mainAPI", mainApi);
