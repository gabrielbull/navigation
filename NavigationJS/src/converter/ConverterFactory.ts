﻿import ArrayConverter = require('./ArrayConverter');
import BooleanConverter = require('./BooleanConverter');
import NumberConverter = require('./NumberConverter');
import StringConverter = require('./StringConverter');
import TypeConverter = require('./TypeConverter');

class ConverterFactory {
    private static converterArray: TypeConverter[];
    private static keyToConverterList: any;
    private static nameToKeyList: any;

    static init() {
        this.converterArray = [];
        this.converterArray.push(new StringConverter('0'));
        this.converterArray.push(new BooleanConverter('1'));
        this.converterArray.push(new NumberConverter('2'));
        this.keyToConverterList = {};
        this.nameToKeyList = {};
        for (var i = 0; i < this.converterArray.length; i++) {
            var typeConverter = this.converterArray[i];
            this.keyToConverterList[typeConverter.key] = typeConverter;
            var arrayConverter = new ArrayConverter(typeConverter, 'a' + typeConverter.key)
            this.keyToConverterList[arrayConverter.key] = arrayConverter;
            this.nameToKeyList[typeConverter.name] = typeConverter.key;
            this.nameToKeyList[arrayConverter.name] = arrayConverter.key;
        }
    }

    private static getKey(type: string) {
        return this.nameToKeyList[type];
    }

    private static getKeyFromObject(obj: any) {
        var name = TypeConverter.getName(obj);
        if (!this.nameToKeyList[name])
            throw new Error('No TypeConverter found for ' + name);
        return this.nameToKeyList[name];
    }
    
    static getConverter(obj: any) {
        return this.getConverterFromKey(this.getKeyFromObject(obj));
    }

    static getConverterFromKey(key: string): TypeConverter {
        return this.keyToConverterList[key];
    }
    
    static getConverterFromName(name: string): TypeConverter {
        return this.getConverterFromKey(this.getKey(name));
    }
}

ConverterFactory.init();
export = ConverterFactory;
