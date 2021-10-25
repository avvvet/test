const fs = require('fs')

const raw = fs.readFileSync('./data/input.json')
const data = JSON.parse(raw)

console.log(data)

let FruitBasket = class {
    constructor(id, max_weight, contents) {
        this.id = id
        this.max_weight = max_weight
        this.contents = contents
    }
    getId = () => {
        return this.id
    }

    countFruits = () => {
       return this.contents.length
    }

    countContentType = () => {
        let hash = {}
        let fruit_counts = []
        for(var i = 0 ; i < this.contents.length; i++) {
            if(hash[this.contents[i].type] != undefined) {
                hash[this.contents[i].type] += 1
            } else {
                hash[this.contents[i].type] = 1
            }

        }
        Object.keys(hash).map((i, k) => {
            fruit_counts.push({
                type : i,
                count : hash[i]
            })
        })

        
        return fruit_counts
    }

    getContentsWeight = () => {
        let weight = 0
        for(var i = 0 ; i < this.contents.length; i++) {
            weight = weight + this.contents[i].weight
        }
        return weight
    }
}

let Fruit = class {
    constructor(type, color, weight) {
        this.type = type
        this.color = color
        this.weight = weight
    }
}

let newBasket = new FruitBasket(data[0].id, data[0].max_weight, data[0].contents)

let output = []
output.push({
    id: newBasket.getId(),
    total_fruits: newBasket.countFruits(),
    total_weight: newBasket.getContentsWeight(),
    fruit_counts: newBasket.countContentType()
})
fs.writeFile('./data/output.json', JSON.stringify(output), (e) => {
    console.log(e)
})