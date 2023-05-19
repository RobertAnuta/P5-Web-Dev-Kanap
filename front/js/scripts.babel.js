'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var products = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response, parsedData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return fetch('http://localhost:5500/back/models/Product.js');

                    case 2:
                        response = _context.sent;
                        _context.next = 5;
                        return response.json();

                    case 5:
                        parsedData = _context.sent;

                        console.log('parsedData', parsedData);

                        parsedData.map(function (el) {
                            var product = document.createElement('a');
                            product.innerHTML = '<a href=\'./product.html?id=' + el._id + '\'>\n            <article>\n                <img src="../../back/images/' + el.imageUrl + '" alt="Lorem ipsum dolor sit amet, Kanap name1" />\n                <h3 class="productName">' + el.name + '</h3>\n                <p class="productDescription">' + el.description + '</p>\n            </article>\n        </a>';
                            document.getElementById('items').appendChild(product);
                        });

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function products() {
        return _ref.apply(this, arguments);
    };
}();

products();
