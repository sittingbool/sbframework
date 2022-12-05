import mongoose, { Model, Require_id } from 'mongoose';
import { mongoConnectionString } from '@sbfw/mongodb';

export async function connectMongoose(dbName?: string): Promise<void> {
    await mongoose.connect(mongoConnectionString(), { dbName });
}

export interface MongooseModelExtensions<T> {
    findOneReturnObject(...p: Parameters<typeof mongoose.Model.findOne>): Promise<Require_id<T>>;
    findOneAndRemoveReturnObject(...p: Parameters<typeof mongoose.Model.findOneAndRemove>): Promise<Require_id<T>>;
    findAndUpdateDeep(update: Partial<T>, ...p: Parameters<typeof mongoose.Model.find>): Promise<Require_id<T>>;
    findOneAndUpdateDeep(update: Partial<T>, ...p: Parameters<typeof mongoose.Model.findOne>): Promise<Require_id<T>>;
}
export type ExtendedMongooseModel<T> = Model<T> & MongooseModelExtensions<T>;
export type MongooseModelParameters = Parameters<typeof mongoose.model>;
export function MongooseModel<T>(...params: MongooseModelParameters): ExtendedMongooseModel<T> {
    const model = mongoose.model(...params) as any;

    // find with returning object
    model.findOneReturnObject = async (...p: Parameters<typeof mongoose.Model.findOne>): Promise<Require_id<T>> => {
        const result = await model.findOne(...p);
        return result ? result.toObject() : null;
    };
    model.findOneAndRemoveReturnObject = async (
        ...p: Parameters<typeof mongoose.Model.findOneAndRemove>
    ): Promise<Require_id<T>> => {
        const result = await model.findOneAndDelete(...p);
        return result ? result.toObject() : null;
    };

    // deep update
    model.findOneAndUpdateDeep = async (
        ...p: Parameters<typeof mongoose.Model.findOneAndUpdate>
    ): Promise<Require_id<T>> => {
        const filter = p[0];
        const update = p[1];
        const options = p[2];
        const callback = p[3];
        const item = await model.findOne(filter, options, callback);
        if (!item) return null;
        Object.assign(item, update);
        await item.save();
        return Object.assign({}, item.toObject(), filter);
    };
    model.findAndUpdateDeep = async (...p: Parameters<typeof mongoose.Model.updateMany>): Promise<Require_id<T>[]> => {
        const filter = p[0];
        const update = p[1];
        const options = p[2];
        const callback = p[3];
        const items = await model.find(filter, options, callback);
        if (items.length < 1) return [];
        items.forEach((item) => Object.assign(item, update));
        await model.bulkSave(items);
        return items.map((item) => Object.assign({}, item.toObject(), update));
    };

    return model;
}
