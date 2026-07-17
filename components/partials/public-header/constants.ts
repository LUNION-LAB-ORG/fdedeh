export interface IMenuItem {
    name: string;
    href: string;
    hasSubMenu?: boolean;
    subMenuItems?: IMenuItem[];
};
