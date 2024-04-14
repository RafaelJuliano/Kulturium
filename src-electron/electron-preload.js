import { contextBridge } from "electron";
import booksApi from "./apis/books";

contextBridge.exposeInMainWorld("booksApi", booksApi.api);
