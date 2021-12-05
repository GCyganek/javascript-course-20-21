"use strict";

var map = new Map();
var textarea = document.forms[0].elements.w3review;

var expect = chai.expect;

var createIndex;
var findIndex;
var addIndex;
var deleteIndex;

function drawCurrentPieChart() {
    console.log(map);
    console.log(localStorage);
    drawPieChart({
            "localStorage": localStorage.length,
            "map": map.size
        },
        "Current collections sizes",
        "canvas");
}

function addButton() {
    var operation = getOperation();

    var operationSplitted = operation.split(":");
    var operationName = operationSplitted[0];
    var operationBody = operationSplitted[1];

    switch (operationName) {
        case "find":
            if (isWebStorageChecked()) findObjectStorage(operationBody);
            else findObjectMap(operationBody);
            break;
        case "create":
            if (isWebStorageChecked()) createObjectStorage(operationBody);
            else createObjectMap(operationBody);
            break;
        case "add":
            if (isWebStorageChecked()) modifyObjectStorage(operationBody);
            else modifyObjectMap(operationBody);
            break;
        case "delete":
            if (isWebStorageChecked()) deleteObjectStorage(operationBody);
            else deleteObjectMap(operationBody);
            break;
        default:
            break;
    }
}

function buttonWrite() {
    textarea.value = "Items: ";

    if (isWebStorageChecked()) {
        for (var i = 0; i < localStorage.length; i++) {
            var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
            textarea.value = textarea.value.concat("\n\t " + localStorage.key(i) + ":");
            for (const item_key in item) {
                textarea.value = textarea.value.concat(item_key + "=" + item[item_key] + " ");
            }
        }
    } else {
        for (let [key, value] of map) {
            textarea.value = textarea.value.concat("\n\t" + key + ": ");
            for (const value_key in value) {
                textarea.value = textarea.value.concat(value_key + "=" + value[value_key] + " ");
            }
        }
    }
}

function getOperation() {
    var text = textarea.value
    createIndex = text.lastIndexOf("create:");
    findIndex = text.lastIndexOf("find:");
    addIndex = text.lastIndexOf("add:");
    deleteIndex = text.lastIndexOf("delete:");

    var operationIndex = Math.max(createIndex, findIndex, addIndex, deleteIndex);
    var endIndex = text.indexOf("\n", operationIndex);

    if (endIndex == -1) {
        endIndex = text.length;
    }

    var operationText = text.slice(operationIndex, endIndex);
    operationText.trim();

    return operationText;
}

function createObjectMap(id) {
    if(map.has(id)) {
        textarea.value = textarea.value.concat("\n\tIstnieje juz osoba o id=" + id);
        return;
    }

    map.set(id, {});
    textarea.value = textarea.value.concat("\n\tUtworzono osobe o id=" + id);
}

function createObjectStorage(id) {
    if(!localStorage.getItem(id)) {
        localStorage.setItem(id, JSON.stringify({}));
        textarea.value = textarea.value.concat("\n\tUtworzono osobe o id=" + id);
        return;
    }

    textarea.value = textarea.value.concat("\n\tIstnieje juz osoba o id=" + id);
}

function modifyObjectMap(body) {
    let arr = body.split(",");
    let id = arr[0];
    
    if (!map.has(id)) {
        textarea.value = textarea.value.concat("\n\tNie istnieje osoba o id=" + id);
        return;
    }

    let key, value, property;

    for (var i = 1; i < arr.length; i++) {
        property = arr[i].split("=");
        key = property[0].trim();
        value = property[1].trim();

        map.get(id)[key] = value;
        textarea.value = textarea.value.concat("\n\tUstanowiono " + key + "=" + value + " dla osoby o id=" + id);
    }
}

function modifyObjectStorage(body) {
    let arr = body.split(",");
    let id = arr[0];
    
    if (!localStorage.getItem(id)) {
        textarea.value = textarea.value.concat("\n\tNie istnieje osoba o id=" + id);
        return;
    }

    let key, value, property, item;

    for (var i = 1; i < arr.length; i++) {
        property = arr[i].split("=");
        key = property[0].trim();
        value = property[1].trim();

        item = JSON.parse(localStorage.getItem(id));
        item[key] = value;
        localStorage.setItem(id, JSON.stringify(item));
        textarea.value = textarea.value.concat("\n\tUstanowiono " + key + "=" + value + " dla osoby o id=" + id);
    }
}

function deleteObjectMap(id) {
    let result = map.delete(id);
    if (!result) textarea.value = textarea.value.concat("\n\tOsoba o tym id nie istnieje, id=" + id);
    textarea.value = textarea.value.concat("\n\tUsunieto osobe o id=" + id);
}

function deleteObjectStorage(id) {
    if(!localStorage.getItem(id)) {
        textarea.value = textarea.value.concat("\n\tOsoba o tym id nie istnieje, id=" + id);
        return;
    }

    localStorage.removeItem(id);
    textarea.value = textarea.value.concat("\n\tUsunieto osobe o id=" + id);
}

function findObjectMap(info) {
    let info_arr = info.split(",");

    let property, property_names = [], property_values = [];

    for (var i = 0; i < info_arr.length; i++) {
        property = info_arr[i].split("=");
        property_names.push(property[0].trim());
        property_values.push(property[1].trim());
    }

    let show;
    for (let [key, object] of map) {
        show = true;
        for (var i = 0; i < property_names.length && show == true; i++) {
            if (!object.hasOwnProperty(property_names[i])) {
                show = false;
            } else {
                if (object[property_names[i]] != property_values[i]) {
                    show = false;
                }
            }
        }

        if (show) {
            textarea.value = textarea.value.concat("\n\t" + key + ": ");
            for (const val_key in object) {
                textarea.value = textarea.value.concat(val_key + "=" + object[val_key] + " ");
            }
        }
    }
}

function findObjectStorage(info) {
    let info_arr = info.split(",");

    let property, property_names = [], property_values = [];

    for (var i = 0; i < info_arr.length; i++) {
        property = info_arr[i].split("=");
        property_names.push(property[0].trim());
        property_values.push(property[1].trim());
    }

    let show;
    for (var i = 0; i < localStorage.length; i++) {
        var object = JSON.parse(localStorage.getItem(localStorage.key(i)));
        show = true;
        for (var j = 0; j < property_names.length && show == true; j++) {
            if (!object.hasOwnProperty(property_names[j])) {
                show = false;
            } else {
                if (object[property_names[j]] != property_values[j]) {
                    show = false;
                }
            }
        }

        if (show) {
            textarea.value = textarea.value.concat("\n\t " + localStorage.key(i) + ":");
            for (const object_key in object) {
                textarea.value = textarea.value.concat(object_key + "=" + object[object_key] + " ");
            }
        }
    }
}

function isWebStorageChecked() {
    return document.forms[0].elements.webStorage.checked;
}

describe("Web Storage checked, create operation",function(){
    it("New item with id=item1 created",function(){
        localStorage.clear();  /* zeby localStorage dzialalo nromalnie, to trzeba te testy wylaczyc, bo inaczej localStorage jest czyszczony przy kazdym odswiezeniu strony */
        textarea.value = "create:item1";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.endsWith("Utworzono osobe o id=item1")).to.equal(true)
    });
    it("Error while creating item that has already existed",function(){
        textarea.value = "create:item1";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.endsWith("Istnieje juz osoba o id=item1")).to.equal(true)
    });
    it("New item with id=item2 created",function(){
        textarea.value = "create:item2";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.endsWith("Utworzono osobe o id=item2")).to.equal(true)
    });
});

describe("Web Storage checked, add operation",function(){
    it("Modifying item with id=item1",function(){
        textarea.value = "add:item1,imie=Jan,miasto=Krakow,nazwisko=Kowalski";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.endsWith("Ustanowiono nazwisko=Kowalski dla osoby o id=item1")).to.equal(true)
    });
    it("Modifying item with id=item2",function(){
        textarea.value = "add:item2,imie=Jan,miasto=Warszawa,nazwisko=Kowalski";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.endsWith("Ustanowiono nazwisko=Kowalski dla osoby o id=item2")).to.equal(true)
    });
    it("Modifying item with id=item3 which not exists",function(){
        textarea.value = "add:item3,imie=Jan";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.endsWith("Nie istnieje osoba o id=item3")).to.equal(true)
    });
});

describe("Web Storage checked, find operation",function(){
    it("Find items with imie=Jan,miasto=Krakow",function(){
        textarea.value = "find:imie=Jan,miasto=Krakow";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.endsWith("item1:imie=Jan miasto=Krakow nazwisko=Kowalski ")).to.equal(true)
    });
    it("Find items with imie=Jan,miasto=Krakow",function(){
        textarea.value = "find:imie=Jan,nazwisko=Kowalski";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.includes("item2") && textarea.value.includes("item1")).to.equal(true)
    });
});

describe("Web Storage checked, delete operation",function(){
    it("Delete item that doesnt exist",function(){
        textarea.value = "delete:item3";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.includes("Osoba o tym id nie istnieje, id=item3")).to.equal(true)
    });
    it("Delete item with id=item1",function(){
        textarea.value = "delete:item1";
        document.forms[0].elements.webStorage.checked = true;
        addButton();
        expect(textarea.value.includes("Usunieto osobe o id=item1")).to.equal(true)
    });
});

describe("Web Storage unchecked, create operation",function(){
    it("New item with id=item1 created",function(){
        textarea.value = "create:item1";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.endsWith("Utworzono osobe o id=item1")).to.equal(true)
    });
    it("Error while creating item that has already existed",function(){
        textarea.value = "create:item1";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.endsWith("Istnieje juz osoba o id=item1")).to.equal(true)
    });
    it("New item with id=item2 created",function(){
        textarea.value = "create:item2";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.endsWith("Utworzono osobe o id=item2")).to.equal(true)
    });
});

describe("Web Storage unchecked, add operation",function(){
    it("Modifying item with id=item1",function(){
        textarea.value = "add:item1,imie=Jan,miasto=Krakow,nazwisko=Kowalski";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.endsWith("Ustanowiono nazwisko=Kowalski dla osoby o id=item1")).to.equal(true)
    });
    it("Modifying item with id=item2",function(){
        textarea.value = "add:item2,imie=Jan,miasto=Warszawa,nazwisko=Kowalski";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.endsWith("Ustanowiono nazwisko=Kowalski dla osoby o id=item2")).to.equal(true)
    });
    it("Modifying item with id=item3 which not exists",function(){
        textarea.value = "add:item3,imie=Jan";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.endsWith("Nie istnieje osoba o id=item3")).to.equal(true)
    });
});

describe("Web Storage checked, find operation",function(){
    it("Find items with imie=Jan,miasto=Krakow",function(){
        textarea.value = "find:imie=Jan,miasto=Krakow";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.endsWith("item1: imie=Jan miasto=Krakow nazwisko=Kowalski ")).to.equal(true)
    });
    it("Find items with imie=Jan,miasto=Krakow",function(){
        textarea.value = "find:imie=Jan,nazwisko=Kowalski";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.includes("item2") && textarea.value.includes("item1")).to.equal(true)
    });
});

describe("Web Storage checked, delete operation",function(){
    it("Delete item that doesnt exist",function(){
        textarea.value = "delete:item3";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.includes("Osoba o tym id nie istnieje, id=item3")).to.equal(true)
    });
    it("Delete item with id=item1",function(){
        textarea.value = "delete:item1";
        document.forms[0].elements.webStorage.checked = false;
        addButton();
        expect(textarea.value.includes("Usunieto osobe o id=item1")).to.equal(true)
    });
});
