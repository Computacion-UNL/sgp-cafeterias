import { DocumentType, plugin } from "@typegoose/typegoose";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import { FilterQuery, PaginateOptions, PaginateResult } from "mongoose";
import mongoosePaginate, { PaginationParameters } from "mongoose-paginate-v2";
import { BaseModel } from "./BaseModel";

export interface PaginatedResult<T> extends PaginateResult<T> {
  docs: Array<DocumentType<T>>;
}

/**
 * Basic Pagination model
 */
@plugin(mongoosePaginate)
export abstract class PaginatedModel extends BaseModel {
  public static paginate: <T extends PaginatedModel>(
    this: AnyParamConstructor<T>,
    query?: FilterQuery<T>,
    options?: PaginateOptions,
    callback?: (err: Error, result: PaginatedResult<T>) => void
  ) => Promise<PaginatedResult<T>>;
}

export class PaginateParameters<
  T,
  O = PaginateOptions
> extends PaginationParameters<T, O> {}
