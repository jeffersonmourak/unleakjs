(function(){
  "use strict";

  var setIntervalOld = window.setInterval;

  var intervalPipe = [];

  class _unleakJS{
    constructor(){
      this.intervals = [];
      this.setIntervalOld = window.setInterval;
      this.oldClear = window.clearInterval;

      window.setInterval = this.setInterval;
      window.clearInterval = this.clearInterval;

    }

    hashGen(){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    setInterval(_arguments){
      if(!__unleakJS){
        intervalPipe.push({arguments});
      }
      else{
        let hash = __unleakJS.hashGen();
        let _interval = __unleakJS.setIntervalOld.apply(this, arguments);
        __unleakJS.intervals.push({hash, call: _interval});
        return {
          hash,
          clear: () => { __unleakJS.clearInterval({hash, call: _interval}); }
        };
      }
    }

    loadPipe(){
      intervalPipe.map(pipe => {
        this.setInterval(pipe.arguments);
      });
    }

    clearIntervals(hash){
      this.intervals.map( (interval) => {
        clearInterval(interval);
      });
    }

    clearInterval(interval){
      if(interval.clear){
        interval.clear();
        return;
      }
      __unleakJS.oldClear.call(window, interval.call);
      __unleakJS.intervals.map( (_interval, index) => {
        if(_interval.hash === interval.hash){
          __unleakJS.intervals = __unleakJS.intervals.splice(1, index);
          return;
        }
      });
    }

  }

  var __unleakJS = new _unleakJS();

  window.unleakJS = __unleakJS;

  window.addEventListener("load", () => {
    __unleakJS.loadPipe();
    window.setInterval = __unleakJS.setInterval;
    window.clearInterval = __unleakJS.clearInterval;
  }, false);

  window.addEventListener("beforeunload",() => {
    __unleakJS.clearIntervals();
  })

}())
