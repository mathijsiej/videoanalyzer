/*
 VideoAnalyzer 1.0
 25-08-2014
 Copyright by MyTrainr
 */

var VideoAnalyzer = {
	
	// variables
	main: $("#main"),drawFrame: $("#drawFrame"),videoFrame: $("#videoFrame"),video: $("video"),tools: $("#tools"),
	
	// contexts
	drawCtx: drawFrame.getContext('2d'), videoCtx: videoFrame.getContext('2d'), 
	
	// default config
	config: {
		width: 1280,
		height: 760,
		toolset: ['line','arrowFixed','arrowFree']				
	}, 
	
	currentTool: 0,
	timeout: false,
	
	// initialize
	init: function(config){
		$.extend(this.config,config);
		this.crossOrigin();			
		this.setSizes();
		this.checkVideoState();
		this.showTools();					
		this.scaleSizes();
	},	
	
	// check the state of the video and draw when playing
	checkVideoState: function(){
		if(!$('video').get(0).paused){ VideoAnalyzer.drawVideo($('video').get(0),VideoAnalyzer.config.width,VideoAnalyzer.config.height);}
		else{ clearTimeout(this.timeout); }		
		this.timeout = setTimeout(VideoAnalyzer.checkVideoState,20);			
	},
	
	drawVideo: function(v,w,h){
		console.log(w+':'+h);
		VideoAnalyzer.videoCtx.drawImage(v,0,0,w,h);	
	},
		
	// clear entire drawingCanvas
	clear: function(){
		drawFrame.width = drawFrame.width;		
	},
	
	// set the tools
	showTools: function(){
		// create ul
		$("<ul></ul>",{
  				id: "tools",
  				class: "tools"
  		}).appendTo('#tools');	
  		// li's
		$.each(this.config.toolset,function( key, value ) {
  			$("<li></li>",{
  				'data-id': key
  			}).appendTo('.tools')
  				.html('<img src="img/tools/'+value+'.png" />')
  				.on('click',function(event){
  					this.currentTool = $(this).attr('data-id');		
  					console.log(this.currentTool);			
  				});
		})	
	},
	
	crossOrigin: function(){
		this.drawFrame.crossOrigin = 'anonymous';
		this.video.crossOrigin = 'anonymous';		
	},
	
	// set the basic size
	setSizes: function(){
		this.main
			.width(this.config.width)
			.height(this.config.height);
		this.video
			.width(this.config.width)
			.height(this.config.height);
		this.videoFrame
			.width(this.config.width)
			.height(this.config.height);
		this.drawFrame
			.width(this.config.width)
			.height(this.config.height);
		this.tools
			.css('top',this.config.height);	
	},
	
	// scale when screen resizes
	scaleSizes: function(){
		$(window).resize(function(){
			alert('changed');
		});
	}
			
		
}
