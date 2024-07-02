type MenuItem = {
    huf: number;
    allergy: number[];
    category: string;
    person?: number;
};

type MenuData = {
    [key: string]: MenuItem;
};

type Foods = {
    [key: string]: any;
};

export type Menu = {
    menu: MenuData;
    foods: Foods;
};
