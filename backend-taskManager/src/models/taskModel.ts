import { ITask } from "../interfaces/ITask";
import { Schema, model } from "mongoose";

const TaskSchema = new Schema<ITask>({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    }
  }, {
    timestamps: true
  });
  
  export const Task = model<ITask>('Task', TaskSchema);
  