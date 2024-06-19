import {type ObjectId} from "mongoose"

export interface ITask {
    title: string;
    creatorId : ObjectId
    description: string;
    status: 'pending' | 'in-progress' | 'completed'; // or any other statuses you need
  }
  