/*
 *  Author: Colum Bennett <colum.bennett@feedhenry.com>
 *  Re-useable Angular service module using FeedHenry Hybird API "$fh.cloud"" call.
 *  See developers docs, http://docs.feedhenry.com/
 */

/*
 *  @endpoint : name of required cloud endpoint.
 *  @params : request parameters for given endpoint.
 *  @succesCb : if cloud call is successful, perform this operation.
 *  @errCb : if call fails, perform this operation.
 */

angular.module('fhcloud', ['ngResource']).service("fhcloud", function() {
  this.cloud = function(params, successCb, errCb) {

    if (!params) {
      return errCb('No params object cannot perform $fh.cloud')
    } else {
      // set request content type and timeout val
      params.contentType = "application/json";
      params.timeout = 60 * 1000;

      $fh.cloud(params, successCb, errCb);
    }
  };
});
