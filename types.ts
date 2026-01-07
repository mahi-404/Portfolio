
export interface Project {

    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface Skill {
    name: string;
    level: number;
    category: 'Frontend' | 'Backend' | 'Design' | 'Tools';
}

export interface Message {
    role: 'user' | 'model';
    text: string;
}

export interface SiteConfig {
    name: string;
    title: string;
    bio: string;
    email: string;
    github: string;
    twitter: string;
    linkedin: string;
    fullBio: string;
    goals: string;
    interests: string[];
}
