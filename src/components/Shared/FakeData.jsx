import { faker } from '@faker-js/faker'

function createRandomCarList(){
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        image:'https://th.bing.com/th/id/R.f534753298c678e0a71bd7307ce5036f?rik=ZT3Qje%2fqFTAq0w&pid=ImgRaw&r=0',
        miles: 1000,
        gearType: 'Automatic',
        price: faker.finance.amount({min: 4000, max: 20000})
    };
}

const carList = faker.helpers.multiple(createRandomCarList, {
    count: 7
});

export default { carList };