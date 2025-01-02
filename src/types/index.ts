export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}