const jsontoxml = require('jsontoxml');

class Serializer {

    json (data) {
    return JSON.stringify(data);
    }

    xml (data) {
    let tag = this.tagSingular;
    if (Array.isArray(data)) {
        tag = this.tagPlural;
        data = data.map(item => {
        return {[this.tagSingular]: item};
        });
    }
        return jsontoxml({[tag]: data});
    }

    serialize (data) {
        data = this.filter(data);
        if (this.contentType === 'application/json') {
            return this.json(data);
        }
        if (this.contentType === 'application/xml') {
            return this.xml(data);
        }
        throw new Error(`${this.contentType} is not supported`);
    }

    filterObject(data) {
        const newObject = {};
        this.publicFields.forEach(field => {
            if (data.hasOwnProperty(field)) {
            newObject[field] = data[field];
            }
        });
        return newObject;
    }

    filter (data) {
        if(Array.isArray(data)) {
            data = data.map(item => {
            return this.filterObject(item);
            });
        } else {
            data = this.filterObject(data);
        }
        return data;
        }
    }

module.exports = {
    Serializer: Serializer,
    acceptedFormats: [
        'application/json', 
        'application/xml'
    ]
}