import { CandyGrid } from "./GameObjects/CandyGrid.js";

// Monetization config

// backgrounds: premium or nomal
export let background_selected = {
    active: "normal"
};
// End monetization config


export const minimun_to_search = 3;
export const count_down = 5; // In seconds -1
export const lifes = 2;
export const premium_lifes = 1;

export const grid_size = {
    width: 6,
    height: 6
}

// Load candies and assets section
export const candies = [
    'candy-yellow',
    'candy-yellow-2',
    'candy-yellow-3',
    'candy-yellow-4',
    'candy-yellow-5',
    'candy-orange',
    'candy-orange-2',
    'candy-orange-3',
    'candy-orange-4',
    'candy-blue',
    'candy-blue-2',
    'candy-blue-3',
    'candy-pink',
    'candy-pink-2',
    'candy-pink-3',
    'candy-green',
    'candy-green-2',
    'candy-green-3',
];

export const lifes_sprites = [
    'normal-life',
    'premium-life'
]

export const backgrounds = [
    "background-normal",
    "background-premium"
]

// Global grid
export const candy_grid = new CandyGrid();