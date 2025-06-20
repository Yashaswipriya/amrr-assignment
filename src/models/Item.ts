import mongoose, { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema({
  name: String,
  type: String,
  description: String,
  coverImage: String,
  additionalImages: [String],
}, { timestamps: true });

const Item = models.Item || model('Item', ItemSchema);

export default Item;
