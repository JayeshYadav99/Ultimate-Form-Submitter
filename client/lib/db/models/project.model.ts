// models/ProjectSchema.ts

import mongoose, { Document, Schema, model } from 'mongoose';

export interface IProject extends Document {
    projectName: string;
    technologyStack: string;
    developmentStage: string;
    teamSize: number;
}

const projectSchema = new Schema<IProject>({
    projectName: { type: String, required: true },
    technologyStack: { type: String, required: true },
    developmentStage: { type: String, required: true },
    teamSize: { type: Number, required: true },
});

export const ProjectModel = mongoose.models.Project ||model<IProject>('Project', projectSchema);
