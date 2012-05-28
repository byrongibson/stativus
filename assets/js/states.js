/*globals $ Stativus _trackEvent _gat*/
var statechart = Stativus.createStatechart();
var sendGoogleAnalyticEvent = function(cat, evt, label){
  var et = window.gaEventTracker || (_gat && _gat._createTracker('UA-32146791-1', 'eventTracker'));
  if(et) et._trackEvent(cad, evt, label);
};
// *********************************
// DEFAULT STATES
// *********************************
statechart.addState("#app", {
  initialSubstate: '#home',
  actions: {
    '.home-act click': 'viewHomePage',
    '.quick-start-act click': 'viewQuickStartPage'
  },
  
  viewHomePage: function(){
    sendGoogleAnalyticEvent('Navigation', 'viewHome', 'viewHome');
    this.goToState('#home');
  },
  
  viewQuickStartPage: function(id){
    sendGoogleAnalyticEvent('Examples', id, 'viewQuickStartPage');
    this.goToState('#quick-start');
  }
});

statechart.addState("#home", {
  
  enterState: function(){
    $('.home-page').show('fast');
  },
  
  exitState: function(){
    $('.home-page').hide('fast');
  }
});

// **********************************
// Quick Start Substate
// **********************************
statechart.addState("#quick-start", {
  parentState: '#app',
  initialSubstate: '#qs-start',
  actions: {
    '.qs-step1-act click': 'showStep1',
    '.qs-step2-act click': 'showStep2',
    '.qs-step3-act click': 'showStep3',
    '.qs-step4-act click': 'showStep4',
    '.qs-step5-act click': 'showStep5',
    '.qs-step6-act click': 'showStep6',
    '.qs-stepFinal-act click': 'showStepFinal'
  },
  enterState: function(){
    $('.quick-start-page').show('fast');
  },
  
  exitState: function(){
    $('.quick-start-page').hide('fast');
  },
  
  showStep1: function(){ this.goToState('#qs-step1'); },
  showStep2: function(){ this.goToState('#qs-step2'); },
  showStep3: function(){ this.goToState('#qs-step3'); },
  showStep4: function(){ this.goToState('#qs-step4'); },
  showStep5: function(){ this.goToState('#qs-step5'); },
  showStep6: function(){ this.goToState('#qs-step6'); },
  showStepFinal: function(){ this.goToState('#qs-stepFinal'); }
});
statechart.addState("#qs-start", {
  parentState: '#quick-start',
  enterState: function(){
    $('.quick-start-banner').show('fast');
  },
  
  exitState: function(){
    $('.quick-start-banner').hide('fast');
  }
});
statechart.addState("#qs-steps", {
  parentState: '#quick-start',
  initialSubstate: '#qs-step1',
  enterState: function(){
    $('.qs-steps').show('fast');
  },
  
  exitState: function(){
    $('.qs-steps').hide('fast');
  }
});

statechart.addState("#qs-step1", {
  parentState: '#qs-steps',
  enterState: function(){
    $('.qs-step1').show('fast');
  },
  
  exitState: function(){
    $('.qs-step1').hide('fast');
  }
});
statechart.addState("#qs-step2", {
  parentState: '#qs-steps',
  enterState: function(){
    $('.qs-step2').show('fast');
  },
  
  exitState: function(){
    $('.qs-step2').hide('fast');
  }
});
statechart.addState("#qs-step3", {
  parentState: '#qs-steps',
  enterState: function(){
    $('.qs-step3').show('fast');
  },
  
  exitState: function(){
    $('.qs-step3').hide('fast');
  }
});
statechart.addState("#qs-step4", {
  parentState: '#qs-steps',
  enterState: function(){
    $('.qs-step4').show('fast');
  },
  
  exitState: function(){
    $('.qs-step4').hide('fast');
  }
});
statechart.addState("#qs-step5", {
  parentState: '#qs-steps',
  enterState: function(){
    $('.qs-step5').show('fast');
  },
  
  exitState: function(){
    $('.qs-step5').hide('fast');
  }
});
statechart.addState("#qs-step6", {
  parentState: '#qs-steps',
  enterState: function(){
    $('.qs-step6').show('fast');
  },
  
  exitState: function(){
    $('.qs-step6').hide('fast');
  }
});
statechart.addState("#qs-stepFinal", {
  parentState: '#qs-steps',
  enterState: function(){
    $('.qs-stepFinal').show('fast');
  },
  
  exitState: function(){
    $('.qs-stepFinal').hide('fast');
  }
});



// *********************************
// MODAL STATES
// *********************************
statechart.addState("#modal_ready", {
  globalConcurrentState: 'modal_states',
  
  actions: {
    '.underContruction click': 'underConstruction'
  },
  
  // events
  underConstruction: function(id){
    
    this.goToState('#underConstruction');
  }
});

statechart.addState("#underConstruction", {
  globalConcurrentState: 'modal_states',
  actions: {
    '.close-action click': 'closeModal'
  },
  enterState: function(){
    $('#info-modal .modal-header').html('<h2>Under Construction!</h2>');
    $('#info-modal .modal-body').html('Page is under construction.  Anything with a \'*\' hasn\'t been completed');
    $('#info-modal').modal('show');
  },
  exitState: function(){
    $('#info-modal').modal('hide');
  },
  
  // Events
  closeModal: function(){
    this.goToState('#modal_ready');
  }
});

// *********************************
// JQuery Startup functions
// *********************************
$(document).ready(function() {
  // Handler for .ready() called.
  statechart.initStates({'default': '#app', 'modal_states': '#modal_ready'});
});

$(document).bind('click', function(evt){
  statechart.tryToPerform(evt);
});
this.statechart = statechart;

