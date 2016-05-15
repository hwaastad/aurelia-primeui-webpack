export interface MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  eventEmitter?: any;
  items?: MenuItem[];
}
