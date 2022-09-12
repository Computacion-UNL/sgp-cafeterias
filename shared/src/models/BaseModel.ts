import { modelOptions } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

/**
 * Basic document model with timestamps enabled,
 * id instead of _id,
 * __v field hidden,
 * and all the fields that start with an underscore are hidden.
 */
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_, doc: any) => {
        const id = doc._id;
        doc.id = id;
        delete doc._id;
      },
    },
  },
})
export abstract class BaseModel extends TimeStamps {}
