import { BookEntity } from "../entities";
import { DB } from "../utils";

export const BooksRepository = DB.getRepository(BookEntity).extend({});
