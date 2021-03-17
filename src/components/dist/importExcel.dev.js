"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importfxx = importfxx;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function importfxx(obj) {
  var _this = this; // 通过DOM取文件数据


  var rABS = false; //是否将文件读取为二进制字符串

  var f = obj;
  var reader = new FileReader(); //if (!FileReader.prototype.readAsBinaryString) {

  FileReader.prototype.readAsBinaryString = function (f) {
    var binary = "";
    var rABS = false; //是否将文件读取为二进制字符串

    var pt = this;
    var wb; //读取完成的数据

    var outdata;
    var reader = new FileReader();

    reader.onload = function (e) {
      var bytes = new Uint8Array(reader.result);
      var length = bytes.byteLength;

      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      var XLSX = require('xlsx');

      if (rABS) {
        wb = XLSX.read(btoa(fixdata(binary)), {
          //手动转化
          type: 'base64'
        });
      } else {
        wb = XLSX.read(binary, {
          type: 'binary'
        });
      }

      outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
      // console.log(outdata)

      this.da = _toConsumableArray(outdata);
      var arr = [];
      this.da.map(function (v) {
        var obj = {};
        obj.equipmentSort = v['*产品分类'];
        obj.equipmentName = v['*产品名称'];
        obj.equipmentDescription = v['产品描述'];
        obj.quantity = v['数量'];
        obj.brands = v['*所属品牌'];
        obj.equipmentSortSubclass = v['产品子类'];
        obj.equipmentModel = v['*产品型号'];
        arr.push(obj);
      });
      console.log(arr);
      this.$axios.post('equipmentInfo/importEquipmentInfo', arr);
      return arr;
    };

    reader.readAsArrayBuffer(f);
  };

  if (rABS) {
    reader.readAsArrayBuffer(f);
  } else {
    reader.readAsBinaryString(f);
  }
}