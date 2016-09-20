'use strict';

describe('Service: SocketService', function () {

  // load the service's module
  beforeEach(module('chatAppApp'));

  // instantiate service
  var SocketService;
  beforeEach(inject(function (_SocketService_) {
    SocketService = _SocketService_;
  }));

  it('should do something', function () {
    expect(!!SocketService).toBe(true);
  });

});
