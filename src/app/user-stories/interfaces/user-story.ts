export interface UserStory {
    id: number;
    title: string;
    description: string;
    projectNameAndDescription: {
      id: number;
      name: string;
      description: string;
    };
  }