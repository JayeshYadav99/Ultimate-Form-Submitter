// models/Generation.ts

import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Define the interface for the Generation document
interface IGeneration extends Document {
  inputImage: string;
  outputImage: string;
  prompt: string;
  userId: mongoose.Types.ObjectId;
  toolName: string;
}

// Define the schema
const GenerationSchema: Schema<IGeneration> = new Schema({
  inputImage: { type: String, required: true },
  outputImage: { type: String, required: true ,default: ''},
  prompt: { type: String, required: true },
  promptid: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toolName: { type: String, required: true }
}, {
  timestamps: true
});

// Create the model
const Generation: Model<IGeneration> = mongoose.models.Generation || model<IGeneration>('Generation', GenerationSchema);

export default Generation;
