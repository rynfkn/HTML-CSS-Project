const StorageKey = 'Storage_key';
let BookList = []

function SaveData() {
    if(CheckStorage()) {
        localStorage.setItem(StorageKey, JSON.stringify(BookList))
    }
}

function LoadData() {
    if(CheckStorage()) {
        const SerializeData  = localStorage.getItem(StorageKey);
        if(SerializeData !== null) {
            BookList = JSON.parse(SerializeData);
        }
    }
}

function CheckStorage() {
    return typeof(Storage) !== 'undefined';
}