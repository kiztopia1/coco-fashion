/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j87qyx5vxmfph0q")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7cgdlsos",
    "name": "Category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "T-shirts",
        "Pants",
        "Jeans",
        "Shirts",
        "Dresses",
        "Skirts",
        "Jackets",
        "Sweaters",
        "Hoodies",
        "Shorts",
        "Activewear",
        "Swimwear",
        "Underwear",
        "Socks",
        "Accessories",
        "Footwear",
        "Bags"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5hpqokv9",
    "name": "Tag",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "T-shirts",
        "Pants",
        "Jeans",
        "Shirts",
        "Dresses",
        "Skirts",
        "Jackets",
        "Sweaters",
        "Hoodies",
        "Shorts",
        "Activewear",
        "Swimwear",
        "Underwear",
        "Socks",
        "Accessories",
        "Footwear",
        "Bags"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ynf9yjc8",
    "name": "stock",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j87qyx5vxmfph0q")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7cgdlsos",
    "name": "Category",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Shoe",
        "T-shirt",
        "Pant"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5hpqokv9",
    "name": "Tag",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "Cloth",
        "Shoe"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ynf9yjc8",
    "name": "Inventory",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
