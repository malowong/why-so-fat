const foodMap = new Map();
const foodIdSet = new Set([1, 2, 3, 4]);
const foods = [
    {
        foodId: 1,
    },
    {
        foodId: 2,
    },
    {
        foodId: 3,
    },
];
let counter = 0;

for (let food of foods) {
    counter++;
    if (foodIdSet.has(food.foodId)) {
        foodMap.set(food.foodId, food.foodId);
    }
}

console.log(counter);
console.log(foodMap);
