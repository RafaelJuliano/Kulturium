import { contextBridge } from "electron";
import { booksApi } from "./apis";

contextBridge.exposeInMainWorld("booksApi", booksApi);
