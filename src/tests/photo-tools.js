const assert = require('assert');
const mockery = require('mockery');
let cloudinarySub = {
    deletePhoto: () => 'res'
};

describe('Photo tools', () => {
    it('delete 1 photo', function (done) {
        // this.timeout(7000);
        mockery.registerAllowable('../tools/photo-tools');
        mockery.registerMock('./cloudinary', cloudinarySub);
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });
        let photoTools = require('../tools/photo-tools');
        let result = photoTools.deletePhoto({
            url: 'test',
            remove: cb => {
                cb();
            }
        }, () => 'res');
        assert.deepEqual(result, 'res');

        mockery.disable();
        mockery.deregisterAll();
        done();
    });
});
