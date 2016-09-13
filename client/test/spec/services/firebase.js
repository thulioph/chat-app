'use strict';

describe('Service: Firebase', function () {

  // load the service's module
  beforeEach(module('chatAppApp'));

  // instantiate service
  var Firebase;
  beforeEach(inject(function (_Firebase_) {
    Firebase = _Firebase_;
  }));

  it('should do something', function () {
    expect(!!Firebase).toBe(true);
  });

});
