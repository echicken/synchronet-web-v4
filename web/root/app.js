function BbsSpa(){
	this.initialized = false;
	this.debug = false;
}

BbsSpa.prototype.init = function(){		
	this._attachBehavior();
	self.initialized = true;
	this._dbug('** bbs spa init ' + self.initialized + ' **');
}

BbsSpa.prototype.toggleTerm = function(){
	$('#fTelnetContainer').toggle();
	if($('#fTelnetContainer').is(':visible')) ftClient.Connect();
}

BbsSpa.prototype.toggleNav = function(){
	$('#navbar').hasClass('in') ? $('#navbar').removeClass('in') : $('#navbar').addClass('in');
}

BbsSpa.prototype._renderLinkInDiv = function(link){
	let target = '#render-div'; let self = this;
	this._hideBlockingElements();
	$(target).addClass('spinner');
	$(target).load(link,function(){
		self._removeDupeElements(target);
		$(target).removeClass('spinner');
	});	
}

BbsSpa.prototype._attachBehavior = function(){
	this._hijackLinks();
	this._fTelnetAutoconnectOn();
	this._fixBrokenClasses();
}

BbsSpa.prototype._hijackLinks = function(){
	let self = this;
	$('a').click(function(e){
		var route = $(this).attr("href");
		if(route != '#'){
			e.preventDefault();
			self._dbug('-- re-rendering page ' + route + ' --');
			self._renderLinkInDiv(route);
		}
	})
}

BbsSpa.prototype._fTelnetAutoconnectOn = function(){
	$('#fTelnetContainer').click(function(){
			ftClient.Connect();
		});
}

BbsSpa.prototype._fixBrokenClasses = function(){
	$('#sidebar').removeClass('col-xs-6 col-sm-3');
	$('#sidebar').removeClass('col-xs-6 col-sm-3');
}

BbsSpa.prototype._removeDupeElements = function(target){
	if($('.navbar').length > 1){
		$('.navbar')[0].remove();
	}
	$('#render-div .sidebar-stuff').remove();
	$('#render-div footer').remove();
	this._dbug('-- trimmed excess elements --');
}

BbsSpa.prototype._hideBlockingElements = function(){
	$('#fTelnetContainer').hide();
	if($('#navbar').hasClass('in')) this.toggleNav();
}

BbsSpa.prototype._dbug = function(message){
	if(this.debug == true) {
		console.log(message);
	} 
}


